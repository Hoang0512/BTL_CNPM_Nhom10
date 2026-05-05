# 📝 SQL Variables & Common Queries Reference

## 🔧 SQL Variables

### Comic Variables
```sql
-- Biến Comic cơ bản
DECLARE @ComicId NVARCHAR(50) = 'comic-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ComicTitle NVARCHAR(200) = 'Tiêu đề Truyện';
DECLARE @ComicAuthor NVARCHAR(100) = 'Tác Giả';
DECLARE @ComicDescription NVARCHAR(MAX) = 'Mô tả chi tiết về truyện';
DECLARE @ComicStatus NVARCHAR(20) = 'ongoing'; -- 'ongoing' hoặc 'completed'
DECLARE @CoverImageUrl NVARCHAR(500) = 'https://picsum.photos/seed/comic1/400/600';
DECLARE @ComicViews INT = 0;
DECLARE @ComicRating FLOAT = 0;
DECLARE @ComicRatingCount INT = 0;
DECLARE @ComicIsHot BIT = 1; -- 1 = true, 0 = false
DECLARE @ComicIsNew BIT = 1;
DECLARE @ComicCreatedAt DATETIME = GETDATE();
```

### Chapter Variables
```sql
-- Biến Chapter
DECLARE @ChapterId NVARCHAR(50) = 'chapter-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ComicId NVARCHAR(50) = 'comic-123'; -- Reference to Comic
DECLARE @ChapterNumber INT = 1;
DECLARE @ChapterTitle NVARCHAR(200) = 'Chương 1: Khởi Đầu';
DECLARE @ChapterCreatedAt DATETIME = GETDATE();
```

### Page (Image) Variables
```sql
-- Biến Page/Hình ảnh
DECLARE @PageId NVARCHAR(50) = 'page-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123'; -- Reference to Chapter
DECLARE @ComicId NVARCHAR(50) = 'comic-123'; -- Reference to Comic
DECLARE @PageNumber INT = 1;
DECLARE @ImageUrl NVARCHAR(500) = 'https://picsum.photos/800/1200';
DECLARE @FileSize INT = 102400; -- Kích thước file (bytes)
DECLARE @PageUploadedAt DATETIME = GETDATE();
```

### User Variables
```sql
-- Biến User
DECLARE @UserId NVARCHAR(50) = 'user-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @Username NVARCHAR(100) = 'username';
DECLARE @Password NVARCHAR(255) = 'password';
DECLARE @IsAdmin BIT = 0; -- 1 = admin, 0 = user
DECLARE @UserCreatedAt DATETIME = GETDATE();
```

### Comment Variables
```sql
-- Biến Comment
DECLARE @CommentId NVARCHAR(50) = 'comment-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ComicId NVARCHAR(50) = 'comic-123';
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123'; -- NULL nếu comment truyện
DECLARE @UserId NVARCHAR(50) = 'user-123';
DECLARE @Username NVARCHAR(100) = 'username';
DECLARE @CommentContent NVARCHAR(MAX) = 'Nội dung bình luận';
DECLARE @CommentCreatedAt DATETIME = GETDATE();
```

### Utility Variables
```sql
-- Biến tiện ích
DECLARE @CurrentDate DATETIME = GETDATE();
DECLARE @LogId NVARCHAR(50) = 'log-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @Status NVARCHAR(20) = 'success'; -- 'success' hoặc 'error'
```

---

## 📋 Common Queries

### 1️⃣ Comics Queries

#### 1.1 Lấy tất cả truyện
```sql
SELECT * FROM Comics ORDER BY createdAt DESC;
```

#### 1.2 Lấy truyện theo ID
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';
SELECT * FROM Comics WHERE id = @ComicId;
```

#### 1.3 Tạo truyện mới
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-' + CAST(NEWID() AS NVARCHAR(36));

INSERT INTO Comics (id, title, author, description, status, coverImage, views, rating, ratingCount, isHot, isNew, createdAt, updatedAt)
VALUES (
  @ComicId,
  'Tiêu đề Truyện',
  'Tác Giả',
  'Mô tả chi tiết',
  'ongoing',
  'https://picsum.photos/seed/comic1/400/600',
  0, 0, 0,
  1, 1,
  GETDATE(), GETDATE()
);

SELECT @ComicId AS NewComicId;
```

