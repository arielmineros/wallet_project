//import {useAuth} from '../../context/AuthContext';
import { useBook } from "../../context/BookContext";
import { useEffect } from "react";

function BookPage() {
    const { books, getBooks } = useBook();

    useEffect(() => {
        //getUserBooks();
        getBooks();
    }, []);

    return (
        <div id="book-card">
            {books.map((book) => (
                <div key={book._id}>
                    <div id="book-info">
                        <h1>{book.title}</h1>
                        <p>Tema: {book.topic}</p>
                        <p>Autor: {book.author}</p>
                        <p>Edición: {book.edition}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Detalle de serie: {book.serieDetails}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default BookPage;

