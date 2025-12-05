import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Component bảo vệ tuyến đường (Route Guard)
 * @param {string} allowedRoles - Chuỗi các vai trò được phép (vd: "student,tutor")
 */
const AuthGuard = ({ allowedRoles }) => {
    const { isLoggedIn, role, isLoading } = useAuth();
    
    // 1. Hiển thị Loading trong khi chờ kiểm tra Token
    if (isLoading) {
        // Có thể thay thế bằng một spinner đẹp hơn (ví dụ: Tailwind spinner)
        return <div className="min-h-screen flex items-center justify-center text-xl p-5">Đang kiểm tra xác thực...</div>;
    }

    // 2. Nếu chưa đăng nhập, chuyển hướng về trang Login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // 3. Nếu đăng nhập rồi, kiểm tra Vai trò (Role)
    const rolesArray = allowedRoles.split(',').map(r => r.trim());

    if (rolesArray.includes(role)) {
        // Vai trò hợp lệ, hiển thị nội dung trang (Outlet)
        return <Outlet />;
    } else {
        // Vai trò không hợp lệ (vd: Student cố gắng truy cập Admin Dashboard)
        // Chuyển hướng về Dashboard mặc định của họ
        if (role === 'student') return <Navigate to="/student/dashboard" replace />;
        if (role === 'tutor') return <Navigate to="/tutor/dashboard" replace />;
        // Nếu là Admin hoặc vai trò không xác định, chuyển về trang chủ
        return <Navigate to="/" replace />; 
    }
};

export default AuthGuard;