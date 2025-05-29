export function initReportesUI() {
    cargarVeterinariosEnSelect();
    configurarFiltroCitas();
    configurarReporteIngresos();
    renderizarGraficaCitasPorEstado();
    renderizarGraficaCitasPorVeterinario();
}

function configurarFiltroCitas() {
    document
        .getElementById("btnFiltrarCitas")
        ?.addEventListener("click", async () => {
            const desde = document.getElementById("filtroDesde").value;
            const hasta = document.getElementById("filtroHasta").value;
            const estado = document.getElementById("filtroEstado").value;
            const vetId = document.getElementById("filtroVeterinario").value;

            const params = new URLSearchParams();
            if (desde && hasta) {
                params.append("fecha_inicio", desde);
                params.append("fecha_fin", hasta);
            }
            if (estado) params.append("estado", estado);
            if (vetId) params.append("veterinario_id", vetId);

            const url = `http://localhost:8000/api/reportes/citas?${params.toString()}`;

            try {
                const res = await fetch(url);
                const citas = await res.json();
                const tbody = document.getElementById("tablaReporteCitas");
                tbody.innerHTML = "";

                citas.forEach((c) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td class="p-2 border-b">${c.fecha}</td>
                        <td class="p-2 border-b">${c.hora}</td>
                        <td class="p-2 border-b">${c.estado}</td>
                        <td class="p-2 border-b">${
                            c.mascota?.nombre ?? "-"
                        }</td>
                        <td class="p-2 border-b">${
                            c.veterinario?.nombre ?? "-"
                        }</td>
                        <td class="p-2 border-b">${c.motivo ?? "-"}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (error) {
                console.error("Error al cargar reporte de citas:", error);
            }
        });
}

function configurarReporteIngresos() {
    document
        .getElementById("btnGenerarIngresos")
        ?.addEventListener("click", async () => {
            const inicio = document.getElementById("filtroInicio").value;
            const fin = document.getElementById("filtroFin").value;

            if (!inicio || !fin) {
                alert("Selecciona ambas fechas");
                return;
            }

            try {
                const res = await fetch(
                    `http://localhost:8000/api/reportes/ingresos?inicio=${inicio}&fin=${fin}`
                );
                const data = await res.json();

                const tbody = document.getElementById("tablaIngresos");
                tbody.innerHTML = "";

                data.facturas.forEach((f) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td class="p-2 border-b">${f.id}</td>
                        <td class="p-2 border-b">${f.cliente}</td>
                        <td class="p-2 border-b">${new Date(
                            f.fecha
                        ).toLocaleDateString()}</td>
                        <td class="p-2 border-b">Bs. ${parseFloat(
                            f.total
                        ).toFixed(2)}</td>
                    `;
                    tbody.appendChild(tr);
                });

                document.getElementById(
                    "ingresosTotal"
                ).textContent = `Bs. ${parseFloat(data.ingresos).toFixed(2)}`;
            } catch (err) {
                console.error("Error al obtener ingresos:", err);
                alert("Error al obtener los ingresos");
            }
        });
}

async function cargarVeterinariosEnSelect() {
    try {
        const res = await fetch("http://localhost:8000/api/veterinarios");
        const vets = await res.json();
        const select = document.getElementById("filtroVeterinario");

        vets.forEach((v) => {
            const option = document.createElement("option");
            option.value = v.id;
            option.textContent = v.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar veterinarios en reporte:", error);
    }
}
let graficaCitasChart;

export async function renderizarGraficaCitasPorEstado() {
    try {
        const res = await fetch(
            "http://localhost:8000/api/reportes/citas-por-estado"
        );
        const data = await res.json();

        const labels = data.map((item) => item.estado);
        const valores = data.map((item) => item.total);

        const ctx = document
            .getElementById("graficaCitasEstado")
            .getContext("2d");

        if (graficaCitasChart) graficaCitasChart.destroy(); // Para evitar superposición

        graficaCitasChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Cantidad de Citas",
                        data: valores,
                        backgroundColor: [
                            "rgba(59, 130, 246, 0.6)", // Azul
                            "rgba(16, 185, 129, 0.6)", // Verde
                            "rgba(239, 68, 68, 0.6)", // Rojo
                        ],
                        borderColor: [
                            "rgba(59, 130, 246, 1)",
                            "rgba(16, 185, 129, 1)",
                            "rgba(239, 68, 68, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: "Cantidad" },
                    },
                    x: {
                        title: { display: true, text: "Estado de la Cita" },
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error al cargar gráfica de citas:", error);
    }
}
export async function renderizarGraficaCitasPorVeterinario() {
    try {
        // Esperar a que exista el canvas
        const canvas = document.getElementById("graficaCitasVeterinario");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const res = await fetch(
            "http://localhost:8000/api/reportes/citas-veterinario"
        );
        const datos = await res.json();

        const nombres = datos.map((d) => d.nombre);
        const totales = datos.map((d) => d.total);

        new window.Chart(ctx, {
            type: "bar",
            data: {
                labels: nombres,
                datasets: [
                    {
                        label: "Citas realizadas",
                        data: totales,
                        backgroundColor: "rgba(59, 130, 246, 0.6)",
                        borderColor: "rgba(59, 130, 246, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                        },
                    },
                },
            },
        });
    } catch (error) {
        console.error("❌ Error al renderizar gráfica por veterinario:", error);
    }
}
