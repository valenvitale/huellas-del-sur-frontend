import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { RefugioInput } from "../../types/Refugio";
import {
    obtenerRefugioPorId,
    crearRefugio,
    actualizarRefugio
} from "../../services/refugiosService";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";
import "../../styles/Refugios.css";

const refugioInicial: RefugioInput = {
    nombre: "",
    direccion: "",
    localidad: "",
    telefono: "",
    email: "",
    descripcion: "",
    estado: "activo",
};

export default function FormularioRefugio() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [refugio, setRefugio] = useState<RefugioInput>({
        ...refugioInicial
    });

    const [cargando, setCargando] = useState(Boolean(id));
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");
    const [errorCarga, setErrorCarga] = useState("");

    // Cargar los datos del refugio si estamos editando
    useEffect(() => {
        let activo = true;

        async function cargarRefugio() {
            setError("");
            setErrorCarga("");

            if (!id) {
                setRefugio({ ...refugioInicial });
                setCargando(false);
                return;
            }

            setCargando(true);

            try {
                const respuesta = await obtenerRefugioPorId(id);

                if (activo) {
                    const datos = respuesta.data.refugio;

                    setRefugio({
                        nombre: datos.nombre,
                        direccion: datos.direccion,
                        localidad: datos.localidad,
                        telefono: datos.telefono,
                        email: datos.email || "",
                        descripcion: datos.descripcion,
                        estado: datos.estado,
                    });
                }
            } catch (error) {
                if (!activo) return;

                if (error instanceof Error) {
                    setErrorCarga(error.message);
                } else {
                    setErrorCarga("Error al cargar el refugio.");
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        cargarRefugio();

        return () => {
            activo = false;
        };
    }, [id]);

    // Actualizar los campos del formulario
    function handleChange<K extends keyof RefugioInput>(
        campo: K,
        valor: RefugioInput[K]
    ) {
        setRefugio((anterior) => ({
            ...anterior,
            [campo]: valor,
        }));
    }

    // Validar los datos ingresados
    function validarFormulario(): string {
        if (!refugio.nombre.trim()) {
            return "El nombre es obligatorio.";
        }

        if (!refugio.direccion.trim()) {
            return "La dirección es obligatoria.";
        }

        if (!refugio.localidad.trim()) {
            return "La localidad es obligatoria.";
        }

        if (!refugio.telefono.trim()) {
            return "El teléfono es obligatorio.";
        }

        const telefonoValido = /^[0-9+()\s-]+$/;

        if (
            !telefonoValido.test(refugio.telefono) ||
            refugio.telefono.replace(/\D/g, "").length < 7
        ) {
            return "Ingresá un teléfono válido.";
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            refugio.email?.trim() &&
            !emailValido.test(refugio.email.trim())
        ) {
            return "Ingresá un email válido.";
        }

        if (!refugio.descripcion.trim()) {
            return "La descripción es obligatoria.";
        }

        return "";
    }

    // Guardar el refugio
    async function handleGuardar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (guardando || cargando || errorCarga) return;

        setError("");

        const mensajeValidacion = validarFormulario();

        if (mensajeValidacion) {
            setError(mensajeValidacion);
            return;
        }

        const datos: RefugioInput = {
            nombre: refugio.nombre.trim(),
            direccion: refugio.direccion.trim(),
            localidad: refugio.localidad.trim(),
            telefono: refugio.telefono.trim(),
            descripcion: refugio.descripcion.trim(),
            estado: refugio.estado,
            email: refugio.email?.trim() || "",
        };

        setGuardando(true);

        try {
            const respuesta = id
                ? await actualizarRefugio(id, datos)
                : await crearRefugio(datos);

            window.alert(respuesta.msg);

            navigate(`/refugios/${respuesta.data.refugio.id}`);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("No se pudo guardar el refugio.");
            }
        } finally {
            setGuardando(false);
        }
    }

    // Cancelar el formulario
    function handleCancelar() {
        if (id) {
            navigate(`/refugios/${id}`);
        } else {
            navigate("/refugios");
        }
    }

    // Estado de carga
    if (cargando) {
        return <p>Cargando refugio...</p>;
    }

    // Error al recuperar los datos para editar
    if (errorCarga) {
        return (
            <section>
                <Card className="refugio-formulario">
                    <p className="refugio-error" role="alert">
                        {errorCarga}
                    </p>

                    <div className="refugio-acciones">
                        <Button
                            variant="secondary"
                            onClick={() => navigate("/refugios")}
                        >
                            Volver
                        </Button>
                    </div>
                </Card>
            </section>
        );
    }

    return (
        <section>
            <Card className="refugio-formulario">
                <h1>{id ? "Editar refugio" : "Nuevo refugio"}</h1>

                <form onSubmit={handleGuardar} noValidate>
                    <Input
                        label="Nombre"
                        placeholder="Ingresá el nombre del refugio"
                        value={refugio.nombre}
                        onChange={(e) =>
                            handleChange("nombre", e.target.value)
                        }
                    />

                    <Input
                        label="Dirección"
                        placeholder="Ingresá la dirección"
                        value={refugio.direccion}
                        onChange={(e) =>
                            handleChange("direccion", e.target.value)
                        }
                    />

                    <Input
                        label="Localidad"
                        placeholder="Ingresá la localidad"
                        value={refugio.localidad}
                        onChange={(e) =>
                            handleChange("localidad", e.target.value)
                        }
                    />

                    <Input
                        label="Teléfono"
                        placeholder="Ingresá el teléfono"
                        value={refugio.telefono}
                        onChange={(e) =>
                            handleChange("telefono", e.target.value)
                        }
                    />

                    <Input
                        label="Email (opcional)"
                        placeholder="Ingresá el email"
                        value={refugio.email || ""}
                        onChange={(e) =>
                            handleChange("email", e.target.value)
                        }
                    />

                    <div>
                        <label htmlFor="descripcion">Descripción</label>

                        <textarea
                            id="descripcion"
                            placeholder="Ingresá una descripción del refugio"
                            value={refugio.descripcion}
                            onChange={(e) =>
                                handleChange("descripcion", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="estado">Estado</label>

                        <select
                            id="estado"
                            value={refugio.estado}
                            onChange={(e) =>
                                handleChange(
                                    "estado",
                                    e.target.value === "activo"
                                        ? "activo"
                                        : "inactivo"
                                )
                            }
                        >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>

                    {error && (
                        <p className="refugio-error" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="refugio-acciones">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={guardando}
                        >
                            {guardando ? "Guardando..." : "Guardar"}
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCancelar}
                            disabled={guardando}
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Card>
        </section>
    );
}