import { createContext, useContext, useState } from "react";
import {
    getBookRequest,
    getBooksRequest,
    createBookRequest,
    updateBookRequest,
    deleteBookRequest,
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

    //const createBook = async (book) => {
    ////console.log("books");
    //const res = await createBookRequest(book);
    //console.log(res);
    //};

    return (
        <BookContext.Provider value={{ books}}>
            {children}
        </BookContext.Provider>
    );
}
