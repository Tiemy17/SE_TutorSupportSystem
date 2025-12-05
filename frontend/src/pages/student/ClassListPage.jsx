import React from 'react';
import Header from '../../components/layout/Header';

const ClassListPage = () => {
    // Nơi đây sẽ gọi API để lấy danh sách các lớp học có thể đăng ký
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Danh sách Khóa học</h1>
                <p className="text-lg">Sinh viên có thể tìm và đăng ký lớp ở đây.</p>
            </div>
        </div>
    );
};

export default ClassListPage;