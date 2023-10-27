//import {useAuth} from '../../context/AuthContext';
import { useBook } from "../../context/BookContext";
import { useEffect, useState } from "react";
import "./BookPages.css";
import { Carousel } from "react-carousel3";
import Web3 from "web3";
import { useWallet } from "../../context/WalletContext";
import jsPDF from "jspdf";
import qr from "qrcode";
import booksSmartContract from "../../smartContract/booksSmartContract.json";
import swal from "sweetalert2";
import getContractHash from "./ContractHash";

const style = {
    width: "100px",
    height: 500,
};
const infuraURL =
    "https://sepolia.infura.io/v3/94d095b8cdeb41f09b4158471df033b6";
const contractAddress = '0x55A33A7159e281A0903F4633dE31E266d4870df2';

function BookPage() {
    const { books, getBooks } = useBook();

    //Shit from smart contract ---------------------------------------------------------------------------------------
    const { web3, accounts, walletConnected } = useWallet(); // Usa el contexto de la billetera
    const [imagenURL, setImagenURL] = useState(""); // Nuevo estado para la URL de la imagen

    const [libros, setLibros] = useState([]);

    const [ventaCreadaEvent, setVentaCreadaEvent] = useState(null);

    const [contract, setContract] = useState(null);
    const [nombreLibro, setNombreLibro] = useState("");
    const [autor, setAutor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [precio, setPrecio] = useState("");

    const [librosContrato, setLibrosContrato] = useState([]);
    const handleCancelarCompra = () => {
        setSelectedBookId(null);
    };

    //22-10

    const [selectedBookId, setSelectedBookId] = useState(null);
    const [recibo, setRecibo] = useState(null);

    const [compraRealizada, setCompraRealizada] = useState(false);
    let transactionHash = "";
    const handleConfirmCompra = async () => {
        try {
            if (selectedBookId !== null) {
                const selectedBook = librosContrato[selectedBookId - 1];

                if (selectedBook.vendido) {
                    alert("Este libro ya ha sido vendido");
                    return;
                }
                if (selectedBook.creador === accounts[0]) {
                    swal.fire({
                        title: "No se puede realizar la compra",
                        text: "El vendedor no puede comprar su propio libro",
                        icon: "warning",
                        confirmButtonText: "Aceptar",
                    }); // Muestra el modal
                    return;
                }
                const precioWei = selectedBook.precio;
                if (web3) {
                    const contract = new web3.eth.Contract(
                        booksSmartContract,
                        contractAddress
                    );
                    const transaction = await contract.methods
                        .comprarLibro(selectedBookId)
                        .send({
                            from: accounts[0],
                            value: precioWei,
                        });
                    const transactionHash = transaction.transactionHash; // Obtener el hash de la transacción

                    // Construir la URL completa de etherscan.io
                    const etherscanUrl = `https://sepolia.etherscan.io/tx/${transactionHash}`;

                    // Actualiza el estado del libro en la interfaz de usuario
                    selectedBook.vendido = true;

                    // Genera el recibo en formato PDF
                    const doc = new jsPDF();
                    doc.text("Recibo de Compra", 10, 10);
                    doc.text(
                        "Fecha y Hora: " + new Date().toLocaleString(),
                        10,
                        20
                    );
                    doc.text("Libro: " + selectedBook.nombreLibro, 10, 30);
                    doc.text("Autor: " + selectedBook.autor, 10, 40);
                    doc.text("ISBN: " + selectedBook.isbn, 10, 50);
                    doc.text(
                        "Precio: " +
                            web3.utils.fromWei(selectedBook.precio, "ether") +
                            " ETH",
                        10,
                        60
                    );

                    // Generar el código QR y agregarlo al PDF
                    const qrData = etherscanUrl;
                    const qrDataUrl = await qr.toDataURL(qrData); // Utiliza 'toDataURL'
                    doc.addImage(qrDataUrl, "JPEG", 10, 70, 50, 50);

                    // Establecer la compra como realizada y almacenar el recibo
                    setCompraRealizada(true);
                    setRecibo(doc);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleCompraLibro = (id) => {
        setSelectedBookId(id);
        // swal.fire({
        //     title: "Confirmar Compra",
        //     text: "¿Estás seguro de que desea realiza la transacción de {}?",
        //     icon: "question",
        //     showCancelButton: true,
        //     confirmButtonText: "Confirmar compra",
        //     cancelButtonText: "Cancelar",
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         handleConfirmCompra();
        //     } else {
        //         handleCancelarCompra();
        //     }
        // });
    };
    const confirmarCompraModal = () => {
        swal.fire({
            title: "Confirmar Compra",
            text: "¿Estás seguro de que desea realiza la transacción de {}?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirmar compra",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirmCompra();
            } else {
                handleCancelarCompra();
            }
        });
    };
    const descargarPDFModal = () => {
        swal.fire({
            title: "Compra Realizada",
            text: "Recibo generado: ",
            confirmButtonText: "Descargar recibo",
        }).then((result) => {
            if (result.isConfirmed) {
                recibo.save("Recibo_Compra.pdf");
            }
        });
    };

    useEffect(() => {
        fetchDataFromContract(); // Llamamos a esta función al cargar el componente
    }, []);
    async function fetchDataFromContract() {
        try {
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
            // Obtener el libroCounter actual y cargar la lista de libros
            const libroCounter = await contract.methods.libroCounter().call();
            const libros = [];

            for (let i = 1; i < libroCounter; i++) {
                const libro = await contract.methods.libros(i).call();
                libros.push({ id: i, ...libro });
            }

            // Actualizar la lista de libros en el estado
            setLibrosContrato(libros);

            // Escuchar el evento "VentaCreada" para actualizar la lista cuando se crea una nueva venta
            contract.events.VentaCreada().on("data", (event) => {
                const newLibro = {
                    id: event.returnValues.id,
                    ...event.returnValues,
                };
                setLibrosContrato([...librosContrato, newLibro]);
            });

            // Escuchar el evento "EstadoActualizado" para actualizar el estado de los libros vendidos
            contract.events.EstadoActualizado().on("data", (event) => {
                const updatedLibros = librosContrato.map((libro) => {
                    if (libro.id === event.returnValues.id) {
                        return {
                            ...libro,
                            vendido: event.returnValues.vendido,
                        };
                    }
                    return libro;
                });
                setLibrosContrato(updatedLibros);
            });
        } catch (error) {
            console.log(error);
        }
    }
    const getEth = (precio, cambio) => {
        try {
            return web3.utils.fromWei(precio, cambio);
        } catch (error) {
            console.log(error);
        }
    };

    // -------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        //getUserBooks();
        getBooks();
    }, []);
    return (
        <>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background:
                            "linear-gradient(to bottom, #16235e 0%, #51fc72 100%)",
                        position: "relative",
                        zIndex: "50",
                        margin: "0",
                        padding: "0",
                    }}
                >
                    <Carousel
                        height={780}
                        width={1500}
                        yOrigin={62}
                        yRadius={50}
                        autoPlay={true}
                    >
                        <div key={1} style={style}>
                            <img alt="" src={require("../../img/book1.jpeg")} />
                        </div>
                        <div key={2} style={style}>
                            <img alt="" src={require("../../img/book2.jpeg")} />
                        </div>
                        <div key={3} style={style}>
                            <img alt="" src={require("../../img/book3.jpeg")} />
                        </div>
                        <div key={4} style={style}>
                            <img alt="" src={require("../../img/book4.jpeg")} />
                        </div>
                        <div key={5} style={style}>
                            <img alt="" src={require("../../img/book5.jpeg")} />
                        </div>
                        <div key={6} style={style}>
                            <img alt="" src={require("../../img/book6.jpeg")} />
                        </div>
                        <div key={7} style={style}>
                            <img alt="" src={require("../../img/book7.jpeg")} />
                        </div>
                        <div key={8} style={style}>
                            <img alt="" src={require("../../img/book8.jpeg")} />
                        </div>
                        <div key={8} style={style}>
                            <img alt="" src={require("../../img/book9.jpeg")} />
                        </div>
                        <div key={8} style={style}>
                            <img
                                alt=""
                                src={require("../../img/book10.jpeg")}
                            />
                        </div>
                        <div key={8} style={style}>
                            <img
                                alt=""
                                src={require("../../img/book11.jpeg")}
                            />
                        </div>
                        <div key={8} style={style}>
                            <img
                                alt=""
                                src={require("../../img/book12.jpeg")}
                            />
                        </div>
                    </Carousel>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        color: "#51fc72",
                        WebkitTextStroke: "2px #16235e",
                        zIndex: 50,
                    }}
                >
                    <h1 style={{ fontSize: "100px" }}>BOOKCHAIN </h1>
                </div>
            </div>
            {/* <div id="centered-container">
                {books.map((book) => (
                    <div key={book._id} className="book-card">
                        <div className="image-container">
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="book-image"
                            />
                        </div>
                        <br />
                        <div className="book-info">
                            <h1>{book.title}</h1>
                            <p>
                                <b>
                                    <i>Tema:</i>
                                </b>{" "}
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
                        </div>
                    </div>
                ))}
            </div> */}
            <div id="centered-container">
                {/* <h2>Lista de Ventas de Libros:</h2> */}
                {librosContrato.map((libro, index) => (
                    <div key={index} className="book-card">
                        <div className="image-container">
                            <img
                                src={libro.imagenURL}
                                alt="Imagen del libro"
                                className="book-image"
                            />
                        </div>
                        <div className="book-info">
                            <b>
                                <i>
                                    <h1>{libro.nombreLibro}</h1>
                                </i>
                            </b>
                            <p>
                                <b>
                                    <i>Autor: </i>
                                </b>
                                {libro.autor}
                            </p>
                            <p>
                                <b>
                                    <i>ISBN: </i>
                                </b>
                                {libro.isbn}
                            </p>
                            <p>
                                <b>
                                    <i>Precio: </i>
                                </b>
                                {getEth(libro.precio, "ether")} ETH
                            </p>
                            {libro.vendido ? (
                                <p id="estado-p"> VENDIDO</p>
                            ) : (
                                <button
                                    onClick={() => handleCompraLibro(index + 1)}
                                    className="button-BookForm"
                                >
                                    Comprar
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {
                    selectedBookId !== null && confirmarCompraModal()
                    // swal
                    //     .fire({
                    //         title: "Confirmar Compra",
                    //         text: "¿Estás seguro de que desea realiza la transacción de {}?",
                    //         icon: "question",
                    //         showCancelButton: true,
                    //         confirmButtonText: "Confirmar compra",
                    //         cancelButtonText: "Cancelar",
                    //     })
                    //     .then((result) => {
                    //         if (result.isConfirmed) {
                    //             handleConfirmCompra();
                    //         } else {
                    //             handleCancelarCompra();
                    //         }
                    //     })
                    // <div>
                    //     <h3>Confirmar Compra</h3>
                    //     <p>¿Estás seguro de que deseas comprar este libro?</p>
                    //     <p>
                    //         Precio:{" "}
                    //         {web3.utils.fromWei(
                    //             librosContrato[selectedBookId - 1].precio,
                    //             "ether"
                    //         )}{" "}
                    //         ETH
                    //     </p>
                    //     <button onClick={handleConfirmCompra}>
                    //         Confirmar Compra
                    //     </button>
                    //     <button onClick={handleCancelarCompra}>Cancelar</button>
                    // </div>
                }
                {
                    compraRealizada && descargarPDFModal()
                    // <div>
                    //     <h3>Compra Realizada</h3>
                    //     <p>Recibo generado:</p>
                    //     <button
                    //         onClick={() => recibo.save("recibo_compra.pdf")}
                    //     >
                    //         Descargar Recibo
                    //     </button>
                    // </div>
                }
            </div>
        </>
    );
}
export default BookPage;
