import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type {
    Usuario,
    CredencialesLogin,
    DatosRegistro,
} from "../types/Usuario";

import {
    iniciarSesion,
    registrarUsuario,
    actualizarPerfil,
} from "../services/authService";

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    function login(credenciales: CredencialesLogin) {
        const usuarioAutenticado = iniciarSesion(credenciales);
        setUsuario(usuarioAutenticado);
    }

    function registro(datos: DatosRegistro) {
        const nuevoUsuario = registrarUsuario(datos);
        setUsuario(nuevoUsuario);
    }

    function logout() {
        setUsuario(null);
    }

    function editarPerfil(
        datos: Pick<Usuario, "nombre" | "telefono" | "email">
    ) {
        if (!usuario) {
            throw new Error("No hay una sesión iniciada.");
        }

        const usuarioActualizado = actualizarPerfil(usuario.id, datos);
        setUsuario(usuarioActualizado);
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                autenticado: usuario !== null,
                login,
                registro,
                logout,
                editarPerfil,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}