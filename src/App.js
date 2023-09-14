import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/mainMenu/Menu";
//import SideMenu from "./components/mainMenu/SideMenu";
import Form from "./components/forms/Form.jsx";
import ProductDetail from "./components/productPage/ProductDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Registrar";
import { AuthProvider } from "./context/AuthContext";
//import RegisTro from "./components/login/Registrar";
import WalletInfo from "./components/walletInfo/walletInfo";
import Product1 from "./components/productPage/Products1";
// import { Products } from "./components/productPage/Products";
// import walletInfo from "./components/walletInfo/walletInfo";
// import Product1 from "./components/productPage/Products1";

function App() {
    //const productos = products;
    //const { filterProducts } = useFilters();
    //const filteredProducts = filterProducts(initialProducts);
    // const [account, setAccount] = useState(null); //guardar cuenta
    return (
        // const accounts = await web3Instance.eth.getAccounts();
        // setAccount(accounts[0]);
        // const balanceWei = await web3Instance.eth.getBalance(accounts[0]);  // Representa el saldo de una cuenta en wei

        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Menu />}>
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login />} />
                        <Route
                            path="ProductDetail"
                            element={<ProductDetail />}
                        />
                        <Route path="ProductDetail" />
                        <Route path="/Cart" element={<Product1 />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
//<Route path="Cart" element={<Cart />} />
