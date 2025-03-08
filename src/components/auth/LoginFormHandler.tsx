import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useLoginFormHandler = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại.");
      }
  
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token); 
  
      login(data.user); 
  
      alert("Đăng nhập thành công!");
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return { formData, handleChange, handleLogin, loading, error };
};

export default useLoginFormHandler;
interface User {
  id: string;
  email: string;
  name: string;
}

function login(user: User) {
    console.log("User logged in:", user);
}

