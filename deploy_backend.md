# Hướng dẫn Deploy Backend AI lên Render.com

Để tính năng AI hoạt động trên trang web GitHub của bạn, bạn cần đưa server backend lên một dịch vụ hỗ trợ Node.js. **Render.com** là lựa chọn tốt nhất và miễn phí.

## Bước 1: Chuẩn bị Repository
1. Đảm bảo bạn đã **Push** tất cả code mới nhất lên GitHub (bao gồm cả file `server.js`, `package.json` và `script.js` mà tôi vừa sửa).
2. Kiểm tra xem file `package.json` đã có dòng `"cors": "^2.8.5"` chưa.

## Bước 2: Đăng ký Render.com
1. Truy cập [render.com](https://render.com/) và đăng ký bằng tài khoản GitHub của bạn.

## Bước 3: Tạo Web Service mới
1. Nhấn nút **New +** và chọn **Web Service**.
2. Chọn Repository của bạn từ danh sách đã kết nối.
3. Cấu hình các thông số sau:
   - **Name:** `3d-interior-ai-backend` (hoặc tên tùy ý)
   - **Region:** Chọn vùng gần nhất (ví dụ: Singapore)
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Chọn gói **Free**.
5. Nhấn **Create Web Service**.

## Bước 4: Lấy URL và Cập nhật Frontend
1. Sau khi Render thông báo "Live", bạn sẽ thấy một đường link (ví dụ: `https://3d-interior-ai-backend.onrender.com`). Hãy copy đường link này.
2. Quay lại file `script.js` trong thư mục code của bạn.
3. Tìm đến biến `CONFIG` ở ngay đầu file và dán link vào:
   ```javascript
   const CONFIG = {
       BACKEND_URL: 'https://3d-interior-ai-backend.onrender.com' // Thay bằng link của bạn
   };
   ```
4. **Lưu file** và **Push** lại lên GitHub một lần nữa.

---
> [!TIP]
> Sau khi hoàn thành, trang web trên GitHub của bạn sẽ có thể kết nối tới server Render để xử lý ảnh AI mà không còn bị lỗi 405 nữa!
