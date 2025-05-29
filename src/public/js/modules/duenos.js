// modules/duenos.js

export async function cargarDuenos() {
    try {
        const res = await fetch("http://localhost:8000/api/duenos");
        const duenhos = await res.json();
        const tbody = document.getElementById("tablaDuenos");
        tbody.innerHTML = "";

        duenhos.forEach((d) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="p-2 border-b">${d.nombre}</td>
                <td class="p-2 border-b">${d.correo}</td>
                <td class="p-2 border-b">${d.telefono ?? "-"}</td>
                <td class="p-2 border-b">${d.direccion ?? "-"}</td>
                <td class="p-2 border-b text-right">
                    <button class="btn-editar text-blue-600 hover:underline">✏️</button>
                    <button class="btn-eliminar text-red-600 hover:underline">🗑️</button>
                </td>
            `;
            tr.querySelector(".btn-editar").addEventListener("click", () =>
                abrirModalEditar(d)
            );
            tr.querySelector(".btn-eliminar").addEventListener("click", () =>
                eliminarDueno(d.id)
            );
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al cargar dueños:", error);
    }
}

export function abrirModalEditar(dueno) {
    document.getElementById("duenoId").value = dueno.id;
    document.getElementById("duenoNombre").value = dueno.nombre;
    document.getElementById("duenoCorreo").value = dueno.correo;
    document.getElementById("duenoTelefono").value = dueno.telefono || "";
    document.getElementById("duenoDireccion").value = dueno.direccion || "";
    document.getElementById("duenoPassword").value = "";
    document.getElementById("tituloModal").textContent = "Editar dueño";
    document.getElementById("modalNuevoDueno").classList.remove("hidden");
}

export async function eliminarDueno(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este dueño?")) return;

    try {
        const res = await fetch(`http://localhost:8000/api/duenos/${id}`, {
            method: "DELETE",
        });

        const resultado = await res.json();
        if (res.ok) {
            alert("Dueño eliminado correctamente");
            cargarDuenos();
        } else {
            alert(resultado.mensaje || "Error al eliminar dueño");
        }
    } catch (error) {
        console.error("Error al eliminar dueño:", error);
        alert("Error de conexión");
    }
}

export function initDuenosUI() {
    cargarDuenos();

    document.getElementById("btnNuevoDueno")?.addEventListener("click", () => {
        document.getElementById("duenoId").value = "";
        document.getElementById("formNuevoDueno").reset();
        document.getElementById("tituloModal").textContent = "Registrar dueño";
        document.getElementById("modalNuevoDueno").classList.remove("hidden");
    });

    document
        .getElementById("btnCancelarModal")
        ?.addEventListener("click", () => {
            document.getElementById("formNuevoDueno").reset();
            document.getElementById("modalNuevoDueno").classList.add("hidden");
        });

    document
        .getElementById("formNuevoDueno")
        ?.addEventListener("submit", async (e) => {
            e.preventDefault();

            const password = document.getElementById("duenoPassword").value;
            if (password) {
                const requisitos = {
                    mayuscula: /[A-Z]/.test(password),
                    numero: /\d/.test(password),
                    simbolo: /[^A-Za-z0-9]/.test(password),
                    longitud: password.length >= 8,
                };

                if (!Object.values(requisitos).every(Boolean)) {
                    alert(
                        "La contraseña debe tener al menos:\n- Una mayúscula\n- Un número\n- Un carácter especial\n- Mínimo 8 caracteres"
                    );
                    return;
                }
            }

            const datos = {
                nombre: document.getElementById("duenoNombre").value,
                correo: document.getElementById("duenoCorreo").value,
                telefono: document.getElementById("duenoTelefono").value,
                direccion: document.getElementById("duenoDireccion").value,
                rol: "cliente",
            };

            if (password) datos.contraseña = password;

            const id = document.getElementById("duenoId").value;
            const esEditar = id !== "";
            const url = esEditar
                ? `http://localhost:8000/api/duenos/${id}`
                : "http://localhost:8000/api/duenos";
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
                            ? "Dueño editado correctamente"
                            : "Dueño registrado"
                    );
                    document.getElementById("formNuevoDueno").reset();
                    document
                        .getElementById("modalNuevoDueno")
                        .classList.add("hidden");
                    cargarDuenos();
                } else {
                    alert(resultado.mensaje || "Error al guardar");
                }
            } catch (error) {
                console.error("Error en registro de dueño:", error);
                alert("Error de conexión");
            }
        });
}
