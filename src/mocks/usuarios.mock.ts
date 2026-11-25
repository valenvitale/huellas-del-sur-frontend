import type { UsuarioDemo } from "../types/Usuario";

export const usuariosMock: UsuarioDemo[] = [
    {
        id: "1",
        nombre: "Adoptante Demo",
        telefono: "2911234567",
        email: "adoptante@huellas.com",
        password: "Demo1234",
        rol: "adoptante",
    },
    {
        id: "2",
        nombre: "Refugio Demo",
        telefono: "2912345678",
        email: "refugio@huellas.com",
        password: "Demo1234",
        rol: "refugio",
        refugioId: "1",
    },
    {
        id: "3",
        nombre: "Administrador Demo",
        telefono: "2913456789",
        email: "admin@huellas.com",
        password: "Demo1234",
        rol: "administrador",
    },
];