#### 1.4 Cập nhật truyện
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

UPDATE Comics
SET 
  title = 'Tiêu đề mới',
  description = 'Mô tả mới',
  rating = 4.8,
  ratingCount = 1500,
  views = 50000,
  isHot = 1,
  updatedAt = GETDATE()
WHERE id = @ComicId;
```

#### 1.5 Xóa truyện (xóa tất cả liên quan)
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';
DELETE FROM Comics WHERE id = @ComicId;
-- Chapters, Pages, Comments, Favorites, Ratings sẽ xóa tự động
```

#### 1.6 Lấy truyện hot
```sql
SELECT TOP 10 * FROM Comics 
WHERE isHot = 1 
ORDER BY views DESC;
```

#### 1.7 Lấy truyện mới
```sql
SELECT TOP 10 * FROM Comics 
WHERE isNew = 1 
ORDER BY createdAt DESC;
```

#### 1.8 Lấy truyện đang phát hành
```sql
SELECT * FROM Comics 
WHERE status = 'ongoing' 
ORDER BY updatedAt DESC;
```

#### 1.9 Lấy truyện hoàn thành
```sql
SELECT * FROM Comics 
WHERE status = 'completed' 
ORDER BY createdAt DESC;
```

#### 1.10 Lấy top 10 truyện theo rating
```sql
SELECT TOP 10 * FROM Comics 
ORDER BY rating DESC;
```

---

### 2️⃣ Chapter Queries

#### 2.1 Lấy tất cả chương của truyện
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

SELECT * FROM Chapters 
WHERE comicId = @ComicId 
ORDER BY number DESC;
```

#### 2.2 Tạo chương mới
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ComicId NVARCHAR(50) = 'comic-123';
DECLARE @MaxNumber INT;

-- Lấy số chương lớn nhất + 1
SELECT @MaxNumber = ISNULL(MAX(number), 0) 
FROM Chapters 
WHERE comicId = @ComicId;

INSERT INTO Chapters (id, comicId, number, title, createdAt)
VALUES (
  @ChapterId,
  @ComicId,
  @MaxNumber + 1,
  'Chương ' + CAST(@MaxNumber + 1 AS NVARCHAR(10)) + ': Tiêu đề',
  GETDATE()
);

SELECT @ChapterId AS NewChapterId;
```

#### 2.3 Cập nhật chương
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123';

UPDATE Chapters
SET title = 'Tiêu đề chương mới'
WHERE id = @ChapterId;
```

#### 2.4 Xóa chương (Pages sẽ xóa tự động)
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123';
DELETE FROM Chapters WHERE id = @ChapterId;
```

#### 2.5 Lấy chương mới nhất của truyện
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

SELECT TOP 1 * FROM Chapters 
WHERE comicId = @ComicId 
ORDER BY number DESC;
```

---

### 3️⃣ Page (Image) Queries

#### 3.1 Lấy tất cả trang của chương
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123';

SELECT * FROM Pages 
WHERE chapterId = @ChapterId 
ORDER BY pageNumber ASC;
```

#### 3.2 Thêm trang hình ảnh
```sql
DECLARE @PageId NVARCHAR(50) = 'page-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123';
DECLARE @ComicId NVARCHAR(50) = 'comic-123';
DECLARE @PageNumber INT = 1;

INSERT INTO Pages (id, chapterId, comicId, pageNumber, imageUrl, fileSize, uploadedAt)
VALUES (
  @PageId,
  @ChapterId,
  @ComicId,
  @PageNumber,
  'https://picsum.photos/800/1200',
  102400,
  GETDATE()
);

SELECT @PageId AS NewPageId;
```

#### 3.3 Cập nhật URL hình ảnh
```sql
DECLARE @PageId NVARCHAR(50) = 'page-123';

UPDATE Pages
SET imageUrl = 'https://new-image-url.jpg'
WHERE id = @PageId;
```

