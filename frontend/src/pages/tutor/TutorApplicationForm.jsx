import React from 'react';
import Header from '../../components/layout/Header';

const TutorApplicationForm = () => {
    // Nơi đây sẽ là form Đăng ký Tutor chi tiết (gọi api.submitTutorApplication)
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Đơn Đăng ký trở thành Gia sư</h1>
                <p className="text-lg">Hoàn thiện thông tin cá nhân và thành tích để được duyệt.</p>
            </div>
        </div>
    );
};

export default TutorApplicationForm;