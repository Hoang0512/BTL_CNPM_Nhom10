// Types for the comic reader app
export interface User {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Comic {
  id: string;
  title: string;
  author: string;
  genres: string[];
  status: 'ongoing' | 'completed';
  coverImage: string;
  description: string;
  chapters: Chapter[];
  views: number;
  rating: number;
  ratingCount: number;
  isHot: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  comicId: string;
  number: number;
  title: string;
  pages: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  comicId: string;
  chapterId?: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface Favorite {
  userId: string;
  comicId: string;
  addedAt: string;
}

export interface ReadingHistory {
  userId: string;
  comicId: string;
  comicTitle: string;
  chapterId: string;
  chapterNumber: number;
  pageIndex: number;
  readAt: string;
}

export interface Rating {
  userId: string;
  comicId: string;
  score: number;
}
