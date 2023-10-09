import axios from "axios";

export const getBooksRequest = () => axios.get("/Books");
export const getBookRequest = (id) => axios.get(`/Books/${id}`);
export const createBookRequest = (book) => axios.post("/Books", book);
export const updateBookRequest = (book) =>
    axios.put(`/Books/${book._id}`, book);
export const deleteBookRequest = (id) => axios.delete(`/Books/${id}`);
