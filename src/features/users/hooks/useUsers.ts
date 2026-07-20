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
      // Dùng unknown thay vì any
      const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra";
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
      const error = err as any; // Ép kiểu nếu bạn cần lấy message từ axios
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
