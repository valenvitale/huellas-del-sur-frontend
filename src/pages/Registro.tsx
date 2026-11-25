import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import "../styles/Auth.css";

export default function Registro() {
    const { registro } = useAuth();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (
            !nombre.trim() ||
            !telefono.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmarPassword.trim()
        ) {
            setError("Completá todos los campos.");
            return;
        }

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        if (password !== confirmarPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            registro({
                nombre,
                telefono,
                email,
                password,
            });

            navigate("/perfil");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo completar el registro."
            );
        }
    }

    return (
        <section className="auth-container">
            <Card className="auth-card">
                <div className="auth-heading">
                    <h1>Creá tu cuenta</h1>
                    <p>
                        Formá parte de Huellas del Sur y encontrá
                        a tu compañero ideal.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <Input
                        label="Nombre completo"
                        placeholder="Ingresá tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        autoComplete="name"
                        required
                    />

                    <Input
                        label="Teléfono"
                        type="tel"
                        placeholder="2911234567"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        autoComplete="tel"
                        required
                    />

                    <Input
                        label="Correo electrónico"
                        type="email"
                        placeholder="nombre@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                    />

                    <Input
                        label="Confirmar contraseña"
                        type="password"
                        placeholder="Repetí tu contraseña"
                        value={confirmarPassword}
                        onChange={(e) =>
                            setConfirmarPassword(e.target.value)
                        }
                        autoComplete="new-password"
                        required
                    />

                    {error && (
                        <p className="auth-error" role="alert">
                            {error}
                        </p>
                    )}

                    <Button type="submit">
                        Crear cuenta
                    </Button>
                </form>

                <div className="auth-bottom">
                    ¿Ya tenés una cuenta?{" "}
                    <Link to="/login">Iniciá sesión</Link>
                </div>
            </Card>
        </section>
    );
}