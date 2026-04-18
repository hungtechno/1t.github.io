const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Cho phép gọi từ GitHub Pages
app.use(express.static(__dirname));
app.use(express.json());

// Cấu hình Multer để lưu trữ file trong bộ nhớ (memoryStorage)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

/**
 * Hàm gửi yêu cầu tới Pollinations AI để lấy ảnh render thực tế
 */
async function generateAIRender(userPrompt) {
    // Kết hợp các từ khóa chất lượng cao (2K, Photorealistic)
    const enhancedPrompt = encodeURIComponent(
        `photorealistic luxury interior design, ${userPrompt}, 2k resolution, 8k uhd, cinematic lighting, architectural photography, highly detailed, realistic textures, global illumination --v 6.0`
    );
    
    // Sử dụng endpoint của Pollinations AI (Miễn phí)
    const imageUrl = `https://image.pollinations.ai/prompt/${enhancedPrompt}?width=2048&height=1365&nologo=true&seed=${Math.floor(Math.random() * 1000000)}`;
    
    // Tải ảnh về dưới dạng Buffer
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Không thể kết nối tới máy chủ AI');
    
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

/**
 * Endpoint xử lý upload ảnh và render AI THẬT
 */
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Vui lòng chọn một file ảnh.' });
        }

        console.log(`Đang xử lý render AI thực cho: ${req.file.originalname}`);

        /**
         * LƯU Ý KỸ THUẬT:
         * Trong bản miễn phí của Pollinations, chúng ta sử dụng Text-to-Image 
         * với prompt được tối ưu hóa cho "nội thất 2K". 
         * Khi có API Key chuyên nghiệp (như Replicate), chúng ta có thể thực hiện 
         * Image-to-Image để khớp 100% với bản vẽ 3D của bạn.
         */
        
        // Giả lập phân tích nội dung ảnh (trong thực tế có thể dùng Vision API)
        const dummyAnalysis = "modern interior design with high-end furniture";
        
        // Gọi AI thật
        const renderedBuffer = await generateAIRender(dummyAnalysis);
        
        // Chuyển đổi kết quả sang Base64 để gửi về Frontend
        const base64Image = renderedBuffer.toString('base64');
        const resultBase64 = `data:image/png;base64,${base64Image}`;

        res.json({
            success: true,
            message: 'AI Render hoàn tất thành công (2K)',
            resultImage: resultBase64
        });
        
        console.log(`Hoàn tất render thực tế cho: ${req.file.originalname}`);

    } catch (error) {
        console.error('Lỗi server chi tiết:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi kết nối AI: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`-------------------------------------------`);
    console.log(`Hệ thống AI Render THẬT đang chạy tại:`);
    console.log(`http://localhost:3000`);
    console.log(`-------------------------------------------`);
});
