import type {
    RefugiosResponse,
    RefugioResponse,
    RefugioInput,
    EliminarRefugioResponse,
} from "../types/Refugio";

const API_URL = "http://localhost:3000/api/v1/refugios";

// Obtener listado de refugios
export async function obtenerRefugios(
    nombre?: string,
    localidad?: string,
    page: number = 1,
    limit: number = 2,
): Promise<RefugiosResponse> {
    const url = new URL(API_URL);

    if (nombre) {
        url.searchParams.set("nombre", nombre);
    }

    if (localidad) {
        url.searchParams.set("localidad", localidad);
    }

    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));

    const respuesta = await fetch(url.toString());

    if (!respuesta.ok) {
        throw new Error("Error al obtener los refugios");
    }

    return await respuesta.json();
}

// Obtener un refugio por ID
export async function obtenerRefugioPorId(
    id: string
): Promise<RefugioResponse> {
    const respuesta = await fetch(`${API_URL}/${id}`);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            datos.msg || "Error al obtener el refugio"
        );
    }

    return datos;
}

// Crear un refugio
export async function crearRefugio(
    refugio: RefugioInput
): Promise<RefugioResponse> {
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(refugio),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            datos.msg || "Error al crear el refugio"
        );
    }

    return datos;
}

// Actualizar un refugio
export async function actualizarRefugio(
    id: string,
    refugio: RefugioInput
): Promise<RefugioResponse> {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(refugio),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            datos.msg || "Error al actualizar el refugio"
        );
    }

    return datos;
}

// Eliminar un refugio
export async function eliminarRefugio(
    id: string
): Promise<EliminarRefugioResponse> {
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            datos.msg || "Error al eliminar el refugio"
        );
    }

    return datos;
}