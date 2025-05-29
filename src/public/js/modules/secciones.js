// modules/secciones.js

export const secciones = [
    "dashboard",
    "mascotas",
    "duenos",
    "citas",
    "servicios",
    "facturas",
    "reportes",
    "consultas", // ¡Debe estar!
];

export function mostrarSeccion(id) {
    secciones.forEach((sec) => {
        const el = document.getElementById(sec);
        if (el) {
            el.classList.toggle("hidden", sec !== id);
        }
    });
}
