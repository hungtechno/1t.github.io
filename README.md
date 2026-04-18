# AI Interior Image Render System

Hệ thống render ảnh nội thất chuyên nghiệp sử dụng công nghệ AI mạnh mẽ từ Pollinations. Hệ thống cho phép người dùng chọn ảnh chụp màn hình từ các phần mềm thiết kế 3D và biến chúng thành những bản render photorealistic chất lượng cao.

## 🚀 Tính năng nổi bật
- **AI Rendering**: Kết nối trực tiếp với Pollinations AI.
- **2K Resolution**: Ảnh đầu ra đạt độ phân giải và chất lượng cao.
- **Floating UI**: Giao diện nút bấm lơ lững dễ dàng tích hợp vào mọi dự án có sẵn.
- **Instant Preview**: Xem trước ảnh ngay khi chọn file.
- **One-click Download**: Tải kết quả về máy chỉ với một lần nhấn.

## 🛠️ Công nghệ sử dụng
- **Backend**: Node.js, Express, Multer.
- **Frontend**: Vanilla JavaScript (ES6+), CSS Flexbox.
- **AI API**: Pollinations AI (Text-to-Image / Image-to-Image).

## 📦 Cài đặt và sử dụng

1. **Clone repository**:
   ```bash
   git clone <your-repo-url>
   cd 3dnoithat3
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Chạy server**:
   ```bash
   npm start
   ```

4. **Truy cập**:
   Mở trình duyệt tại `http://localhost:3000`.

## 📂 Cấu trúc thư mục
- `server.js`: Xử lý logic phía máy chủ và gọi API AI.
- `index.html`: Giao diện người dùng tích hợp sẵn UI AI Render.
- `style.css`: Hệ thống thiết kế và các hiệu ứng Modal.
- `script.js`: Logic xử lý phía người dùng.
- `ai_integration_prompt.md`: Tài liệu hướng dẫn tích hợp lại cho các dự án khác.

---
Phát triển bởi [Antigravity AI Assistant]
