import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/mainMenu/Menu";
import SideMenu from "./components/mainMenu/SideMenu";
import Form from "./components/forms/Form.jsx";
import ProductPage from "./components/productPage/ProductPage";

function App() {
    return (
        <div>
            <Menu />
            <SideMenu />
            <ProductPage />
            <Form />
        </div>
    );
}

export default App;
