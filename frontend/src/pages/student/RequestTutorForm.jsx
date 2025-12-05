import React from 'react';
import Header from '../../components/layout/Header';

const RequestTutorForm = () => {
    // Nơi đây sẽ là form Yêu cầu Tutor (gọi api.requestTutor)
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Form Yêu cầu Gia sư</h1>
                <p className="text-lg">Điền thông tin môn học và nhu cầu hỗ trợ.</p>
            </div>
        </div>
    );
};

export default RequestTutorForm;