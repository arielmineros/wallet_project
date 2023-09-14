import axios from "axios";

const API = "http://localhost:4000/api/";
const registerRequest = (user) => axios.post(`${API}/register`, user);
export default registerRequest;
