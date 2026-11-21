# Huellas del Sur — Alcance del prototipo V1

**Grupo:** 13  
**Integrantes:** Valentina Vitale Haag y Alesio Fabián Cragno  
**Fecha de entrega:** 30/11/2026

## 1. Objetivo

Desarrollar un prototipo web navegable de Huellas del Sur, una plataforma que conecta refugios de animales de Bahía Blanca con personas interesadas en adoptar mascotas.

El prototipo permitirá demostrar los principales recorridos de los usuarios y la comunicación entre frontend y backend mediante respuestas simuladas (mocks), sin utilizar una base de datos persistente.

## 2. Perfiles de usuario

- **Adoptante:** podrá explorar animales, consultar sus fichas, iniciar solicitudes de adopción y visualizar su seguimiento de forma simulada.
- **Refugio:** podrá consultar y administrar animales, visualizar solicitudes recibidas y gestionar cuestionarios simulados.
- **Administrador:** podrá acceder a pantallas de administración, consultar información general y visualizar estadísticas simuladas.

## 3. Entidades principales

- Usuario
- Refugio
- Animal
- Solicitud de adopción
- Encuesta
- Pregunta
- Respuesta

## 4. Distribución del trabajo individual

**Valentina — Entidad Animal**

- API REST mock de animales.
- Listado con filtros, búsqueda, paginación y ordenamiento.
- Consulta de animales por ID.
- Operaciones POST, PUT/PATCH y DELETE simuladas.
- Catálogo frontend y ficha individual.
- Formularios de alta y edición.
- Exportación PDF o XLSX.

**Alesio — Entidad Refugio**

- API REST mock de refugios.
- Listado con filtros, búsqueda, paginación y ordenamiento.
- Consulta de refugios por ID.
- Operaciones POST, PUT/PATCH y DELETE simuladas.
- Listado frontend y detalle del refugio.
- Formularios de alta y edición.
- Exportación PDF o XLSX.

## 5. Pantallas del prototipo

- Inicio (Home).
- Login.
- Registro.
- Recuperación de contraseña.
- Perfil de usuario.
- Catálogo de animales.
- Detalle de animal.
- Administración de animales.
- Listado de refugios.
- Detalle y administración de refugios.
- Solicitud de adopción.
- Mis solicitudes.
- Gestión de solicitudes del refugio.
- Encuestas.
- Dashboard y administración.

## 6. Funcionalidades simuladas

- Inicio y cierre de sesión.
- Registro y recuperación de contraseña.
- Creación, modificación y eliminación de registros.
- Envío y seguimiento de solicitudes.
- Respuestas a encuestas.
- Cambios de estado de adopción.
- Estadísticas y paneles administrativos.

Los datos se obtendrán de mocks con estructuras compatibles con una futura API conectada a base de datos.

## 7. Tecnologías previstas

**Frontend:** React, Vite y TypeScript.

**Backend:** Node.js, Express y TypeScript.

**Control de versiones:** Git y GitHub.

**Gestión:** Jira Cloud.

**Despliegue:** Vercel para frontend y Render para backend.

**Persistencia:** No se implementará una base de datos persistente en esta versión.

## 8. Entregables

- Repositorio frontend.
- Repositorio backend.
- Frontend público y navegable.
- API backend pública.
- README de ambos repositorios.
- Colección Postman exportada.
- Diagrama entidad-relación.
- Tablero Jira actualizado.
- Plantilla oficial de entrega completa.

## 9. Criterios de finalización

El alcance se considerará definido cuando ambos integrantes hayan acordado las entidades individuales, las pantallas, las operaciones mock y los entregables necesarios para la presentación del prototipo.