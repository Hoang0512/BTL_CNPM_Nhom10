-- =====================================================
-- SQL Server Schema cho Comic Reader Application
-- Database: ComicDB
-- =====================================================

-- 1. Tạo Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ComicDB')
BEGIN
    CREATE DATABASE ComicDB;
END
GO

USE ComicDB;
GO

-- 2. Bảng Users (Người dùng)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        id NVARCHAR(50) PRIMARY KEY,
        username NVARCHAR(100) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        isAdmin BIT NOT NULL DEFAULT 0,
        createdAt DATETIME NOT NULL DEFAULT GETDATE(),
        updatedAt DATETIME NOT NULL DEFAULT GETDATE()
    );
    CREATE NONCLUSTERED INDEX IX_Users_username ON Users(username);
END
GO

-- 3. Bảng Comics (Truyện tranh)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Comics')
BEGIN
    CREATE TABLE Comics (
        id NVARCHAR(50) PRIMARY KEY,
        title NVARCHAR(200) NOT NULL,
        author NVARCHAR(100) NOT NULL,
        description NVARCHAR(MAX),
        status NVARCHAR(20) NOT NULL CHECK (status IN ('ongoing', 'completed')),
        coverImage NVARCHAR(500),
        views INT NOT NULL DEFAULT 0,
        rating FLOAT NOT NULL DEFAULT 0,
        ratingCount INT NOT NULL DEFAULT 0,
        isHot BIT NOT NULL DEFAULT 0,
        isNew BIT NOT NULL DEFAULT 0,
        createdAt DATETIME NOT NULL DEFAULT GETDATE(),
        updatedAt DATETIME NOT NULL DEFAULT GETDATE()
    );
    CREATE NONCLUSTERED INDEX IX_Comics_status ON Comics(status);
    CREATE NONCLUSTERED INDEX IX_Comics_isHot ON Comics(isHot);
    CREATE NONCLUSTERED INDEX IX_Comics_createdAt ON Comics(createdAt DESC);
END
GO

-- 4. Bảng Genres (Thể loại)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Genres')
BEGIN
    CREATE TABLE Genres (
        id NVARCHAR(50) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL UNIQUE
    );
END
GO

-- 5. Bảng ComicGenres (Liên kết Comic - Thể loại)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ComicGenres')
BEGIN
    CREATE TABLE ComicGenres (
        comicId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Comics(id) ON DELETE CASCADE,
        genreId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Genres(id) ON DELETE CASCADE,
        PRIMARY KEY (comicId, genreId)
    );
END
GO

-- 6. Bảng Chapters (Chương)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Chapters')
BEGIN
    CREATE TABLE Chapters (
        id NVARCHAR(50) PRIMARY KEY,
        comicId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Comics(id) ON DELETE CASCADE,
        number INT NOT NULL,
        title NVARCHAR(200) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT GETDATE(),
        UNIQUE(comicId, number)
    );
    CREATE NONCLUSTERED INDEX IX_Chapters_comicId ON Chapters(comicId);
END
GO

-- 7. Bảng Pages (Trang hình ảnh)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Pages')
BEGIN
    CREATE TABLE Pages (
        id NVARCHAR(50) PRIMARY KEY,
        chapterId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Chapters(id) ON DELETE CASCADE,
        comicId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Comics(id) ON DELETE CASCADE,
        pageNumber INT NOT NULL,
        imageUrl NVARCHAR(500) NOT NULL,
        imageData VARBINARY(MAX), -- Lưu dữ liệu hình ảnh nhị phân nếu cần
        fileSize INT, -- Kích thước file (bytes)
        uploadedAt DATETIME NOT NULL DEFAULT GETDATE(),
        UNIQUE(chapterId, pageNumber)
    );
    CREATE NONCLUSTERED INDEX IX_Pages_chapterId ON Pages(chapterId);
    CREATE NONCLUSTERED INDEX IX_Pages_comicId ON Pages(comicId);
END
GO

-- 8. Bảng Favorites (Yêu thích)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Favorites')
BEGIN
    CREATE TABLE Favorites (
        userId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Users(id) ON DELETE CASCADE,
        comicId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Comics(id) ON DELETE CASCADE,
        addedAt DATETIME NOT NULL DEFAULT GETDATE(),
        PRIMARY KEY (userId, comicId)
    );
    CREATE NONCLUSTERED INDEX IX_Favorites_userId ON Favorites(userId);
