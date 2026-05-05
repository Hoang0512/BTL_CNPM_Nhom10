import express, { Request, Response } from 'express';
import * as mssql from 'mssql';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase, getPool, sqlConfig } from './config';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// =====================================================
// VARIABLES và CONSTANTS
// =====================================================

interface ComicImageData {
  id: string;
  chapterId: string;
  comicId: string;
  pageNumber: number;
  imageUrl: string;
  imageData?: Buffer;
  fileSize?: number;
}

interface ComicData {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  status: 'ongoing' | 'completed';
}

interface ChapterData {
  id: string;
  comicId: string;
  number: number;
  title: string;
  pages: ComicImageData[];
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

async function logSQLExecution(
  userId: string | null,
  query: string,
  status: 'success' | 'error',
  result: string,
  errorMessage?: string
) {
  try {
    const pool = getPool();
    const request = pool.request();
    request.input('id', mssql.NVarChar(50), `log-${Date.now()}`);
    request.input('userId', mssql.NVarChar(50), userId);
    request.input('query', mssql.NVarChar(mssql.MAX), query);
    request.input('status', mssql.NVarChar(20), status);
    request.input('result', mssql.NVarChar(mssql.MAX), result);
    request.input('errorMessage', mssql.NVarChar(mssql.MAX), errorMessage || null);

    await request.query(`
      INSERT INTO SQLExecutionLog (id, userId, query, status, result, errorMessage)
      VALUES (@id, @userId, @query, @status, @result, @errorMessage)
    `);
  } catch (error) {
    console.error('Error logging SQL execution:', error);
  }
}

// =====================================================
// API ROUTES
// =====================================================

// 1. GET - Lấy tất cả Comics
app.get('/api/comics', async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const result = await pool.request().query(`
      SELECT * FROM Comics ORDER BY createdAt DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching comics:', error);
    res.status(500).json({ error: 'Lỗi lấy danh sách truyện' });
  }
});

// 2. GET - Lấy Comic theo ID với Chapters và Pages
app.get('/api/comics/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Lấy Comic
    const comicResult = await pool.request()
      .input('id', mssql.NVarChar(50), id)
      .query('SELECT * FROM Comics WHERE id = @id');

    if (comicResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Truyện không tìm thấy' });
    }

    const comic = comicResult.recordset[0];

    // Lấy Chapters
    const chaptersResult = await pool.request()
      .input('comicId', mssql.NVarChar(50), id)
      .query('SELECT * FROM Chapters WHERE comicId = @comicId ORDER BY number ASC');

    // Lấy Pages cho mỗi Chapter
    const chapters = await Promise.all(
      chaptersResult.recordset.map(async (chapter) => {
        const pagesResult = await pool.request()
          .input('chapterId', mssql.NVarChar(50), chapter.id)
          .query('SELECT * FROM Pages WHERE chapterId = @chapterId ORDER BY pageNumber ASC');

        return {
          ...chapter,
          pages: pagesResult.recordset
        };
      })
    );

    res.json({ ...comic, chapters });
  } catch (error) {
    console.error('Error fetching comic:', error);
    res.status(500).json({ error: 'Lỗi lấy chi tiết truyện' });
  }
});

// 3. POST - Tạo Comic
app.post('/api/comics', async (req: Request, res: Response) => {
  try {
    const { id, title, author, description, status, coverImage } = req.body;
    const pool = getPool();
    const request = pool.request();

    request.input('id', mssql.NVarChar(50), id);
    request.input('title', mssql.NVarChar(200), title);
    request.input('author', mssql.NVarChar(100), author);
    request.input('description', mssql.NVarChar(mssql.MAX), description);
    request.input('status', mssql.NVarChar(20), status);
    request.input('coverImage', mssql.NVarChar(500), coverImage);

    await request.query(`
      INSERT INTO Comics (id, title, author, description, status, coverImage)
      VALUES (@id, @title, @author, @description, @status, @coverImage)
    `);

    res.json({ success: true, message: 'Tạo truyện thành công' });
  } catch (error) {
    console.error('Error creating comic:', error);
    res.status(500).json({ error: 'Lỗi tạo truyện' });
  }
});

// 4. POST - Tạo Chapter
app.post('/api/chapters', async (req: Request, res: Response) => {
  try {
    const { id, comicId, number, title } = req.body;
    const pool = getPool();
    const request = pool.request();

    request.input('id', mssql.NVarChar(50), id);
    request.input('comicId', mssql.NVarChar(50), comicId);
    request.input('number', mssql.Int, number);
    request.input('title', mssql.NVarChar(200), title);

    await request.query(`
      INSERT INTO Chapters (id, comicId, number, title)
      VALUES (@id, @comicId, @number, @title)
    `);

    res.json({ success: true, message: 'Tạo chương thành công' });
  } catch (error) {
    console.error('Error creating chapter:', error);
    res.status(500).json({ error: 'Lỗi tạo chương' });
  }
});

// 5. POST - Thêm Page (hình ảnh)
app.post('/api/pages', async (req: Request, res: Response) => {
  try {
    const { id, chapterId, comicId, pageNumber, imageUrl, fileSize } = req.body;
    const pool = getPool();
    const request = pool.request();

    request.input('id', mssql.NVarChar(50), id);
    request.input('chapterId', mssql.NVarChar(50), chapterId);
    request.input('comicId', mssql.NVarChar(50), comicId);
    request.input('pageNumber', mssql.Int, pageNumber);
    request.input('imageUrl', mssql.NVarChar(500), imageUrl);
    request.input('fileSize', mssql.Int, fileSize || 0);

    await request.query(`
      INSERT INTO Pages (id, chapterId, comicId, pageNumber, imageUrl, fileSize)
      VALUES (@id, @chapterId, @comicId, @pageNumber, @imageUrl, @fileSize)
    `);

    res.json({ success: true, message: 'Thêm trang thành công' });
  } catch (error) {
    console.error('Error adding page:', error);
    res.status(500).json({ error: 'Lỗi thêm trang' });
  }
});

// 6. GET - Lấy tất cả Pages của một Chapter
app.get('/api/chapters/:chapterId/pages', async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input('chapterId', mssql.NVarChar(50), chapterId)
      .query('SELECT * FROM Pages WHERE chapterId = @chapterId ORDER BY pageNumber ASC');

    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Lỗi lấy danh sách trang' });
  }
});

// 7. POST - Thực thi lệnh SQL (Admin only)
app.post('/api/sql/execute', async (req: Request, res: Response) => {
  try {
    const { query, userId } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Câu lệnh SQL không được để trống' });
    }

    // Validate: chỉ cho phép SELECT, INSERT, UPDATE, DELETE
    const allowedOperations = /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\s+/i;
    if (!allowedOperations.test(query)) {
      return res.status(400).json({ error: 'Chỉ cho phép các lệnh SELECT, INSERT, UPDATE, DELETE' });
    }

    const pool = getPool();
    const result = await pool.request().query(query);

    // Log execution
    await logSQLExecution(
      userId || null,
      query,
      'success',
      JSON.stringify(result.recordset || [])
    );

    res.json({
      success: true,
      message: 'Thực thi thành công',
      rowsAffected: result.rowsAffected,
      recordset: result.recordset || []
    });
  } catch (error: any) {
    console.error('Error executing SQL:', error);

    // Log error
    await logSQLExecution(
      req.body.userId || null,
      req.body.query,
      'error',
      '',
      error.message
    );

    res.status(400).json({
      error: 'Lỗi thực thi SQL',
      message: error.message
    });
  }
});

// 8. GET - Lấy SQL Execution Log
app.get('/api/sql/logs', async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const result = await pool.request().query(`
      SELECT TOP 100 * FROM SQLExecutionLog ORDER BY executedAt DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Lỗi lấy log' });
  }
});

// 9. GET - Lấy kết nối SQL config
app.get('/api/sql/config', (req: Request, res: Response) => {
  res.json({
    server: sqlConfig.server,
    database: sqlConfig.database,
    port: sqlConfig.port,
    userName: sqlConfig.authentication.options.userName,
    trustServerCertificate: sqlConfig.options.trustServerCertificate,
    encryption: sqlConfig.options.encrypt
  });
});

// 10. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', server: 'Comic API Server running' });
});

// =====================================================
// INITIALIZATION
// =====================================================

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await initializeDatabase();
    console.log('\n=== COMIC API SERVER ===');
    console.log(`Server khởi động trên cổng: ${PORT}`);
    console.log(`Cơ sở dữ liệu: ${sqlConfig.database}`);
    console.log(`Server: ${sqlConfig.server}`);
    console.log('========================\n');

    app.listen(PORT, () => {
      console.log(`✓ Server đang chạy tại http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ Lỗi khởi động server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
