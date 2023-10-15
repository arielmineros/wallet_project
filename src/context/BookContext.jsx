import { createContext, useContext, useState } from "react";
// import { createBookRequest } from "../api/book";
import {
    getBookRequest,
    getBooksRequest,
    createBookRequest,
    updateBookRequest,
    deleteBookRequest,
    getUserBooksRequest,
} from "../api/book";

const BookContext = createContext();
export const useBook = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error("useBook must be within a BookProvider");
    }
    return context;
};
export function BookProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [booksUser, setBooksUser] = useState([]);

    const createBook = async (book) => {
        try {
            const res = await createBookRequest(book);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBook = async (id) => {
        try {
            const res = await deleteBookRequest(id);
            console.log(res);
            if (res.status === 200 || res.status === 204) {
                setBooks(books.filter((book) => book.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getBooks = async () => {
        try {
            const res = await getBooksRequest();

            setBooks(res.data);
            console.log(res);
            //return res;
        } catch (error) {
            console.log(error);
        }
    };

    const getBook = async (id) => {
        try {
            const res = await getBookRequest(id);
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const getUserBooks = async () => {
        try {
            const res = await getUserBooksRequest();
            setBooksUser(res.data);
            console.log('libros de user: ',res);
        } catch (error) {
            console.log(error);
        }
    };

    const updateBook = async (id, book) => {
        try {
            await updateBookRequest(id, book);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BookContext.Provider
            value={{
                books,
                booksUser,
                createBook,
                getBooks,
                updateBook,
                getUserBooks,
                getBook,
                deleteBook,
            }}
        >
            {children}
        </BookContext.Provider>
    );
}
