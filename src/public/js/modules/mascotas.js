export async function initMascotasUI() {
    cargarMascotas();

    // Botón "Nueva Mascota"
    document
        .getElementById("btnNuevaMascota")
        ?.addEventListener("click", () => {
            document.getElementById("mascotaId").value = "";
            document.getElementById("formMascota").reset();
            document.getElementById("tituloModalMascota").textContent =
                "Registrar Mascota";
            document.getElementById("modalMascota").classList.remove("hidden");
            cargarSelectDuenos();
        });

    // Botón "Cancelar"
    document
        .getElementById("btnCancelarMascota")
        ?.addEventListener("click", () => {
            document.getElementById("modalMascota").classList.add("hidden");
            document.getElementById("formMascota").reset();
        });

    // Botón "Guardar"
    document
        .getElementById("formMascota")
        ?.addEventListener("submit", async (e) => {
            e.preventDefault();

            const id = document.getElementById("mascotaId").value;
            const esEditar = id !== "";

            const datos = {
                nombre: document.getElementById("mascotaNombre").value,
                especie: document.getElementById("mascotaEspecie").value,
                raza: document.getElementById("mascotaRaza").value,
                sexo: document.getElementById("mascotaSexo").value,
                edad: document.getElementById("mascotaEdad").value,
                id_dueño: document.getElementById("mascotaDueno").value,
            };

            const url = esEditar
                ? `http://localhost:8000/api/mascotas/${id}`
                : "http://localhost:8000/api/mascotas";
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
                    alert(
                        esEditar
                            ? "Mascota editada correctamente"
                            : "Mascota registrada"
                    );
                    document.getElementById("formMascota").reset();
                    document
                        .getElementById("modalMascota")
                        .classList.add("hidden");
                    cargarMascotas();
                } else {
                    alert(resultado.mensaje || "Error al guardar mascota");
                }
            } catch (error) {
                console.error("Error al guardar mascota:", error);
                alert("Error de conexión");
            }
        });
}

export async function cargarMascotas() {
    try {
        const res = await fetch("http://localhost:8000/api/mascotas");
        const mascotas = await res.json();
        const tbody = document.getElementById("tablaMascotasAdmin");
        tbody.innerHTML = "";

        mascotas.forEach((m) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="p-2 border-b">${m.nombre}</td>
                <td class="p-2 border-b">${m.especie}</td>
                <td class="p-2 border-b">${m.raza}</td>
                <td class="p-2 border-b">${m.sexo}</td>
                <td class="p-2 border-b">${m.edad}</td>
                <td class="p-2 border-b">${m.usuario?.nombre ?? "-"}</td>
                <td class="p-2 border-b text-right space-x-2">
                    <button class="btn-editar text-blue-600 hover:underline">✏️</button>
                    <button class="btn-eliminar text-red-600 hover:underline">🗑️</button>
                </td>
            `;
            tr.querySelector(".btn-editar").addEventListener("click", () =>
                abrirModalEditarMascota(m)
            );
            tr.querySelector(".btn-eliminar").addEventListener("click", () =>
                eliminarMascota(m.id)
            );
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al cargar mascotas:", error);
    }
}

export function abrirModalEditarMascota(mascota) {
    document.getElementById("mascotaId").value = mascota.id;
    document.getElementById("mascotaNombre").value = mascota.nombre;
    document.getElementById("mascotaEspecie").value = mascota.especie;
    document.getElementById("mascotaRaza").value = mascota.raza;
    document.getElementById("mascotaSexo").value = mascota.sexo;
    document.getElementById("mascotaEdad").value = mascota.edad;
    document.getElementById("mascotaDueno").value = mascota.id_dueño;

    document.getElementById("tituloModalMascota").textContent =
        "Editar Mascota";
    document.getElementById("modalMascota").classList.remove("hidden");
    cargarSelectDuenos();
}

export async function eliminarMascota(id) {
    if (!confirm("¿Seguro que deseas eliminar esta mascota?")) return;

    try {
        const res = await fetch(`http://localhost:8000/api/mascotas/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            alert("Mascota eliminada correctamente");
            cargarMascotas();
        } else {
            alert("Error al eliminar mascota");
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error de conexión");
    }
}

export async function cargarSelectDuenos() {
    try {
        const res = await fetch("http://localhost:8000/api/duenos");
        const duenos = await res.json();
        const select = document.getElementById("mascotaDueno");
        select.innerHTML = "<option value=''>Selecciona dueño</option>";

        duenos.forEach((d) => {
            const option = document.createElement("option");
            option.value = d.id;
            option.textContent = d.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar select de dueños:", error);
    }
}
