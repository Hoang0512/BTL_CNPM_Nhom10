# Comic Reader - SQL Server Integration Guide

## 📋 Mục Lục
1. [Cấu hình SQL Server](#cấu-hình-sql-server)
2. [Cài đặt Backend](#cài-đặt-backend)
3. [Biến SQL quan trọng](#biến-sql-quan-trọng)
4. [API Endpoints](#api-endpoints)
5. [Ví dụ Query SQL](#ví-dụ-query-sql)

---

## 🗄️ Cấu hình SQL Server

### Thông tin kết nối
```
Server: DESKTOP-4QKIQRM\MSSQLSERVER02
Authentication: SQL Server Authentication
Login: sa
Password: [Your Password]
Port: 1433
Encryption: Optional
Trust server certificate: ✓
```

### Bước 1: Chuẩn bị Database
1. Mở SQL Server Management Studio
2. Kết nối với server: `DESKTOP-4QKIQRM\MSSQLSERVER02`
3. Chạy file `server/schema.sql` để tạo database

```sql
-- Copy toàn bộ nội dung từ server/schema.sql
-- Và chạy trong Query Editor
```

### Bước 2: Cập nhật .env
1. Copy `server/.env.example` thành `server/.env`
2. Cập nhật password:
```
MSSQL_PASSWORD=YourActualPassword
```

---

## 🚀 Cài đặt Backend

### Cài đặt Dependencies
```bash
# Từ thư mục project
npm install

# Nếu chưa có typescript compiler global
npm install -g ts-node
```

### Chạy Backend Server
```bash
# Option 1: Sử dụng ts-node (development)
ts-node server/index.ts

# Option 2: Build và chạy (production)
npm run build
node dist/server/index.ts

# Hoặc sử dụng nodemon để auto-reload
npx nodemon --exec ts-node server/index.ts
```

Server sẽ chạy tại: `http://localhost:5000`

---

## 📊 Biến SQL Quan Trọng

### Comic Variables
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ComicTitle NVARCHAR(200) = 'Tên Truyện';
DECLARE @ComicAuthor NVARCHAR(100) = 'Tác Giả';
DECLARE @ComicDescription NVARCHAR(MAX) = 'Mô Tả';
DECLARE @ComicStatus NVARCHAR(20) = 'ongoing'; -- ongoing | completed
DECLARE @CoverImageUrl NVARCHAR(500) = 'https://...';
```

### Chapter Variables
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ChapterNumber INT = 1;
DECLARE @ChapterTitle NVARCHAR(200) = 'Chương 1: Khởi Đầu';
DECLARE @ComicId NVARCHAR(50) = '...'; -- Reference to Comic
```

### Page Variables (Hình ảnh)
```sql
DECLARE @PageId NVARCHAR(50) = 'page-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @PageNumber INT = 1;
DECLARE @ImageUrl NVARCHAR(500) = 'https://picsum.photos/800/1200';
DECLARE @FileSize INT = 102400;
DECLARE @ChapterId NVARCHAR(50) = '...'; -- Reference to Chapter
```

### User Variables
```sql
DECLARE @UserId NVARCHAR(50) = 'user-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @Username NVARCHAR(100) = 'username';
DECLARE @Password NVARCHAR(255) = 'password';
DECLARE @IsAdmin BIT = 0;
```

---

## 🔌 API Endpoints

### 1. Comics - Lấy danh sách
```http
GET /api/comics
Response: [{ id, title, author, status, views, rating, ... }]
```

### 2. Comic - Lấy chi tiết (kèm Chapters + Pages)
```http
GET /api/comics/{id}
Response: { 
  id, title, author, chapters: [
    { id, number, title, pages: [{ id, pageNumber, imageUrl, ... }] }
  ]
}
```

### 3. Comics - Tạo mới
```http
POST /api/comics
Body: {
  id: string,
  title: string,
  author: string,
  description: string,
  status: 'ongoing' | 'completed',
  coverImage: string
}
```

### 4. Chapters - Tạo mới
```http
POST /api/chapters
Body: {
  id: string,
  comicId: string,
  number: number,
  title: string
}
```

### 5. Pages - Thêm trang (hình ảnh)
```http
POST /api/pages
Body: {
  id: string,
  chapterId: string,
  comicId: string,
  pageNumber: number,
  imageUrl: string,
  fileSize?: number
}
```

### 6. Pages - Lấy tất cả trang của Chapter
```http
GET /api/chapters/{chapterId}/pages
Response: [{ id, pageNumber, imageUrl, fileSize, uploadedAt, ... }]
```

### 7. SQL - Thực thi lệnh (Admin Only)
```http
POST /api/sql/execute
Body: {
  query: string,
  userId?: string
}
Response: {
  success: boolean,
  message: string,
  rowsAffected?: number[],
  recordset?: any[],
  error?: string
}
```

### 8. SQL - Lấy Logs
```http
GET /api/sql/logs
Response: [{ id, userId, query, status, executedAt, result, errorMessage, ... }]
```

### 9. SQL - Lấy cấu hình
```http
GET /api/sql/config
Response: { server, database, port, userName, encryption, ... }
```

### 10. Health Check
```http
GET /api/health
Response: { status: 'OK', server: 'Comic API Server running' }
```

---

## 📝 Ví dụ Query SQL

### 1. Lấy tất cả truyện tranh
```sql
SELECT * FROM Comics ORDER BY createdAt DESC;
```

### 2. Lấy truyện đang hot
```sql
SELECT * FROM Comics WHERE isHot = 1 ORDER BY views DESC;
```

### 3. Lấy truyện tranh có rating cao nhất
```sql
SELECT TOP 10 * FROM Comics ORDER BY rating DESC;
```

### 4. Tạo truyện tranh mới
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-' + CAST(NEWID() AS NVARCHAR(36));

INSERT INTO Comics (id, title, author, description, status, coverImage, views, rating, ratingCount, isHot, isNew, createdAt, updatedAt)
VALUES (
  @ComicId,
  'Tiêu đề Truyện',
  'Tác Giả',
  'Mô tả truyện tranh',
  'ongoing',
  'https://picsum.photos/seed/comic1/400/600',
  0,
  0,
  0,
  1,
  1,
  GETDATE(),
  GETDATE()
);

SELECT @ComicId AS NewComicId;
```

### 5. Thêm chương mới vào truyện
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123'; -- ID của truyện
DECLARE @ChapterId NVARCHAR(50) = 'chapter-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @MaxChapterNumber INT;

SELECT @MaxChapterNumber = ISNULL(MAX(number), 0) FROM Chapters WHERE comicId = @ComicId;

INSERT INTO Chapters (id, comicId, number, title, createdAt)
VALUES (
  @ChapterId,
  @ComicId,
  @MaxChapterNumber + 1,
  'Chương ' + CAST(@MaxChapterNumber + 1 AS NVARCHAR(10)) + ': Tiêu đề',
  GETDATE()
);

SELECT @ChapterId AS NewChapterId;
```

### 6. Thêm trang hình ảnh vào chương
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123'; -- ID của chương
DECLARE @ComicId NVARCHAR(50) = 'comic-123'; -- ID của truyện
DECLARE @PageId NVARCHAR(50) = 'page-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @PageNumber INT = 1;

INSERT INTO Pages (id, chapterId, comicId, pageNumber, imageUrl, fileSize, uploadedAt)
VALUES (
  @PageId,
  @ChapterId,
  @ComicId,
  @PageNumber,
  'https://picsum.photos/seed/page1/800/1200',
  102400,
  GETDATE()
);

SELECT @PageId AS NewPageId;
```

### 7. Lấy tất cả chương của một truyện
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

SELECT * FROM Chapters 
WHERE comicId = @ComicId 
ORDER BY number DESC;
```

### 8. Lấy tất cả trang của một chương
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123';

SELECT * FROM Pages 
WHERE chapterId = @ChapterId 
ORDER BY pageNumber ASC;
```

### 9. Cập nhật thông tin truyện
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

UPDATE Comics
SET 
  title = 'Tiêu đề mới',
  description = 'Mô tả mới',
  rating = 4.8,
  ratingCount = 1000,
  isHot = 1,
  updatedAt = GETDATE()
WHERE id = @ComicId;
```

### 10. Thống kê lượt xem theo tháng
```sql
SELECT 
  MONTH(createdAt) AS Month,
  YEAR(createdAt) AS Year,
  COUNT(*) AS TotalComics,
  SUM(views) AS TotalViews,
  AVG(rating) AS AvgRating
FROM Comics
GROUP BY YEAR(createdAt), MONTH(createdAt)
ORDER BY Year DESC, Month DESC;
```

### 11. Lấy yêu thích của một người dùng
```sql
DECLARE @UserId NVARCHAR(50) = 'user-123';

SELECT 
  Comics.*,
  Favorites.addedAt
FROM Comics
INNER JOIN Favorites ON Comics.id = Favorites.comicId
WHERE Favorites.userId = @UserId
ORDER BY Favorites.addedAt DESC;
```

### 12. Thống kê bình luận theo truyện
```sql
SELECT 
  Comics.title,
  COUNT(Comments.id) AS TotalComments,
  MAX(Comments.createdAt) AS LastCommentDate
FROM Comics
LEFT JOIN Comments ON Comics.id = Comments.comicId
GROUP BY Comics.id, Comics.title
ORDER BY TotalComments DESC;
```

### 13. Xóa chương (và tất cả trang liên quan)
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123';

-- Pages sẽ bị xóa tự động do CASCADE constraint
DELETE FROM Chapters WHERE id = @ChapterId;
```

### 14. Xóa truyện (và tất cả dữ liệu liên quan)
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

-- Tất cả Chapters, Pages, Comments, Favorites, Ratings sẽ bị xóa tự động
DELETE FROM Comics WHERE id = @ComicId;
```

### 15. Lấy top 10 truyện theo lượt xem
```sql
SELECT TOP 10
  id,
  title,
  author,
  views,
  rating,
  ratingCount,
  status,
  createdAt
FROM Comics
ORDER BY views DESC;
```

---

## 🎯 Sử dụng SQL Command Executor trong App

1. Đăng nhập với tài khoản admin (username: `admin`, password: `admin`)
2. Vào Admin Panel
3. Chọn tab "SQL Command Executor"
4. Sử dụng các tabs:
   - **⚡ Executor**: Nhập và thực thi lệnh SQL
   - **📋 Logs**: Xem lịch sử lệnh đã chạy
   - **📝 Variables**: Xem các biến và ví dụ query

---

## ⚠️ Lưu ý Quan Trọng

1. **Mật khẩu**: Thay đổi mật khẩu sa trong `server/.env`
2. **Bảo mật**: Chỉ admin mới có thể thực thi SQL
3. **Validation**: Server sẽ validate tất cả queries trước khi thực thi
4. **Logging**: Tất cả SQL queries đều được log lại

---

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to server"
- Kiểm tra SQL Server có đang chạy
- Kiểm tra server name đúng: `DESKTOP-4QKIQRM\MSSQLSERVER02`
- Kiểm tra username/password trong `.env`

### Lỗi: "Database not found"
- Chạy lại file `server/schema.sql`
- Kiểm tra database name là `ComicDB`

### Lỗi: "Port 5000 already in use"
- Thay đổi PORT trong `.env` hoặc terminal:
```bash
set PORT=5001
ts-node server/index.ts
```

---

## 📚 Tài liệu Thêm
- [MSSQL Documentation](https://learn.microsoft.com/sql/)
- [Express.js Docs](https://expressjs.com/)
- [TypeScript Docs](https://www.typescriptlang.org/)
