import axios from "axios";
import dotenv from "dotenv";
import { Db } from "mongodb"; // Thêm Db từ mongodb
import { createClient } from "redis";

dotenv.config();

const WIT_AI_TOKEN = process.env["WitAI"];

if (!WIT_AI_TOKEN) {
  throw new Error("WitAI token is not defined in environment variables");
}

// Khởi tạo Redis client
const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
(async () => {
  await redisClient.connect();
})();

interface IntentData {
  intent: string;
  keywords: string[];
}

const SIMPLE_INTENTS_KEYWORDS: { [key: string]: string[] } = {
  "chào hỏi": ["xin chào", "hello", "hi", "chào"],
  "cảm ơn": ["cảm ơn", "thanks", "thank you"],
  "tạm biệt": ["tạm biệt", "bye", "goodbye"],
};

const SIMPLE_RESPONSES = {
  "chào hỏi": "Xin chào! Mình có thể giúp gì cho bạn về sản phẩm pet shop?",
  "cảm ơn": "Cảm ơn bạn! Nếu cần gì thêm cứ hỏi nhé!",
  "tạm biệt": "Tạm biệt bạn! Hẹn gặp lại!",
};

const getWitAIIntent = async (message: string): Promise<IntentData> => {
  const cacheKey = `witai:${message}`;
  const cachedIntent = await redisClient.get(cacheKey);
  if (cachedIntent) {
    console.log("Lấy intent từ cache:", cachedIntent);
    return JSON.parse(cachedIntent);
  }

  try {
    const response = await axios.get("https://api.wit.ai/message", {
      params: { q: message },
      headers: { Authorization: `Bearer ${WIT_AI_TOKEN}` },
    });
    const intent = response.data.intents[0]?.name || "hỏi đáp";
    const entities = response.data.entities;
    const keywords = Object.values(entities)
      .flat()
      .map((e: any) => e.value);
    const intentData = { intent, keywords };

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(intentData));
    return intentData;
  } catch (error) {
    console.error("Wit.ai error:", error);
    return { intent: "hỏi đáp", keywords: [] };
  }
};

