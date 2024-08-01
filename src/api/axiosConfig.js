import axios from "axios";

// 기본 설정
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // 기본 API URL 설정
  timeout: 10000, // 요청 타임아웃 설정
  headers: {
    "Content-Type": "application/json",
    // 필요 시 인증 토큰 등을 추가
    // 'Authorization': `Bearer ${token}`
  },
});

// 요청 인터셉터 (선택 사항)
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전 처리할 작업 (예: 토큰 추가)
    // const token = localStorage.getItem('token');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (선택 사항)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;
