//import axios from "axios";
import axios from "./axios";

const API = "http://localhost:4000/api";
export const registerRequest = (user) => axios.post(`/register`, user);
//export const registerRequest = (user) => axios.post("/register", user);
export const loginRequest = (user) => axios.post(`/login`, user);
//export const loginRequest = (user) => axios.post("/login", user);
export const verifyTokenRequest = () => axios.get("/verify");
//export default { registerRequest, loginRequest };
//export const logoutRequest =()=>axios
