import { useCallback, useEffect, useState } from "react";
import { User } from "../types/user.types";
import { userService } from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Dùng useCallback để tránh hàm bị tạo lại liên tục mỗi khi component render
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
      setError("");
    } catch (err: unknown) {
      // Thay vì dùng any, chúng ta log lỗi ra console để debug
      console.error("Lỗi fetchUsers:", err);
      setError("Không thể tải danh sách đoàn viên. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Tự động gọi API khi khởi tạo
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Hàm xử lý xóa
  const deleteUser = async (id: string, name: string) => {
    const isConfirm = window.confirm(
      `Bạn có chắc chắn muốn xóa đoàn viên "${name}" không?`,
    );
    if (!isConfirm) return;

    try {
      await userService.delete(id);
      fetchUsers(); // Xóa xong tự động tải lại danh sách
    } catch (err: unknown) {
      // Ép kiểu err về dạng object có cấu trúc của Axios Error
      const error = err as { response?: { data?: { message?: string } } };
      alert(error.response?.data?.message || "Lỗi khi xóa đoàn viên.");
    }
  };

  // Trả ra những state và hàm mà giao diện cần dùng
  return {
    users,
    isLoading,
    error,
    fetchUsers, // Trả ra để form Thêm/Sửa gọi lại sau khi lưu thành công
    deleteUser,
  };
};
