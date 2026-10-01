# Web App Học Tiếng Anh Cá Nhân (Mobile First)

Ứng dụng web học tiếng Anh cá nhân được tối ưu hóa cho điện thoại di động (PWA), học theo giáo trình chuẩn **Cambridge Prepare! Level 3 (2nd Edition)** và **Giáo trình phát âm 11 Units**, đồng thời quản lý lịch học 1vs1 và tự động tính tổng giờ học với giáo viên.

## Tính năng chính
1. **Trang chủ (Dashboard):** Hiển thị bài học hiện tại, tiến độ tổng quan, lịch học tiếp theo với giáo viên, tổng thời gian học tích lũy.
2. **Học theo giáo trình (Prepare L3):** 20 Units chuẩn, hệ thống flashcard từ vựng, ngữ pháp, phát âm và đánh dấu tiến độ bài học.
3. **Luyện phát âm chuyên sâu:** 11 Units cặp âm đối chiếu, hướng dẫn vị trí môi/lưỡi, cặp từ tương phản (minimal pairs), câu luyện tập có IPA.
4. **Quản lý lịch học 1vs1:** Ghi nhận buổi học, tự động tính thời lượng, thống kê tổng giờ học theo tháng/năm.
5. **Hỗ trợ 2 người học:** Lịch học với giáo viên được đồng bộ chung; tiến độ từ vựng và tự học được tách biệt riêng cho từng tài khoản.

## Công nghệ sử dụng
- **Next.js 16 (App Router)** & **React 19**
- **TypeScript** & **Tailwind CSS**
- **Supabase** (PostgreSQL & Row Level Security)
- **Web Speech API** (Phát âm bản xứ chuẩn)
- **PWA** (Cài đặt trực tiếp lên màn hình điện thoại)

## Hướng dẫn cài đặt & chạy Local
```bash
# 1. Cài đặt dependencies
npm install

# 2. Cấu hình file .env.local
cp .env.example .env.local
# Điền thông tin NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Chạy môi trường development
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

## Triển khai lên Vercel
Kết nối repository GitHub này trực tiếp với Vercel và cấu hình 2 biến môi trường:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
