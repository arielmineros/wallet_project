import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4000/api/",
});
export default axiosInstance;
