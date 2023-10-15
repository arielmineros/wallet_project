import axios from "./axios";

export const getBooksRequest = () => axios.get("/books");
export const getUserBooksRequest = () => axios.get("/books-user");
export const getBookRequest = (id) => axios.get(`/books-user/${id}`);
export const createBookRequest = (book) => axios.post("/books", book);
export const updateBookRequest = (book) =>
    axios.put(`/books-user/${book.id}`, book);
export const deleteBookRequest = (id) => axios.delete(`/books/${id}`);
