import axios from "axios";
import axiosInstance from "./axios";

const API = "http://localhost:4000/api";
export const registerRequest = (user) => axiosInstance.post(`/register`, user);
//export const registerRequest = (user) => axios.post("/register", user);
export const loginRequest = (user) => axiosInstance.post(`/login`, user);
//export const loginRequest = (user) => axios.post("/login", user);
//export default { registerRequest, loginRequest };
