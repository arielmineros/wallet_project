import { useForm } from "react-hook-form";
import "./BookForm.css";
import { useBook } from "../../context/BookContext";
import { useEffect } from "react";
import BookPage from "./BookPage";
import { Outlet, Link } from "react-router-dom";

function BookForm() {
    const { register, handleSubmit } = useForm();
    const { booksUser, createBook, getBooks, getUserBooks } = useBook();
    //const books_user = booksUser;
    //console.log(books_user);
    const onSubmit = handleSubmit((data) => {
        createBook(data);
    });
    useEffect(() => {
        console.log("Libros del usuario: ");
        getUserBooks();
        //getBooks();
    }, []);
    if (booksUser.length == 0) return <h1>No ha agregado libros</h1>;
    return (
        <>
            <form onSubmit={onSubmit} id="form-book">
                <input
                    type="text"
                    id="input-book"
                    placeholder="Título"
                    {...register("title")}
                    autoFocus
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Temas"
                    {...register("topic")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Edición"
                    {...register("edition")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="ISBN"
                    {...register("isbn")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Datos de publicación"
                    {...register("publishingDetails")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Datos de serie"
                    {...register("serieDetails")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Autor"
                    {...register("author")}
                />

                <textarea
                    name=""
                    placeholder="Descripción"
                    {...register("description")}
                    id=""
                ></textarea>

                <button>Guardar</button>
            </form>
            <div id="book-card">
                {booksUser.map((book) => (
                    <div key={book._id}>
                        <div id="book-info">
                            <h1>{book.title}</h1>
                            <p>{book.topic}</p>
                            <p>{book.author}</p>
                            <p>{book.description}</p>
                            <p>{book.edition}</p>
                            <p>{book.isbn}</p>
                            <p>{book.publishingDetails}</p>
                            <p>{book.serieDetails}</p>
                        </div>
                        <div id="button-section">
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
            <Outlet />
            {/* <BookForm /> */}
        </>
    );
}
export default BookForm;
