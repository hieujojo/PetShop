import { useState } from "react";
import axios from "axios";

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
  
    const userMessage = { role: "user", content: message };
    setChatHistory([...chatHistory, userMessage]);
  
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
  
      const botReply = { role: "bot", content: response.data.message };
      setChatHistory([...chatHistory, userMessage, botReply]);
      setMessage("");
    } catch (error) {
      console.error("Lỗi khi gọi chatbot:", error);
    }
  };


  return (
    <div className="fixed bottom-6 right-6">
      {/* Nút hỗ trợ */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬 Hỗ trợ
      </button>

      {/* Form chat */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white p-4 rounded-lg shadow-lg w-72">
          <h3 className="text-lg font-semibold mb-2">Hỗ trợ khách hàng</h3>
          <div className="h-40 overflow-y-auto border p-2 rounded">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`mb-2 ${chat.role === "user" ? "text-right" : "text-left"}`}>
                <span className={`px-3 py-1 rounded ${chat.role === "user" ? "bg-blue-100" : "bg-gray-200"}`}>
                  {chat.content}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex">
            <input
              type="text"
              className="flex-1 border p-2 rounded-l"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập câu hỏi..."
            />
            <button className="bg-blue-500 text-white px-3 rounded-r" onClick={handleSendMessage}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
