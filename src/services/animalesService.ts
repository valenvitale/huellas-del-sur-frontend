import type {
    AnimalesResponse,
    FiltrosAnimales
} from "../types/Animal";

const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerAnimales(
    filtros: FiltrosAnimales = {}
): Promise<AnimalesResponse> {
    const url = new URL(`${API_URL}/animales`);

    const {
        nombre,
        especie,
        tamanio,
        estado,
        localidad,
        page = 1,
        limit = 6
    } = filtros;

    if (nombre?.trim()) {
        url.searchParams.set("nombre", nombre.trim());
    }

    if (especie) {
        url.searchParams.set("especie", especie);
    }

    if (tamanio) {
        url.searchParams.set("tamanio", tamanio);
    }

    if (estado) {
        url.searchParams.set("estado", estado);
    }

    if (localidad) {
        url.searchParams.set("localidad", localidad);
    }

    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));

    const respuesta = await fetch(url.toString());

    if (!respuesta.ok) {
        throw new Error("Error al obtener los animales");
    }

    const datos: AnimalesResponse = await respuesta.json();

    return datos;
}