// Thêm tham số db vào hàm chatWithAI
export const chatWithAI = async (messages: any, userId: string, db: Db) => {
  console.log("Bắt đầu xử lý với message:", messages);

  try {
    if (!Array.isArray(messages) || messages.length === 0) {
      return {
        intent: "hỏi đáp",
        message: "Dữ liệu không hợp lệ. Vui lòng gửi tin nhắn hợp lệ.",
      };
    }

    const normalizedMessages = messages.map((msg: any) => {
      if (typeof msg === "string") {
        return { role: "user", content: msg };
      }
      return msg;
    });

    const lastMessage = normalizedMessages[normalizedMessages.length - 1];
    if (!lastMessage || !lastMessage.content) {
      return {
        intent: "hỏi đáp",
        message: "Tin nhắn không hợp lệ. Vui lòng thử lại.",
      };
    }

    const userMessage = lastMessage.content.toLowerCase().trim();
    console.log("Message đã chuẩn hóa:", userMessage);

    // Xử lý các intent đơn giản
    for (const [intent, keywords] of Object.entries(SIMPLE_INTENTS_KEYWORDS)) {
      if (keywords.some((keyword) => userMessage.includes(keyword))) {
        return {
          intent,
          message: SIMPLE_RESPONSES[intent as keyof typeof SIMPLE_RESPONSES],
        };
      }
    }

    const intentData = await getWitAIIntent(userMessage);
    console.log("Intent từ Wit.ai:", intentData);

    let responseData;

    // 1. Gợi ý sản phẩm
    if (intentData.intent === "recommend_product") {
      let keywords = intentData.keywords;
      if (keywords.length === 0) {
        keywords = userMessage
          .split(" ")
          .filter((word: string) => word.length > 2);
        console.log("Keywords trích xuất thủ công:", keywords);
      }

      if (keywords.length > 0) {
        // Tìm sản phẩm trong MongoDB
        const products = await db
          .collection("food_products")
          .aggregate([
            {
              $match: {
                title: { $regex: keywords.join("|"), $options: "i" }, // Tương đương MATCH...AGAINST
              },
            },
            {
              $lookup: {
                from: "brands",
                localField: "brand_id",
                foreignField: "id",
                as: "brand_info",
              },
            },
            {
              $lookup: {
                from: "collections",
                localField: "collection_id",
                foreignField: "id",
                as: "collection_info",
              },
            },
            {
              $unwind: { path: "$brand_info", preserveNullAndEmptyArrays: true },
            },
            {
              $unwind: { path: "$collection_info", preserveNullAndEmptyArrays: true },
            },
            {
              $limit: 3,
            },
          ])
          .toArray();

        responseData =
          products.length > 0
            ? {
                intent: "recommend_product",
                message: "Tôi sẽ đề xuất những loại thức ăn phù hợp:",
                products: products.map((p: any) => {
                  const productId = p.id?.toString() || "0";
                  let href = p.href;
                  if (!href || typeof href !== "string") {
                    href = `/products/${productId}`;
                  }
                  const image = p.image || "https://via.placeholder.com/150";
                  return {
                    id: productId,
                    name: p.title || "Sản phẩm không tên",
                    brand:
                      p.brand_info?.brand ||
                      p.brand ||
                      "Không có thương hiệu",
                    collection:
                      p.collection_info?.title || "Không có bộ sưu tập",
                    price: p.discountedPrice
                      ? parseFloat(p.discountedPrice)
                      : parseFloat(p.originalPrice || "0"),
                    image: image,
                    href: href,
                  };
                }),
              }
            : { intent: "recommend_product", message: "Không tìm thấy sản phẩm." };
      } else {
        responseData = {
          intent: "recommend_product",
          message: "Vui lòng cung cấp thêm thông tin về sản phẩm bạn muốn tìm.",
        };
      }
    }

    // 2. Kiểm tra đơn hàng
    else if (intentData.intent === "check_order") {
      const orderCode = intentData.keywords[0];
      if (!orderCode) {
        responseData = {
          intent: "check_order",
          message: "Vui lòng cung cấp mã đơn hàng.",
        };
      } else {
        const order = await db
          .collection("orders")
          .find({ order_code: orderCode })
          .toArray();
        responseData =
          order.length > 0
            ? {
                intent: "check_order",
                message: `Đơn hàng ${order[0].order_id}: ${order[0].status}, Tổng: ${order[0].total} VND`,
              }
            : {
                intent: "check_order",
                message: "Không tìm thấy đơn hàng.",
              };
      }
    }

    // 3. Tư vấn sản phẩm cho thú cưng
    else if (intentData.intent === "consult_pet_product") {
      const prefs = await db
        .collection("user_preferences")
        .find({ user_id: userId })
        .toArray();
      const petType = prefs[0]?.pet_type || "mèo";
      const products = await db
        .collection("food_products")
        .aggregate([
          {
            $match: {
              title: { $regex: petType, $options: "i" },
            },
          },
          {
            $lookup: {
              from: "brands",
              localField: "brand_id",
              foreignField: "id",
              as: "brand_info",
            },
          },
          {
            $unwind: { path: "$brand_info", preserveNullAndEmptyArrays: true },
          },
          {
            $limit: 3,
          },
        ])
        .toArray();
      responseData =
        products.length > 0
          ? {
              intent: "consult_pet_product",
              message: "Dựa trên sở thích của bạn, tôi gợi ý một số sản phẩm phù hợp:",
              products: products.slice(0, 3).map((p: any) => ({
                id: p.id.toString(),
                name: p.title,
                brand:
                  p.brand_info?.brand || p.brand || "Không có thương hiệu",
                price: p.discountedPrice
                  ? parseFloat(p.discountedPrice)
                  : parseFloat(p.originalPrice),
                image: p.image || "https://via.placeholder.com/150",
                href: p.href ? p.href : `/products/${p.id}`,
              })),
            }
          : {
              intent: "consult_pet_product",
              message: "Chưa có sản phẩm phù hợp với sở thích của bạn.",
            };
    }

    // 4. Đặt hàng
    else if (intentData.intent === "place_order") {
      const productName = intentData.keywords[0];
      if (!productName) {
        responseData = {
          intent: "place_order",
          message: "Vui lòng cung cấp tên sản phẩm.",
        };
      } else {
        const product = await db
          .collection("food_products")
          .find({ title: productName })
          .toArray();
        if (product.length === 0) {
          responseData = {
            intent: "place_order",
            message: "Sản phẩm không tồn tại.",
          };
        } else {
          const orderCode = `ORD${Date.now()}`;
          const totalPrice = product[0].discountedPrice
            ? parseFloat(product[0].discountedPrice)
            : parseFloat(product[0].originalPrice);
          await db.collection("orders").insertOne({
            user_id: userId,
            order_code: orderCode,
            product_id: product[0].id,
            total: totalPrice,
            status: "pending",
          });
          responseData = {
            intent: "place_order",
            message: `Đơn hàng ${orderCode} đã được đặt thành công! Tổng: ${totalPrice} VND`,
          };
        }
      }
    }

    // 5. Tìm bài viết
    else if (intentData.intent === "find_article") {
      let keywords = intentData.keywords;
      if (keywords.length === 0) {
        keywords = userMessage
          .split(" ")
          .filter((word: string) => word.length > 2);
      }

      if (keywords.length > 0) {
        const articles = await db
          .collection("articles")
          .find({
            title: { $regex: keywords.join("|"), $options: "i" },
          })
          .limit(3)
          .toArray();
        responseData =
          articles.length > 0
            ? {
                intent: "find_article",
                message: "Danh sách bài viết liên quan:",
                articles: articles.map((a: any) => ({
                  id: a.id.toString(),
                  title: a.title,
                  content: a.content.substring(0, 100) + "...",
                  href: `/articles/${a.id}`,
                })),
              }
            : {
                intent: "find_article",
                message: "Không tìm thấy bài viết phù hợp.",
              };
      } else {
        responseData = {
          intent: "find_article",
          message: "Vui lòng cung cấp thêm thông tin về bài viết bạn muốn tìm.",
        };
      }
    }

    // 6. Tìm menu
    else if (intentData.intent === "find_menu") {
      const menuItems = await db
        .collection("menu_items")
        .find({ parent_id: null })
        .limit(3)
        .toArray();
      responseData =
        menuItems.length > 0
          ? {
              intent: "find_menu",
              message: "Danh sách menu chính:",
              menuItems: menuItems.map((m: any) => ({
                id: m.id.toString(),
                name: m.name,
                description: m.description,
                href: `/menu/${m.id}`,
              })),
            }
          : {
              intent: "find_menu",
              message: "Không tìm thấy menu.",
            };
    }

    // 7. Hỗ trợ khách hàng (fallback)
    else {
      responseData = {
        intent: "hỏi đáp",
        message: "Mình chưa hiểu rõ, bạn có thể nói thêm không? Mình ở đây để hỗ trợ bạn!",
      };
    }

    // Lưu lịch sử chat
    await db.collection("chat_history").insertMany([
      { user_id: userId, role: "user", content: userMessage, created_at: new Date() },
      { user_id: userId, role: "assistant", content: JSON.stringify(responseData), created_at: new Date() },
    ]);

    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return {
      intent: "hỏi đáp",
      message: "Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau.",
    };
  }
};

// Chuyển cleanupChatHistory sang MongoDB
export const cleanupChatHistory = async (db: Db) => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 ngày trước
    await db
      .collection("chat_history")
      .deleteMany({ created_at: { $lt: oneDayAgo } });
    console.log("Đã xóa tin nhắn cũ hơn 1 ngày");
  } catch (error) {
    console.error("Lỗi khi dọn dẹp chat_history:", error);
  }
};