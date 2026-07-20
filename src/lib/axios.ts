import axios from "axios";
import Cookies from "js-cookie";

// Khởi tạo instance của Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor Request: Tự động đính kèm Token vào Header trước khi gửi đi
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ cookie
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor Response: Xử lý lỗi chung (ví dụ hết hạn token)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Nếu lỗi 401 (Unauthorized), xóa token và đá về trang đăng nhập
      Cookies.remove("token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
