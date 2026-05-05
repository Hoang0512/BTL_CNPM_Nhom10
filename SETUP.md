# 🚀 Hướng dẫn Thiết lập SQL Server Integration - Comic Reader App

## 📋 Mục Lục
1. [Yêu cầu trước khi bắt đầu](#yêu-cầu-trước-khi-bắt-đầu)
2. [Bước 1: Cấu hình SQL Server](#bước-1-cấu-hình-sql-server)
3. [Bước 2: Tạo Database](#bước-2-tạo-database)
4. [Bước 3: Cài đặt Backend](#bước-3-cài-đặt-backend)
5. [Bước 4: Chạy ứng dụng](#bước-4-chạy-ứng-dụng)
6. [Bước 5: Sử dụng SQL Command Executor](#bước-5-sử-dụng-sql-command-executor)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Yêu cầu Trước khi Bắt Đầu

### Phần mềm cần cài đặt:
- ✓ SQL Server (DESKTOP-4QKIQRM\MSSQLSERVER02)
- ✓ SQL Server Management Studio (SSMS)
- ✓ Node.js (v16 trở lên)
- ✓ npm (đi kèm Node.js)
- ✓ Visual Studio Code (optional)

### Thông tin kết nối:
```
Server: DESKTOP-4QKIQRM\MSSQLSERVER02
Authentication: SQL Server Authentication
Username: sa
Password: [Mật khẩu của bạn]
Port: 1433
```

---

## Bước 1: Cấu hình SQL Server

### 1.1 Kiểm tra SQL Server đang chạy
1. Mở **Services** (Services.msc)
2. Tìm "SQL Server (MSSQLSERVER02)" hoặc "MSSQLSERVER"
3. Kiểm tra trạng thái là **Running**

### 1.2 Cài đặt SQL Server Management Studio (SSMS)
1. Tải SSMS từ: https://aka.ms/ssmsfullsetup
2. Cài đặt với các tùy chọn mặc định

### 1.3 Kết nối SSMS với Server
1. Mở SQL Server Management Studio
2. **Server name:** `DESKTOP-4QKIQRM\MSSQLSERVER02`
3. **Authentication:** SQL Server Authentication
4. **Login:** `sa`
5. **Password:** [Mật khẩu của bạn]
6. ✓ **Connect**

---

## Bước 2: Tạo Database

### 2.1 Chạy SQL Schema Script
1. Mở SQL Server Management Studio (SSMS)
2. Kết nối với server (xem Bước 1.3)
3. **File** → **Open** → **File...**
4. Chọn file: `server/schema.sql`
5. Nhấn **Execute** (hoặc Ctrl+Shift+E)
6. Chờ cho đến khi thấy thông báo: `✓ Schema ComicDB đã được tạo thành công!`

### 2.2 Kiểm tra Database
```sql
-- Chạy query này trong SSMS
SELECT * FROM sys.databases WHERE name = 'ComicDB';
```

Kết quả:
```
name: ComicDB
state: 0 (ONLINE)
```

---

## Bước 3: Cài đặt Backend

### 3.1 Cài đặt NPM Packages
```bash
# Mở Terminal/PowerShell tại thư mục project
# Windows PowerShell:
cd "d:\bl - Copy"
npm install
```

Nếu chưa cài đặt Node.js:
- Tải từ: https://nodejs.org/
- Cài đặt LTS version
- Khởi động lại Terminal sau khi cài đặt

### 3.2 Tạo file .env
1. Copy file `server/.env.example` thành `server/.env`
2. Cập nhật thông tin:
```env
PORT=5000
MSSQL_SERVER=DESKTOP-4QKIQRM\MSSQLSERVER02
MSSQL_DATABASE=ComicDB
MSSQL_USERNAME=sa
MSSQL_PASSWORD=YourActualPassword    # ← THAY BẰNG MẬT KHẨU CỦA BẠN
MSSQL_PORT=1433
MSSQL_ENCRYPT=true
MSSQL_TRUST_CERT=true
```

### 3.3 Kiểm tra cài đặt
```bash
# Kiểm tra Node.js
node --version        # v16.0.0 hoặc cao hơn

# Kiểm tra npm
npm --version         # 7.0.0 hoặc cao hơn
```

---

## Bước 4: Chạy Ứng dụng

### 4.1 Terminal 1 - Chạy Backend Server
```bash
# PowerShell/CMD tại thư mục "d:\bl - Copy"
ts-node server/index.ts

# Hoặc nếu muốn auto-reload
npx nodemon --exec ts-node server/index.ts
```

Kết quả khi chạy thành công:
```
=== COMIC API SERVER ===
✓ Kết nối SQL Server thành công
Server khởi động trên cổng: 5000
Cơ sở dữ liệu: ComicDB
Server: DESKTOP-4QKIQRM\MSSQLSERVER02
✓ Server đang chạy tại http://localhost:5000
```

### 4.2 Terminal 2 - Chạy Frontend
```bash
# Terminal mới (mở Terminal khác)
# Tại thư mục "d:\bl - Copy"
npm run dev

# Hoặc chạy cả hai cùng lúc (cần cài concurrently)
npm install -g concurrently
npm run dev:all
```

Kết quả khi chạy thành công:
```
  VITE v7.2.4  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### 4.3 Truy cập ứng dụng
1. Mở browser
2. Truy cập: **http://localhost:5173**
3. Nên thấy Comic Reader app

---

## Bước 5: Sử dụng SQL Command Executor

### 5.1 Đăng nhập Admin
1. Nhấn **👤 Đăng nhập**
2. **Username:** `admin`
3. **Password:** `admin`
4. **✓ Đăng nhập**

### 5.2 Truy cập Admin Panel
1. Nhấn **⚙️ Admin** trên menu
2. Scroll xuống tìm **📊 SQL Command Executor**

### 5.3 Sử dụng Executor
#### Tab: ⚡ Executor
- **Nhập câu lệnh SQL** trong text area
- Nhấn **▶️ Thực thi**
- Xem kết quả bên dưới

#### Tab: 📋 Logs
- Xem lịch sử tất cả lệnh SQL đã chạy
- Xem status (success/error)
- Nhấn **🔄 Tải lại Logs** để cập nhật

#### Tab: 📝 Variables
- Xem các biến SQL quan trọng
- Xem ví dụ query
- Nhấn **📋 Sao chép vào Executor** để sử dụng

---

## 📊 Ví dụ Queries Thường Dùng

### 1. Lấy tất cả truyện
```sql
SELECT * FROM Comics ORDER BY createdAt DESC;
```

### 2. Tạo truyện mới
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-' + CAST(NEWID() AS NVARCHAR(36));

INSERT INTO Comics (id, title, author, description, status, coverImage, views, rating, ratingCount)
VALUES (
  @ComicId,
  'Tiêu đề Truyện',
  'Tác Giả',
  'Mô tả',
  'ongoing',
  'https://picsum.photos/seed/comic1/400/600',
  0, 0, 0
);

SELECT @ComicId AS NewComicId;
```

### 3. Thêm chương
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ComicId NVARCHAR(50) = 'comic-123'; -- Thay ID thực tế

INSERT INTO Chapters (id, comicId, number, title)
VALUES (@ChapterId, @ComicId, 1, 'Chương 1');

SELECT @ChapterId AS NewChapterId;
```

### 4. Thêm trang hình ảnh
```sql
DECLARE @PageId NVARCHAR(50) = 'page-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123'; -- Thay ID thực tế
DECLARE @ComicId NVARCHAR(50) = 'comic-123'; -- Thay ID thực tế

INSERT INTO Pages (id, chapterId, comicId, pageNumber, imageUrl, fileSize)
VALUES (@PageId, @ChapterId, @ComicId, 1, 'https://picsum.photos/800/1200', 102400);

SELECT @PageId AS NewPageId;
```

### 5. Lấy danh sách truyện hot
```sql
SELECT TOP 10 * FROM Comics WHERE isHot = 1 ORDER BY views DESC;
```

### 6. Cập nhật truyện
```sql
UPDATE Comics
SET rating = 4.8, ratingCount = 1500, views = 50000
WHERE id = 'comic-123';
```

### 7. Xóa chương (trang sẽ bị xóa tự động)
```sql
DELETE FROM Chapters WHERE id = 'chapter-123';
```

---

## 🔌 API Endpoints

### Backend Server: http://localhost:5000

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/comics` | Lấy danh sách truyện |
| GET | `/api/comics/{id}` | Lấy chi tiết truyện + chapters + pages |
| POST | `/api/comics` | Tạo truyện mới |
| POST | `/api/chapters` | Tạo chương mới |
| POST | `/api/pages` | Thêm trang hình ảnh |
| GET | `/api/chapters/{chapterId}/pages` | Lấy trang của chương |
| POST | `/api/sql/execute` | Thực thi SQL (Admin only) |
| GET | `/api/sql/logs` | Lấy SQL logs |
| GET | `/api/sql/config` | Lấy config SQL |
| GET | `/api/health` | Health check |

### Test API từ Terminal
```bash
# Lấy tất cả truyện
curl http://localhost:5000/api/comics

# Health check
curl http://localhost:5000/api/health
```

---

## 🐛 Troubleshooting

### ❌ Lỗi 1: "Cannot connect to server"
```
Error: Cannot connect to DESKTOP-4QKIQRM\MSSQLSERVER02
```

**Giải pháp:**
1. Kiểm tra SQL Server đang chạy (Services.msc)
2. Kiểm tra server name chính xác
3. Kiểm tra mật khẩu trong `.env`
4. Test connection từ SSMS

### ❌ Lỗi 2: "Database not found"
```
Error: Database 'ComicDB' not found
```

**Giải pháp:**
1. Chạy lại file `server/schema.sql` trong SSMS
2. Kiểm tra database được tạo: 
   ```sql
   SELECT * FROM sys.databases WHERE name = 'ComicDB';
   ```

### ❌ Lỗi 3: "Port 5000 already in use"
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Giải pháp:**
```bash
# Option 1: Sử dụng port khác
set PORT=5001
ts-node server/index.ts

# Option 2: Tìm process sử dụng port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ Lỗi 4: "Cannot find module 'ts-node'"
```
Error: Cannot find module 'ts-node'
```

**Giải pháp:**
```bash
npm install -g ts-node
npm install -g typescript
```

### ❌ Lỗi 5: "Frontend không kết nối được Backend"
```
Failed to fetch http://localhost:5000/api/sql/config
```

**Giải pháp:**
1. Kiểm tra backend đang chạy
2. Kiểm tra port 5000 có mở không
3. Kiểm tra browser console (F12) có CORS error không

### ✓ Lỗi 6: "CORS Error"
```
Access to XMLHttpRequest blocked by CORS policy
```

**Giải pháp:**
- Backend đã có CORS enabled (xem file `server/index.ts` line: `app.use(cors());`)
- Kiểm tra backend có chạy không
- Restart backend server

---

## 📂 Cấu trúc Thư Mục

```
d:\bl - Copy\
├── server/
│   ├── config.ts           # SQL Server config
│   ├── schema.sql          # Database schema
│   ├── index.ts            # Backend server
│   ├── .env.example        # Environment example
│   └── .env                # Environment (tạo từ .env.example)
├── src/
│   ├── components/
│   │   └── SQLCommandExecutor.tsx    # SQL executor UI
│   ├── data/
│   ├── App.tsx             # Main app (đã cập nhật)
│   ├── types.ts
│   └── ...
├── SQL_INTEGRATION_GUIDE.md    # Chi tiết SQL integration
├── SETUP.md                    # File này
├── package.json            # (đã cập nhật với server:dev script)
├── vite.config.ts
└── ...
```

---

## 💡 Tips & Tricks

### 1. Auto-reload cho Backend
```bash
npx nodemon --exec ts-node server/index.ts
```

### 2. Chạy cả Frontend + Backend cùng lúc
```bash
npm run dev:all
```

### 3. Debug SQL Query
- Sử dụng SQL command executor
- Xem logs để kiểm tra lỗi
- Test lệnh trước ở SSMS

### 4. Backup Database
```sql
-- Trong SSMS
BACKUP DATABASE ComicDB 
TO DISK = 'D:\backup\ComicDB.bak'
```

### 5. Restore Database
```sql
-- Trong SSMS
RESTORE DATABASE ComicDB 
FROM DISK = 'D:\backup\ComicDB.bak'
```

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra file `SQL_INTEGRATION_GUIDE.md`
2. Kiểm tra terminal logs
3. Sử dụng tab **📋 Logs** trong SQL Executor
4. Test connection từ SSMS

---

## ✅ Checklist Hoàn thành

- [ ] SQL Server đang chạy
- [ ] Database `ComicDB` được tạo
- [ ] File `.env` được cập nhật đúng password
- [ ] NPM packages được cài đặt (`npm install`)
- [ ] Backend server chạy thành công (port 5000)
- [ ] Frontend chạy thành công (port 5173)
- [ ] Đăng nhập admin thành công (admin/admin)
- [ ] SQL Command Executor hiển thị
- [ ] Thực thi test query thành công

Sau khi hoàn thành tất cả các điểm, bạn đã sẵn sàng sử dụng SQL integration! 🎉

---

**Created: 2025-05-05**
**Last Updated: 2025-05-05**
