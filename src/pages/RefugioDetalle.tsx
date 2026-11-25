import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Refugio } from "../types/Refugio";
import { obtenerRefugioPorId, eliminarRefugio } from "../services/refugiosService";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import "../styles/Refugios.css";

export default function RefugioDetalle() {
    const [refugio, setRefugio] = useState<Refugio | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [eliminando, setEliminando] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let activo = true;

        async function cargarRefugio() {
            setCargando(true);
            setError("");

            if (!id) {
                setError("El ID de refugio es inválido.");
                setCargando(false);
                return;
            }

            try {
                const respuesta = await obtenerRefugioPorId(id);

                if (activo) {
                    setRefugio(respuesta.data.refugio);
                }
            } catch (error) {
                if (!activo) return;

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Error al obtener el refugio.");
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarRefugio();

        return () => {
            activo = false;
        };
    }, [id]);

    async function handleEliminar() {
        if (!id) return;

        const confirmado = window.confirm(
            "¿Estás seguro de que deseas eliminar este refugio?"
        );

        if (!confirmado) return;

        setEliminando(true);

        try {
            const respuesta = await eliminarRefugio(id);
            window.alert(respuesta.msg);
            navigate("/refugios");
        } catch (error) {
            if (error instanceof Error) {
                window.alert(error.message);
            } else {
                window.alert("No se pudo eliminar el refugio.");
            }
        } finally {
            setEliminando(false);
        }
    }

    if (cargando) {
        return <p>Cargando refugio...</p>;
    }

    if (error) {
        return <p className="refugio-error" role="alert">{error}</p>;
    }

    if (!refugio) {
        return <p>Refugio no encontrado.</p>;
    }

    return (
        <section>
            <Card className="refugio-detalle">
                <h1>{refugio.nombre}</h1>

                <p><strong>ID:</strong> {refugio.id}</p>
                <p><strong>Dirección:</strong> {refugio.direccion}</p>
                <p><strong>Localidad:</strong> {refugio.localidad}</p>
                <p><strong>Teléfono:</strong> {refugio.telefono}</p>
                <p><strong>Email:</strong> {refugio.email || "No informado"}</p>
                <p><strong>Descripción:</strong> {refugio.descripcion}</p>
                <p><strong>Estado:</strong> {refugio.estado}</p>

                <div className="refugio-acciones">
                    <Button
                        variant="secondary"
                        onClick={() => navigate("/refugios")}
                        disabled={eliminando}
                    >
                        Volver
                    </Button>

                    <Button
                        variant="primary"
                        onClick={() => navigate(`/refugios/${refugio.id}/editar`)}
                        disabled={eliminando}
                    >
                        Editar
                    </Button>

                    <Button
                        variant="danger"
                        onClick={handleEliminar}
                        disabled={eliminando}
                    >
                        {eliminando ? "Eliminando..." : "Eliminar"}
                    </Button>
                </div>
            </Card>
        </section>
    );
}