END
GO

-- 9. Bảng ReadingHistory (Lịch sử đọc)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ReadingHistory')
BEGIN
    CREATE TABLE ReadingHistory (
        id NVARCHAR(50) PRIMARY KEY,
        userId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Users(id) ON DELETE CASCADE,
        comicId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Comics(id) ON DELETE CASCADE,
        comicTitle NVARCHAR(200),
        chapterId NVARCHAR(50) FOREIGN KEY REFERENCES Chapters(id) ON DELETE SET NULL,
        chapterNumber INT,
        pageIndex INT NOT NULL DEFAULT 0,
        readAt DATETIME NOT NULL DEFAULT GETDATE()
    );
    CREATE NONCLUSTERED INDEX IX_ReadingHistory_userId ON ReadingHistory(userId);
    CREATE NONCLUSTERED INDEX IX_ReadingHistory_comicId ON ReadingHistory(comicId);
END
GO

-- 10. Bảng Ratings (Đánh giá)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Ratings')
BEGIN
    CREATE TABLE Ratings (
        userId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Users(id) ON DELETE CASCADE,
        comicId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Comics(id) ON DELETE CASCADE,
        score FLOAT NOT NULL CHECK (score >= 0 AND score <= 5),
        ratedAt DATETIME NOT NULL DEFAULT GETDATE(),
        PRIMARY KEY (userId, comicId)
    );
END
GO

-- 11. Bảng Comments (Bình luận)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Comments')
BEGIN
    CREATE TABLE Comments (
        id NVARCHAR(50) PRIMARY KEY,
        comicId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Comics(id) ON DELETE CASCADE,
        chapterId NVARCHAR(50) FOREIGN KEY REFERENCES Chapters(id) ON DELETE CASCADE,
        userId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES Users(id) ON DELETE CASCADE,
        username NVARCHAR(100) NOT NULL,
        content NVARCHAR(MAX) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT GETDATE(),
        updatedAt DATETIME NOT NULL DEFAULT GETDATE()
    );
    CREATE NONCLUSTERED INDEX IX_Comments_comicId ON Comments(comicId);
    CREATE NONCLUSTERED INDEX IX_Comments_chapterId ON Comments(chapterId);
END
GO

-- 12. Bảng SQLExecutionLog (Log thực thi SQL)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SQLExecutionLog')
BEGIN
    CREATE TABLE SQLExecutionLog (
        id NVARCHAR(50) PRIMARY KEY,
        userId NVARCHAR(50) FOREIGN KEY REFERENCES Users(id),
        query NVARCHAR(MAX) NOT NULL,
        executedAt DATETIME NOT NULL DEFAULT GETDATE(),
        status NVARCHAR(20), -- 'success' or 'error'
        result NVARCHAR(MAX),
        errorMessage NVARCHAR(MAX)
    );
END
GO

-- =====================================================
-- Insert Dữ liệu Ban đầu
-- =====================================================

-- Insert Genres
IF NOT EXISTS (SELECT 1 FROM Genres WHERE name = 'Hành Động')
BEGIN
    DECLARE @genreList TABLE (name NVARCHAR(100))
    INSERT INTO @genreList VALUES 
        ('Hành Động'), ('Phiêu Lưu'), ('Hài Hước'), ('Tình Cảm'), ('Viễn Tưởng'),
        ('Kinh Dị'), ('Thể Thao'), ('Học Đường'), ('Đời Thường'), ('Siêu Nhiên'),
        ('Lịch Sử'), ('Game'), ('Mecha'), ('Shounen'), ('Seinen');
    
    INSERT INTO Genres (id, name)
    SELECT NEWID(), name FROM @genreList
END
GO

-- Insert Admin User
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'admin')
BEGIN
    INSERT INTO Users (id, username, password, isAdmin, createdAt)
    VALUES ('admin-001', 'admin', 'admin', 1, GETDATE())
END
GO

PRINT '✓ Schema ComicDB đã được tạo thành công!'
GO
