// src/services/api.js

/**
 * Lớp Dịch vụ API - Chứa tất cả các hàm gọi Backend.
 * @author Gemini AI
 */

// Địa chỉ cơ sở của Backend API. Trong môi trường phát triển (dev), có thể là http://localhost:5000
const BASE_URL = '/api'; 

// --- Hàm Gửi Yêu cầu API Chung ---
/**
 * Gửi yêu cầu HTTP đã được xác thực đến Backend.
 * @param {string} endpoint - Đường dẫn API (vd: '/profile', '/requests').
 * @param {string} method - Phương thức HTTP (GET, POST, PUT, DELETE).
 * @param {object | null} data - Dữ liệu gửi đi (cho POST/PUT/PATCH).
 * @returns {Promise<object>} Dữ liệu JSON từ Backend.
 */
async function apiCall(endpoint, method = 'GET', data = null) {
    const token = localStorage.getItem('authToken'); // Lấy token từ local storage
    const url = `${BASE_URL}${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        // Thêm Token xác thực vào Header nếu có
        ...(token && { 'Authorization': `Bearer ${token}` }) 
    };

    const config = {
        method,
        headers,
        // Đính kèm body nếu phương thức là POST/PUT/PATCH
        ...(data && { body: JSON.stringify(data) }) 
    };

    try {
        const response = await fetch(url, config);

        // Xử lý trường hợp không có nội dung (vd: PUT/DELETE thành công)
        if (response.status === 204) { 
            return { success: true, message: 'Thao tác thành công.' };
        }

        const jsonResponse = await response.json();

        if (!response.ok) {
            // Ném lỗi với thông tin chi tiết từ Backend
            const error = new Error(jsonResponse.message || 'Lỗi API không xác định.');
            error.status = response.status;
            error.details = jsonResponse.details;
            throw error;
        }

        return jsonResponse;

    } catch (error) {
        console.error('API Call Error:', error);
        throw error; // Ném lỗi để Component xử lý
    }
}


// =================================================================
// 🔑 1. API Xác thực và Hồ sơ (Auth & Profile)
// =================================================================

/**
 * Xử lý quá trình đăng nhập.
 * Lưu ý: Trong thực tế, đây thường là một redirect, nhưng ta mô phỏng POST/GET token.
 * @param {string} ssoToken - Token nhận được từ HCMUT_SSO redirect.
 */
export const login = async (ssoToken) => {
    // Giả sử Backend có endpoint để trao đổi SSO token lấy JWT/Session
    const response = await apiCall('/login', 'POST', { ssoToken }); 
    
    if (response.token) {
        localStorage.setItem('authToken', response.token);
    }
    return response; // Trả về user info hoặc success
};

/**
 * Lấy thông tin hồ sơ của người dùng hiện tại.
 */
export const getProfile = async () => {
    return apiCall('/profile', 'GET');
};

/**
 * Cập nhật thông tin hồ sơ người dùng.
 * @param {object} profileData - Dữ liệu hồ sơ cần cập nhật.
 */
export const updateProfile = async (profileData) => {
    return apiCall('/profile', 'PUT', profileData);
};


// =================================================================
// 👨‍🏫 2. API Đăng ký Gia sư (Tutor Application)
// =================================================================

/**
 * Gửi đơn đăng ký Tutor mới.
 * @param {object} applicationData - Dữ liệu form đăng ký (subjects, skills, etc.).
 */
export const submitTutorApplication = async (applicationData) => {
    return apiCall('/tutor-applications', 'POST', applicationData);
};

/**
 * Lấy chi tiết đơn đăng ký Tutor.
 * @param {number} id - ID của đơn đăng ký.
 */
export const getTutorApplication = async (id) => {
    return apiCall(`/tutor-applications/${id}`, 'GET');
};


// =================================================================
// 🎯 3. API Yêu cầu Tutor (Student Requests)
// =================================================================

/**
 * Sinh viên tạo yêu cầu Tutor.
 * @param {object} requestData - Thông tin yêu cầu (subject, description, v.v.).
 */
export const requestTutor = async (requestData) => {
    return apiCall('/requests', 'POST', requestData);
};

/**
 * Gia sư lấy danh sách các yêu cầu Tutor.
 */
export const getTutorRequests = async () => {
    return apiCall('/requests', 'GET');
};

/**
 * Gia sư xác nhận hoặc từ chối yêu cầu.
 * @param {number} requestId - ID của yêu cầu.
 * @param {string} action - 'confirm' hoặc 'decline'.
 */
export const confirmRequest = async (requestId, action) => {
    return apiCall(`/requests/${requestId}/confirm`, 'POST', { action });
};


// =================================================================
// 📚 4. API Lớp học (Classes)
// =================================================================

/**
 * Gia sư tạo lớp học mới.
 * @param {object} classData - Dữ liệu lớp học (title, description, start_time, etc.).
 */
export const createClass = async (classData) => {
    return apiCall('/classes', 'POST', classData);
};

/**
 * Cập nhật/thay đổi lịch lớp học.
 * @param {number} classId - ID của lớp học.
 * @param {object} updateData - Dữ liệu cần cập nhật.
 */
export const rescheduleClass = async (classId, updateData) => {
    return apiCall(`/classes/${classId}`, 'PUT', updateData);
};

/**
 * Sinh viên đăng ký tham gia lớp học.
 * @param {number} classId - ID của lớp học.
 */
export const registerClass = async (classId) => {
    return apiCall(`/classes/${classId}/register`, 'POST');
};

/**
 * Gửi form đánh giá (Evaluation).
 * @param {number} classId - ID của lớp học được đánh giá.
 * @param {object} evaluationData - Dữ liệu đánh giá (rating, comment, etc.).
 */
export const submitEvaluation = async (classId, evaluationData) => {
    return apiCall(`/classes/${classId}/evaluate`, 'POST', evaluationData);
    // Lưu ý: Endpoint trong yêu cầu là chưa rõ ràng. Sử dụng /evaluations hoặc classes/:id/evaluate.
};


// =================================================================
// 🔔 5. API Thông báo (Notifications)
// =================================================================

/**
 * Gửi thông báo mới (thường dùng cho Admin/Hệ thống, nhưng Frontend có thể cần).
 * @param {object} notificationData - Dữ liệu thông báo (user_id, type, payload).
 */
export const sendNotification = async (notificationData) => {
    return apiCall('/notifications', 'POST', notificationData);
};

// --- Xuất tất cả các hàm ---
export default {
    login,
    getProfile,
    updateProfile,
    submitTutorApplication,
    getTutorApplication,
    requestTutor,
    getTutorRequests,
    confirmRequest,
    createClass,
    rescheduleClass,
    registerClass,
    submitEvaluation,
    sendNotification
};