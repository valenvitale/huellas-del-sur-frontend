import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { recuperarPassword } from "../services/authService";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import "../styles/Auth.css";

export default function RecuperarPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setMensaje("");

        if (!email.trim()) {
            setError("Ingresá tu correo electrónico.");
            return;
        }

        try {
            const respuesta = recuperarPassword(email);
            setMensaje(respuesta);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo recuperar la contraseña."
            );
        }
    }

    return (
        <section className="auth-container">
            <Card className="auth-card">
                <div className="auth-heading">
                    <h1>Recuperá tu contraseña</h1>
                    <p>
                        Ingresá el correo electrónico asociado
                        a tu cuenta.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <Input
                        label="Correo electrónico"
                        type="email"
                        placeholder="nombre@correo.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                            setMensaje("");
                        }}
                        autoComplete="email"
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

                    <Button type="submit">
                        Enviar instrucciones
                    </Button>
                </form>

                <div className="auth-bottom">
                    <Link to="/login">
                        Volver a iniciar sesión
                    </Link>
                </div>
            </Card>
        </section>
    );
}