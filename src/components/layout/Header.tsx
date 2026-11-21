import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <NavLink to="/" className="brand">
          <img
            src={logo}
            alt="Logo Huellas del Sur"
            className="brand-logo"
          />
          <span>Huellas del Sur</span>
        </NavLink>

        <nav aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/animales">Animales</NavLink>
          <NavLink to="/refugios">Refugios</NavLink>
          <NavLink to="/login">Ingresar</NavLink>
        </nav>
      </div>
    </header>
  );
}
