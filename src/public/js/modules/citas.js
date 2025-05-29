export async function cargarCitas() {
    try {
        const res = await fetch("http://localhost:8000/api/citas");
        const citas = await res.json();
        const tbody = document.getElementById("tablaCitas");
        tbody.innerHTML = "";

        citas.forEach((c) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="p-2 border-b">${c.fecha}</td>
                <td class="p-2 border-b">${c.hora}</td>
                <td class="p-2 border-b">${c.motivo}</td>
                <td class="p-2 border-b">${c.estado}</td>
                <td class="p-2 border-b">${c.mascota?.nombre ?? "-"}</td>
                <td class="p-2 border-b">${c.veterinario?.nombre ?? "-"}</td>
                <td class="p-2 border-b text-right">
                    <button class="btn-editar text-blue-600 hover:underline">✏️</button>
                    <button class="btn-eliminar text-red-600 hover:underline">🗑️</button>
                    <button class="btn-consulta text-indigo-600 hover:underline">🩺 Registrar consulta</button>
                </td>
            `;
            tr.querySelector(".btn-editar").addEventListener("click", () =>
                abrirModalEditarCita(c)
            );
            tr.querySelector(".btn-eliminar").addEventListener("click", () =>
                eliminarCita(c.id)
            );
            tr.querySelector(".btn-consulta").addEventListener("click", () =>
                window.abrirModalConsulta(c)
            );
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al cargar citas:", error);
    }
}

export async function abrirModalEditarCita(cita) {
    document.getElementById("tituloModalCita").textContent = "Editar Cita";
    document.getElementById("modalCita").classList.remove("hidden");

    await cargarSelectMascotas();
    await cargarSelectVeterinarios();

    document.getElementById("citaId").value = cita.id;
    document.getElementById("citaFecha").value = cita.fecha;
    document.getElementById("citaHora").value = cita.hora;
    document.getElementById("citaMotivo").value = cita.motivo;
    document.getElementById("citaEstado").value = cita.estado;
    document.getElementById("citaMascota").value = cita.id_mascota;
    document.getElementById("citaVeterinario").value = cita.id_veterinario;
}

export async function eliminarCita(id) {
    if (!confirm("¿Seguro que deseas eliminar esta cita?")) return;

    try {
        const res = await fetch(`http://localhost:8000/api/citas/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            alert("Cita eliminada correctamente");
            cargarCitas();
        } else {
            alert("Error al eliminar cita");
        }
    } catch (error) {
        console.error("Error al eliminar cita:", error);
        alert("Error de conexión");
    }
}

export async function cargarSelectMascotas() {
    try {
        const res = await fetch("http://localhost:8000/api/mascotas");
        const mascotas = await res.json();
        const select = document.getElementById("citaMascota");
        select.innerHTML = "<option value=''>Selecciona mascota</option>";

        mascotas.forEach((m) => {
            const option = document.createElement("option");
            option.value = m.id;
            option.textContent = m.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar mascotas:", error);
    }
}

export async function cargarSelectVeterinarios() {
    try {
        const res = await fetch("http://localhost:8000/api/veterinarios");
        const vets = await res.json();
        const select = document.getElementById("citaVeterinario");
        select.innerHTML = "<option value=''>Selecciona veterinario</option>";

        vets.forEach((v) => {
            const option = document.createElement("option");
            option.value = v.id;
            option.textContent = v.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar veterinarios:", error);
    }
}

export function initCitasUI() {
    cargarCitas();

    document.getElementById("btnNuevaCita")?.addEventListener("click", () => {
        document.getElementById("formCita").reset();
        document.getElementById("citaId").value = "";
        document.getElementById("tituloModalCita").textContent =
            "Registrar Cita";
        cargarSelectMascotas();
        cargarSelectVeterinarios();
        document.getElementById("modalCita").classList.remove("hidden");
    });

    document
        .getElementById("btnCancelarCita")
        ?.addEventListener("click", () => {
            document.getElementById("formCita").reset();
            document.getElementById("modalCita").classList.add("hidden");
        });

    document
        .getElementById("formCita")
        ?.addEventListener("submit", async (e) => {
            e.preventDefault();

            const id = document.getElementById("citaId").value;
            const esEditar = id !== "";

            const datos = {
                fecha: document.getElementById("citaFecha").value,
                hora: document.getElementById("citaHora").value,
                motivo: document.getElementById("citaMotivo").value,
                estado: document.getElementById("citaEstado").value,
                id_mascota: document.getElementById("citaMascota").value,
                id_veterinario:
                    document.getElementById("citaVeterinario").value,
            };

            const url = esEditar
                ? `http://localhost:8000/api/citas/${id}`
                : "http://localhost:8000/api/citas";
            const method = esEditar ? "PUT" : "POST";

            try {
                const res = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(datos),
                });

                const resultado = await res.json();

                if (res.ok) {
                    alert(esEditar ? "Cita actualizada" : "Cita registrada");
                    document
                        .getElementById("modalCita")
                        .classList.add("hidden");
                    document.getElementById("formCita").reset();
                    cargarCitas();
                } else {
                    alert(resultado.mensaje || "Error al guardar cita");
                }
            } catch (error) {
                console.error("Error al guardar cita:", error);
                alert("Error de conexión");
            }
        });
}
