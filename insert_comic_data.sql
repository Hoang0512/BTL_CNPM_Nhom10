-- =====================================================
-- SQL INSERT Statements cho Comic Reader Application
-- Chuyển đổi dữ liệu từ comics.ts thành SQL queries
-- Database: ComicDB
-- =====================================================

USE ComicDB;
-- =====================================================
-- 2. INSERT INTO Genres
-- =====================================================

INSERT INTO Genres (id, name) VALUES
('genre-1', 'Hành Động'),
('genre-2', 'Phiêu Lưu'),
('genre-3', 'Hài Hước'),
('genre-4', 'Đời Thường'),
('genre-5', 'Viễn Tưởng'),
('genre-6', 'Học Đường'),
('genre-7', 'Kinh Dị'),
('genre-8', 'Siêu Nhiên'),
('genre-9', 'Tình Cảm'),
('genre-10', 'Game'),
('genre-11', 'Lịch Sử');
GO

-- =====================================================
-- 3. INSERT INTO ComicGenres
-- =====================================================

INSERT INTO ComicGenres (comicId, genreId) VALUES
-- Comic 1: One Piece - Hành Động, Phiêu Lưu, Hài Hước
('1', 'genre-1'), ('1', 'genre-2'), ('1', 'genre-3'),
-- Comic 2: Naruto - Hành Động, Phiêu Lưu, Học Đường
('2', 'genre-1'), ('2', 'genre-2'), ('2', 'genre-6'),
-- Comic 3: Dragon Ball - Hành Động, Phiêu Lưu, Viễn Tưởng
('3', 'genre-1'), ('3', 'genre-2'), ('3', 'genre-5'),
-- Comic 4: Attack on Titan - Hành Động, Viễn Tưởng, Kinh Dị
('4', 'genre-1'), ('4', 'genre-5'), ('4', 'genre-7'),
-- Comic 5: My Hero Academia - Hành Động, Học Đường, Siêu Nhiên
('5', 'genre-1'), ('5', 'genre-6'), ('5', 'genre-8'),
-- Comic 6: Demon Slayer - Hành Động, Siêu Nhiên, Phiêu Lưu
('6', 'genre-1'), ('6', 'genre-8'), ('6', 'genre-2'),
-- Comic 7: Death Note - Viễn Tưởng, Kinh Dị, Đời Thường
('7', 'genre-5'), ('7', 'genre-7'), ('7', 'genre-4'),
-- Comic 8: Fullmetal Alchemist - Hành Động, Phiêu Lưu, Viễn Tưởng
('8', 'genre-1'), ('8', 'genre-2'), ('8', 'genre-5'),
-- Comic 9: Bleach - Hành Động, Siêu Nhiên, Phiêu Lưu
('9', 'genre-1'), ('9', 'genre-8'), ('9', 'genre-2'),
-- Comic 10: Tokyo Ghoul - Hành Động, Kinh Dị, Siêu Nhiên
('10', 'genre-1'), ('10', 'genre-7'), ('10', 'genre-8'),
-- Comic 11: Hunter x Hunter - Hành Động, Phiêu Lưu, Siêu Nhiên
('11', 'genre-1'), ('11', 'genre-2'), ('11', 'genre-8'),
-- Comic 12: Sword Art Online - Hành Động, Phiêu Lưu, Tình Cảm, Game
('12', 'genre-1'), ('12', 'genre-2'), ('12', 'genre-9'), ('12', 'genre-10'),
-- Comic 13: One Punch Man - Hành Động, Hài Hước, Siêu Nhiên
('13', 'genre-1'), ('13', 'genre-3'), ('13', 'genre-8'),
-- Comic 14: Mob Psycho 100 - Hài Hước, Siêu Nhiên, Đời Thường
('14', 'genre-3'), ('14', 'genre-8'), ('14', 'genre-4'),
-- Comic 15: Spy x Family - Hài Hước, Đời Thường, Phiêu Lưu
('15', 'genre-3'), ('15', 'genre-4'), ('15', 'genre-2'),
-- Comic 16: Tokyo Revengers - Hành Động, Học Đường, Đời Thường
('16', 'genre-1'), ('16', 'genre-6'), ('16', 'genre-4'),
-- Comic 17: Black Clover - Hành Động, Viễn Tưởng, Phiêu Lưu
('17', 'genre-1'), ('17', 'genre-5'), ('17', 'genre-2'),
-- Comic 18: Hunter x Hunter - Hành Động, Phiêu Lưu, Siêu Nhiên
('18', 'genre-1'), ('18', 'genre-2'), ('18', 'genre-8'),
-- Comic 19: Fullmetal Alchemist - Hành Động, Phiêu Lưu, Viễn Tưởng
('19', 'genre-1'), ('19', 'genre-2'), ('19', 'genre-5'),
-- Comic 20: Bleach - Hành Động, Siêu Nhiên, Phiêu Lưu
('20', 'genre-1'), ('20', 'genre-8'), ('20', 'genre-2'),
-- Comic 21: One Punch Man - Hành Động, Hài Hước, Siêu Nhiên
('21', 'genre-1'), ('21', 'genre-3'), ('21', 'genre-8'),
-- Comic 22: Mob Psycho 100 - Hài Hước, Siêu Nhiên, Đời Thường
('22', 'genre-3'), ('22', 'genre-8'), ('22', 'genre-4'),
-- Comic 23: Dr. Stone - Phiêu Lưu, Viễn Tưởng, Hài Hước
('23', 'genre-2'), ('23', 'genre-5'), ('23', 'genre-3'),
-- Comic 24: Vinland Saga - Hành Động, Phiêu Lưu, Lịch Sử
('24', 'genre-1'), ('24', 'genre-2'), ('24', 'genre-11'),
-- Comic 25: Tokyo Ghoul - Hành Động, Kinh Dị, Siêu Nhiên
('25', 'genre-1'), ('25', 'genre-7'), ('25', 'genre-8'),
-- Comic 26: Sword Art Online - Hành Động, Phiêu Lưu, Tình Cảm, Game
('26', 'genre-1'), ('26', 'genre-2'), ('26', 'genre-9'), ('26', 'genre-10'),
-- Comic 27: Doraemon Plus - Hài Hước, Đời Thường, Viễn Tưởng
('27', 'genre-3'), ('27', 'genre-4'), ('27', 'genre-5'),
-- Comic 28: Pokémon Adventures - Phiêu Lưu, Hài Hước, Game
('28', 'genre-2'), ('28', 'genre-3'), ('28', 'genre-10');
GO

