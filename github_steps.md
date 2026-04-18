# Hướng dẫn đưa dự án lên GitHub

Làm theo các bước sau để chia sẻ dự án của bạn với thế giới:

### Bước 1: Khởi tạo Git Local
Mở terminal tại thư mục dự án và chạy các lệnh sau:

```bash
# Khởi tạo repository
git init

# Thêm tất cả các file vào danh sách chờ (staging)
git add .

# Xác nhận các thay đổi (commit)
git commit -m "Tính năng: Tích hợp AI Render thật và tối ưu UI"
```

### Bước 2: Tạo Repository trên GitHub
1. Truy cập [github.com/new](https://github.com/new).
2. Nhập tên dự án (ví dụ: `3d-interior-ai-render`).
3. Nhấn **Create repository**.

### Bước 3: Kết nối và Đẩy code lên GitHub
Sau khi tạo repo, GitHub sẽ cung cấp các lệnh để kết nối. Hãy copy và chạy các lệnh tương tự như sau (thay URL bằng URL của bạn):

```bash
# Kết nối với repo online (thay bằng URL repo của bạn)
git remote add origin https://github.com/username/your-repo-name.git

# Đổi tên nhánh chính thành main
git branch -M main

# PUSH code lên GitHub
git push -u origin main
```

---
**Lưu ý:** Nếu bạn chưa đăng nhập, Git sẽ yêu cầu bạn xác thực thông qua trình duyệt hoặc Token.
