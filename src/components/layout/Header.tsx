import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import logo from "../../assets/logo.png";

export default function Header() {
    const { usuario, autenticado, logout } = useAuth();
    const navigate = useNavigate();

    function cerrarSesion() {
        logout();
        navigate("/login", { replace: true });
    }

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
                    <NavLink to="/" end>
                        Inicio
                    </NavLink>

                    <NavLink to="/animales">
                        Animales
                    </NavLink>

                    <NavLink to="/refugios">
                        Refugios
                    </NavLink>

                    {autenticado && usuario ? (
                        <>
                            <NavLink
                                to="/perfil"
                                className="header-profile"
                            >
                                <span className="header-avatar">
                                    {usuario.nombre.charAt(0).toUpperCase()}
                                </span>
                                Mi perfil
                            </NavLink>

                            <button
                                type="button"
                                className="header-logout"
                                onClick={cerrarSesion}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login">
                            Ingresar
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
}