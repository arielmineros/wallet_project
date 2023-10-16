import axios from "./axios";

export const getBooksRequest = () => axios.get("/books");
export const getUserBooksRequest = () => axios.get("/books-user");
export const getBookRequest = (id) => axios.get(`/books-user/${id}`);
export const createBookRequest = (book) => axios.post("/books-user", book);
export const updateBookRequest = (id, book) =>
    axios.put(`/books-user/${id}`, book);
export const deleteBookRequest = (id) => axios.delete(`/books/${id}`);
