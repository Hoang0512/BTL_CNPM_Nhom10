import { Comic } from '../types';

// Generate placeholder comic cover images using picsum.photos

// Sample placeholder images (using picsum.photos)
const generatePages = (chapter: number, count: number = 10) => {
  return Array.from({ length: count }, (_, i) => 
    `https://picsum.photos/seed/ch${chapter}p${i}/800/1200`
  );
};

export const genres = [
  'Hành Động', 'Phiêu Lưu', 'Hài Hước', 'Tình Cảm', 'Viễn Tưởng',
  'Kinh Dị', 'Thể Thao', 'Học Đường', 'Đời Thường', 'Siêu Nhiên',
  'Phiêu Lưu', 'Lịch Sử', 'Game', 'Mecha', 'Shounen', 'Seinen'
];

export const initialComics: Comic[] = [
  {
    id: '1',
    title: 'Thợ Săn Quỷ',
    author: 'Nguyễn Văn A',
    genres: ['Hành Động', 'Siêu Nhiên', 'Kinh Dị'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic1/400/600',
    description: 'Câu chuyện về một thợ săn quỷ trẻ tuổi với khả năng đặc biệt, chiến đấu chống lại thế lực bóng tối để bảo vệ nhân loại.',
    chapters: Array.from({ length: 15 }, (_, i) => ({
      id: `1-ch${i + 1}`,
      comicId: '1',
      number: i + 1,
      title: `Chương ${i + 1}: ${['Khởi Đầu', 'Gặp Gỡ', 'Thử Thách', 'Quyết Đấu', 'Sức Mạnh', 'Đồng Minh', 'Kẻ Thù', 'Bí Mật', 'Mạo Hiểm', 'Chiến Trận', 'Thức Tỉnh', 'Hi Sinh', 'Hy Vọng', 'Đối Đầu', 'Hồi Kết'][i]}`,
      pages: generatePages(i + 1),
      createdAt: new Date(Date.now() - (15 - i) * 86400000).toISOString()
    })),
    views: 125000,
    rating: 4.8,
    ratingCount: 2340,
    isHot: true,
    isNew: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20'
  },
  {
    id: '2',
    title: 'Võ Thần Chúa Tể',
    author: 'Trần Văn B',
    genres: ['Hành Động', 'Phiêu Lưu', 'Viễn Tưởng'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic2/400/600',
    description: 'Hành trình trở thành võ thần của một thiếu niên có thiên phú võ thuật tuyệt đỉnh.',
    chapters: Array.from({ length: 20 }, (_, i) => ({
      id: `2-ch${i + 1}`,
      comicId: '2',
      number: i + 1,
      title: `Chương ${i + 1}: Quyển ${Math.floor(i / 5) + 1}`,
      pages: generatePages(i + 1, 12),
      createdAt: new Date(Date.now() - (20 - i) * 86400000).toISOString()
    })),
    views: 98000,
    rating: 4.6,
    ratingCount: 1890,
    isHot: true,
    isNew: false,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-19'
  },
  {
    id: '3',
    title: 'Nữ Hoàng Băng Giá',
    author: 'Lê Thị C',
    genres: ['Tình Cảm', 'Viễn Tưởng', 'Phiêu Lưu'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic3/400/600',
    description: 'Câu chuyện tình yêu giữa một cô gái có sức mạnh băng giá và chàng hoàng tử của vương quốc lửa.',
    chapters: Array.from({ length: 25 }, (_, i) => ({
      id: `3-ch${i + 1}`,
      comicId: '3',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 8),
      createdAt: new Date(Date.now() - (30 - i) * 86400000).toISOString()
    })),
    views: 156000,
    rating: 4.9,
    ratingCount: 3200,
    isHot: false,
    isNew: false,
    createdAt: '2023-11-01',
    updatedAt: '2024-02-15'
  },
  {
    id: '4',
    title: 'Đại Chiến Titan',
    author: 'Phạm Văn D',
    genres: ['Hành Động', 'Kinh Dị', 'Phiêu Lưu'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic4/400/600',
    description: 'Loài người chiến đấu chống lại những titan khổng lồ để sinh tồn.',
    chapters: Array.from({ length: 30 }, (_, i) => ({
      id: `4-ch${i + 1}`,
      comicId: '4',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 15),
      createdAt: new Date(Date.now() - (60 - i) * 86400000).toISOString()
    })),
    views: 250000,
    rating: 4.7,
    ratingCount: 5600,
    isHot: false,
    isNew: false,
    createdAt: '2023-06-01',
    updatedAt: '2024-01-10'
  },
  {
    id: '5',
    title: 'Học Đường Ma Quái',
    author: 'Hoàng Thị E',
    genres: ['Học Đường', 'Kinh Dị', 'Hài Hước'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic5/400/600',
    description: 'Những câu chuyện ma quái đầy hài hước tại một ngôi trường trung học đặc biệt.',
    chapters: Array.from({ length: 12 }, (_, i) => ({
      id: `5-ch${i + 1}`,
      comicId: '5',
      number: i + 1,
      title: `Chương ${i + 1}: Kẻ Bí Ẩn`,
      pages: generatePages(i + 1, 10),
      createdAt: new Date(Date.now() - (12 - i) * 86400000).toISOString()
    })),
    views: 67000,
    rating: 4.3,
    ratingCount: 890,
    isHot: false,
    isNew: true,
    createdAt: '2024-02-20',
    updatedAt: '2024-03-18'
  },
  {
    id: '6',
    title: 'One Piece: Hải Tặc',
    author: 'Võ Văn F',
    genres: ['Hành Động', 'Phiêu Lưu', 'Hài Hước'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic6/400/600',
    description: 'Hành trình tìm kiếm kho báu One Piece của thuyền trưởng Luffy và băng hải tặc Mũ Rơm.',
    chapters: Array.from({ length: 28 }, (_, i) => ({
      id: `6-ch${i + 1}`,
      comicId: '6',
      number: i + 1,
      title: `Chương ${i + 1}: Arc ${Math.floor(i / 7) + 1}`,
      pages: generatePages(i + 1, 18),
      createdAt: new Date(Date.now() - (30 - i) * 86400000).toISOString()
    })),
    views: 320000,
    rating: 4.9,
    ratingCount: 7800,
    isHot: true,
    isNew: false,
    createdAt: '2023-01-01',
    updatedAt: '2024-03-20'
  },
  {
    id: '7',
    title: 'Naruto Shippuden',
    author: 'Đỗ Thị G',
    genres: ['Hành Động', 'Phiêu Lưu', 'Siêu Nhiên'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic7/400/600',
    description: 'Câu chuyện về ninja Naruto trên con đường trở thành Hokage.',
    chapters: Array.from({ length: 35 }, (_, i) => ({
      id: `7-ch${i + 1}`,
      comicId: '7',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 14),
      createdAt: new Date(Date.now() - (90 - i) * 86400000).toISOString()
    })),
    views: 280000,
    rating: 4.8,
    ratingCount: 6200,
    isHot: false,
    isNew: false,
    createdAt: '2022-06-01',
    updatedAt: '2023-12-01'
  },
  {
    id: '8',
    title: 'Dragon Ball Super',
    author: 'Bùi Văn H',
    genres: ['Hành Động', 'Viễn Tưởng', 'Thể Thao'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic8/400/600',
    description: 'Sức mạnh vô hạn của Goku và các chiến binh Z trong cuộc chiến bảo vệ vũ trụ.',
    chapters: Array.from({ length: 22 }, (_, i) => ({
      id: `8-ch${i + 1}`,
      comicId: '8',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 16),
      createdAt: new Date(Date.now() - (25 - i) * 86400000).toISOString()
    })),
    views: 195000,
    rating: 4.5,
    ratingCount: 4100,
    isHot: true,
    isNew: false,
    createdAt: '2023-08-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '9',
    title: 'Thám Tử Lừng Danh',
    author: 'Ngô Thị I',
    genres: ['Hài Hước', 'Phiêu Lưu', 'Học Đường'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic9/400/600',
    description: 'Cậu bé thám tử thiên tài giải quyết những vụ án bí ẩn.',
    chapters: Array.from({ length: 18 }, (_, i) => ({
      id: `9-ch${i + 1}`,
      comicId: '9',
      number: i + 1,
      title: `Chương ${i + 1}: Vụ Án ${i + 1}`,
      pages: generatePages(i + 1, 11),
      createdAt: new Date(Date.now() - (20 - i) * 86400000).toISOString()
    })),
    views: 145000,
    rating: 4.7,
    ratingCount: 2800,
    isHot: false,
    isNew: false,
    createdAt: '2023-09-01',
    updatedAt: '2024-03-10'
  },
  {
    id: '10',
    title: 'Chainsaw Man',
    author: 'Lý Văn K',
    genres: ['Hành Động', 'Kinh Dị', 'Siêu Nhiên'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic10/400/600',
    description: 'Denji - chàng trai trở thành Chainsaw Man với sức mạnh hủy diệt.',
    chapters: Array.from({ length: 16 }, (_, i) => ({
      id: `10-ch${i + 1}`,
      comicId: '10',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 13),
      createdAt: new Date(Date.now() - (18 - i) * 86400000).toISOString()
    })),
    views: 178000,
    rating: 4.6,
    ratingCount: 3400,
    isHot: true,
    isNew: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-03-17'
  },
  {
    id: '11',
    title: 'Jujutsu Kaisen',
    author: 'Trịnh Thị L',
    genres: ['Hành Động', 'Siêu Nhiên', 'Học Đường'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic11/400/600',
    description: 'Yuji Itadori nuốt ngón tay của Sukuna và bước vào thế giới phù thủy.',
    chapters: Array.from({ length: 19 }, (_, i) => ({
      id: `11-ch${i + 1}`,
      comicId: '11',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 12),
      createdAt: new Date(Date.now() - (22 - i) * 86400000).toISOString()
    })),
    views: 210000,
    rating: 4.8,
    ratingCount: 4500,
    isHot: true,
    isNew: false,
    createdAt: '2023-10-01',
    updatedAt: '2024-03-19'
  },
  {
    id: '12',
    title: 'Demon Slayer',
    author: 'Mai Văn M',
    genres: ['Hành Động', 'Siêu Nhiên', 'Phiêu Lưu'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic12/400/600',
    description: 'Tanjiro trở thành thợ săn quỷ để cứu em gái Nezuko.',
    chapters: Array.from({ length: 26 }, (_, i) => ({
      id: `12-ch${i + 1}`,
      comicId: '12',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 14),
      createdAt: new Date(Date.now() - (50 - i) * 86400000).toISOString()
    })),
    views: 290000,
    rating: 4.9,
    ratingCount: 6800,
    isHot: false,
    isNew: false,
    createdAt: '2022-12-01',
    updatedAt: '2024-02-01'
  },
  {
    id: '13',
    title: 'My Hero Academia',
    author: 'Đinh Thị N',
    genres: ['Hành Động', 'Học Đường', 'Siêu Nhiên'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic13/400/600',
    description: 'Izuku Midoriya trên hành trình trở thành anh hùng số 1.',
    chapters: Array.from({ length: 21 }, (_, i) => ({
      id: `13-ch${i + 1}`,
      comicId: '13',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 15),
      createdAt: new Date(Date.now() - (24 - i) * 86400000).toISOString()
    })),
    views: 165000,
    rating: 4.5,
    ratingCount: 3200,
    isHot: false,
    isNew: false,
    createdAt: '2023-07-01',
    updatedAt: '2024-03-14'
  },
  {
    id: '14',
    title: 'Attack on Titan',
    author: 'Vũ Văn O',
    genres: ['Hành Động', 'Kinh Dị', 'Viễn Tưởng'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic14/400/600',
    description: 'Cuộc chiến sinh tồn của nhân loại chống lại những gã Titan khổng lồ.',
    chapters: Array.from({ length: 32 }, (_, i) => ({
      id: `14-ch${i + 1}`,
      comicId: '14',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 16),
      createdAt: new Date(Date.now() - (100 - i) * 86400000).toISOString()
    })),
    views: 310000,
    rating: 4.8,
    ratingCount: 7200,
    isHot: false,
    isNew: false,
    createdAt: '2022-01-01',
    updatedAt: '2023-11-01'
  },
  {
    id: '15',
    title: 'Spy x Family',
    author: 'Hồ Thị P',
    genres: ['Hài Hước', 'Đời Thường', 'Phiêu Lưu'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic15/400/600',
    description: 'Gia đình giả với gián điệp, sát thủ và nhà ngoại cảm.',
    chapters: Array.from({ length: 14 }, (_, i) => ({
      id: `15-ch${i + 1}`,
      comicId: '15',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 10),
      createdAt: new Date(Date.now() - (16 - i) * 86400000).toISOString()
    })),
    views: 185000,
    rating: 4.7,
    ratingCount: 3800,
    isHot: true,
    isNew: true,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-16'
  },
  {
    id: '16',
    title: 'Tokyo Revengers',
    author: 'Phan Văn Q',
    genres: ['Hành Động', 'Học Đường', 'Đời Thường'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic16/400/600',
    description: 'Du hành thời gian để cứu bạn gái và thay đổi tương lai.',
    chapters: Array.from({ length: 24 }, (_, i) => ({
      id: `16-ch${i + 1}`,
      comicId: '16',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 12),
      createdAt: new Date(Date.now() - (40 - i) * 86400000).toISOString()
    })),
    views: 142000,
    rating: 4.4,
    ratingCount: 2900,
    isHot: false,
    isNew: false,
    createdAt: '2023-04-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '17',
    title: 'Black Clover',
    author: 'Tạ Thị R',
    genres: ['Hành Động', 'Viễn Tưởng', 'Phiêu Lưu'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic17/400/600',
    description: 'Asta - cậu bé không có phép thuật trong thế giới ma thuật.',
    chapters: Array.from({ length: 17 }, (_, i) => ({
      id: `17-ch${i + 1}`,
      comicId: '17',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 13),
      createdAt: new Date(Date.now() - (19 - i) * 86400000).toISOString()
    })),
    views: 128000,
    rating: 4.3,
    ratingCount: 2400,
    isHot: false,
    isNew: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-18'
  },
  {
    id: '18',
    title: 'Hunter x Hunter',
    author: 'Lương Văn S',
    genres: ['Hành Động', 'Phiêu Lưu', 'Siêu Nhiên'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic18/400/600',
    description: 'Gon Freecss tìm kiếm cha - một Hunter huyền thoại.',
    chapters: Array.from({ length: 23 }, (_, i) => ({
      id: `18-ch${i + 1}`,
      comicId: '18',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 14),
      createdAt: new Date(Date.now() - (26 - i) * 86400000).toISOString()
    })),
    views: 225000,
    rating: 4.9,
    ratingCount: 5100,
    isHot: false,
    isNew: false,
    createdAt: '2023-05-01',
    updatedAt: '2024-03-12'
  },
  {
    id: '19',
    title: 'Fullmetal Alchemist',
    author: 'Kiều Thị T',
    genres: ['Hành Động', 'Phiêu Lưu', 'Viễn Tưởng'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic19/400/600',
    description: 'Hai anh em nhà Elric tìm kiếm Hòn đá Triết gia.',
    chapters: Array.from({ length: 27 }, (_, i) => ({
      id: `19-ch${i + 1}`,
      comicId: '19',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 11),
      createdAt: new Date(Date.now() - (70 - i) * 86400000).toISOString()
    })),
    views: 198000,
    rating: 4.8,
    ratingCount: 4300,
    isHot: false,
    isNew: false,
    createdAt: '2022-08-01',
    updatedAt: '2023-10-01'
  },
  {
    id: '20',
    title: 'Bleach',
    author: 'Thân Văn U',
    genres: ['Hành Động', 'Siêu Nhiên', 'Phiêu Lưu'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic20/400/600',
    description: 'Ichigo Kurosaki - Soul Reaper bảo vệ thế giới khỏi Hollow.',
    chapters: Array.from({ length: 29 }, (_, i) => ({
      id: `20-ch${i + 1}`,
      comicId: '20',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 15),
      createdAt: new Date(Date.now() - (80 - i) * 86400000).toISOString()
    })),
    views: 175000,
    rating: 4.6,
    ratingCount: 3600,
    isHot: false,
    isNew: false,
    createdAt: '2022-10-01',
    updatedAt: '2023-12-15'
  },
  {
    id: '21',
    title: 'One Punch Man',
    author: 'Đặng Thị V',
    genres: ['Hành Động', 'Hài Hước', 'Siêu Nhiên'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic21/400/600',
    description: 'Saitama - anh hùng có thể hạ gục bất kỳ ai chỉ bằng một cú đấm.',
    chapters: Array.from({ length: 20 }, (_, i) => ({
      id: `21-ch${i + 1}`,
      comicId: '21',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 16),
      createdAt: new Date(Date.now() - (23 - i) * 86400000).toISOString()
    })),
    views: 245000,
    rating: 4.7,
    ratingCount: 5200,
    isHot: true,
    isNew: false,
    createdAt: '2023-03-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '22',
    title: 'Mob Psycho 100',
    author: 'Từ Văn W',
    genres: ['Hài Hước', 'Siêu Nhiên', 'Đời Thường'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic22/400/600',
    description: 'Mob - cậu học sinh có siêu năng lực muốn sống cuộc sống bình thường.',
    chapters: Array.from({ length: 16 }, (_, i) => ({
      id: `22-ch${i + 1}`,
      comicId: '22',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 12),
      createdAt: new Date(Date.now() - (45 - i) * 86400000).toISOString()
    })),
    views: 132000,
    rating: 4.5,
    ratingCount: 2700,
    isHot: false,
    isNew: false,
    createdAt: '2023-02-01',
    updatedAt: '2023-11-30'
  },
  {
    id: '23',
    title: 'Dr. Stone',
    author: 'Lâm Thị X',
    genres: ['Phiêu Lưu', 'Viễn Tưởng', 'Hài Hước'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic23/400/600',
    description: 'Senku hồi sinh nhân loại sau 3700 năm hóa đá bằng khoa học.',
    chapters: Array.from({ length: 18 }, (_, i) => ({
      id: `23-ch${i + 1}`,
      comicId: '23',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 13),
      createdAt: new Date(Date.now() - (55 - i) * 86400000).toISOString()
    })),
    views: 115000,
    rating: 4.4,
    ratingCount: 2200,
    isHot: false,
    isNew: false,
    createdAt: '2023-01-15',
    updatedAt: '2023-12-20'
  },
  {
    id: '24',
    title: 'Vinland Saga',
    author: 'Châu Văn Y',
    genres: ['Hành Động', 'Phiêu Lưu', 'Lịch Sử'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic24/400/600',
    description: 'Thorfinn - chiến binh Viking tìm kiếm vùng đất hòa bình.',
    chapters: Array.from({ length: 15 }, (_, i) => ({
      id: `24-ch${i + 1}`,
      comicId: '24',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 14),
      createdAt: new Date(Date.now() - (17 - i) * 86400000).toISOString()
    })),
    views: 98000,
    rating: 4.6,
    ratingCount: 1900,
    isHot: false,
    isNew: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-03-14'
  },
  {
    id: '25',
    title: 'Tokyo Ghoul',
    author: 'Hứa Thị Z',
    genres: ['Hành Động', 'Kinh Dị', 'Siêu Nhiên'],
    status: 'completed',
    coverImage: 'https://picsum.photos/seed/comic25/400/600',
    description: 'Ken Kaneki trở thành nửa người nửa ghoul sau tai nạn định mệnh.',
    chapters: Array.from({ length: 31 }, (_, i) => ({
      id: `25-ch${i + 1}`,
      comicId: '25',
      number: i + 1,
      title: `Chương ${i + 1}`,
      pages: generatePages(i + 1, 12),
      createdAt: new Date(Date.now() - (85 - i) * 86400000).toISOString()
    })),
    views: 205000,
    rating: 4.7,
    ratingCount: 4400,
    isHot: false,
    isNew: false,
    createdAt: '2022-09-01',
    updatedAt: '2023-09-15'
  },
  {
    id: '26',
    title: 'Sword Art Online',
    author: 'Tôn Văn AA',
    genres: ['Hành Động', 'Phiêu Lưu', 'Tình Cảm', 'Game'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic26/400/600',
    description: 'Kirito mắc kẹt trong game sinh tử SAO và phải chiến đấu để sống sót.',
    chapters: Array.from({ length: 13 }, (_, i) => ({
      id: `26-ch${i + 1}`,
      comicId: '26',
      number: i + 1,
      title: `Chương ${i + 1}: Aincrad ${i + 1}F`,
      pages: generatePages(i + 1, 11),
      createdAt: new Date(Date.now() - (15 - i) * 86400000).toISOString()
    })),
    views: 158000,
    rating: 4.3,
    ratingCount: 3100,
    isHot: false,
    isNew: true,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-19'
  },
  {
    id: '27',
    title: 'Doraemon Plus',
    author: 'Quách Thị BB',
    genres: ['Hài Hước', 'Đời Thường', 'Viễn Tưởng'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic27/400/600',
    description: 'Chú mèo máy đến từ tương lai giúp đỡ Nobita với những bảo bối thần kỳ.',
    chapters: Array.from({ length: 11 }, (_, i) => ({
      id: `27-ch${i + 1}`,
      comicId: '27',
      number: i + 1,
      title: `Chương ${i + 1}: Bảo bối số ${i + 1}`,
      pages: generatePages(i + 1, 8),
      createdAt: new Date(Date.now() - (13 - i) * 86400000).toISOString()
    })),
    views: 89000,
    rating: 4.5,
    ratingCount: 1700,
    isHot: false,
    isNew: false,
    createdAt: '2023-11-15',
    updatedAt: '2024-03-01'
  },
  {
    id: '28',
    title: 'Pokémon Adventures',
    author: 'Mạc Văn CC',
    genres: ['Phiêu Lưu', 'Hài Hước', 'Game'],
    status: 'ongoing',
    coverImage: 'https://picsum.photos/seed/comic28/400/600',
    description: 'Hành trình trở thành bậc thầy Pokémon của Red.',
    chapters: Array.from({ length: 14 }, (_, i) => ({
      id: `28-ch${i + 1}`,
      comicId: '28',
      number: i + 1,
      title: `Chương ${i + 1}: Huy hiệu ${i + 1}`,
      pages: generatePages(i + 1, 10),
      createdAt: new Date(Date.now() - (16 - i) * 86400000).toISOString()
    })),
    views: 76000,
    rating: 4.2,
    ratingCount: 1400,
    isHot: false,
    isNew: true,
    createdAt: '2024-02-25',
    updatedAt: '2024-03-17'
  }
];

export const getComics = (): Comic[] => {
  const stored = localStorage.getItem('comics');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('comics', JSON.stringify(initialComics));
  return initialComics;
};

export const saveComics = (comics: Comic[]) => {
  localStorage.setItem('comics', JSON.stringify(comics));
};
