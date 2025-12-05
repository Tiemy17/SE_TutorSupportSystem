import React from 'react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();
    
    // Nơi đây sẽ gọi API getProfile và hiển thị chi tiết
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Hồ sơ Cá nhân</h1>
                <p className="text-lg text-red-500">Trang đang trong quá trình phát triển (Chỉ hiển thị cơ bản)</p>
                <div className="mt-4 p-4 bg-white rounded shadow">
                    <p>Vai trò: {user?.role}</p>
                    <p>Tên: {user?.name}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;