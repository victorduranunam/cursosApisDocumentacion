import { Link } from "react-router-dom";

function Menu() {
 return (
  <nav className="menu">
   <ul>
    <li><Link to="/">Inicio</Link></li>
    <li><Link to="/nosotros">Nosotros</Link></li>
    <li><Link to="/servicios">Servicios</Link></li>
    <li><Link to="/contacto">Contacto</Link></li>
   </ul>
  </nav>
 );
}

export default Menu;