#### 3.4 Xóa trang
```sql
DECLARE @PageId NVARCHAR(50) = 'page-123';
DELETE FROM Pages WHERE id = @PageId;
```

#### 3.5 Lấy số trang của chương
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123';

SELECT COUNT(*) AS PageCount FROM Pages 
WHERE chapterId = @ChapterId;
```

#### 3.6 Lấy tổng dung lượng ảnh của chương
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123';

SELECT 
  SUM(fileSize) AS TotalSize,
  COUNT(*) AS PageCount,
  AVG(fileSize) AS AvgFileSize
FROM Pages 
WHERE chapterId = @ChapterId;
```

---

### 4️⃣ User & Authentication Queries

#### 4.1 Lấy tất cả người dùng
```sql
SELECT * FROM Users ORDER BY createdAt DESC;
```

#### 4.2 Tạo người dùng mới
```sql
DECLARE @UserId NVARCHAR(50) = 'user-' + CAST(NEWID() AS NVARCHAR(36));

INSERT INTO Users (id, username, password, isAdmin, createdAt, updatedAt)
VALUES (
  @UserId,
  'newuser',
  'password123',
  0,
  GETDATE(),
  GETDATE()
);

SELECT @UserId AS NewUserId;
```

#### 4.3 Kiểm tra người dùng tồn tại
```sql
SELECT * FROM Users WHERE username = 'admin';
```

#### 4.4 Cập nhật mật khẩu
```sql
DECLARE @UserId NVARCHAR(50) = 'user-123';

UPDATE Users
SET password = 'newpassword123'
WHERE id = @UserId;
```

#### 4.5 Cấp quyền admin
```sql
DECLARE @UserId NVARCHAR(50) = 'user-123';

UPDATE Users
SET isAdmin = 1
WHERE id = @UserId;
```

#### 4.6 Xóa tài khoản (xóa tất cả liên quan)
```sql
DECLARE @UserId NVARCHAR(50) = 'user-123';
DELETE FROM Users WHERE id = @UserId;
-- Favorites, Comments, Ratings, ReadingHistory sẽ xóa tự động
```

---

### 5️⃣ Favorites Queries

#### 5.1 Lấy danh sách yêu thích của người dùng
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

#### 5.2 Thêm vào danh sách yêu thích
```sql
DECLARE @UserId NVARCHAR(50) = 'user-123';
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

INSERT INTO Favorites (userId, comicId, addedAt)
VALUES (@UserId, @ComicId, GETDATE());
```

#### 5.3 Xóa khỏi danh sách yêu thích
```sql
DECLARE @UserId NVARCHAR(50) = 'user-123';
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

DELETE FROM Favorites 
WHERE userId = @UserId AND comicId = @ComicId;
```

#### 5.4 Kiểm tra đã yêu thích chưa
```sql
DECLARE @UserId NVARCHAR(50) = 'user-123';
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

SELECT COUNT(*) AS IsFavorited FROM Favorites 
WHERE userId = @UserId AND comicId = @ComicId;
```

#### 5.5 Lấy truyện được yêu thích nhiều nhất
```sql
SELECT TOP 10 
  Comics.title,
  COUNT(Favorites.userId) AS FavoriteCount
FROM Comics
LEFT JOIN Favorites ON Comics.id = Favorites.comicId
GROUP BY Comics.id, Comics.title
ORDER BY FavoriteCount DESC;
```

---

### 6️⃣ Comments Queries

#### 6.1 Lấy bình luận của truyện
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

SELECT * FROM Comments 
WHERE comicId = @ComicId 
ORDER BY createdAt DESC;
```

#### 6.2 Lấy bình luận của chương
```sql
DECLARE @ChapterId NVARCHAR(50) = 'chapter-123';

SELECT * FROM Comments 
WHERE chapterId = @ChapterId 
ORDER BY createdAt DESC;
```

#### 6.3 Thêm bình luận
```sql
DECLARE @CommentId NVARCHAR(50) = 'comment-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ComicId NVARCHAR(50) = 'comic-123';
DECLARE @UserId NVARCHAR(50) = 'user-123';

