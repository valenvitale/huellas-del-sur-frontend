import { useEffect, useState } from "react";
import AnimalCard from "../components/animales/AnimalCard";
import { obtenerAnimales } from "../services/animalesService";

import type {
    AnimalCatalogo,
    FiltrosAnimales,
    EstadoAnimal,
    TamanioAnimal
} from "../types/Animal";

import "../styles/Animales.css";

const LIMITE = 6;

const filtrosIniciales: FiltrosAnimales = {
    nombre: "",
    especie: "",
    localidad: "",
    estado: "disponible",
    page: 1,
    limit: LIMITE
};

export default function Animales() {
    const [animales, setAnimales] = useState<AnimalCatalogo[]>([]);
    const [filtros, setFiltros] = useState<FiltrosAnimales>(filtrosIniciales);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const pagina = filtros.page ?? 1;

    useEffect(() => {
        let activo = true;

        obtenerAnimales(filtros)
            .then((respuesta) => {
                if (!activo) return;

                setAnimales(respuesta.data.animales);
                setTotal(respuesta.data.pagination.total);
                setTotalPages(respuesta.data.pagination.totalPages);
            })
            .catch(() => {
                if (!activo) return;

                setError("No pudimos cargar los animales. Intentá nuevamente.");
            })
            .finally(() => {
                if (activo) {
                    setCargando(false);
                }
            });

        return () => {
            activo = false;
        };
    }, [filtros]);

    function actualizarFiltro<K extends keyof FiltrosAnimales>(
        campo: K,
        valor: FiltrosAnimales[K]
    ) {
        setCargando(true);
        setError("");

        setFiltros((anteriores) => ({
            ...anteriores,
            [campo]: valor,
            page: 1
        }));
    }

    function limpiarFiltros() {
        setCargando(true);
        setError("");
        setFiltros({ ...filtrosIniciales });
    }

    function cambiarPagina(nuevaPagina: number) {
        if (nuevaPagina < 1 || nuevaPagina > totalPages) return;

        setCargando(true);
        setError("");

        setFiltros((anteriores) => ({
            ...anteriores,
            page: nuevaPagina
        }));
    }

    function reintentar() {
        setCargando(true);
        setError("");
        setFiltros((anteriores) => ({ ...anteriores }));
    }

    return (
        <section className="animales-page">
            <header className="animales-heading">
                <span className="animales-eyebrow">
                    Encontrá a tu próximo compañero
                </span>

                <h1>Huellas que buscan un hogar</h1>

                <p>
                    Conocé a los animales de Bahía Blanca y la región
                    que están esperando una nueva oportunidad.
                </p>
            </header>

            <div className="animales-filtros">
                <div className="animal-filtro">
                    <label htmlFor="nombre">Buscar por nombre</label>

                    <input
                        id="nombre"
                        type="search"
                        placeholder="Ej.: Luna"
                        value={filtros.nombre ?? ""}
                        onChange={(e) =>
                            actualizarFiltro("nombre", e.target.value)
                        }
                    />
                </div>

                <div className="animal-filtro">
                    <label htmlFor="especie">Especie</label>

                    <select
                        id="especie"
                        value={filtros.especie ?? ""}
                        onChange={(e) =>
                            actualizarFiltro("especie", e.target.value)
                        }
                    >
                        <option value="">Todas</option>
                        <option value="perro">Perros</option>
                        <option value="gato">Gatos</option>
                    </select>
                </div>

                <div className="animal-filtro">
                    <label htmlFor="tamanio">Tamaño</label>

                    <select
                        id="tamanio"
                        value={filtros.tamanio ?? ""}
                        onChange={(e) =>
                            actualizarFiltro(
                                "tamanio",
                                (e.target.value || undefined) as
                                    TamanioAnimal | undefined
                            )
                        }
                    >
                        <option value="">Todos</option>
                        <option value="pequeno">Pequeño</option>
                        <option value="mediano">Mediano</option>
                        <option value="grande">Grande</option>
                    </select>
                </div>

                <div className="animal-filtro">
                    <label htmlFor="localidad">Localidad</label>

                    <select
                        id="localidad"
                        value={filtros.localidad ?? ""}
                        onChange={(e) =>
                            actualizarFiltro("localidad", e.target.value)
                        }
                    >
                        <option value="">Todas</option>
                        <option value="Bahía Blanca">Bahía Blanca</option>
                        <option value="Punta Alta">Punta Alta</option>
                        <option value="Ingeniero White">Ingeniero White</option>
                        <option value="General Daniel Cerri">
                            General Daniel Cerri
                        </option>
                        <option value="Cabildo">Cabildo</option>
                    </select>
                </div>

                <div className="animal-filtro">
                    <label htmlFor="estado">Estado de adopción</label>

                    <select
                        id="estado"
                        value={filtros.estado ?? ""}
                        onChange={(e) =>
                            actualizarFiltro(
                                "estado",
                                (e.target.value || undefined) as
                                    EstadoAnimal | undefined
                            )
                        }
                    >
                        <option value="">Todos</option>
                        <option value="disponible">Disponible</option>
                        <option value="en_proceso">En proceso</option>
                        <option value="adoptado">Adoptado</option>
                    </select>
                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={limpiarFiltros}
                >
                    Restablecer filtros
                </button>
            </div>

            {!cargando && !error && (
                <div className="animales-resultados" aria-live="polite">
                    <p>
                        {total} {total === 1
                            ? "animal encontrado"
                            : "animales encontrados"}
                    </p>
                </div>
            )}

            {cargando ? (
                <div className="animales-mensaje" role="status">
                    <p>Cargando animales...</p>
                </div>
            ) : error ? (
                <div className="animales-mensaje" role="alert">
                    <h2>Ocurrió un problema</h2>
                    <p>{error}</p>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={reintentar}
                    >
                        Reintentar
                    </button>
                </div>
            ) : animales.length === 0 ? (
                <div className="animales-mensaje">
                    <h2>No encontramos animales</h2>

                    <p>
                        Probá modificando los filtros para encontrar
                        otros compañeros.
                    </p>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={limpiarFiltros}
                    >
                        Restablecer filtros
                    </button>
                </div>
            ) : (
                <>
                    <div className="animales-grid">
                        {animales.map((animal) => (
                            <AnimalCard
                                key={animal.id}
                                animal={animal}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <nav
                            className="animales-paginacion"
                            aria-label="Paginación de animales"
                        >
                            <button
                                type="button"
                                className="btn btn-secondary"
                                disabled={pagina === 1}
                                onClick={() => cambiarPagina(pagina - 1)}
                            >
                                Anterior
                            </button>

                            <span>
                                Página {pagina} de {totalPages}
                            </span>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                disabled={pagina === totalPages}
                                onClick={() => cambiarPagina(pagina + 1)}
                            >
                                Siguiente
                            </button>
                        </nav>
                    )}
                </>
            )}
        </section>
    );
}