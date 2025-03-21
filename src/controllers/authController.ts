import { Request, Response } from 'express';
import {
  generateAuthToken,
  validateUserVerificationCode,
  sendUserVerificationEmail,
  registerUser,
  loginUser,
  loginWithGoogle,
} from '../services/authService';
import { findUserByEmail } from '../models/userModel';
import { sendVerificationEmail, validateVerificationCode } from '../services/emailService';

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      res.status(400).json({ message: "Thiếu thông tin." });
      return;
    }

    if (!validateVerificationCode(email, verificationCode)) {
      res.status(400).json({ message: "Mã xác thực không đúng!" });
      return;
    }

    const authToken = generateAuthToken(email);
    res.status(200).json({ message: "Xác thực thành công!", token: authToken });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

export const handleAuthRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, username, email, password, confirmPassword, verificationCode } = req.body;

    if (email && verificationCode) {
      if (!validateVerificationCode(email, verificationCode)) {
        res.status(400).json({ message: "Mã xác thực không đúng!" });
        return;
      }
      const authToken = generateAuthToken(email);
      res.status(200).json({ message: "Xác thực thành công!", token: authToken });
      return;
    }

    if (token) {
      const user = loginWithGoogle(token);
      const authToken = generateAuthToken(user.email);
      res.status(200).json({ message: "Đăng nhập bằng Google thành công!", user, token: authToken });
      return;
    }

    if (username) {
      if (!email || !password || !confirmPassword) {
        res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
        return;
      }
      if (password !== confirmPassword) {
        res.status(400).json({ message: "Mật khẩu xác nhận không khớp." });
        return;
      }
      if (findUserByEmail(email)) {
        res.status(400).json({ message: "Email đã tồn tại!" });
        return;
      }
      await registerUser(username, email, password);
      await sendVerificationEmail(email);
      res.status(200).json({ message: "Đăng ký thành công! Vui lòng kiểm tra email.", user: { username, email } });
      return;
    }

    if (email && password) {
      const user = await loginUser(email, password);
      if (!user) {
        res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        return;
      }
      const authToken = generateAuthToken(user.email);
      res.status(200).json({ message: "Đăng nhập thành công!", user: { username: user.username, email: user.email }, token: authToken });
      return;
    }

    if (email) {
      if (findUserByEmail(email)) {
        res.status(400).json({ message: "Email đã tồn tại!" });
        return;
      }
      await sendVerificationEmail(email);
      res.status(200).json({ message: "Vui lòng kiểm tra email để xác thực." });
      return;
    }

    res.status(400).json({ message: "Yêu cầu không hợp lệ." });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ message: "Lỗi server, vui lòng thử lại sau." });
  }
};

export const sendVerificationCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email không hợp lệ." });
      return;
    }

    await sendVerificationEmail(email);
    res.status(200).json({ message: "Mã xác thực đã được gửi!" });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};