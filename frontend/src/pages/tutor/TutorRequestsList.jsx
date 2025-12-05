import React from 'react';
import Header from '../../components/layout/Header';

const TutorRequestsList = () => {
    // Nơi đây sẽ hiển thị danh sách Yêu cầu từ sinh viên (gọi api.getTutorRequests)
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Danh sách Yêu cầu Dạy kèm</h1>
                <p className="text-lg">Tutor duyệt yêu cầu của sinh viên tại đây.</p>
            </div>
        </div>
    );
};

export default TutorRequestsList;