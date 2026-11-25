export type EstadoAnimal =
    | "disponible"
    | "en_proceso"
    | "adoptado";

export type SexoAnimal = "macho" | "hembra";

export type TamanioAnimal =
    | "pequeno"
    | "mediano"
    | "grande";

export interface Animal {
    id: string;
    refugioId: string;
    nombre: string;
    especie: string;
    raza?: string;
    edad: number;
    sexo: SexoAnimal;
    tamanio: TamanioAnimal;
    descripcion: string;
    imagenUrl?: string;
    estado: EstadoAnimal;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export interface AnimalCatalogo extends Animal {
    refugio: {
        id: string;
        nombre: string;
        localidad: string;
    } | null;
}

export interface FiltrosAnimales {
    nombre?: string;
    especie?: string;
    tamanio?: TamanioAnimal;
    estado?: EstadoAnimal;
    localidad?: string;
    page?: number;
    limit?: number;
}

export interface AnimalesResponse {
    msg: string;
    code: number;
    data: {
        animales: AnimalCatalogo[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
}