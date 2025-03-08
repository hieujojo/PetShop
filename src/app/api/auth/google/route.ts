import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

const users: { username?: string; email: string; password?: string }[] = [];
const SECRET_KEY = "your_secret_key"; 

export async function POST(request: Request) {
  try {
    const { token, username, email, password, confirmPassword } = await request.json();

    if (token) {
      const decoded = jwtDecode<{ email: string; name?: string }>(token);
      let user = users.find((u) => u.email === decoded.email);

      if (!user) {
        user = { email: decoded.email, username: decoded.name };
        users.push(user);
      }

      const authToken = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "7d" });

      return NextResponse.json({
        message: "Đăng nhập bằng Google thành công!",
        user,
        token: authToken,
      });
    }

    if (username) {
      if (!email || !password || !confirmPassword) {
        return NextResponse.json({ message: "Vui lòng nhập đầy đủ thông tin." }, { status: 400 });
      }

      if (password !== confirmPassword) {
        return NextResponse.json({ message: "Mật khẩu xác nhận không khớp." }, { status: 400 });
      }

      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        return NextResponse.json({ message: "Email đã tồn tại!" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ username, email, password: hashedPassword });

      return NextResponse.json({ message: "Đăng ký thành công!", user: { username, email } });
    }

    if (email && password) {
      const user = users.find((u) => u.email === email);
      if (!user || !user.password) {
        return NextResponse.json({ message: "Email không tồn tại!" }, { status: 400 });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Mật khẩu không đúng!" }, { status: 400 });
      }

      const authToken = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "7d" });

      return NextResponse.json({
        message: "Đăng nhập thành công!",
        user: { username: user.username, email: user.email },
        token: authToken,
      });
    }

    return NextResponse.json({ message: "Yêu cầu không hợp lệ." }, { status: 400 });
  } catch (error) {
    console.error("Lỗi:", error);
    return NextResponse.json({ message: "Lỗi server, vui lòng thử lại sau." }, { status: 500 });
  }
}
