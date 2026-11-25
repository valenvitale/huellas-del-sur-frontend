import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import "../styles/Auth.css";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Completá todos los campos.");
            return;
        }

        try {
            login({ email, password });
            navigate("/perfil");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo iniciar sesión."
            );
        }
    }

    return (
        <section className="auth-container">
            <Card className="auth-card">
                <div className="auth-heading">
                    <h1>¡Bienvenido!</h1>
                    <p>Ingresá a tu cuenta de Huellas del Sur.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
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
                        placeholder="Ingresá tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />

                    <Link
                        to="/recuperar-password"
                        className="auth-recovery"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>

                    {error && (
                        <p className="auth-error" role="alert">
                            {error}
                        </p>
                    )}

                    <Button type="submit">
                        Iniciar sesión
                    </Button>
                </form>

                <div className="auth-bottom">
                    ¿No tenés una cuenta?{" "}
                    <Link to="/registro">Registrate</Link>
                </div>
            </Card>
        </section>
    );
}