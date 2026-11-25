import type { AnimalCatalogo } from "../../types/Animal";

interface AnimalCardProps {
    animal: AnimalCatalogo;
}

const estados = {
    disponible: "Disponible",
    en_proceso: "En proceso",
    adoptado: "Adoptado"
};

const tamanios = {
    pequeno: "Pequeño",
    mediano: "Mediano",
    grande: "Grande"
};

const imagenRespaldo = "/imagenes/animales/sin-imagen.svg";

export default function AnimalCard({ animal }: AnimalCardProps) {
    return (
        <article className="animal-card">
            <div className="animal-card-image-container">
                <img
                    className="animal-card-image"
                    src={animal.imagenUrl || imagenRespaldo}
                    alt={`Fotografía de ${animal.nombre}`}
                    loading="lazy"
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = imagenRespaldo;
                    }}
                />
            </div>

            <div className="animal-card-content">
                <div className="animal-card-header">
                    <h2>{animal.nombre}</h2>

                    <span
                        className={`animal-status animal-status-${animal.estado}`}
                    >
                        {estados[animal.estado]}
                    </span>
                </div>

                <p className="animal-card-species">
                    {animal.especie}
                    {animal.raza && ` · ${animal.raza}`}
                </p>

                <div className="animal-card-features">
                    <div>
                        <span>Edad</span>
                        <strong>
                            {animal.edad} {animal.edad === 1 ? "año" : "años"}
                        </strong>
                    </div>

                    <div>
                        <span>Sexo</span>
                        <strong>
                            {animal.sexo === "macho" ? "Macho" : "Hembra"}
                        </strong>
                    </div>

                    <div>
                        <span>Tamaño</span>
                        <strong>{tamanios[animal.tamanio]}</strong>
                    </div>
                </div>

                <div className="animal-card-shelter">
                    <strong>
                        {animal.refugio?.nombre || "Refugio no disponible"}
                    </strong>

                    <span>
                        {animal.refugio?.localidad || "Localidad no disponible"}
                    </span>
                </div>

                <button
                    type="button"
                    className="btn btn-primary animal-card-button"
                    disabled
                >
                    Conocer a {animal.nombre}
                </button>
            </div>
        </article>
    );
}