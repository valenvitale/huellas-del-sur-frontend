import { useEffect, useState } from "react";
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
    const [refugioSeleccionado, setRefugioSeleccionado] = useState<Refugio | null>(null);

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
            <h1>Refugios</h1>

            <Input
                label="Buscar refugio"
                placeholder="Ingresá el nombre del refugio"
                value={busqueda}
                onChange={(e) => {
                    setCargando(true);
                    setBusqueda(e.target.value);
                    setPagina(1);
                    setRefugioSeleccionado(null);
                }}
            />

            <Input
                label="Filtrar por localidad"
                placeholder="Ej.: Bahía Blanca"
                value={localidad}
                onChange={(e) => {
                    setCargando(true);
                    setLocalidad(e.target.value);
                    setPagina(1);
                    setRefugioSeleccionado(null);
                }}
            />

            <p>Total de refugios encontrados: {totalRefugios}</p>

            {cargando && <p>Cargando refugios...</p>}

            {!cargando && error && (
                <p role="alert">{error}</p>
            )}

            {!cargando && !error && refugios.length === 0 && (
                <p>No se encontraron refugios con los filtros seleccionados.</p>
            )}

            {!cargando && !error && refugios.map((refugio) => (
                <Card key={refugio.id}>
                    <h2>{refugio.nombre}</h2>
                    <p>Localidad: {refugio.localidad}</p>
                    <p>Estado: {refugio.estado}</p>

                    {refugioSeleccionado?.id === refugio.id && (
                        <div className="refugio-detalles">
                            <p>Dirección: {refugio.direccion}</p>
                            <p>Teléfono: {refugio.telefono}</p>

                            {refugio.email && (
                                <p>Email: {refugio.email}</p>
                            )}

                            <p>Descripción: {refugio.descripcion}</p>
                        </div>
                    )}

                    <Button
                        onClick={() =>
                            setRefugioSeleccionado(
                                refugioSeleccionado?.id === refugio.id
                                    ? null
                                    : refugio
                            )
                        }
                    >
                        {refugioSeleccionado?.id === refugio.id
                            ? "Cerrar detalles"
                            : "Ver detalles"}
                    </Button>
                </Card>
            ))}

            {!cargando && !error && totalRefugios > 0 && (
                <div className="refugios-pagination">
                    <Button
                        onClick={() => {
                            setCargando(true);
                            setPagina(pagina - 1);
                            setRefugioSeleccionado(null);
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
                            setRefugioSeleccionado(null);
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