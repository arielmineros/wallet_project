// import logo from './logo.svg';
// import './App.css';
import './Menu.css'
import './SearchBar'
import ConnectWalletBtn from "./ConnectWalletBtn";
import SearchBar from './SearchBar';
// import mainLogo from './blockchain.png'

function Menu() {
  return (
    <nav className="navbar">
      <div className="nav-list">
        
        <div className='logo-container'>
            <li className='logo'>
              <img src={require('./blockchain.png')} alt='logo' />
              <label id='brand-name'>Blockchain</label>
            </li>

        </div>

        <div className='search-container'>
          <a><SearchBar /></a>
        </div>

       <div className='menu-container'>
          <li>
            <a href='#' className="nav-item" id='nav-ini'><img src={require('../icons/home.png')} /></a>
          </li>
          <li>
            <a href='#' className="nav-item" id='nav-ini'><img src={require('../icons/heart.png')} /></a>
          </li>
          <li>
            <a href='#' className="nav-item" id='nav-ini'><img src={require('../icons/shopping-cart.png')} /></a>
          </li>
          <li>
            <a href='#' className="nav-item" id='nav-ini'><img src={require('../icons/bell.png')} /></a>
          </li>
          <li className="nav-item">
          <ConnectWalletBtn />
          </li>
       </div>
        
      </div>
    </nav>
  );
}

export default Menu;
