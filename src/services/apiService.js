import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

// 요청 인터셉터 (토큰 추가)
apiClient.interceptors.request.use(
  (config) => {
    if (config.url.includes('/auth/logout')) {
      // 로그아웃 요청의 경우
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        config.headers.RefreshToken = `${refreshToken}`;
      }
    } else if (!config.url.includes('/auth/login')) {
      const token = localStorage.getItem('accessToken'); // 토큰 가져오기
      console.log(token);
      if (token) {
        config.headers.AccessToken = `${token}`; // 토큰 추가
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (예: 에러 처리)
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// API 요청 함수
export const apiService = {
  // POST 요청
  postLogin: (loginInfo) => apiClient.post('/auth/login', loginInfo),
  // GET 요청 (데이터 가져오기)
  getHomeDashboard: () => apiClient.get('/admin/dashboard'),
  getHomeGenderInfo: () => apiClient.get('/admin/user/gender-ratio'),
  getHomeTeamInfo: () => apiClient.get('/admin/user/team-support'),
  getHomeStyleInfo: () => apiClient.get('/admin/user/cheer-style'),
  getUserListData: (clubName, page) => {
    const params = {
      page: page - 1,
    };
    if (clubName !== '전체') {
      params.clubName = clubName;
    }
    return apiClient.get('/admin/user', { params });
  },
  // DELETE 요청
  deleteTokenLogout: () => apiClient.delete('/auth/logout'),
};

export default apiService;
