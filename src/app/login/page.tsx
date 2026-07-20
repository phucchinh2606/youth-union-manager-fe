"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axiosInstance from "../../lib/axios"; // Đảm bảo đường dẫn này trỏ đúng tới file axios.ts bạn đã tạo

export default function LoginPage() {
  const router = useRouter();

  // Quản lý state của form
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn trình duyệt reload lại trang khi submit form
    setError("");
    setIsLoading(true);

    try {
      // Gọi API đăng nhập thông qua axiosInstance đã cấu hình
      const response = await axiosInstance.post("/auth/login", {
        phoneNumber,
        password,
      });

      // Bóc tách dữ liệu từ Backend trả về (như đã định nghĩa ở AuthResponseDto)
      const { token, fullName, role } = response.data;

      // Lưu Token vào Cookie, set thời gian sống là 1 ngày
      Cookies.set("token", token, { expires: 1 });

      // Tạm thời lưu Tên và Quyền vào localStorage để dùng cho việc hiển thị menu sau này
      localStorage.setItem("userName", fullName);
      localStorage.setItem("userRole", role);

      // Đăng nhập thành công, chuyển hướng người dùng sang trang quản lý (dashboard)
      router.push("/dashboard");
    } catch (err: unknown) {
      // Cấu trúc lỗi chuẩn của Axios
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg border border-gray-100">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Đăng nhập hệ thống
        </h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
