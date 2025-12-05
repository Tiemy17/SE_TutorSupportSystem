import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaBars } from 'react-icons/fa'; // Dùng react-icons

const Header = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();

    // Hàm chuyển hướng đến Dashboard phù hợp
    const navigateToDashboard = () => {
        if (user?.role === 'admin') navigate('/admin/dashboard');
        else if (user?.role === 'tutor') navigate('/tutor/dashboard');
        else if (user?.role === 'student') navigate('/student/dashboard');
    };
    
    // Hàm lấy đường dẫn Profile hoặc Dashboard (dùng cho nút chính)
    const getProfileLink = () => {
        if (!user) return '/login';
        if (user.role === 'admin') return '/admin/dashboard';
        return '/profile'; // Student/Tutor thường vào trang Profile chi tiết
    };

    return (
        <header className="main-header bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
                
                {/* Logo */}
                <div className="logo text-2xl font-black text-red-600">
                    <Link to="/">[Logo] HCMUT</Link>
                </div>
                
                {/* Main Navigation (Cho Desktop) */}
                <nav className="main-nav hidden md:block">
                    <ul className="flex space-x-6">
                        <li><Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition">HOME</Link></li>
                        <li><Link to="/tutor/apply" className="text-gray-700 hover:text-red-600 font-medium transition">TUTOR</Link></li>
                        <li><Link to="/classes/list" className="text-gray-700 hover:text-red-600 font-medium transition">COURSES</Link></li>
                        <li><a href="#" className="text-gray-700 hover:text-red-600 font-medium transition">BLOG</a></li>
                        <li><a href="#" className="text-gray-700 hover:text-red-600 font-medium transition">FAQ</a></li>
                    </ul>
                </nav>

                {/* User Actions */}
                <div className="user-actions flex items-center space-x-3">
                    {isLoggedIn ? (
                        <>
                            {/* Trạng thái Đã Đăng nhập */}
                            <button 
                                onClick={navigateToDashboard}
                                className="btn-profile-link flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 rounded-full transition duration-150 text-sm"
                            >
                                <FaUserCircle className="mr-2 text-red-600" />
                                <span className="hidden sm:inline">{user?.name}</span>
                                <span className="sm:hidden">{user?.role}</span>
                            </button>
                            
                            <button 
                                onClick={logout}
                                className="text-red-600 hover:text-red-700 transition duration-150 p-2 rounded-full hover:bg-red-50"
                                title="Đăng xuất"
                            >
                                <FaSignOutAlt className="text-lg" />
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Trạng thái Chưa Đăng nhập */}
                            <Link 
                                to="/login"
                                className="btn-login bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 flex items-center text-sm"
                            >
                                <FaSignInAlt className="mr-2" />
                                LOGIN
                            </Link>
                        </>
                    )}
                    
                    {/* Menu mobile button (chưa implement logic) */}
                    <button className="md:hidden text-gray-700 hover:text-red-600 p-2">
                        <FaBars className="text-lg" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;