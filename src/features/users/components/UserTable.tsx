import { User } from "../types/user.types";

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  error: string;
  onEdit: (user: User) => void;
  onDelete: (id: string, name: string) => void;
}

export default function UserTable({
  users,
  isLoading,
  error,
  onEdit,
  onDelete,
}: UserTableProps) {
  const formatGender = (gender: string) => {
    switch (gender) {
      case "Male":
        return "Nam";
      case "Female":
        return "Nữ";
      default:
        return "Khác";
    }
  };

  const formatPosition = (position: string) => {
    switch (position) {
      case "Secretary":
        return "Bí thư";
      case "DeputySecretary":
        return "Phó Bí thư";
      case "CommitteeMember":
        return "Ủy viên BCH";
      case "Member":
        return "Đoàn viên";
      default:
        return position;
    }
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500 py-8">Đang tải dữ liệu...</p>
    );
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;
  if (users.length === 0)
    return (
      <p className="text-center text-gray-500 py-8">
        Chưa có dữ liệu đoàn viên.
      </p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-600">
        <thead className="bg-gray-50 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-center rounded-tl-lg">Họ và tên</th>
            <th className="px-4 py-3 text-center">Giới tính</th>
            <th className="px-4 py-3 text-center">Ngày sinh</th>
            <th className="px-4 py-3 text-center">Số điện thoại</th>
            <th className="px-4 py-3 text-center">Chức vụ</th>
            <th className="px-4 py-3 text-center">Quyền</th>
            <th className="px-4 py-3 text-center rounded-tr-lg">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 text-center font-medium text-gray-900">
                {user.fullName}
              </td>
              <td className="px-4 py-3 text-center">
                {formatGender(user.gender)}
              </td>
              <td className="px-4 py-3 text-center">
                {new Date(user.dateOfBirth).toLocaleDateString("vi-VN")}
              </td>
              <td className="px-4 py-3 text-center">{user.phoneNumber}</td>
              <td className="px-4 py-3 text-center">
                <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-semibold inline-block">
                  {formatPosition(user.position)}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold inline-block ${user.role === "Admin" ? "bg-purple-50 text-purple-700" : "bg-gray-100 text-gray-700"}`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Sửa
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => onDelete(user.id, user.fullName)}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
