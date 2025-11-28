"# SE_TutorSupportSystem" 

frontend/
├── assets/                 # CSS, Images, Fonts
├── components/             # Components UI tái sử dụng
│   ├── layout/            # Header, Sidebar, Footer, Layout (Vd:AuthGuard)
│   ├── forms/              # Các component Form Input đã xác thực
│   └── ui/                 # Modal, Notification Toast, Card, Button
├── context/                # State Management
│   └── AuthContext.jsx     # Xử lý trạng thái đăng nhập, role
├── pages/                  # (11 Trang Chức năng + 1 Admin)
│   ├── public/             # (Chung) Home, Login
│   │   ├── HomePage.jsx
│   │   └── LoginPage.jsx
│   ├── shared/             # (Chung) Trang có thể dùng cho nhiều vai trò
│   │   ├── ProfilePage.jsx         # Profile (view/edit)
│   │   └── EvaluationForm.jsx      # Form Đánh giá
│   ├── student/            # (Vai trò Sinh viên)
│   │   ├── StudentDashboard.jsx    # Dashboard tổng quan sinh viên
│   │   ├── ClassListPage.jsx       # Class List (để đăng ký)
│   │   ├── ClassDetailPage.jsx
│   │   ├── RequestTutorForm.jsx    # Request Tutor form
│   │   └── RegisterClassModal.jsx  # Register Class modal
│   ├── tutor/              # (Vai trò Gia sư)
│   │   ├── TutorDashboard.jsx      # Dashboard tổng quan gia sư
│   │   ├── TutorApplicationForm.jsx # Tutor Application form
│   │   ├── TutorRequestsList.jsx   # Tutor Requests list
│   │   └── CreateClassForm.jsx     # Create Class form
│   └── admin/              # (MỚI) Vai trò Quản trị viên
│       └── AdminDashboard.jsx      # Dashboard quản lý hệ thống
|           ....      
├── services/               # Lớp API
│   └── api.js              # Chứa các hàm gọi REST
└── App.jsx                 # Nơi định nghĩa Routing và Context Providers