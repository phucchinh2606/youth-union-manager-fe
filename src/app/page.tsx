import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Hệ thống Quản lý Chi đoàn
      </h1>
      <Link
        href="/login"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Đi đến Đăng nhập
      </Link>
    </main>
  );
}
