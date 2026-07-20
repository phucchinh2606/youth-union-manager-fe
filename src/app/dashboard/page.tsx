"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Import các mảnh ghép kiến trúc
import { useUsers } from "@/features/users/hooks/useUsers";
import { User } from "@/features/users/types/user.types";
import UserTable from "@/features/users/components/UserTable";
import UserFormModal from "@/features/users/components/UserFormModal";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>("");

  // Gọi Custom Hook để lấy data và hàm xử lý API
  const { users, isLoading, error, fetchUsers, deleteUser } = useUsers();

  // State quản lý việc đóng/mở Modal và người dùng đang được chọn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    router.push("/login");
  };

  // Hàm mở Modal Thêm mới
  const handleOpenAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  // Hàm mở Modal Sửa
  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Quản lý Chi đoàn thôn Châu Phong
            </h1>
            <p className="text-gray-600 mt-1">
              Xin chào,{" "}
              <span className="font-semibold text-blue-600">{userName}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition"
          >
            Đăng xuất
          </button>
        </div>

        {/* Khối quản lý danh sách */}
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">
              Danh sách Đoàn viên
            </h2>
            <button
              onClick={handleOpenAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              + Thêm mới
            </button>
          </div>

          <div className="p-6">
            {/* Gọi Table Component, đẩy dữ liệu và các hàm xử lý xuống */}
            <UserTable
              users={users}
              isLoading={isLoading}
              error={error}
              onEdit={handleOpenEdit}
              onDelete={deleteUser}
            />
          </div>
        </div>
      </div>

      {/* Gọi Form Modal Component */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedUser}
        onSuccess={fetchUsers} // Tải lại danh sách sau khi thêm/sửa thành công
      />
    </div>
  );
}
