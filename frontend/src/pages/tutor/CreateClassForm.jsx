import React from 'react';
import Header from '../../components/layout/Header';

const CreateClassForm = () => {
    // Nơi đây sẽ là form Tạo Lớp học mới (gọi api.createClass)
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Tạo Lớp học mới</h1>
                <p className="text-lg">Thiết lập chi tiết về thời gian, địa điểm, và môn học.</p>
            </div>
        </div>
    );
};

export default CreateClassForm;