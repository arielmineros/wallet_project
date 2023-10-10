import axios from "./axios";

export const getBooksRequest = () => axios.get("/books");
export const getUserBooksRequest = () => axios.get("/books-user");
export const getBookRequest = (id) => axios.get(`/books/${id}`);
export const createBookRequest = (book) => axios.post("/books", book);
export const updateBookRequest = (book) =>
    axios.put(`/books/${book._id}`, book);
export const deleteBookRequest = (id) => axios.delete(`/books/${id}`);
