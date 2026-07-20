export interface User {
  id: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  role: string;
  position: string;
}

// THÊM INTERFACE NÀY CHO FORM SỬA
export interface EditFormState {
  id: string;
  fullName: string;
  gender: number;
  dateOfBirth: string;
  phoneNumber: string;
  position: number;
  role: number;
}

// 2. DTO gửi lên Backend để Thêm mới (POST /api/users)
export interface CreateUserDto {
  fullName: string;
  gender: number;
  dateOfBirth: string;
  phoneNumber: string;
  password: string;
  position: number;
  role: number;
}

// 3. DTO gửi lên Backend để Cập nhật (PUT /api/users/{id})
export interface UpdateUserDto {
  fullName: string;
  gender: number;
  dateOfBirth: string;
  phoneNumber: string;
  position: number;
  role: number;
}
