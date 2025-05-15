async function cargarMetricas() {
    console.log("📊 Ejecutando cargarMetricas");

    try {
        const [mascotas, clientes, pendientes, mes, servicios, ingresos] =
            await Promise.all([
                fetch("http://localhost:8000/api/mascotas/total").then((res) =>
                    res.json()
                ),
                fetch("http://localhost:8000/api/clientes/activos").then(
                    (res) => res.json()
                ),
                fetch("http://localhost:8000/api/citas/pendientes").then(
                    (res) => res.json()
                ),
                fetch("http://localhost:8000/api/citas/mes").then((res) =>
                    res.json()
                ),
                fetch("http://localhost:8000/api/servicios/mes").then((res) =>
                    res.json()
                ),
                fetch("http://localhost:8000/api/facturas/ingresos-mes").then(
                    (res) => res.json()
                ),
            ]);

        document.getElementById("totalMascotas").textContent = mascotas.total;
        document.getElementById("totalClientes").textContent = clientes.total;
        document.getElementById("totalPendientes").textContent =
            pendientes.total;
        document.getElementById("totalMes").textContent = mes.total;
        document.getElementById("serviciosMes").textContent = servicios.total;
        const monto = Number(ingresos.ingresos ?? 0);
        document.getElementById(
            "ingresosMes"
        ).textContent = `Bs. ${monto.toFixed(2)}`;
    } catch (error) {
        console.error("Error al cargar métricas:", error);
    }
}
async function cargarUltimasMascotas() {
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

// 💡 ESTA parte faltaba 👇
document.addEventListener("DOMContentLoaded", () => {
    cargarMetricas();
    cargarUltimasMascotas();
});
