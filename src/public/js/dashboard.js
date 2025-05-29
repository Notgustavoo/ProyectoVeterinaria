import { initMetricasUI } from "./modules/metricas.js";
import { initMascotasUI } from "./modules/mascotas.js";
import { initDuenosUI } from "./modules/duenos.js";
import { initCitasUI } from "./modules/citas.js";
import { initServiciosUI } from "./modules/servicios.js";
import { initFacturasUI } from "./modules/facturas.js";
import { mostrarSeccion, secciones } from "./modules/secciones.js";
import { initReportesUI } from "./modules/reportes.js";
import { initConsultasUI } from "./modules/consultas.js";

const yaInicializado = {
    dashboard: false,
    mascotas: false,
    duenos: false,
    citas: false,
    servicios: false,
    facturas: false,
    reportes: false,
    consultas: false,
};

const inicializadores = {
    dashboard: initMetricasUI,
    mascotas: initMascotasUI,
    duenos: initDuenosUI,
    citas: initCitasUI,
    servicios: initServiciosUI,
    facturas: initFacturasUI,
    reportes: initReportesUI,
    consultas: initConsultasUI,
};

window.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol !== "admin") {
        window.location.href = "login.html";
        return;
    }


    const nombreEl = document.getElementById("nombreAdmin");
    if (nombreEl) nombreEl.textContent = usuario.nombre;


    mostrarSeccion("dashboard");
    inicializadores.dashboard();
    yaInicializado.dashboard = true;


    const enlaces = document.querySelectorAll("aside nav a[data-seccion]");
    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();
            const seccion = enlace.dataset.seccion;
            mostrarSeccion(seccion);

            if (!yaInicializado[seccion]) {
                inicializadores[seccion]?.();
                yaInicializado[seccion] = true;
            }
        });
    });


    const btnCerrar = document.getElementById("cerrarSesion");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.href = "login.html";
        });
    }
});
