// import logo from './logo.svg';
// import './App.css';
import "./Menu.css";
import "./SearchBar";
//import ConnectWalletBtn from "./ConnectWalletBtn";
import ConnectWalletBtn from "../connectWallet/ConnectWalletBtn";
import SearchBar from "./SearchBar";
// import mainLogo from './blockchain.png'

function Menu() {
    return (
        <nav className="navbarra">
            <div className="nav-lista">
                <div className="logo-contenedor">
                    <li className="logo-empresa">
                        <img
                            src={require("../../img/blockchain.png")}
                            alt="logo"
                        />
                        <label id="brand-name">Blockchain</label>
                    </li>
                </div>

                <div className="search-contenedor">
                    <a>
                        <SearchBar />
                    </a>
                </div>

                <div className="menu-contenedor">
                    <li>
                        <a href="#" className="navegador-item">
                            <img src={require("../../icons/home.png")} />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="navegador-item">
                            <img src={require("../../icons/heart.png")} />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="navegador-item">
                            <img
                                src={require("../../icons/shopping-cart.png")}
                            />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="navegador-item">
                            <img src={require("../../icons/bell.png")} />
                        </a>
                    </li>
                    <li className="navegador-item">
                        <ConnectWalletBtn />
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
