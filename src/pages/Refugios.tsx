import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerRefugios } from "../services/refugiosService";
import type { Refugio } from "../types/Refugio";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import "../styles/Refugios.css";

export default function Refugios() {
    const [refugios, setRefugios] = useState<Refugio[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [totalRefugios, setTotalRefugios] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        let activo = true;

        obtenerRefugios(busqueda, localidad, pagina, 2)
            .then((respuesta) => {
                if (!activo) return;

                setError(null);
                setRefugios(respuesta.data.refugios);
                setTotalPaginas(respuesta.data.pagination.totalPages);
                setTotalRefugios(respuesta.data.pagination.total);
            })
            .catch(() => {
                if (!activo) return;

                setError("No se pudieron cargar los refugios.");
                setRefugios([]);
                setTotalRefugios(0);
            })
            .finally(() => {
                if (!activo) return;

                setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, [busqueda, localidad, pagina]);

    return (
        <section>
            <div className="refugios-header">
                <div>
                    <h1>Refugios</h1>
                    <p>Conocé los refugios de nuestra comunidad.</p>
                </div>

                <Button onClick={() => navigate("/refugios/nuevo")}>
                    + Nuevo refugio
                </Button>
            </div>

            <div className="refugios-filtros">
                <Input
                    label="Buscar por nombre"
                    placeholder="Ingresá el nombre del refugio"
                    value={busqueda}
                    onChange={(e) => {
                        setCargando(true);
                        setBusqueda(e.target.value);
                        setPagina(1);
                    }}
                />

                <Input
                    label="Localidad"
                    placeholder="Ej.: Bahía Blanca"
                    value={localidad}
                    onChange={(e) => {
                        setCargando(true);
                        setLocalidad(e.target.value);
                        setPagina(1);
                    }}
                />
            </div>

            <p>Total de refugios encontrados: {totalRefugios}</p>

            {cargando && <p>Cargando refugios...</p>}

            {!cargando && error && (
                <p role="alert">{error}</p>
            )}

            {!cargando && !error && refugios.length === 0 && (
                <p>No se encontraron refugios con los filtros seleccionados.</p>
            )}

            <div className="refugios-grid">
                {!cargando && !error && refugios.map((refugio) => (
                    <Card key={refugio.id}>
                        <h2>{refugio.nombre}</h2>

                        <p>Localidad: {refugio.localidad}</p>

                        <span className={`estado-${refugio.estado}`}>
                            {refugio.estado === "activo" ? "Activo" : "Inactivo"}
                        </span>

                        <p>{refugio.descripcion}</p>

                        <Button
                            onClick={() => navigate(`/refugios/${refugio.id}`)}
                        >
                            Ver detalles →
                        </Button>
                    </Card>
                ))}
            </div>

            {!cargando && !error && totalRefugios > 0 && (
                <div className="refugios-pagination">
                    <Button
                        onClick={() => {
                            setCargando(true);
                            setPagina(pagina - 1);
                        }}
                        disabled={pagina === 1}
                    >
                        ← Anterior
                    </Button>

                    <span className="pagination-info">
                        Página {pagina} de {totalPaginas}
                    </span>

                    <Button
                        onClick={() => {
                            setCargando(true);
                            setPagina(pagina + 1);
                        }}
                        disabled={pagina >= totalPaginas}
                    >
                        Siguiente →
                    </Button>
                </div>
            )}
        </section>
    );
}