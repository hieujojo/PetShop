import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { defaultLocale } from '../../i18n';

export const metadata: Metadata = {
  title: "Pet Shop",
  description: "Welcome to Pet Shop",
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lấy locale từ middleware
  const locale = await getLocale() || defaultLocale;
  let messages;
  try {
    // Tải file bản dịch cho locale hiện tại
    messages = (await import(`../locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    // Fallback về locale mặc định (vi)
    messages = (await import(`../locales/vi/common.json`)).default;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="https://paddy.vn/cdn/shop/files/favicon_a1e7b91c-83d1-4ff8-8e1d-dcbf5c096081_32x32.png?v=1666494263"
          type="image/png"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            {GOOGLE_CLIENT_ID ? (
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </GoogleOAuthProvider>
            ) : (
              <p>Error: Missing Google Client ID</p>
            )}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}