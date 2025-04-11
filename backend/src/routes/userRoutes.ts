import express from "express";
import connection from "../utils/database"; // Import kết nối MySQL

const router = express.Router();

router.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("❌ Lỗi truy vấn MySQL:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
    res.status(200).json(results);
  });
});

export default router;
