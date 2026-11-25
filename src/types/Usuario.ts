export type RolUsuario = "adoptante" | "refugio" | "administrador";

export interface Usuario {
    id: string;
    nombre: string;
    telefono: string;
    email: string;
    rol: RolUsuario;
    refugioId?: string;
}

export interface CredencialesLogin {
    email: string;
    password: string;
}

export interface DatosRegistro {
    nombre: string;
    telefono: string;
    email: string;
    password: string;
}

export interface UsuarioDemo extends Usuario {
    password: string;
}