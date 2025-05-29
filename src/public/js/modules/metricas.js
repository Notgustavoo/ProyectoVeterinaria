export async function initDashboardUI() {
    cargarMetricas();
    cargarUltimasMascotas();
}

export async function cargarMetricas() {
    console.log("📊 Cargando métricas...");
    try {
        const endpoints = {
            mascotas: "http://localhost:8000/api/mascotas/total",
            clientes: "http://localhost:8000/api/clientes/activos",
            pendientes: "http://localhost:8000/api/citas/pendientes",
            mes: "http://localhost:8000/api/citas/mes",
            servicios: "http://localhost:8000/api/servicios/mes",
            ingresos: "http://localhost:8000/api/facturas/ingresos-mes",
        };

        const responses = await Promise.all(
            Object.entries(endpoints).map(async ([key, url]) => {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`${key} → ${res.status}`);
                return [key, await res.json()];
            })
        );

        const data = Object.fromEntries(responses);

        document.getElementById("totalMascotas").textContent =
            data.mascotas.total;
        document.getElementById("totalClientes").textContent =
            data.clientes.total;
        document.getElementById("totalPendientes").textContent =
            data.pendientes.total;
        document.getElementById("totalMes").textContent = data.mes.total;
        document.getElementById("serviciosMes").textContent =
            data.servicios.total;

        const monto = Number(data.ingresos.ingresos ?? 0);
        document.getElementById(
            "ingresosMes"
        ).textContent = `Bs. ${monto.toFixed(2)}`;
    } catch (error) {
        console.error("❌ Error al cargar métricas:", error.message);
    }
}

export async function cargarUltimasMascotas() {
    try {
        const res = await fetch("http://localhost:8000/api/mascotas/ultimas");
        const mascotas = await res.json();
        const tbody = document.getElementById("tablaMascotas");
        tbody.innerHTML = "";

        mascotas.forEach((m) => {
            const fila = `
                <tr>
                    <td class="p-2">${m.nombre}</td>
                    <td class="p-2">${m.especie}</td>
                    <td class="p-2">${m.raza}</td>
                    <td class="p-2">${m.usuario?.nombre ?? "Sin dueño"}</td>
                </tr>
            `;
            tbody.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error al cargar mascotas:", error);
    }
}
export function initMetricasUI() {
    cargarMetricas();
    cargarUltimasMascotas();
}
