import express, { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import { chatWithAI } from "../services/chatbot";

// Định nghĩa CustomRequest để có req.db
interface CustomRequest extends Request {
  db: any; // Đối tượng MongoDB Db
}

const router = express.Router();

// Tạo handler để xử lý lỗi
const chatWithAIHandler = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user_id, messages } = req.body;

    if (!messages || !user_id) {
      res.status(400).json({ error: "user_id và messages là bắt buộc" });
      return;
    }

    const aiResponse = await chatWithAI(messages, user_id, req.db);
    res.json(aiResponse);
  } catch (error: any) {
    next(error);
  }
};

router.post("/", chatWithAIHandler as RequestHandler);

export default router;