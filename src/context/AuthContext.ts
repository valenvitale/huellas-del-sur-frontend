import { createContext } from "react";
import type {
    Usuario,
    CredencialesLogin,
    DatosRegistro,
} from "../types/Usuario";

export interface AuthContextType {
    usuario: Usuario | null;
    autenticado: boolean;
    login: (credenciales: CredencialesLogin) => void;
    registro: (datos: DatosRegistro) => void;
    logout: () => void;
    editarPerfil: (
        datos: Pick<Usuario, "nombre" | "telefono" | "email">
    ) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);