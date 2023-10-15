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
import BookPage from "./components/productPage/BookPage";
import { BookProvider } from "./context/BookContext";
import BookCard from "./components/productPage/BookCard";

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
                                    <Route path="/" element={<BookPage />} />
                                    <Route
                                        path="ProductDetail"
                                        element={<ProductDetail />}
                                    />
                                    <Route path="ProductDetail" />
                                    <Route
                                        path="books"
                                        element={<BookCard />}
                                    />
                                    <Route
                                        path="books-user"
                                        element={<BookForm />}
                                    />
                                    <Route
                                        path="books-user/:id"
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
