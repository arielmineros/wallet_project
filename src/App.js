import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/mainMenu/Menu";
//import SideMenu from "./components/mainMenu/SideMenu";
import Form from "./components/forms/Form.jsx";
import ProductDetail from "./components/productPage/ProductDetail";
import { Route, Routes } from "react-router-dom";
//import { Cart } from "./components/cart/Cart";
//import { Products } from "./components/productPage/Products";
//import { CartProvider } from "./components/context/cart";
//import { useFilters } from "./components/hooks/useFilters";
//import products from "./components/mocks/products.json";
import Login from "./components/login/Login";
import RegisTro from "./components/login/Registrar";
import WalletInfo from "./components/walletInfo/walletInfo";
// import walletInfo from "./components/walletInfo/walletInfo";
// import Product1 from "./components/productPage/Products1";

//const initialProducts = products;
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
            <Routes>
                <Route path="/" element={<Menu />}>
                    <Route path="/" element={<Login />} />
                    {/* <Route path="Login" element={<Login />} /> */}
                    <Route path="/WalletInfo" element={<WalletInfo />} />
                    <Route path="ProductDetail" element={<ProductDetail />} />
                    <Route path="Registrar" element={<RegisTro />} />
                    {/* <Route path="walletInfo" element={<walletInfo account={account} balance={balance} contract={contract}/>}/> */}
                    {/* <Route path="Product1" element={<Product1 />} /> */}
                    <Route path="ProductDetail" />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
//<Route path="Cart" element={<Cart />} />
