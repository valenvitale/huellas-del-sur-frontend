import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import "../styles/Auth.css";

export default function Perfil() {
    const { usuario, editarPerfil, logout } = useAuth();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState(usuario?.nombre ?? "");
    const [telefono, setTelefono] = useState(usuario?.telefono ?? "");
    const [email, setEmail] = useState(usuario?.email ?? "");
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setMensaje("");

        if (!nombre.trim() || !telefono.trim() || !email.trim()) {
            setError("Completá todos los campos.");
            return;
        }

        try {
            editarPerfil({ nombre, telefono, email });
            setEditando(false);
            setMensaje("Tus datos se actualizaron correctamente.");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar el perfil."
            );
        }
    }

    function cancelarEdicion() {
        if (!usuario) return;

        setNombre(usuario.nombre);
        setTelefono(usuario.telefono);
        setEmail(usuario.email);
        setEditando(false);
        setError("");
    }

    function cerrarSesion() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <section className="auth-container">
            <Card className="auth-card perfil-card">
                <div className="auth-heading">
                    <div className="perfil-avatar">
                        {usuario.nombre.charAt(0).toUpperCase()}
                    </div>

                    <h1>Mi perfil</h1>
                    <p>Administrá tus datos personales.</p>

                    <span className="perfil-rol">
                        {usuario.rol}
                    </span>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <Input
                        label="Nombre completo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        disabled={!editando}
                        required
                    />

                    <Input
                        label="Teléfono"
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        disabled={!editando}
                        required
                    />

                    <Input
                        label="Correo electrónico"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!editando}
                        required
                    />

                    {error && (
                        <p className="auth-error" role="alert">
                            {error}
                        </p>
                    )}

                    {mensaje && (
                        <p className="auth-success" role="status">
                            {mensaje}
                        </p>
                    )}

                    {editando ? (
                        <>
                            <Button type="submit">
                                Guardar cambios
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={cancelarEdicion}
                            >
                                Cancelar
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => {
                                setEditando(true);
                                setMensaje("");
                            }}
                        >
                            Editar perfil
                        </Button>
                    )}
                </form>

                <div className="auth-bottom">
                    <Button
                        className="btn-logout"
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </Card>
        </section>
    );
}