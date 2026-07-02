# Cờ Tỷ Phú Online - Multiplayer Monopoly Clone

Web game "Cờ Tỷ Phú" (Monopoly-style) nhiều người chơi trực tuyến trong thời gian thực (real-time) trên trình duyệt, thiết kế tối ưu hóa cho cả máy tính và điện thoại.

Dự án được cấu trúc theo dạng Monorepo để dễ quản lý cả mã nguồn Frontend và Cơ sở dữ liệu Backend.

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend**: React 18 (Vite), TypeScript, TailwindCSS, Zustand (State Management), Framer Motion (Animations).
- **Backend / Database**: Supabase (PostgreSQL, Supabase Realtime, Row Level Security, RPC Postgres Functions).
- **Deployment**: Vercel (Frontend), Supabase Cloud (Backend).

---

## 📂 Cấu Trúc Dự Án

```text
co-ty-phu-online/
  ├── apps/
  │   └── web/                  # Dự án Frontend React (Vite)
  │       ├── src/
  │       │   ├── components/   # Các thành phần giao diện (Board, Tile, Dice, Modals...)
  │       │   ├── hooks/        # Hook đồng bộ thời gian thực (useRealtimeRoom)
  │       │   ├── lib/          # Khởi tạo Supabase client & hàm tiện ích
  │       │   ├── pages/        # Trang Home và GameRoom
  │       │   ├── store/        # Zustand Store quản lý trạng thái
  │       │   └── types/        # Định nghĩa kiểu dữ liệu TypeScript
  │       └── vite.config.ts
  ├── supabase/
  │   └── migrations/           # File SQL di cư thiết lập bảng và các hàm RPC
  ├── README.md                 # Hướng dẫn chạy & triển khai dự án
  ├── GAME_RULES.md             # Hướng dẫn luật chơi chi tiết
  └── package.json              # File quản lý Monorepo
```

---

## 🚀 Hướng Dẫn Chạy Local

### 1. Cài đặt các gói phụ thuộc
Tại thư mục gốc, hãy chạy lệnh cài đặt để tự động cấu hình các workspace:
```bash
npm install
```

### 2. Thiết lập cơ sở dữ liệu Supabase
1. Tạo một dự án mới trên [Supabase Console](https://supabase.com).
2. Sao chép và thực thi tệp SQL di cư tại `supabase/migrations/20260702000000_init.sql` thông qua **SQL Editor** trong bảng điều khiển Supabase của bạn.
3. Kích hoạt tính năng **Realtime** cho các bảng `rooms`, `room_players`, `game_states`, và `game_trades` (Vào phần *Database > Replication* trên Supabase và bật nút Realtime).

### 3. Cấu hình biến môi trường
Tạo tệp `.env` tại thư mục `apps/web/` với nội dung sau:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Khởi chạy ứng dụng
Tại thư mục gốc, chạy lệnh sau để chạy Frontend:
```bash
npm run dev
```
Trình duyệt sẽ tự động mở tại địa chỉ `http://localhost:5173`. Bạn có thể mở 2-4 tab ẩn danh khác nhau để giả lập nhiều người chơi và chơi thử trên máy tính của mình.

---

## 🧪 Chạy Kiểm Thử (Unit Tests)

Dự án sử dụng **Vitest** để kiểm tra các quy tắc nghiệp vụ cốt lõi (tính tiền thuê, kiểm tra độc quyền màu, xây dựng đồng đều, phá sản, người chiến thắng).
Tại thư mục gốc, chạy lệnh:
```bash
npm run test
```

---

*Phát triển và hoàn thiện bởi Vinh Pro.*
