    export interface Refugio {
        id: string;
        nombre: string;
        direccion: string;
        localidad: string;
        telefono: string;
        descripcion: string;
        estado: "activo" | "inactivo";
        email?: string;
    }

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface RefugiosResponse {
    msg: string;
    code: number;
    data: {
        refugios: Refugio[];
        pagination: Pagination;
    };
}