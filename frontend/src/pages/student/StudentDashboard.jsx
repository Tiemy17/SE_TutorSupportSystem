import React from 'react';
import Header from '../../components/layout/Header'; 
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-green-600 mb-6">STUDENT DASHBOARD</h1>
                <p className="text-lg">Chào mừng, {user?.name} ({user?.role})!</p>
                <div className="mt-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-3">Thông tin Tổng quan</h2>
                    <p>Đây là nơi hiển thị các thống kê khóa học đang tham gia, lịch học sắp tới và thông báo mới.</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;