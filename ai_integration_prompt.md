# AI Image Render Integration - Complete Guide

Bản tài liệu này tổng hợp toàn bộ quy trình để tích hợp hệ thống AI Render vào bất kỳ dự án Web thiết kế 3D nào khác.

---

### 1. Thành phần Backend (Node.js)
Tạo file `server.js` để xử lý việc lưu trữ ảnh tạm thời và giả lập quá trình render.

- **Dependencies**: `express`, `multer`.
- **Cấu hình**: Sử dụng `memoryStorage` để tốc độ xử lý nhanh nhất.
- **Endpoint**: `POST /upload` trả về Base64 của ảnh kết quả.

**Lưu ý quan trọng về Cổng (Port):**
Luôn chạy server và truy cập web trên cùng một cổng (mặc định là `3000`). Nếu bạn mở web trên cổng `3001` (qua Live Server) nhưng server chạy cổng `3000`, bạn sẽ gặp lỗi 404.

---

### 2. Thành phần Giao diện (HTML)
Tích hợp các thành phần sau vào ngay trước thẻ đóng `</body>`:

```html
<!-- Nút Floating Action Button (Góc trái bên dưới) -->
<button class="btn-ai-floating" id="btn-ai-render">AI Render</button>

<!-- Modal Overlay -->
<div class="modal-overlay" id="modal-overlay">
    <!-- Cấu trúc Modal gồm: Header, Instruction, Preview, Result và Footer Actions -->
</div>
```

---

### 3. Thiết kế CSS (Style)
Sử dụng các đặc tính sau để nút bấm trông hiện đại:
- **`position: fixed`**: Để nút luôn nổi trên giao diện 3D.
- **`backdrop-filter: blur()`**: Tạo hiệu ứng kính mờ cho Modal.
- **`z-index: 9999`**: Đảm bảo Modal không bị các thành phần 3D che mất.

**Mẹo màu sắc chuyên nghiệp:**
- Nút AI: `#2563eb` (Xanh công nghệ).
- Nút Tải về: `#10b981` (Xanh lục thành công).

---

### 4. Logic JavaScript
- **FileReader**: Dùng để hiển thị ảnh ngay lập tức khi người dùng chọn file (Preview).
- **Fetch API**: Gửi `FormData` chứa ảnh lên backend.
- **Download Automation**: 
  ```javascript
  const link = document.createElement('a');
  link.href = data.resultImage; // Base64 từ server
  link.download = 'render-result.png';
  link.click();
  ```

---

### 5. Khắc phục lỗi thường gặp (Troubleshooting)
- **Lỗi 404**: Kiểm tra xem địa chỉ trên trình duyệt có khớp với cổng server đang chạy không (Ví dụ: [http://localhost:3000](http://localhost:3000)).
- **Lỗi File quá lớn**: Mặc định hệ thống hỗ trợ tới 10MB. Có thể chỉnh sửa `fileSize` trong cấu hình `multer` ở `server.js`.
- **Iframe bị 404**: Nếu trang web cũ có các iframe hướng dẫn bị hỏng, hãy kiểm tra lại URL hoặc tạm ẩn chúng để giao diện sạch sẽ hơn.

---
*Chúc bạn thực hiện dự án tiếp theo thành công!*
