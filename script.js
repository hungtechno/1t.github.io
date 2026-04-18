/**
 * script.js - Xử lý logic AI Render (Tích hợp)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Các phần tử UI
    const btnOpenModal = document.getElementById('btn-ai-render');
    const modalOverlay = document.getElementById('modal-overlay');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const fileInput = document.getElementById('file-upload');
    const btnSend = document.getElementById('btn-send-ai');
    
    const previewOriginal = document.getElementById('preview-original');
    const previewResult = document.getElementById('preview-result');
    const loader = document.getElementById('loader');
    const statusText = document.getElementById('status-text');

    let selectedFile = null;

    // --- 1. Quản lý Modal ---
    const openModal = () => {
        if (modalOverlay) {
            modalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        }
    };

    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetState();
        }
    };

    if (btnOpenModal) btnOpenModal.addEventListener('click', openModal);
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // --- 2. Xử lý FileReader để Preview ảnh ---
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            selectedFile = file;
            if (btnSend) btnSend.disabled = false;

            const reader = new FileReader();
            reader.onload = (event) => {
                if (previewOriginal) previewOriginal.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // --- 3. Gửi FormData lên Backend ---
    if (btnSend) {
        btnSend.addEventListener('click', async () => {
            if (!selectedFile) return;

            try {
                setLoading(true);
                if (statusText) statusText.innerText = 'Đang xử lý render AI...';
                if (previewResult) {
                    previewResult.src = 'https://via.placeholder.com/600x400?text=Ket+qua';
                }
                const btnDownload = document.getElementById('btn-download-ai');
                if (btnDownload) btnDownload.style.display = 'none';

                const formData = new FormData();
                formData.append('image', selectedFile);

                // Gọi tới endpoint server.js
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const status = response.status;
                    let errorMsg = `Lỗi server (Status: ${status})`;
                    try {
                        const errorJson = await response.json();
                        errorMsg = errorJson.error || errorMsg;
                    } catch (e) {}
                    throw new Error(errorMsg);
                }

                const data = await response.json();

                if (data.success) {
                    if (previewResult) previewResult.src = data.resultImage;
                    if (statusText) statusText.innerText = 'Render thành công!';
                    
                    // Hiển thị nút tải về
                    if (btnDownload) {
                        btnDownload.style.display = 'block';
                        btnDownload.onclick = () => {
                            const link = document.createElement('a');
                            link.href = data.resultImage;
                            link.download = 'ai-rendered-interior.png';
                            link.click();
                        };
                    }
                }

            } catch (error) {
                console.error('AI Render Error:', error);
                alert('Lỗi: ' + error.message);
                if (statusText) statusText.innerText = 'Xảy ra lỗi.';
            } finally {
                setLoading(false);
            }
        });
    }

    // --- Hàm hỗ trợ ---
    function setLoading(isLoading) {
        if (loader) loader.style.display = isLoading ? 'flex' : 'none';
        if (btnSend) btnSend.disabled = isLoading;
    }

    function resetState() {
        selectedFile = null;
        if (fileInput) fileInput.value = '';
        if (btnSend) btnSend.disabled = true;
        if (previewOriginal) previewOriginal.src = 'https://via.placeholder.com/600x400?text=Chua+co+anh';
        if (previewResult) previewResult.src = 'https://via.placeholder.com/600x400?text=Ket+qua';
        if (statusText) statusText.innerText = '';
    }
});
