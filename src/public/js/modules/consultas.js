
export async function initConsultasUI() {
    const tbody = document.getElementById("tablaConsultas");
    if (!tbody) {
        console.warn("⚠️ No se encontró la tabla de consultas.");
        return;
    }

    await cargarConsultas();

    const btnCancelar = document.getElementById("btnCancelarConsulta");
    const form = document.getElementById("formConsulta");

    if (btnCancelar && form) {
        btnCancelar.addEventListener("click", () => {
            console.log("Cerrar modal consulta");
            document.getElementById("modalConsulta").classList.add("hidden");
        });

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const servicios = Array.from(
                document.getElementById("consultaServicios").selectedOptions
            ).map((opt) => opt.value);

            const data = {
                id_cita: document.getElementById("consultaCitaId").value,
                sintomas: document.getElementById("consultaSintomas").value,
                diagnostico: document.getElementById("consultaDiagnostico")
                    .value,
                tratamiento: document.getElementById("consultaTratamiento")
                    .value,
                medicamentos: document.getElementById("consultaMedicamentos")
                    .value,
                servicios: servicios,
            };

            try {
                const res = await fetch("http://localhost:8000/api/consultas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const resultado = await res.json();
                if (res.ok) {
                    alert("Consulta registrada con éxito");
                    document
                        .getElementById("modalConsulta")
                        .classList.add("hidden");
                    form.reset();
                    cargarConsultas();
                } else {
                    alert(resultado.mensaje || "Error al registrar");
                }
            } catch (err) {
                console.error(err);
                alert("Error de conexión");
            }
        });
    } else {
        console.warn(
            "⚠️ No se encontró el formulario o el botón de cancelar para consultas."
        );
    }
}

async function cargarConsultas() {
    try {
        const res = await fetch("http://localhost:8000/api/consultas");
        const consultas = await res.json();
        const tbody = document.getElementById("tablaConsultas");

        if (!tbody) {
            console.warn("⚠️ El elemento #tablaConsultas no está presente.");
            return;
        }

        tbody.innerHTML = "";

        consultas.forEach((c) => {
            const total = Array.isArray(c.servicios)
                ? c.servicios.reduce(
                      (sum, s) => sum + (Number(s.precio) || 0),
                      0
                  )
                : 0;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="p-2 border-b">${c.id}</td>
                <td class="p-2 border-b">${c.mascota?.nombre ?? "-"}</td>
                <td class="p-2 border-b">${c.veterinario?.nombre ?? "-"}</td>
                <td class="p-2 border-b">${new Date(
                    c.created_at
                ).toLocaleDateString()}</td>
                <td class="p-2 border-b">${c.diagnostico ?? "-"}</td>
                <td class="p-2 border-b">Bs. ${total.toFixed(2)}</td>
                <td class="p-2 border-b text-right">
                    <button onclick="generarFactura(${
                        c.id
                    })" class="text-green-600 hover:underline">
                        🧾 Generar factura
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al cargar consultas:", error);
    }
}

async function cargarServiciosConsulta() {
    try {
        const res = await fetch("http://localhost:8000/api/servicios");
        const servicios = await res.json();
        const select = document.getElementById("consultaServicios");
        select.innerHTML = "";

        servicios.forEach((s) => {
            const option = document.createElement("option");
            option.value = s.id;
            option.textContent = `${s.nombre} - Bs. ${s.precio}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar servicios para la consulta:", error);
    }
}

window.abrirModalConsulta = function (cita) {
    const input = document.getElementById("consultaCitaId");
    const form = document.getElementById("formConsulta");
    const modal = document.getElementById("modalConsulta");

    if (!input || !form || !modal) {
        console.error(
            "No se encontró uno de los elementos del formulario de consulta."
        );
        return;
    }

    input.value = cita.id;
    form.reset();
    cargarServiciosConsulta();
    modal.classList.remove("hidden");
};
