import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

// Định nghĩa kiểu Product
interface Product {
  id: string;
  name: string;
  brand: string;
  collection?: string;
  price: number;
  image: string;
  href: string;
}

// Định nghĩa kiểu cho chatHistory
interface ChatMessage {
  role: string;
  content: string;
  products?: Product[];
}

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "bot",
      content: "Xin chào! 🐾 Rất vui được gặp bạn! Bạn đang tìm gì cho thú cưng của mình hôm nay?",
    },
  ]);

  const suggestions = [
    "Tìm phụ kiện cho chó 🐶",
    "Tìm phụ kiện cho mèo 🐱",
    "Tôi cần tư vấn sản phẩm 🎁",
    "Chỉ xem qua thôi 👀",
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: message };
    setChatHistory([...chatHistory, userMessage]);
    setIsLoading(true);

    const userId = "12345";

    console.log("Dữ liệu gửi lên API:", {
      user_id: userId,
      messages: [...chatHistory, userMessage],
    });

    try {
      const response = await axios.post("http://localhost:5000/chatbot", {
        user_id: userId,
        messages: [...chatHistory, userMessage],
      });

      console.log("Phản hồi từ API:", response.data);

      const botReply: ChatMessage = {
        role: "bot",
        content: response.data.message || "Mình chưa hiểu rõ, bạn có thể nói thêm không?",
        products: response.data.products || null,
      };

      setChatHistory([...chatHistory, userMessage, botReply]);
      setMessage("");
    } catch (error) {
      console.error("Lỗi khi gọi chatbot:", error);
      const errorReply: ChatMessage = { role: "bot", content: "Có lỗi xảy ra. Vui lòng thử lại sau." };
      setChatHistory([...chatHistory, userMessage, errorReply]);
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button
        className="bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl">💬</span> Hỗ trợ
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[28rem] bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-blue-600">🐾</span> PetShop ChatBot
            </h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="h-80 overflow-y-auto bg-white p-4 rounded-lg shadow-inner mb-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  chat.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg whitespace-pre-line ${
                    chat.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } max-w-[80%]`}
                >
                  <span>{chat.content}</span>
{chat.products && (
  <div className="mt-2 grid grid-cols-1 gap-3">
    {chat.products.map((product: Product, idx: number) => {
      // Đảm bảo href không bao giờ null/undefined
      const safeHref = product.href || `/products/${product.id}`;
      
      return (
        <Link 
          key={idx} 
          href={safeHref}
          passHref
          legacyBehavior
        >
          <a className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <Image
  src={product.image || '/images/default-product.png'}
  alt={product.name}
  width={64}
  height={64}
  className="w-16 h-16 object-cover rounded-md"
  onError={(e) => {
    e.currentTarget.src = '/images/default-product.png';
  }}
/>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">
                {product.name}
              </p>
              <p className="text-xs text-gray-600">
                Thương hiệu: {product.brand}
              </p>
              {product.collection && (
                <p className="text-xs text-gray-600">
                  Bộ sưu tập: {product.collection}
                </p>
              )}
              <p className="text-sm font-medium text-blue-600">
                {product.price.toLocaleString()} VND
              </p>
            </div>
          </a>
        </Link>
      );
    })}
  </div>
)}

                </div>
              </div>
            ))}

            {chatHistory.length === 1 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="text-center text-gray-500">Đang xử lý...</div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Viết tin nhắn..."
            />
            <button
              className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={handleSendMessage}
            >
              ➤
            </button>
          </div>

          <div className="text-center text-gray-500 text-sm mt-4">
            Được hỗ trợ bởi <span className="text-blue-600">PetShop ChatBot</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;