import { useState, useEffect } from "react";
import { User } from "../types/user.types";
import { userService } from "../services/userService";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: User | null; // Nếu null là Thêm mới, có dữ liệu là Sửa
  onSuccess: () => void; // Hàm gọi lại để tải lại danh sách khi lưu thành công
}

export default function UserFormModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: UserFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const defaultForm = {
    fullName: "",
    gender: 0,
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
    position: 0,
    role: 0,
  };
  const [formData, setFormData] = useState(defaultForm);

  // Lắng nghe sự thay đổi của initialData để tự động điền form (Nếu là Sửa)
  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        fullName: initialData.fullName,
        gender:
          initialData.gender === "Female"
            ? 1
            : initialData.gender === "Other"
              ? 2
              : 0,
        dateOfBirth: initialData.dateOfBirth.split("T")[0],
        phoneNumber: initialData.phoneNumber,
        password: "", // Form sửa không cần mật khẩu
        position:
          initialData.position === "Secretary"
            ? 3
            : initialData.position === "DeputySecretary"
              ? 2
              : initialData.position === "CommitteeMember"
                ? 1
                : 0,
        role: initialData.role === "Admin" ? 1 : 0,
      });
    } else {
      setFormData(defaultForm); // Reset form nếu là Thêm mới
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (initialData) {
        // Nếu có initialData => Gọi API PUT (Sửa)
        await userService.update(initialData.id, formData);
      } else {
        // Nếu không có initialData => Gọi API POST (Thêm mới)
        await userService.create(formData);
      }
      onSuccess(); // Báo cho Component cha biết để fetch lại danh sách
      onClose(); // Đóng Modal
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; // Ẩn component nếu isOpen = false

  const isEditMode = !!initialData; // Biến kiểm tra xem đang là Thêm hay Sửa

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          {isEditMode ? "Cập nhật thông tin" : "Thêm mới Đoàn viên"}
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Ngày sinh
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Giới tính
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: Number(e.target.value) })
                }
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value={0}>Nam</option>
                <option value={1}>Nữ</option>
                <option value={2}>Khác</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="text"
                required
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Chỉ hiện trường Mật khẩu khi Thêm mới */}
            {!isEditMode && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Chức vụ
              </label>
              <select
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: Number(e.target.value) })
                }
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value={0}>Đoàn viên</option>
                <option value={1}>Ủy viên BCH</option>
                <option value={2}>Phó Bí thư</option>
                <option value={3}>Bí thư</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phân quyền
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: Number(e.target.value) })
                }
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value={0}>User (Thường)</option>
                <option value={1}>Admin (Quản trị)</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting
                ? "Đang xử lý..."
                : isEditMode
                  ? "Lưu thay đổi"
                  : "Xác nhận thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
