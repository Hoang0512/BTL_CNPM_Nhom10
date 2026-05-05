/**
 * User Data Module
 * ================
 * Tác giả: Lâm Hoàng
 * Ngày tạo: 18/04/2026
 * Mô tả: Quản lý người dùng, đăng nhập, đăng ký, và lưu trữ thông tin người dùng trong localStorage
 */
// Import kiểu dữ liệu User từ file types.ts
// Dùng để kiểm tra cấu trúc dữ liệu tài khoản người dùng
import { User } from '../types';
// TẠO TÀI KHOẢN ADMIN MẶC ĐỊNH
// Đây là tài khoản quản trị viên có sẵn khi chạy web lần đầu
const ADMIN_USER: User = {
  id: 'admin-001',
  username: 'admin',
  password: 'admin',
// true = quyền admin
  isAdmin: true,
  createdAt: '2024-01-01T00:00:00.000Z'
};
// HÀM LẤY DANH SÁCH USER
export const getUsers = (): User[] => {
// Lấy dữ liệu users từ localStorage
  const stored = localStorage.getItem('users');
if (stored) {

    // Chuyển chuỗi JSON thành mảng object
    return JSON.parse(stored);
  }
// Nếu chưa có dữ liệu (lần đầu chạy web)
// sẽ tạo sẵn tài khoản admin
  localStorage.setItem('users', JSON.stringify([ADMIN_USER]));
  return [ADMIN_USER];
};
// HÀM LƯU DANH SÁCH USER

export const saveUsers = (users: User[]) => {

  // Lưu toàn bộ danh sách user vào localStorage
  localStorage.setItem(
    'users',
    JSON.stringify(users)
  );
};



// HÀM ĐĂNG KÝ TÀI KHOẢN

export const registerUser = (
  username: string,
  password: string
): {
  success: boolean;
  message: string;
  user?: User;
} => {

  // Lấy danh sách user hiện tại
  const users = getUsers();



  // KIỂM TRA TÊN ĐĂNG NHẬP ĐÃ TỒN TẠI CHƯA

  if (
    users.find(
      u =>
        u.username.toLowerCase() ===
        username.toLowerCase()
    )
  ) {
    return {
      success: false,
      message: 'Tên đăng nhập đã tồn tại!'
    };
  }



  // KIỂM TRA ĐỘ DÀI USERNAME

  if (username.length < 3) {
    return {
      success: false,
      message: 'Tên đăng nhập phải có ít nhất 3 ký tự!'
    };
  }



  // KIỂM TRA ĐỘ DÀI PASSWORD

  if (password.length < 3) {
    return {
      success: false,
      message: 'Mật khẩu phải có ít nhất 3 ký tự!'
    };
  }



  // TẠO USER MỚI

  const newUser: User = {

    // Tạo id theo thời gian hiện tại
    id: `user-${Date.now()}`,

    // Tên đăng nhập
    username,

    // Mật khẩu
    password,

    // User thường
    isAdmin: false,

    // Thời gian đăng ký
    createdAt: new Date().toISOString()
  };



  // Thêm user mới vào mảng
  users.push(newUser);



  // Lưu lại localStorage
  saveUsers(users);



  // Trả kết quả thành công
  return {
    success: true,
    message: 'Đăng ký thành công!',
    user: newUser
  };
};



// HÀM ĐĂNG NHẬP

export const loginUser = (
  username: string,
  password: string
): {
  success: boolean;
  message: string;
  user?: User;
} => {

  // Lấy danh sách user
  const users = getUsers();



  // Tìm user trùng username + password
  const user = users.find(
    u =>
      u.username.toLowerCase() ===
        username.toLowerCase() &&
      u.password === password
  );



  // Nếu tìm thấy tài khoản
  if (user) {
    return {
      success: true,
      message: 'Đăng nhập thành công!',
      user
    };
  }



  // Nếu sai tài khoản hoặc mật khẩu
  return {
    success: false,
    message: 'Sai tên đăng nhập hoặc mật khẩu!'
  };
};