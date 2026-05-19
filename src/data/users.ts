import { User } from '../types';

const ADMIN_USER: User = {
  id: 'admin-001',
  username: 'admin',
  password: 'admin',
  isAdmin: true,
  createdAt: '2024-01-01T00:00:00.000Z'
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem('users');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with admin user
  localStorage.setItem('users', JSON.stringify([ADMIN_USER]));
  return [ADMIN_USER];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const registerUser = (username: string, password: string): { success: boolean; message: string; user?: User } => {
  const users = getUsers();
  
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, message: 'Tên đăng nhập đã tồn tại!' };
  }
  
  if (username.length < 3) {
    return { success: false, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' };
  }
  
  if (password.length < 3) {
    return { success: false, message: 'Mật khẩu phải có ít nhất 3 ký tự!' };
  }
  
  const newUser: User = {
    id: `user-${Date.now()}`,
    username,
    password,
    isAdmin: false,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true, message: 'Đăng ký thành công!', user: newUser };
};

export const loginUser = (username: string, password: string): { success: boolean; message: string; user?: User } => {
  const users = getUsers();
  const user = users.find(u => 
    u.username.toLowerCase() === username.toLowerCase() && 
    u.password === password
  );
  
  if (user) {
    return { success: true, message: 'Đăng nhập thành công!', user };
  }
  
  return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' };
};
