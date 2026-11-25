import { usuariosMock } from "../mocks/usuarios.mock";
import type {
    Usuario,
    UsuarioDemo,
    CredencialesLogin,
    DatosRegistro,
} from "../types/Usuario";

const usuarios: UsuarioDemo[] = [...usuariosMock];

function obtenerUsuarioSinPassword(usuario: UsuarioDemo): Usuario {
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        email: usuario.email,
        rol: usuario.rol,
        refugioId: usuario.refugioId,
    };
}

export function iniciarSesion(
    credenciales: CredencialesLogin
): Usuario {
    const usuario = usuarios.find(
        (u) =>
            u.email.toLowerCase() === credenciales.email.trim().toLowerCase() &&
            u.password === credenciales.password
    );

    if (!usuario) {
        throw new Error("Correo electrónico o contraseña incorrectos.");
    }

    return obtenerUsuarioSinPassword(usuario);
}

export function registrarUsuario(datos: DatosRegistro): Usuario {
    const email = datos.email.trim().toLowerCase();

    const existe = usuarios.some(
        (u) => u.email.toLowerCase() === email
    );

    if (existe) {
        throw new Error("El correo electrónico ya está registrado.");
    }

    const nuevoUsuario: UsuarioDemo = {
        id: crypto.randomUUID(),
        nombre: datos.nombre.trim(),
        telefono: datos.telefono.trim(),
        email,
        password: datos.password,
        rol: "adoptante",
    };

    usuarios.push(nuevoUsuario);

    return obtenerUsuarioSinPassword(nuevoUsuario);
}

export function recuperarPassword(email: string): string {
    if (!email.trim()) {
        throw new Error("Ingresá tu correo electrónico.");
    }

    return "Si el correo está registrado, recibirás las instrucciones para recuperar tu contraseña.";
}

export function actualizarPerfil(
    id: string,
    datos: Pick<Usuario, "nombre" | "telefono" | "email">
): Usuario {
    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) {
        throw new Error("No se encontró el usuario.");
    }

    const email = datos.email.trim().toLowerCase();

    const emailDuplicado = usuarios.some(
        (u) => u.email.toLowerCase() === email && u.id !== id
    );

    if (emailDuplicado) {
        throw new Error("El correo electrónico ya está registrado.");
    }

    usuario.nombre = datos.nombre.trim();
    usuario.telefono = datos.telefono.trim();
    usuario.email = email;

    return obtenerUsuarioSinPassword(usuario);
}