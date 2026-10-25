import axios from "axios";

const BASE_URL = "https://bookit-backend-production-9dee.up.railway.app";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  // Create a new booking with AI-powered ID verification
  createBooking(bookingData) {
    const formData = new FormData();
    formData.append("fullName", bookingData.fullName);
    formData.append("email", bookingData.email);
    formData.append("phone", bookingData.phone);
    formData.append("roomId", bookingData.roomId);
    formData.append("checkInDate", bookingData.checkInDate);
    formData.append("checkOutDate", bookingData.checkOutDate);

    if (bookingData.specialRequests) {
      formData.append("specialRequests", bookingData.specialRequests);
    }

    if (bookingData.idImage) {
      formData.append("idImage", bookingData.idImage);
    }

    return axios.post(`${BASE_URL}/api/bookings/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Get booking details by ID
  getBookingDetails(bookingId) {
    return axiosInstance.get(`/api/bookings/${bookingId}`);
  },

  // Fetch all bookings
  getBookings() {
    return axiosInstance.get("/api/bookings");
  },

  // Fetch all bookings (for guest tab) with pagination
  getAllBookings(page = 1, limit = 10) {
    return axiosInstance.get("/api/bookings/all", {
      params: { page, limit }
    });
  },

  // Get single booking by ID (for risk assessment)
  getBookingById(bookingId) {
    return axiosInstance.get(`/api/bookings/${bookingId}`);
  },

  // Update booking status (approve/decline/check-in/check-out)
  updateBookingStatus(bookingId, status) {
    return axiosInstance.patch(`/api/bookings/${bookingId}/status`, {
      status,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Get all rooms
  getAllRooms() {
    return axiosInstance.get("/api/rooms/all", {
      headers: {
        "x-api-key": "staysync_hotel_api_key_2024",
      },
    });
  },

  // Get room rates by type
  getRoomsRate() {
    return axiosInstance.get("/api/rooms/rates", {
      headers: {
        "x-api-key": "staysync_hotel_api_key_2024",
      },
    });
  },

  // Search available rooms by date and optional room type
  searchRooms(params) {
    return axiosInstance.get("/api/rooms/search", {
      params,
      headers: {
        "x-api-key": "staysync_hotel_api_key_2024",
      },
    });
  },

  // Get all service requests (Staff)
  getServiceRequests() {
    return axiosInstance.get("/api/services", {
      headers: {
        "x-api-key": "staysync_hotel_api_key_2024",
      },
    });
  },

  // Check-in lookup by bookingId or accessCode
  checkInLookup(lookupData) {
    return axios.post(`${BASE_URL}/api/bookings/check-in/lookup`, lookupData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Verify OTP for check-in
  verifyCheckinOtp(data) {
    return axios.post(`${BASE_URL}/api/bookings/check-in/verify-otp`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Staff/Admin login
  login(credentials) {
    return axiosInstance.post("/api/auth/login", {
      email: credentials.email,
      password: credentials.password,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Update room rate by type (Admin/Manager only)
  updateRoomRate(roomType, rate) {
    return axiosInstance.patch(`/api/rooms/rates/${roomType}`, {
      rate,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Send message to AI chat for service requests
  sendChatMessage(chatData) {
    return axios.post(`${BASE_URL}/api/services/chat`, chatData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Get chat history for a booking
  getChatHistory(bookingId) {
    return axios.get(`${BASE_URL}/api/services/chat`, {
      params: { bookingId },
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Create a new staff member (Admin only)
  createStaff(staffData) {
    return axiosInstance.post("/api/users/staff", staffData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Get all staff members (Admin only)
  getAllStaff() {
    return axiosInstance.get("/api/users/staff");
  },

  // Get staff member by ID (Admin only)
  getStaffById(staffId) {
    return axiosInstance.get(`/api/users/staff/${staffId}`);
  },

  // Update staff member (Admin only)
  updateStaff(staffId, updateData) {
    return axiosInstance.patch(`/api/users/staff/${staffId}`, updateData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Delete staff member (Admin only)
  deleteStaff(staffId) {
    return axiosInstance.delete(`/api/users/staff/${staffId}`);
  },

  // Get all service requests (Admin view)
  getAllServiceRequests() {
    return axiosInstance.get("/api/services");
  },

  // Get my assigned tasks (Staff view)
  getMyTasks(status = null) {
    const params = status ? { status } : {};
    return axiosInstance.get("/api/services/my-tasks", { params });
  },

  // Get my tasks statistics (Staff view)
  getMyTasksStats() {
    return axiosInstance.get("/api/services/my-tasks/stats");
  },

  // Update task status (Staff view)
  updateTaskStatus(taskId, updateData) {
    return axiosInstance.patch(`/api/services/my-tasks/${taskId}`, updateData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // ============ Dashboard Analytics APIs ============

  // Get admin hotel dashboard data (overview, room status, booking stats, AI overview)
  getAdminDashboard(period = 'week', page = 1, limit = 10) {
    return axiosInstance.get("/api/analytics/hotel-dashboard", {
      params: { period, page, limit },
    });
  },

  // Get staff dashboard data (overview, new requests, request history)
  getStaffDashboard(page = 1, limit = 10) {
    return axiosInstance.get("/api/services/dashboard", {
      params: { page, limit },
    });
  },

  // ============ Guest Satisfaction Analytics APIs ============

  // Get guest satisfaction overview stats
  getSatisfactionOverview() {
    return axiosInstance.get("/api/analytics/guest-satisfaction/overview");
  },

  // Get guest satisfaction trend data
  getSatisfactionTrend(period = 'month') {
    return axiosInstance.get("/api/analytics/guest-satisfaction/trend", {
      params: { period },
    });
  },

  // Get all guests with satisfaction data (paginated)
  getSatisfactionGuests(page = 1, limit = 10, status = null, search = null) {
    const params = { page, limit };
    if (status && status !== 'all') {
      params.status = status;
    }
    if (search) {
      params.search = search;
    }
    return axiosInstance.get("/api/analytics/guest-satisfaction/guests", { params });
  },

  // Get detailed satisfaction data for a specific guest/booking
  getGuestSatisfactionDetails(bookingId) {
    return axiosInstance.get(`/api/analytics/guest-satisfaction/guests/${bookingId}`);
  },
};
