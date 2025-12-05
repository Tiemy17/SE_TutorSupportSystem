import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // <--- File CSS của bạn (chứa Tailwind) được tải tại đây

// 1. Kiểm tra phần tử gốc (root) có tồn tại không
const rootElement = document.getElementById('root');

if (rootElement) {
    // 2. Sử dụng ReactDOM.createRoot để khởi tạo ứng dụng React
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            {/* 3. Component App là nơi chứa Router và Auth Context */}
            <App /> 
        </React.StrictMode>
    );
} else {
    // Thông báo lỗi nếu không tìm thấy phần tử 'root' trong index.html
    console.error("Lỗi: Không tìm thấy phần tử 'root' trong index.html. Vui lòng kiểm tra file index.html.");
}