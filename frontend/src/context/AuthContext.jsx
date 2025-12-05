import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
// Import NotificationToast để sử dụng showNotification
import NotificationToast from '../components/ui/NotificationToast'; 

// 1. Định nghĩa Auth Context
const AuthContext = createContext();

// 2. Khởi tạo trạng thái ban đầu
const initialAuthState = {
    isLoggedIn: false,
    user: null, // Chứa thông tin user: { name, role, email, ... }
    role: null,
    isLoading: true, // Trạng thái đang tải (kiểm tra token lúc khởi động)
};

export const AuthProvider = ({ children }) => {
    // Lưu ý: useNavigate chỉ hoạt động trong component được bọc bởi Router.
    const navigate = useNavigate(); 
    const [authState, setAuthState] = useState(initialAuthState);
    const [notification, setNotification] = useState(null); // Trạng thái thông báo

    // 3. Hiển thị thông báo (toast)
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000); // Tự động ẩn sau 3 giây
    };

    // 4. Kiểm tra Token khi ứng dụng khởi động
    useEffect(() => {
        const loadUserFromToken = async () => {
            const token = localStorage.getItem('authToken');
            
            if (token) {
                try {
                    // Gọi API getProfile
                    const profile = await api.getProfile(); 

                    setAuthState({
                        isLoggedIn: true,
                        user: profile,
                        role: profile.role,
                        isLoading: false,
                    });
                } catch (error) {
                    // Nếu token lỗi/hết hạn, xóa token và đăng xuất
                    console.error("Token invalid, logging out:", error);
                    localStorage.removeItem('authToken');
                    // Chuyển hướng đến trang login
                    navigate('/login'); 
                    setAuthState({ ...initialAuthState, isLoading: false });
                    showNotification("Phiên làm việc hết hạn. Vui lòng đăng nhập lại.", 'error');
                }
            } else {
                setAuthState({ ...initialAuthState, isLoading: false });
            }
        };

        loadUserFromToken();
    }, [navigate]); 

    // 5. Hàm Đăng nhập
    const login = async (credentials) => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        try {
            // Gọi API Login, api.js sẽ lưu token vào localStorage
            await api.login(credentials);
            
            // Lấy profile thực tế sau khi đăng nhập
            const profile = await api.getProfile(); 

            setAuthState({
                isLoggedIn: true,
                user: profile,
                role: profile.role,
                isLoading: false,
            });

            // Chuyển hướng dựa trên vai trò
            if (profile.role === 'admin') navigate('/admin/dashboard');
            else if (profile.role === 'tutor') navigate('/tutor/dashboard');
            else navigate('/student/dashboard');

            showNotification("Đăng nhập thành công!", 'success');
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            setAuthState(prev => ({ ...prev, isLoading: false }));
            showNotification(`Lỗi đăng nhập: ${error.message || 'Không thể kết nối máy chủ.'}`, 'error');
            return false;
        }
    };

    // 6. Hàm Đăng xuất
    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthState({ ...initialAuthState, isLoading: false });
        showNotification("Bạn đã đăng xuất.", 'info');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout, showNotification }}>
            {children}
            {/* Component Toast sẽ được render ở đây */}
            {notification && <NotificationToast message={notification.message} type={notification.type} />}
        </AuthContext.Provider>
    );
};

// Export hook để các Component sử dụng
export const useAuth = () => useContext(AuthContext);