import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // navigate uchun hook
import { useEffect } from 'react';

const useAxios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Axios instansiyasini yaratish
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000', // API server manzilingiz
    });

    // Response Interceptorni o'rnatish
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        // Javob muvaffaqiyatli bo'lsa, javobni oddiy qaytaramiz
        return response;
      },
      (error) => {
        // Agar xato kelsa va status kodi 401 bo'lsa
        if (error.response && error.response.status === 401) {
          // Login sahifasiga yo'naltirish
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Interceptorni tozalash
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return axiosInstance;
};

export default useAxios;
