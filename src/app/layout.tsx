import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Khởi tạo font Inter từ Google Fonts (Next.js tự động tối ưu & cache)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hệ thống Quản lý Chi đoàn thôn Châu Phong",
  description: "Ứng dụng quản lý đoàn viên và chi đoàn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
