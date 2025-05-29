import { initInicioCliente } from "./modules/clientes/inicio.js";
import { initMisMascotas } from "./modules/clientes/misMascotas.js";
import { initMisCitas } from "./modules/clientes/misCitas.js";
import { initMisFacturas } from "./modules/clientes/misFacturas.js";

// Secciones disponibles
const secciones = ["inicioCliente", "misMascotas", "misCitas", "misFacturas"];

// Mostrar solo una sección
function mostrarSeccion(id) {
    secciones.forEach((sec) => {
        const el = document.getElementById(sec);
        if (el) el.classList.toggle("hidden", sec !== id);
    });
}

function cargarNombreCliente() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol !== "cliente") {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("nombreCliente").textContent = usuario.nombre;
}

// Inicializar lógica del panel
window.addEventListener("DOMContentLoaded", () => {
    // Verifica usuario
    cargarNombreCliente();

    // Mostrar sección inicial
    mostrarSeccion("inicioCliente");
    initInicioCliente();

    // Configurar navegación lateral
    const botones = document.querySelectorAll("aside button[data-seccion]");
    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            const seccion = btn.dataset.seccion;
            mostrarSeccion(seccion);

            switch (seccion) {
                case "inicioCliente":
                    initInicioCliente();
                    break;
                case "misMascotas":
                    initMisMascotas();
                    break;
                case "misCitas":
                    initMisCitas();
                    break;
                case "misFacturas":
                    initMisFacturas();
                    break;
            }
        });
    });

    // Cerrar sesión
    document
        .getElementById("btnCerrarSesion")
        ?.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.href = "login.html";
        });
});
