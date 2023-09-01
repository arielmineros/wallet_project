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

//const initialProducts = products;
function App() {
    //const productos = products;
    //const { filterProducts } = useFilters();
    //const filteredProducts = filterProducts(initialProducts);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Menu />}>
                    <Route path="/" element={<Login />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="ProductDetail" element={<ProductDetail />} />
                    <Route path="Registrar" element={<RegisTro />} />
                    <Route path="ProductDetail" />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
//<Route path="Cart" element={<Cart />} />
