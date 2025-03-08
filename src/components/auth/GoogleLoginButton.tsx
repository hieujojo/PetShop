'use client';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';

interface GoogleTokenPayload {
  name?: string;
  email?: string;
  picture?: string;
}

const GoogleLoginButton = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData && typeof userData === "object") {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error("Lỗi khi parse user từ localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, [setUser]);
  

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!user ? (
        <div style={{ transform: "scale(1.2)", display: "inline-block" }}>
        <GoogleLogin
          theme="outline"
          size="medium"
          type="standard"
          onSuccess={async (credentialResponse) => {
            const token = credentialResponse.credential;
            if (token) {
              const decoded = jwtDecode(token) as GoogleTokenPayload;
              console.log('Decoded User Info:', decoded);

              const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
              });

              const data = await response.json();

              if (response.ok) {
                const userData = {
                  token: data.token,
                  name: decoded.name,
                  email: decoded.email,
                  picture: decoded.picture,
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                router.push('/');
              } else {
                console.error('Server error:', data.error);
              }
            }
          }}
          onError={() => {
            console.log('Google Login Failed');
          }}
        />
        </div>
      ) : (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
