import { useForm } from "react-hook-form";
import "./BookForm.css";
import { useBook } from "../../context/BookContext";
import { useEffect, useState } from "react";
import BookPage from "./BookPage";
import { Outlet, Link } from "react-router-dom";
//import imagen from "https://cdnx.jumpseller.com/libreria-nuestra-america/image/9791536/Miguel_M_rmol.jpg?1605963815";

function BookForm() {
    const { register, handleSubmit } = useForm();
    const { booksUser, createBook, getBooks, getUserBooks } = useBook();
    const [loading, setLoading] = useState(true);
    const imageUrl =
        "https://www.contrapunto.com.sv/wp-content/uploads/2021/12/MiguelMarmolA1.jpg";
    //const books_user = booksUser;
    //console.log(books_user);
    const onSubmit = handleSubmit((data) => {
        createBook(data);
    });
    useEffect(() => {
        async function fetchData() {
            console.log("Libros del usuario: ");
            await getUserBooks();
            setLoading(false);
        }
        //getBooks();
        //if (booksUser.length == 0) {
        //setMostrarLibros(false);
        //}
        fetchData();
    }, []);
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
                    id="textarea-BookForm"
                ></textarea>

                <button className="button-BookForm">Guardar</button>
            </form>
            {loading ? (
                <h1>Cargando libros...</h1>
            ) : booksUser.length > 0 ? (
                <div id="book-card">
                    {booksUser.map((book) => (
                        <div key={book._id}>
                            <div id="book-info">
                                <div id="containerImg-BookForm">
                                    <img
                                        //id="imgCard-BookForm"
                                        src={imageUrl}
                                        alt=""
                                    />
                                </div>
                                <h1 id="titulo-BookForm">{book.title}</h1>
                                <p id="textdesc-BookForm">
                                    {" "}
                                    <i>
                                        <b>Genero: </b>
                                    </i>
                                    {book.topic}
                                </p>
                                <p id="textdesc-BookForm">
                                    {" "}
                                    <i>
                                        <b>Autor: </b>
                                    </i>
                                    {book.author}
                                </p>
                                <p id="textdesc-BookForm">
                                    {" "}
                                    <i>
                                        <b>Descripccion: </b>
                                    </i>
                                    {book.description}
                                </p>
                                <p id="textdesc-BookForm">
                                    {" "}
                                    <i>
                                        <b>Edicion: </b>
                                    </i>
                                    {book.edition}
                                </p>
                                <p id="textdesc-BookForm">
                                    {" "}
                                    <i>
                                        <b>ISBN: </b>
                                    </i>
                                    {book.isbn}
                                </p>
                                <p id="textdesc-BookForm">
                                    {" "}
                                    <i>
                                        <b>Editorial: </b>
                                    </i>
                                    {book.publishingDetails}
                                </p>
                                <p id="textdesc-BookForm">
                                    {" "}
                                    <i>
                                        <b>Detalles de Serie: </b>
                                    </i>
                                    {book.serieDetails}
                                </p>
                                <div id="button-section">
                                    <button
                                        id="btnEditar-BookForm" /*{className=" button-BookForm"}*/
                                    >
                                        Editar
                                    </button>
                                    <button
                                        id="btnEliminar-BookForm" /*{className="button-BookForm"}*/
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>No se han agregado libros</h1>
            )}

            <Outlet />
            {/* <BookForm /> */}
        </>
    );
}
export default BookForm;

