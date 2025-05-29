export async function cargarServicios() {
    try {
        const res = await fetch("http://localhost:8000/api/servicios");
        const servicios = await res.json();
        const tbody = document.getElementById("tablaServicios");
        tbody.innerHTML = "";

        servicios.forEach((s) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="p-2 border-b">${s.nombre}</td>
                <td class="p-2 border-b">${s.descripcion}</td>
                <td class="p-2 border-b">Bs. ${parseFloat(s.precio).toFixed(
                    2
                )}</td>
                <td class="p-2 border-b text-right">
                    <button class="btn-editar text-blue-600 hover:underline">✏️</button>
                    <button class="btn-eliminar text-red-600 hover:underline">🗑️</button>
                </td>
            `;
            tr.querySelector(".btn-editar").addEventListener("click", () =>
                abrirModalEditarServicio(s)
            );
            tr.querySelector(".btn-eliminar").addEventListener("click", () =>
                eliminarServicio(s.id)
            );
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al cargar servicios:", error);
    }
}

export function abrirModalEditarServicio(servicio) {
    document.getElementById("servicioId").value = servicio.id;
    document.getElementById("servicioNombre").value = servicio.nombre;
    document.getElementById("servicioDescripcion").value = servicio.descripcion;
    document.getElementById("servicioPrecio").value = servicio.precio;
    document.getElementById("tituloModalServicio").textContent =
        "Editar Servicio";
    document.getElementById("modalServicio").classList.remove("hidden");
}

export async function eliminarServicio(id) {
    if (!confirm("¿Seguro que deseas eliminar este servicio?")) return;

    try {
        const res = await fetch(`http://localhost:8000/api/servicios/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.mensaje || "Servicio eliminado");
            cargarServicios();
        } else {
            alert(data.mensaje || "Error al eliminar");
        }
    } catch (error) {
        console.error("Error al eliminar servicio:", error);
        alert("Error de conexión");
    }
}

export function prepararModalServicios() {
    document
        .getElementById("btnNuevoServicio")
        .addEventListener("click", () => {
            document.getElementById("servicioId").value = "";
            document.getElementById("formServicio").reset();
            document.getElementById("tituloModalServicio").textContent =
                "Registrar Servicio";
            document.getElementById("modalServicio").classList.remove("hidden");
        });

    document
        .getElementById("btnCancelarServicio")
        .addEventListener("click", () => {
            document.getElementById("formServicio").reset();
            document.getElementById("modalServicio").classList.add("hidden");
        });

    document
        .getElementById("formServicio")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const id = document.getElementById("servicioId").value;
            const esEditar = id !== "";

            const datos = {
                nombre: document.getElementById("servicioNombre").value,
                descripcion: document.getElementById("servicioDescripcion")
                    .value,
                precio: document.getElementById("servicioPrecio").value,
            };

            const url = esEditar
                ? `http://localhost:8000/api/servicios/${id}`
                : "http://localhost:8000/api/servicios";
            const method = esEditar ? "PUT" : "POST";

            try {
                const res = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(datos),
                });

                const result = await res.json();
                if (res.ok) {
                    alert(
                        esEditar
                            ? "Servicio actualizado"
                            : "Servicio registrado"
                    );
                    document
                        .getElementById("modalServicio")
                        .classList.add("hidden");
                    document.getElementById("formServicio").reset();
                    cargarServicios();
                } else {
                    alert(result.mensaje || "Error al guardar");
                }
            } catch (error) {
                console.error("Error al guardar servicio:", error);
                alert("Error de conexión");
            }
        });
}

// ✅ Inicializador del módulo completo
export function initServiciosUI() {
    cargarServicios();
    prepararModalServicios();
}
