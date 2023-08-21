import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import SideMenu from './components/SideMenu';
import Form from './components/Form';
import ProductPage from './components/productPage/ProductPage';

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
