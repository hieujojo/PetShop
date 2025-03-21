import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";
import pool from "../config/db"; 

dotenv.config();

const token = process.env["OPENAI"];

export const chatWithAI = async (messages: any, userId: string) => {
    try {
        const client = ModelClient(
            "https://models.inference.ai.azure.com",
            new AzureKeyCredential(token as string)
        );

        const conn = await pool.getConnection();
        try {
            const [chatHistory]: any = await conn.query(
                "SELECT role, content FROM chat_history WHERE user_id = ? ORDER BY created_at ASC",
                [userId]
            );

            const fullMessages = [...chatHistory, ...messages];

            const response = await client.path("/chat/completions").post({
                body: {
                    messages: fullMessages,
                    model: "DeepSeek-V3",
                    temperature: 0.8,
                    max_tokens: 2048,
                    top_p: 0.1
                }
            });

            if (isUnexpected(response)) {
                throw new Error(JSON.stringify(response.body.error));
            }

            const aiMessage = response.body.choices[0].message.content;

            await conn.query(
                "INSERT INTO chat_history (user_id, role, content) VALUES (?, ?, ?)",
                [userId, "user", messages[messages.length - 1].content]
            );

            await conn.query(
                "INSERT INTO chat_history (user_id, role, content) VALUES (?, ?, ?)",
                [userId, "assistant", aiMessage]
            );

            return aiMessage;
        } finally {
            conn.release();
        }
    } catch (error) {
        throw new Error(`Error in AI Service: ${error}`);
    }
};
