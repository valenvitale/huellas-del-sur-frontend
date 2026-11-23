import type { RefugiosResponse } from "../types/Refugio";

export async function obtenerRefugios(
    nombre?: string,
    localidad?: string,
    page: number = 1,
    limit: number = 2,
): Promise<RefugiosResponse> {
    const url = new URL("http://localhost:3000/api/v1/refugios");
    if(nombre){
        url.searchParams.set("nombre", nombre);
    }
    if (localidad) {
        url.searchParams.set("localidad", localidad);
    }
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));

    // fetch utiliza por defecto GET
    const respuesta = await fetch(url.toString());
    if (!respuesta.ok) {
        throw new Error("Error al obtener los refugios");
    }

    const datos = await respuesta.json();

    return datos;
}