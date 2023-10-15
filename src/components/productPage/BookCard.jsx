import { useForm } from "react-hook-form";
import "./BookForm.css";
// import './BookPages.css'
import { useBook } from "../../context/BookContext";
import { useEffect, useState } from "react";
// import BookPage from "./BookPage";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
//import imagen from "https://cdnx.jumpseller.com/libreria-nuestra-america/image/9791536/Miguel_M_rmol.jpg?1605963815";

function BookCard() {
    const { register, handleSubmit } = useForm();
    const { booksUser, createBook, getUserBooks, deleteBook } =
        useBook();
    const { userName } = useAuth();
    const navi = useNavigate()
    const [loading, setLoading] = useState(true);
    const imageUrl =
        "https://www.contrapunto.com.sv/wp-content/uploads/2021/12/MiguelMarmolA1.jpg";
    //const books_user = booksUser;
    //console.log(books_user);
    
    useEffect(() => {
        async function fetchData() {
            // console.log("Libros del usuario: ");
            const res = await getUserBooks();
            setLoading(false);
            //console.log('Respuesta: ',booksUser,res)
        }
        // console.log(`getUserBooks: ${i}`)
        //getBooks();
        //if (booksUser.length == 0) {
        //setMostrarLibros(false);
        //}
        console.log('Libros del usuario: ',booksUser)
        fetchData();
    }, []);
    return (
        <>
            <header id="book-card-header">
                <h2>Bienvenido {userName}</h2>
                <Link to="/books-user" className="button-BookForm">
                    Agregar libro
                </Link>
            </header>
            {/* <h1>Libros agregados por el usuario: </h1>
            <form onSubmit={onSubmit} id="form-book">
                <h3>Agrega un libro: </h3>

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
                <input
                    type="text"
                    id="input-book"
                    placeholder="url"
                    {...register("imageUrl")}
                />

                <button className="button-BookForm">Guardar</button>
            </form> */}
            {loading ? (
                <h1>Cargando libros...</h1>
            ) : booksUser.length > 0 ? (
                <div id="centered-container">
                    {booksUser.map((book) => (
                        <div key={book._id} className="book-card">
                            <div className="image-container">
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="book-image"
                                />
                            </div>
                            <div className="book-info">
                                <h1>{book.title}</h1>
                                <p>
                                    <b>
                                        <i>Tema: </i>
                                    </b>
                                    {book.topic}
                                </p>
                                <p>
                                    <b>
                                        <i>Autor:</i>
                                    </b>{" "}
                                    {book.author}
                                </p>
                                <p>
                                    <b>
                                        <i>Edición:</i>
                                    </b>{" "}
                                    {book.edition}
                                </p>
                                <p>
                                    <b>
                                        <i>ISBN:</i>
                                    </b>{" "}
                                    {book.isbn}
                                </p>
                                <p>
                                    <b>
                                        <i>Detalle de serie: </i>
                                    </b>
                                    {book.serieDetails}
                                </p>
                                <p>
                                    <b>
                                        <i>Descripción: </i>
                                    </b>
                                    {book.description}
                                </p>
                                <p>
                                    <b>
                                        <i>Usuario: </i>
                                    </b>
                                    {book.user.username}
                                </p>
                                <Link to={`/books-user/${book._id}`}><button  id="btnEditar-BookForm">Editar</button></Link>
                                <button
                                    id="btnEliminar-BookForm"
                                    onClick={async () => {
                                        await deleteBook(book._id);
                                        window.location.reload();
                                    }}
                                >
                                    Eliminar
                                </button>
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
export default BookCard;
