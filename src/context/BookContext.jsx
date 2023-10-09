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

    // const createBook = async (book)=>{
    //     try {
            
    //         const res = await createBookRequest(book)
    //         console.log(res)
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     // // const res = await createBookRequest(task)
    //     console.log('asdf')
    //     // console.log(task)
    // }

    const createBook = async (book)=>{
        try {
            
            const res = await createBookRequest(book)
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }
    const getBooks =async()=>{
        const res = await getBookRequest()
        console.log(res)
    }
    const getUserBooks = async()=>{
        const res = await getUserBooksRequest();
        console.log(res)
    }
    return (
        <BookContext.Provider value={{ books,createBook,getBooks, getUserBooks}}>
            {children}
        </BookContext.Provider>
    );
}
