import express, { Request, Response } from "express";
import { chatWithAI } from "../services/chatbot";

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, messages } = req.body;

        if (!messages || !user_id) {
            res.status(400).json({ error: "user_id và messages là bắt buộc" });
            return;
        }

        // 🔹 Gửi tin nhắn và lấy phản hồi từ AI
        const aiResponse = await chatWithAI(messages, user_id);

        res.json({ message: aiResponse });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
