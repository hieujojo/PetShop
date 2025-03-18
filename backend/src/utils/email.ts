import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const verificationCodes = new Map<string, string>();

export function generateVerificationCode(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes.set(email, code);
  console.log(`Mã xác thực tạo ra cho ${email}: ${code}`);
  return code;
}

export function validateVerificationCode(email: string, code: string) {
  if (verificationCodes.get(email) === code) {
    verificationCodes.delete(email);
    return true;
  }
  return false;
}

export async function sendVerificationEmail(email: string) {
  try {
    const code = generateVerificationCode(email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Mã xác thực đăng nhập",
      text: `Mã xác thực của bạn là: ${code}`,
    });

    console.log(`Email gửi thành công đến: ${email}`);
  } catch (error) {
    console.error("Lỗi gửi email:", error);
  }
}