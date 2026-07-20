import axiosInstance from "@/lib/axios";
import { CreateUserDto, UpdateUserDto, User } from "../types/user.types";

export const userService = {
  // Lấy danh sách đoàn viên
  getAll: async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>("/users");
    return response.data;
  },

  // Tạo mới đoàn viên
  create: async (data: CreateUserDto): Promise<User> => {
    const response = await axiosInstance.post<User>("/users", data);
    return response.data;
  },

  // Cập nhật thông tin đoàn viên
  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await axiosInstance.put<User>(`/users/${id}`, data);
    return response.data;
  },

  // Xóa đoàn viên
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete<{ message: string }>(
      `/users/${id}`,
    );
    return response.data;
  },
};
