import "./SideMenu.css";

function SideMenu() {
    return (
        <div>
            <input type="checkbox" id="check"></input>
            <label for="check">
                <img id="btn" src={require("../../icons/menu.png")} />
                <img id="cancel" src={require("../../icons/close.png")} />
            </label>
            <div className="sidebar">
                <header>Productos</header>
                <ul>
                    <li>
                        <a href="#">Comida</a>
                    </li>
                    <li>
                        <a href="#">Ropa</a>
                    </li>
                    <li>
                        <a href="#">Electrodomesticos</a>
                    </li>
                    <li>
                        <a href="#">Artesanías</a>
                    </li>
                    <li>
                        <a href="#">Servicios</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default SideMenu;

