import * as mssql from 'mssql';

// SQL Server Connection Configuration
export const sqlConfig = {
  server: 'DESKTOP-4QKIQRM\\MSSQLSERVER02',
  database: 'ComicDB',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'YourPasswordHere' // THAY ĐỔI MẬT KHẨU CỦA BẠN
    }
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableKeepAlive: true,
    keepAliveInitialDelayMs: 0,
    connectionTimeout: 15000,
    requestTimeout: 30000
  },
  port: 1433
};

export let pool: mssql.ConnectionPool;

export async function initializeDatabase() {
  try {
    pool = new mssql.ConnectionPool(sqlConfig);
    await pool.connect();
    console.log('✓ Kết nối SQL Server thành công');
    return pool;
  } catch (error) {
    console.error('✗ Lỗi kết nối SQL Server:', error);
    throw error;
  }
}

export function getPool() {
  if (!pool) {
    throw new Error('Database pool chưa được khởi tạo');
  }
  return pool;
}
