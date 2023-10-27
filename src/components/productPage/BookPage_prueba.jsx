import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./BookPages.css";
import { Carousel } from "react-carousel3";
import booksSmartContract from "../../smartContract/booksSmartContract.json";
//
import { useWallet } from "../../context/WalletContext"; // Importa el contexto de la billetera

import jsPDF from "jspdf";
import qr from "qrcode";

const infuraURL =
    "https://sepolia.infura.io/v3/94d095b8cdeb41f09b4158471df033b6";

const contractAddress = '0x55A33A7159e281A0903F4633dE31E266d4870df2';

function BookPage1() {
    //
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

    /*useEffect(() => {
	   async function fetchDataFromContract() {
		 if (web3) {
		   const contract = new web3.eth.Contract(booksSmartContract, contractAddress);
	 
		   const libroCounter = await contract.methods.libroCounter().call();
	 
		   // Itera sobre todos los libros en el contrato y almacénalos en un array
		   const libros = [];
		   for (let i = 0; i < libroCounter; i++) {
			 const libro = await contract.methods.libros(i).call();
			 libros.push(libro);
		   }
	 
		   // Asigna la lista de libros al estado del componente
		   setLibrosContrato(libros);
		 }
	   }
	 
	   fetchDataFromContract();
	 }, [web3]);*/

    useEffect(() => {
        fetchDataFromContract(); // Llamamos a esta función al cargar el componente
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
        // Obtener el libroCounter actual y cargar la lista de libros
        const libroCounter = await contract.methods.libroCounter().call();
        const libros = [];

        for (let i = 0; i < libroCounter; i++) {
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
                    return { ...libro, vendido: event.returnValues.vendido };
                }
                return libro;
            });
            setLibrosContrato(updatedLibros);
        });
    }

    ///17-10-23 arriba
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

            try {
                // Crea un nuevo libro en el contrato
                await contract.methods
                    .crearVenta(nombreLibro, autor, isbn, precioWei)
                    .send({ from: accounts[0] });

                // Después de crear un nuevo libro en el contrato
                const nuevoLibro = {
                    nombreLibro: nombreLibro, // Asigna el nombre del libro
                    autor: autor, // Asigna el autor
                    isbn: isbn, // Asigna el ISBN
                    precio: precioWei, // Asigna el precio en wei
                    vendido: false, // Un libro recién creado no está vendido
                    creadoEn: Date.now(), // Asigna la marca de tiempo actual
                    creador: accounts[0], // Asigna la dirección del creador
                };

                // Actualiza el estado de librosContrato para incluir el nuevo libro
                setLibrosContrato([...librosContrato, nuevoLibro]);

                // Limpia los campos del formulario después de crear la venta
                setNombreLibro("");
                setAutor("");
                setIsbn("");
                setPrecio("");
            } catch (error) {
                alert("Error al crear la venta: " + error.message);
            }
        }
    };

    const handleCompraLibro = (id) => {
        setSelectedBookId(id);
    };

    const handleConfirmCompra = async () => {
        if (selectedBookId !== null) {
            const selectedBook = librosContrato[selectedBookId - 1];

            if (selectedBook.vendido) {
                alert("Este libro ya ha sido vendido");
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
    };

    const handleCancelarCompra = () => {
        setSelectedBookId(null);
    };

    return (
        <div className="App">
            <h1>Crear Venta de Libro</h1>
            <form>
                <div>
                    <label>Nombre del Libro</label>
                    <input
                        type="text"
                        value={nombreLibro}
                        onChange={(e) => setNombreLibro(e.target.value)}
                    />
                </div>
                <div>
                    <label>Autor</label>
                    <input
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                    />
                </div>
                <div>
                    <label>ISBN</label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />
                </div>
                <div>
                    <label>Precio</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleCreateVenta}>
                    Crear Venta
                </button>
            </form>
            <p>Por favor, conecta tu billetera para continuar.</p>

            <h2>Lista de Ventas de Libros:</h2>
            <ul>
                {librosContrato.map((libro, index) => (
                    <li key={index}>
                        <p>Nombre del Libro: {libro.nombreLibro}</p>
                        <p>Autor: {libro.autor}</p>
                        <p>ISBN: {libro.isbn}</p>
                        <p>
                            Precio: {web3.utils.fromWei(libro.precio, "ether")}{" "}
                            ETH
                        </p>
                        {libro.vendido ? (
                            <p>Estado: Vendido</p>
                        ) : (
                            <div>
                                <button
                                    onClick={() => handleCompraLibro(index + 1)}
                                >
                                    Comprar
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {selectedBookId !== null && (
                <div>
                    <h3>Confirmar Compra</h3>
                    <p>¿Estás seguro de que deseas comprar este libro?</p>
                    <p>
                        Precio:{" "}
                        {web3.utils.fromWei(
                            librosContrato[selectedBookId - 1].precio,
                            "ether"
                        )}{" "}
                        ETH
                    </p>
                    <button onClick={handleConfirmCompra}>
                        Confirmar Compra
                    </button>
                    <button onClick={handleCancelarCompra}>Cancelar</button>
                </div>
            )}
            {compraRealizada && (
                <div>
                    <h3>Compra Realizada</h3>
                    <p>Recibo generado:</p>
                    <button onClick={() => recibo.save("recibo_compra.pdf")}>
                        Descargar Recibo
                    </button>
                    {/* <QRCode value={transactionHash} /> {/* Muestra el QR con el hash de la transacción */}
                </div>
            )}
        </div>
    );
}
export default BookPage1;


// -------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------


function BookPage2() {
	

   //
   const { web3, accounts, walletConnected } = useWallet(); // Usa el contexto de la billetera

   const [libros, setLibros] = useState([]);

   const [ventaCreadaEvent, setVentaCreadaEvent] = useState(null);
   
	const [contract, setContract] = useState(null);
	const [nombreLibro, setNombreLibro] = useState('');
	const [autor, setAutor] = useState('');
	const [isbn, setIsbn] = useState('');
	const [precio, setPrecio] = useState('');

	const [librosContrato, setLibrosContrato] = useState([]);

	//22-10
   
   const [selectedBookId, setSelectedBookId] = useState(null);
   const [recibo, setRecibo] = useState(null);

   
   const [compraRealizada, setCompraRealizada] = useState(false);
   let transactionHash = '';
   


   

   

   /*useEffect(() => {
	   async function fetchDataFromContract() {
		 if (web3) {
		   const contract = new web3.eth.Contract(booksSmartContract, contractAddress);
	 
		   const libroCounter = await contract.methods.libroCounter().call();
	 
		   // Itera sobre todos los libros en el contrato y almacénalos en un array
		   const libros = [];
		   for (let i = 0; i < libroCounter; i++) {
			 const libro = await contract.methods.libros(i).call();
			 libros.push(libro);
		   }
	 
		   // Asigna la lista de libros al estado del componente
		   setLibrosContrato(libros);
		 }
	   }
	 
	   fetchDataFromContract();
	 }, [web3]);*/

	 useEffect(() => {
	   async function fetchDataFromContract() {
		 const web3 = new Web3(new Web3.providers.HttpProvider(infuraURL));
		 const contract = new web3.eth.Contract(booksSmartContract, contractAddress);
		   // Registrar información adicional, como las respuestas de llamadas a contratos inteligentes
		   web3.eth.getBalance("0xad7c076227C8fb87D81cfC9104cc3F9AeeDdD02F").then(balance => {
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
   
	   fetchDataFromContract();
	 }, []);
	 ///17-10-23 arriba
	const handleCreateVenta = async () => {
	   if (!walletConnected) {
		 alert('Por favor, conecta tu billetera antes de crear una venta.');
		 return;
	   }
   
	   if (web3) {
		 const contract = new web3.eth.Contract(booksSmartContract, contractAddress);
   
			// Convierte el precio ingresado en ether a wei
			const precioWei = web3.utils.toWei(precio, 'ether');

			await contract.methods
			  .crearVenta(nombreLibro, autor, isbn, precioWei) // Envía el precio en wei
			  .send({ from: accounts[0] });
		  }
	 };

	 
 const handleCompraLibro = (id) => {
   setSelectedBookId(id);
 };

 const handleConfirmCompra = async () => {
   if (selectedBookId !== null) {
	 const selectedBook = librosContrato[selectedBookId - 1];

	 if (selectedBook.vendido) {
		alert('Este libro ya ha sido vendido');
		return;
	  }
	 const precioWei = selectedBook.precio;
	 if (web3) {
	   const contract = new web3.eth.Contract(booksSmartContract, contractAddress);
	   const transaction = await contract.methods.comprarLibro(selectedBookId).send({
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
        doc.text('Recibo de Compra', 10, 10);
        doc.text('Fecha y Hora: ' + new Date().toLocaleString(), 10, 20);
        doc.text('Libro: ' + selectedBook.nombreLibro, 10, 30);
        doc.text('Autor: ' + selectedBook.autor, 10, 40);
        doc.text('ISBN: ' + selectedBook.isbn, 10, 50);
        doc.text('Precio: ' + web3.utils.fromWei(selectedBook.precio, 'ether') + ' ETH', 10, 60);
		
		 // Generar el código QR y agregarlo al PDF
		 const qrData = etherscanUrl;
		 const qrDataUrl = await qr.toDataURL(qrData); // Utiliza 'toDataURL'
		 doc.addImage(qrDataUrl, 'JPEG', 10, 70, 50, 50);
   

        // Establecer la compra como realizada y almacenar el recibo
        setCompraRealizada(true);
        setRecibo(doc);
	 }
   }
 };

 const handleCancelarCompra = () => {
   setSelectedBookId(null);
 };

 
  
  
  
   
	return (
	  <div className="App">
		<h1>Crear Venta de Libro</h1>
		<form>
		  <div>
			<label>Nombre del Libro</label>
			<input type="text" value={nombreLibro} onChange={(e) => setNombreLibro(e.target.value)} />
		  </div>
		  <div>
			<label>Autor</label>
			<input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
		  </div>
		  <div>
			<label>ISBN</label>
			<input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
		  </div>
		  <div>
			<label>Precio</label>
			<input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
		  </div>
		  <button type="button" onClick={handleCreateVenta}>
			Crear Venta
		  </button>
		</form>
		<p>Por favor, conecta tu billetera para continuar.</p>

		<h2>Lista de Ventas de Libros:</h2>
		<ul>
		{librosContrato.map((libro, index) => (
  <li key={index}>
    <p>Nombre del Libro: {libro.nombreLibro}</p>
    <p>Autor: {libro.autor}</p>
    <p>ISBN: {libro.isbn}</p>
    <p>Precio: {web3.utils.fromWei(libro.precio, 'ether')} ETH</p>
    {libro.vendido ? (
      <p>Estado: Vendido</p>
    ) : (
      <div>
        <button onClick={() => handleCompraLibro(index + 1)}>
          Comprar
        </button>
      </div>
    )}
  </li>
))}
</ul>

	 {selectedBookId !== null && (
	   <div>
		 <h3>Confirmar Compra</h3>
		 <p>¿Estás seguro de que deseas comprar este libro?</p>
		 <p>Precio: {web3.utils.fromWei(librosContrato[selectedBookId - 1].precio, 'ether')} ETH</p>
		 <button onClick={handleConfirmCompra}>Confirmar Compra</button>
		 <button onClick={handleCancelarCompra}>Cancelar</button>
		 
	   </div>
	   
	 )}
	  {compraRealizada && (
        <div>
          <h3>Compra Realizada</h3>
          <p>Recibo generado:</p>
          <button onClick={() => recibo.save('recibo_compra.pdf')}>Descargar Recibo</button>
       {/* <QRCode value={transactionHash} /> {/* Muestra el QR con el hash de la transacción */}
        </div>
      )}


   </div>
   
	);
  
}
export default BookPage2;