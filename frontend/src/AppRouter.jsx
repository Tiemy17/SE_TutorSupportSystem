import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import Provider
import AuthGuard from './components/layout/AuthGuard'; // Import Guard

// Import tất cả các trang theo cấu trúc thư mục đã thống nhất
// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
// Shared Pages
import ProfilePage from './pages/shared/ProfilePage';
import EvaluationForm from './pages/shared/EvaluationForm';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import ClassListPage from './pages/student/ClassListPage';
import ClassDetailPage from './pages/student/ClassDetailPage';
import RequestTutorForm from './pages/student/RequestTutorForm';

// Tutor Pages
import TutorDashboard from './pages/tutor/TutorDashboard';
import TutorApplicationForm from './pages/tutor/TutorApplicationForm';
import TutorRequestsList from './pages/tutor/TutorRequestsList';
import CreateClassForm from './pages/tutor/CreateClassForm';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';


const AppRouter = () => {
    return (
        <Routes>
            
            {/* -------------------------------------- */}
            {/* 1. Tuyến đường công khai (Public Routes) */}
            {/* -------------------------------------- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* -------------------------------------- */}
            {/* 2. Tuyến đường được bảo vệ (Protected Routes) */}
            {/* -------------------------------------- */}
            
            {/* Tuyến đường dùng chung (Profile & Evaluation) - Cần đăng nhập bất kể vai trò */}
            <Route element={<AuthGuard allowedRoles="student,tutor,admin" />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/evaluate/:classId" element={<EvaluationForm />} />
            </Route>

            {/* Tuyến đường Student */}
            <Route element={<AuthGuard allowedRoles="student" />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/classes/list" element={<ClassListPage />} />
                <Route path="/classes/detail/:classId" element={<ClassDetailPage />} />
                <Route path="/request-tutor" element={<RequestTutorForm />} />
            </Route>

            {/* Tuyến đường Tutor */}
            <Route element={<AuthGuard allowedRoles="tutor" />}>
                <Route path="/tutor/dashboard" element={<TutorDashboard />} />
                <Route path="/tutor/apply" element={<TutorApplicationForm />} />
                <Route path="/tutor/requests" element={<TutorRequestsList />} />
                <Route path="/tutor/create-class" element={<CreateClassForm />} />
            </Route>
            
            {/* Tuyến đường Admin */}
            <Route element={<AuthGuard allowedRoles="admin" />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* -------------------------------------- */}
            {/* 3. Trang Lỗi 404 */}
            {/* -------------------------------------- */}
            <Route path="*" element={<div className="p-10 text-center text-red-600 font-bold">404 - Page Not Found</div>} />

        </Routes>
    );
};


// Component gốc, bọc Router và Context
const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </Router>
    );
};

export default App;