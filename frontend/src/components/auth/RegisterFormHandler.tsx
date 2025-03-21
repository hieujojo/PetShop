import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const useRegisterFormHandler = () => {
  const { login } = useAuth(); // Lấy hàm login từ AuthContext
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý đăng ký tài khoản
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp!");
      return false;
    }
  
    setLoading(true);
  
    try {
      console.log("Dữ liệu gửi đi:", formData);
  
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("Phản hồi từ API:", result);
  
      if (!response.ok) throw new Error(result.message);
  
      alert("Đăng ký thành công! Vui lòng kiểm tra email.");
      return true;
    } catch (err) {
      console.error("Lỗi khi gửi request:", err);
      setError(err instanceof Error ? err.message : "Lỗi không xác định.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xác thực email
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    console.log("Dữ liệu gửi đi khi xác thực:", {
      email: formData.email,
      verificationCode: formData.verificationCode,
    });
  
    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          verificationCode: formData.verificationCode,
        }),
      });
  
      const result = await response.json();
      console.log("Phản hồi từ API:", result);
  
      if (!response.ok) throw new Error(result.message);
  
      // Lưu thông tin người dùng vào AuthContext
      login(result.user);
  
      setSuccessMessage("Xác thực email thành công! Chuyển hướng đến trang chính...");
      setTimeout(() => {
        router.push("/home"); // Điều hướng qua Home
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.");
    } finally {
      setLoading(false);
    }
  };
  return {
    formData,
    handleChange,
    handleRegister,
    handleVerifyEmail,
    loading,
    error,
    successMessage,
  };
};

export default useRegisterFormHandler;
