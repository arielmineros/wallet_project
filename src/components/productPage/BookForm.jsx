import { useForm } from "react-hook-form";
import "./BookForm.css";
import { useBook } from "../../context/BookContext";
import { useEffect, useState } from "react";
// import BookPage from "./BookPage";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";
import { useAuth } from "../../context/AuthContext";
import booksSmartContract from "../../smartContract/booksSmartContract.json";
import Web3 from "web3";
import jsPDF from 'jspdf'
import qr from 'qrcode'

function BookForm() {
    const infuraURL =
        "https://sepolia.infura.io/v3/94d095b8cdeb41f09b4158471df033b6";
    const contractAddress = "0x5538215d05007Cd0E6e3546903f704993B9b71c0";
    const { register, handleSubmit, setValue } = useForm();
    const { createBook, updateBook, getBook } = useBook();
    const { userName } = useAuth();
    const params = useParams();
    const [loading, setLoading] = useState(true);

    // Shit from smart contract
    const { web3, accounts, walletConnected } = useWallet(); // Usa el contexto de la billetera

    const [libros, setLibros] = useState([]);

    const [ventaCreadaEvent, setVentaCreadaEvent] = useState(null);

    const [contract, setContract] = useState(null);
    const [nombreLibro, setNombreLibro] = useState("");
    const [autor, setAutor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [precio, setPrecio] = useState("");

    const [librosContrato, setLibrosContrato] = useState([]);

    //22-10

    const [selectedBookId, setSelectedBookId] = useState(null);
    const [recibo, setRecibo] = useState(null);

    const [compraRealizada, setCompraRealizada] = useState(false);
    let transactionHash = "";
    const [imagenURL, setImagenURL] = useState(""); // Nuevo estado para la URL de la imagen

    useEffect(() => {
        fetchDataFromContract();
    }, []);
    async function fetchDataFromContract() {
        const web3 = new Web3(new Web3.providers.HttpProvider(infuraURL));
        const contract = new web3.eth.Contract(
            booksSmartContract,
            contractAddress
        );
        // Registrar información adicional, como las respuestas de llamadas a contratos inteligentes
        web3.eth
            .getBalance("0xad7c076227C8fb87D81cfC9104cc3F9AeeDdD02F")
            .then((balance) => {
                console.log("Saldo de la dirección:", balance);
            });
        const libroCounter = await contract.methods.libroCounter().call();

        const libros = [];
        for (let i = 0; i < libroCounter; i++) {
            const libro = await contract.methods.libros(i).call();
            libros.push(libro);
        }

        setLibrosContrato(libros);
    }

    const handleImagenChange = (e) => {
        const imageUrl = e.target.value; // Esto asume que el usuario ingresará manualmente la URL de la imagen
        setImagenURL(imageUrl);
    };

    const handleCreateVenta = async () => {
        if (!walletConnected) {
            alert("Por favor, conecta tu billetera antes de crear una venta.");
            return;
        }

        if (web3) {
            const contract = new web3.eth.Contract(
                booksSmartContract,
                contractAddress
            );

            // Convierte el precio ingresado en ether a wei
            const precioWei = web3.utils.toWei(precio, "ether");

            await contract.methods
                .crearVenta(nombreLibro, autor, isbn, precioWei, imagenURL) // Envía el precio en wei
                .send({ from: accounts[0] });
        }
    };
    // const handleCompraLibro = (id) => {
    //     setSelectedBookId(id);
    // };

    // const handleConfirmCompra = async () => {
    //     if (selectedBookId !== null) {
    //         const selectedBook = librosContrato[selectedBookId - 1];

    //         if (selectedBook.vendido) {
    //             alert("Este libro ya ha sido vendido");
    //             return;
    //         }
    //         const precioWei = selectedBook.precio;
    //         if (web3) {
    //             const contract = new web3.eth.Contract(
    //                 booksSmartContract,
    //                 contractAddress
    //             );
    //             const transaction = await contract.methods
    //                 .comprarLibro(selectedBookId)
    //                 .send({
    //                     from: accounts[0],
    //                     value: precioWei,
    //                 });
    //             const transactionHash = transaction.transactionHash; // Obtener el hash de la transacción

    //             // Construir la URL completa de etherscan.io
    //             const etherscanUrl = `https://sepolia.etherscan.io/tx/${transactionHash}`;

    //             // Actualiza el estado del libro en la interfaz de usuario
    //             selectedBook.vendido = true;

    //             // Genera el recibo en formato PDF
    //             const doc = new jsPDF();
    //             doc.text("Recibo de Compra", 10, 10);
    //             doc.text(
    //                 "Fecha y Hora: " + new Date().toLocaleString(),
    //                 10,
    //                 20
    //             );
    //             doc.text("Libro: " + selectedBook.nombreLibro, 10, 30);
    //             doc.text("Autor: " + selectedBook.autor, 10, 40);
    //             doc.text("ISBN: " + selectedBook.isbn, 10, 50);
    //             doc.text(
    //                 "Precio: " +
    //                     web3.utils.fromWei(selectedBook.precio, "ether") +
    //                     " ETH",
    //                 10,
    //                 60
    //             );

    //             // Generar el código QR y agregarlo al PDF
    //             const qrData = etherscanUrl;
    //             const qrDataUrl = await qr.toDataURL(qrData); // Utiliza 'toDataURL'
    //             doc.addImage(qrDataUrl, "JPEG", 10, 70, 50, 50);

    //             // Establecer la compra como realizada y almacenar el recibo
    //             setCompraRealizada(true);
    //             setRecibo(doc);
    //         }
    //     }
    // };

    // const handleCancelarCompra = () => {
    //     setSelectedBookId(null);
    // };

    // stuff from db
    const navigate = useNavigate();
    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateBook(params.id, data);
            console.log("Data: ", data);
            console.log("Parametros: ", params.id);
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
                    value={nombreLibro}
                    onChange={(e) => setNombreLibro(e.target.value)}
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
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
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
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
                <input
                    type="number"
                    id="input-book"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
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
                    value={imagenURL}
                    onChange={handleImagenChange}
                />

                <button onClick={handleCreateVenta} className="button-BookForm">
                    Guardar
                </button>
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
