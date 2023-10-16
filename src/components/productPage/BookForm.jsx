import { useForm } from "react-hook-form";
import "./BookForm.css";
import { useBook } from "../../context/BookContext";
import { useEffect, useState } from "react";
// import BookPage from "./BookPage";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
//import imagen from "https://cdnx.jumpseller.com/libreria-nuestra-america/image/9791536/Miguel_M_rmol.jpg?1605963815";

function BookForm() {
    const { register, handleSubmit, setValue } = useForm();
    const { booksUser, createBook,updateBook, getBook, getUserBooks, deleteBook } =
        useBook();
    const { userName } = useAuth();
    const params = useParams();
    const [loading, setLoading] = useState(true);
   
    //const books_user = booksUser;
    //console.log(books_user);
    const navigate = useNavigate();
    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateBook(params.id,data)
            console.log('Data: ',data)
            console.log('Parametros: ',params.id)
        } else {
            await createBook(data);
            // window.location.reload();
        }
        navigate("/books");
    });

    useEffect(() => {
        async function loadBook() {
            if (params.id) {
                const book = await getBook(params.id);
                console.log(book);
                setValue("title", book.title);
                setValue("topic", book.topic);
                setValue("edition", book.edition);
                setValue("isbn", book.isbn);
                setValue("publishingDetails", book.publishingDetails);
                setValue("serieDetails", book.serieDetails);
                setValue("author", book.author);
                setValue("description", book.description);
                setValue("imageUrl", book.imageUrl);
            }
        }
        loadBook();
    }, []);

    return (
        <>
            <h2>Bienvenido {userName}</h2>
            {/* <h1>Libros agregados por el usuario: </h1> */}
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
            </form>
            {/* {loading ? (
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
                                <button id="btnEditar-BookForm">Editar</button>
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
            )} */}

            <Outlet />
            {/* <BookForm /> */}
        </>
    );
}
export default BookForm;