INSERT INTO Comics (id, title, author, description, status, coverImage, views, rating, ratingCount, isHot, isNew, createdAt, updatedAt) VALUES
('1', 'One Piece', 'Oda Eiichiro', 'Luffy và băng hải tặc Mũ Rơm tìm kiếm kho báu One Piece.', 'ongoing', 'https://picsum.photos/seed/comic1/400/600', 450000, 4.9, 9500, 1, 0, '2022-01-01', '2024-03-20'),
('2', 'Naruto', 'Kishimoto Masashi', 'Naruto Uzumaki muốn trở thành Hokage của làng Lá.', 'completed', 'https://picsum.photos/seed/comic2/400/600', 380000, 4.7, 8200, 0, 0, '2022-02-01', '2023-08-15'),
('3', 'Dragon Ball', 'Toriyama Akira', 'Goku và những người bạn chiến đấu chống lại kẻ thù mạnh mẽ.', 'completed', 'https://picsum.photos/seed/comic3/400/600', 420000, 4.8, 8900, 0, 0, '2022-03-01', '2023-07-20'),
('4', 'Attack on Titan', 'Isayama Hajime', 'Nhân loại chiến đấu chống lại Titan khổng lồ.', 'completed', 'https://picsum.photos/seed/comic4/400/600', 350000, 4.9, 7800, 0, 0, '2022-04-01', '2023-06-10'),
('5', 'My Hero Academia', 'Horikoshi Kohei', 'Izuku Midoriya muốn trở thành siêu anh hùng trong thế giới 80% người có siêu năng lực.', 'ongoing', 'https://picsum.photos/seed/comic5/400/600', 320000, 4.6, 7100, 1, 0, '2022-05-01', '2024-03-18'),
('6', 'Demon Slayer', 'Gotouge Koyoharu', 'Tanjiro Kamado tìm cách cứu em gái bị biến thành quỷ.', 'completed', 'https://picsum.photos/seed/comic6/400/600', 290000, 4.8, 6500, 0, 0, '2022-06-01', '2023-05-25'),
('7', 'Death Note', 'Ohba Tsugumi', 'Light Yagami sử dụng sổ tay tử thần để trừng phạt tội phạm.', 'completed', 'https://picsum.photos/seed/comic7/400/600', 275000, 4.7, 6200, 0, 0, '2022-07-01', '2023-04-30'),
('8', 'Fullmetal Alchemist', 'Arakawa Hiromu', 'Hai anh em nhà Elric tìm kiếm Hòn đá Triết gia.', 'completed', 'https://picsum.photos/seed/comic8/400/600', 260000, 4.8, 5800, 0, 0, '2022-08-01', '2023-03-15'),
('9', 'Bleach', 'Kubo Tite', 'Ichigo Kurosaki - Soul Reaper bảo vệ thế giới khỏi Hollow.', 'completed', 'https://picsum.photos/seed/comic9/400/600', 240000, 4.6, 5400, 0, 0, '2022-09-01', '2023-02-20'),
('10', 'Tokyo Ghoul', 'Ishida Sui', 'Ken Kaneki trở thành nửa người nửa ghoul sau tai nạn định mệnh.', 'completed', 'https://picsum.photos/seed/comic10/400/600', 220000, 4.7, 5100, 0, 0, '2022-10-01', '2023-01-25'),
('11', 'Hunter x Hunter', 'Togashi Yoshihiro', 'Gon Freecss tìm kiếm cha - một Hunter huyền thoại.', 'ongoing', 'https://picsum.photos/seed/comic11/400/600', 280000, 4.9, 6300, 0, 0, '2022-11-01', '2024-03-12'),
('12', 'Sword Art Online', 'Kawahara Reki', 'Kirito mắc kẹt trong game sinh tử SAO và phải chiến đấu để sống sót.', 'ongoing', 'https://picsum.photos/seed/comic12/400/600', 195000, 4.3, 4200, 0, 0, '2022-12-01', '2024-03-19'),
('13', 'One Punch Man', 'ONE', 'Saitama - anh hùng có thể hạ gục bất kỳ ai chỉ bằng một cú đấm.', 'ongoing', 'https://picsum.photos/seed/comic13/400/600', 310000, 4.7, 6800, 1, 0, '2023-01-01', '2024-03-15'),
('14', 'Mob Psycho 100', 'ONE', 'Mob - cậu học sinh có siêu năng lực muốn sống cuộc sống bình thường.', 'completed', 'https://picsum.photos/seed/comic14/400/600', 165000, 4.5, 3500, 0, 0, '2023-02-01', '2023-11-30'),
('15', 'Spy x Family', 'Endo Tatsuya', 'Gia đình giả với gián điệp, sát thủ và nhà ngoại cảm.', 'ongoing', 'https://picsum.photos/seed/comic15/400/600', 185000, 4.7, 3800, 1, 1, '2024-02-01', '2024-03-16'),
('16', 'Tokyo Revengers', 'Wakui Ken', 'Du hành thời gian để cứu bạn gái và thay đổi tương lai.', 'completed', 'https://picsum.photos/seed/comic16/400/600', 142000, 4.4, 2900, 0, 0, '2023-04-01', '2024-01-15'),
('17', 'Black Clover', 'Tabata Yuki', 'Asta - cậu bé không có phép thuật trong thế giới ma thuật.', 'ongoing', 'https://picsum.photos/seed/comic17/400/600', 128000, 4.3, 2400, 0, 1, '2024-01-15', '2024-03-18'),
('18', 'Hunter x Hunter', 'Togashi Yoshihiro', 'Gon Freecss tìm kiếm cha - một Hunter huyền thoại.', 'ongoing', 'https://picsum.photos/seed/comic18/400/600', 225000, 4.9, 5100, 0, 0, '2023-05-01', '2024-03-12'),
('19', 'Fullmetal Alchemist', 'Arakawa Hiromu', 'Hai anh em nhà Elric tìm kiếm Hòn đá Triết gia.', 'completed', 'https://picsum.photos/seed/comic19/400/600', 198000, 4.8, 4300, 0, 0, '2022-08-01', '2023-10-01'),
('20', 'Bleach', 'Kubo Tite', 'Ichigo Kurosaki - Soul Reaper bảo vệ thế giới khỏi Hollow.', 'completed', 'https://picsum.photos/seed/comic20/400/600', 175000, 4.6, 3600, 0, 0, '2022-10-01', '2023-12-15'),
('21', 'One Punch Man', 'ONE', 'Saitama - anh hùng có thể hạ gục bất kỳ ai chỉ bằng một cú đấm.', 'ongoing', 'https://picsum.photos/seed/comic21/400/600', 245000, 4.7, 5200, 1, 0, '2023-03-01', '2024-03-15'),
('22', 'Mob Psycho 100', 'ONE', 'Mob - cậu học sinh có siêu năng lực muốn sống cuộc sống bình thường.', 'completed', 'https://picsum.photos/seed/comic22/400/600', 132000, 4.5, 2700, 0, 0, '2023-02-01', '2023-11-30'),
('23', 'Dr. Stone', 'Inagaki Riichiro', 'Senku hồi sinh nhân loại sau 3700 năm hóa đá bằng khoa học.', 'completed', 'https://picsum.photos/seed/comic23/400/600', 115000, 4.4, 2200, 0, 0, '2023-01-15', '2023-12-20'),
('24', 'Vinland Saga', 'Yukimura Makoto', 'Thorfinn - chiến binh Viking tìm kiếm vùng đất hòa bình.', 'ongoing', 'https://picsum.photos/seed/comic24/400/600', 98000, 4.6, 1900, 0, 1, '2024-01-20', '2024-03-14'),
('25', 'Tokyo Ghoul', 'Ishida Sui', 'Ken Kaneki trở thành nửa người nửa ghoul sau tai nạn định mệnh.', 'completed', 'https://picsum.photos/seed/comic25/400/600', 205000, 4.7, 4400, 0, 0, '2022-09-01', '2023-09-15'),
('26', 'Sword Art Online', 'Kawahara Reki', 'Kirito mắc kẹt trong game sinh tử SAO và phải chiến đấu để sống sót.', 'ongoing', 'https://picsum.photos/seed/comic26/400/600', 158000, 4.3, 3100, 0, 1, '2024-02-10', '2024-03-19'),
('27', 'Doraemon Plus', 'Fujiko F. Fujio', 'Chú mèo máy đến từ tương lai giúp đỡ Nobita với những bảo bối thần kỳ.', 'ongoing', 'https://picsum.photos/seed/comic27/400/600', 89000, 4.5, 1700, 0, 0, '2023-11-15', '2024-03-01'),
('28', 'Pokémon Adventures', 'Kusaka Hidenori', 'Hành trình trở thành bậc thầy Pokémon của Red.', 'ongoing', 'https://picsum.photos/seed/comic28/400/600', 76000, 4.2, 1400, 0, 1, '2024-02-25', '2024-03-17');
GO