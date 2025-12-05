import React from 'react';
import Header from '../../components/layout/Header';

const ClassDetailPage = () => {
    // Nơi đây sẽ hiển thị chi tiết lớp học và nút Đăng ký (Register Class Modal)
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Chi tiết Lớp học</h1>
                <p className="text-lg">Thông tin chi tiết về lịch trình và Gia sư.</p>
            </div>
        </div>
    );
};

export default ClassDetailPage;