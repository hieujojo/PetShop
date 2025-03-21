import express, { Request, Response } from "express";
import { chatWithAI } from "../chatbot";

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Dữ liệu nhận từ frontend:", req.body); 

        const { user_id, messages } = req.body;
        if (!user_id || !messages) {
            res.status(400).json({ error: "user_id và messages là bắt buộc" });
            return;
        }

        const aiResponse = await chatWithAI(messages, user_id);
        res.json({ message: aiResponse });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