INSERT INTO Comments (id, comicId, chapterId, userId, username, content, createdAt, updatedAt)
VALUES (
  @CommentId,
  @ComicId,
  NULL,
  @UserId,
  'username',
  'Nội dung bình luận',
  GETDATE(),
  GETDATE()
);
```

#### 6.4 Cập nhật bình luận
```sql
DECLARE @CommentId NVARCHAR(50) = 'comment-123';

UPDATE Comments
SET content = 'Nội dung sửa đổi', updatedAt = GETDATE()
WHERE id = @CommentId;
```

#### 6.5 Xóa bình luận
```sql
DECLARE @CommentId NVARCHAR(50) = 'comment-123';
DELETE FROM Comments WHERE id = @CommentId;
```

---

### 7️⃣ Statistics Queries

#### 7.1 Thống kê lượt xem theo truyện
```sql
SELECT 
  title,
  views,
  rating,
  ratingCount,
  status,
  createdAt
FROM Comics
ORDER BY views DESC;
```

#### 7.2 Thống kê bình luận
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

#### 7.3 Thống kê truyện theo tháng
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

#### 7.4 Lấy truyện có nhiều chương nhất
```sql
SELECT TOP 10
  Comics.title,
  COUNT(Chapters.id) AS ChapterCount,
  SUM(SELECT COUNT(*) FROM Pages WHERE Pages.comicId = Comics.id) AS PageCount
FROM Comics
LEFT JOIN Chapters ON Comics.id = Chapters.comicId
GROUP BY Comics.id, Comics.title
ORDER BY ChapterCount DESC;
```

#### 7.5 Lấy dung lượng ảnh tổng cộng
```sql
SELECT 
  SUM(fileSize) AS TotalSize,
  COUNT(*) AS TotalPages,
  AVG(fileSize) AS AvgFileSize
FROM Pages;
```

---

## 🎯 Quick Copy-Paste Templates

### Template 1: Tạo Truyện Hoàn Chỉnh
```sql
-- Tạo truyện
DECLARE @ComicId NVARCHAR(50) = 'comic-' + CAST(NEWID() AS NVARCHAR(36));
INSERT INTO Comics VALUES (@ComicId, 'Tiêu đề', 'Tác Giả', 'Mô tả', 'ongoing', 'https://picsum.photos/400/600', 0, 0, 0, 1, 1, GETDATE(), GETDATE());

-- Tạo chương
DECLARE @ChapterId NVARCHAR(50) = 'chapter-' + CAST(NEWID() AS NVARCHAR(36));
INSERT INTO Chapters VALUES (@ChapterId, @ComicId, 1, 'Chương 1', GETDATE());

-- Thêm trang
DECLARE @PageId NVARCHAR(50) = 'page-' + CAST(NEWID() AS NVARCHAR(36));
INSERT INTO Pages VALUES (@PageId, @ChapterId, @ComicId, 1, 'https://picsum.photos/800/1200', 102400, GETDATE());

SELECT @ComicId, @ChapterId, @PageId;
```

### Template 2: Cập Nhật Tất Cả Thông Tin
```sql
DECLARE @ComicId NVARCHAR(50) = 'comic-123';

UPDATE Comics
SET 
  title = 'Tiêu đề mới',
  description = 'Mô tả mới',
  rating = 4.8,
  ratingCount = 1000,
  views = 50000,
  isHot = 1,
  updatedAt = GETDATE()
WHERE id = @ComicId;

SELECT * FROM Comics WHERE id = @ComicId;
```

### Template 3: Xóa Tất Cả Dữ Liệu
```sql
-- ⚠️ CẢNH BÁO: Chỉ chạy khi muốn xóa tất cả!
DELETE FROM SQLExecutionLog;
DELETE FROM Comments;
DELETE FROM Ratings;
DELETE FROM ReadingHistory;
DELETE FROM Favorites;
DELETE FROM Pages;
DELETE FROM Chapters;
DELETE FROM ComicGenres;
DELETE FROM Comics;
DELETE FROM Users;
DELETE FROM Genres;

-- Tạo lại admin user
INSERT INTO Users VALUES ('admin-001', 'admin', 'admin', 1, GETDATE(), GETDATE());
```

---

**Last Updated: 2025-05-05**
