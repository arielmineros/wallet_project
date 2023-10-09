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
import ProtectedRoute from "./components/protected/ProtectedRoute";
import BookForm from "./components/productPage/BookForm";
import { BookProvider } from "./context/BookContext";

function App() {
    return (
        <div>
            <AuthProvider>
                <BookProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="register" element={<Register />} />
                            <Route path="login" element={<Login />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<Menu />}>
                                    <Route path="/" element={<Product1 />} />
                                    <Route
                                        path="ProductDetail"
                                        element={<ProductDetail />}
                                    />
                                    <Route path="ProductDetail" />
                                    <Route
                                        path="books"
                                        element={<BookForm />}
                                    />
                                    
                                    
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </BookProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
