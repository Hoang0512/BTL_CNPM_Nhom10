import React, { useState, useEffect } from 'react';

interface SQLExecutionResult {
  success: boolean;
  message: string;
  rowsAffected?: number[];
  recordset?: any[];
  error?: string;
}

interface SQLLog {
  id: string;
  userId: string;
  query: string;
  executedAt: string;
  status: string;
  result: string;
  errorMessage: string;
}

interface SQLCommandExecutorProps {
  darkMode: boolean;
  currentUserId?: string;
}

export function SQLCommandExecutor({ darkMode, currentUserId }: SQLCommandExecutorProps) {
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM Comics;');
  const [queryResult, setQueryResult] = useState<SQLExecutionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [sqlLogs, setSqlLogs] = useState<SQLLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [activeTab, setActiveTab] = useState<'executor' | 'logs' | 'variables'>('executor');
  const [sqlConfig, setSqlConfig] = useState<any>(null);

  // Fetch SQL Config
  useEffect(() => {
    fetchSqlConfig();
  }, []);

  const fetchSqlConfig = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sql/config');
      const config = await response.json();
      setSqlConfig(config);
    } catch (error) {
      console.error('Error fetching SQL config:', error);
    }
  };

  // Fetch SQL Logs
  const fetchSqlLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sql/logs');
      const logs = await response.json();
      setSqlLogs(logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  // Execute SQL Query
  const executeSqlQuery = async () => {
    if (!sqlQuery.trim()) {
      alert('Vui lòng nhập câu lệnh SQL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/sql/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: sqlQuery,
          userId: currentUserId || null
        })
      });

      const data = await response.json();
      setQueryResult(data);

      if (data.success) {
        fetchSqlLogs();
      }
    } catch (error: any) {
      setQueryResult({
        success: false,
        message: 'Lỗi kết nối server',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const sqlVariables = `
-- ========== BIẾN SQL QUAN TRỌNG ==========

-- Comics Variables
DECLARE @ComicId NVARCHAR(50) = 'comic-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ComicTitle NVARCHAR(200) = 'Tên Truyện';
DECLARE @ComicAuthor NVARCHAR(100) = 'Tác Giả';
DECLARE @ComicDescription NVARCHAR(MAX) = 'Mô Tả Truyện';
DECLARE @ComicStatus NVARCHAR(20) = 'ongoing'; -- ongoing | completed
DECLARE @CoverImageUrl NVARCHAR(500) = 'https://...';

-- Chapter Variables
DECLARE @ChapterId NVARCHAR(50) = 'chapter-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @ChapterNumber INT = 1;
DECLARE @ChapterTitle NVARCHAR(200) = 'Chương 1: Khởi Đầu';

-- Page Variables
DECLARE @PageId NVARCHAR(50) = 'page-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @PageNumber INT = 1;
DECLARE @ImageUrl NVARCHAR(500) = 'https://picsum.photos/800/1200';
DECLARE @FileSize INT = 102400;

-- User Variables
DECLARE @UserId NVARCHAR(50) = 'user-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @Username NVARCHAR(100) = 'username';
DECLARE @Password NVARCHAR(255) = 'password';
DECLARE @IsAdmin BIT = 0;

-- Common Variables
DECLARE @LogId NVARCHAR(50) = 'log-' + CAST(NEWID() AS NVARCHAR(36));
DECLARE @CurrentDate DATETIME = GETDATE();

-- ========== QUERY EXAMPLES ==========

-- Ví dụ 1: Lấy tất cả truyện tranh
SELECT * FROM Comics;

-- Ví dụ 2: Tạo truyện mới
INSERT INTO Comics (id, title, author, description, status, coverImage, views, rating, ratingCount)
VALUES (@ComicId, @ComicTitle, @ComicAuthor, @ComicDescription, @ComicStatus, @CoverImageUrl, 0, 0, 0);

-- Ví dụ 3: Lấy tất cả chương của một truyện
SELECT * FROM Chapters WHERE comicId = @ComicId ORDER BY number ASC;

-- Ví dụ 4: Tạo chương mới
INSERT INTO Chapters (id, comicId, number, title)
VALUES (@ChapterId, @ComicId, @ChapterNumber, @ChapterTitle);

-- Ví dụ 5: Lấy tất cả trang của một chương
SELECT * FROM Pages WHERE chapterId = @ChapterId ORDER BY pageNumber ASC;

-- Ví dụ 6: Thêm trang hình ảnh
INSERT INTO Pages (id, chapterId, comicId, pageNumber, imageUrl, fileSize, uploadedAt)
VALUES (@PageId, @ChapterId, @ComicId, @PageNumber, @ImageUrl, @FileSize, @CurrentDate);

-- Ví dụ 7: Lấy tất cả người dùng
SELECT * FROM Users;

-- Ví dụ 8: Tạo người dùng mới
INSERT INTO Users (id, username, password, isAdmin, createdAt)
VALUES (@UserId, @Username, @Password, @IsAdmin, @CurrentDate);

-- Ví dụ 9: Lấy yêu thích của một người dùng
SELECT Comics.*, Favorites.addedAt FROM Comics
INNER JOIN Favorites ON Comics.id = Favorites.comicId
WHERE Favorites.userId = @UserId;

-- Ví dụ 10: Thống kê lượt xem truyện
SELECT title, views, rating, ratingCount FROM Comics ORDER BY views DESC;
`;

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-lg p-6 mb-6`}>
      <h2 className="text-2xl font-bold mb-6">
        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          📊 SQL Command Executor
        </span>
      </h2>

      {/* SQL Config Info */}
      {sqlConfig && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg mb-6 text-sm`}>
          <h3 className="font-semibold mb-3">Thông tin kết nối SQL Server:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">Server:</span> {sqlConfig.server}
            </div>
            <div>
              <span className="font-semibold">Database:</span> {sqlConfig.database}
            </div>
            <div>
              <span className="font-semibold">User:</span> {sqlConfig.userName}
            </div>
            <div>
              <span className="font-semibold">Port:</span> {sqlConfig.port}
            </div>
            <div>
              <span className="font-semibold">Encryption:</span> {sqlConfig.encryption ? 'Có' : 'Không'}
            </div>
            <div>
              <span className="font-semibold">Trust Cert:</span> {sqlConfig.trustServerCertificate ? 'Có' : 'Không'}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-300">
        {(['executor', 'logs', 'variables'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === tab
                ? 'text-blue-500 border-b-2 border-blue-500'
                : darkMode
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab === 'executor' && '⚡ Executor'}
            {tab === 'logs' && '📋 Logs'}
            {tab === 'variables' && '📝 Variables'}
          </button>
        ))}
      </div>

      {/* EXECUTOR TAB */}
      {activeTab === 'executor' && (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nhập lệnh SQL:</label>
            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className={`w-full h-64 p-4 border rounded-lg font-mono text-sm ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              }`}
              placeholder="Nhập câu lệnh SQL..."
              spellCheck="false"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={executeSqlQuery}
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 transition"
            >
              {loading ? '⏳ Đang thực thi...' : '▶️ Thực thi'}
            </button>
            <button
              onClick={() => setShowLogs(!showLogs)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              📋 Logs ({sqlLogs.length})
            </button>
            <button
              onClick={() => setSqlQuery('')}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              🗑️ Xóa
            </button>
          </div>

          {/* Query Result */}
          {queryResult && (
            <div
              className={`p-4 rounded-lg border-2 ${
                queryResult.success
                  ? darkMode
                    ? 'bg-green-900 border-green-700'
                    : 'bg-green-50 border-green-300'
                  : darkMode
                  ? 'bg-red-900 border-red-700'
                  : 'bg-red-50 border-red-300'
              }`}
            >
              <h3 className={`font-bold mb-2 ${queryResult.success ? 'text-green-400' : 'text-red-400'}`}>
                {queryResult.success ? '✓ Thành công' : '✗ Lỗi'}
              </h3>
              <p className="mb-2">{queryResult.message}</p>
              {queryResult.rowsAffected && (
                <p className="text-sm mb-2">Hàng bị ảnh hưởng: {queryResult.rowsAffected.join(', ')}</p>
              )}
              {queryResult.error && (
                <p className={`text-sm font-mono ${queryResult.success ? 'text-green-300' : 'text-red-300'}`}>
                  {queryResult.error}
                </p>
              )}

              {/* Display Recordset */}
              {queryResult.recordset && queryResult.recordset.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        {Object.keys(queryResult.recordset[0]).map(key => (
                          <th key={key} className="border p-2 text-left">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.recordset.slice(0, 10).map((row, idx) => (
                        <tr key={idx} className={`${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} border-t`}>
                          {Object.values(row).map((value, idx) => (
                            <td key={idx} className="border p-2 break-words max-w-xs">
                              {JSON.stringify(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {queryResult.recordset.length > 10 && (
                    <p className="text-sm mt-2 text-gray-400">
                      Hiển thị 10 / {queryResult.recordset.length} hàng
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* LOGS TAB */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <button
            onClick={fetchSqlLogs}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            🔄 Tải lại Logs
          </button>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sqlLogs.length === 0 ? (
              <p className="text-gray-500">Không có log nào</p>
            ) : (
              sqlLogs.map(log => (
                <div
                  key={log.id}
                  className={`p-3 rounded-lg border ${
                    log.status === 'success'
                      ? darkMode
                        ? 'bg-green-900 border-green-700'
                        : 'bg-green-50 border-green-300'
                      : darkMode
                      ? 'bg-red-900 border-red-700'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-bold text-sm ${log.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {log.status === 'success' ? '✓' : '✗'} {log.status}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(log.executedAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs font-mono break-all mb-1">{log.query}</p>
                  {log.errorMessage && (
                    <p className="text-xs text-red-400">{log.errorMessage}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* VARIABLES TAB */}
      {activeTab === 'variables' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Các biến và ví dụ query dùng trong ứng dụng Comic
          </p>
          <textarea
            value={sqlVariables}
            readOnly
            className={`w-full h-96 p-4 border rounded-lg font-mono text-xs ${
              darkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
          <button
            onClick={() => setSqlQuery(sqlVariables)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            📋 Sao chép vào Executor
          </button>
        </div>
      )}
    </div>
  );
}

export default SQLCommandExecutor;
