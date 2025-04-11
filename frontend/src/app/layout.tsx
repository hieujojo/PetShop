import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Asap } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const asap = Asap({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Pet Shop",
  description: "Welcome to Pet Shop",
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://paddy.vn/cdn/shop/files/favicon_a1e7b91c-83d1-4ff8-8e1d-dcbf5c096081_32x32.png?v=1666494263"
          type="image/png"
        />
      </head>
      <body className={`${inter.className} ${asap.className} antialiased`}>
        {GOOGLE_CLIENT_ID ? (
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AuthProvider>{children}</AuthProvider>
          </GoogleOAuthProvider>
        ) : (
          <p>Error: Missing Google Client ID</p>
        )}
      </body>
    </html>
  );
}
