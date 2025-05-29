export async function initMisMascotas() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || !usuario.id) {
        alert("No se pudo obtener el ID del cliente");
        return;
    }

    const clienteId = usuario.id;

    try {
        const res = await fetch(
            `http://localhost:8000/api/mascotas?cliente=${clienteId}`
        );
        const mascotas = await res.json();

        const main = document.getElementById("contenidoCliente");
        main.innerHTML = `
            <section>
                <h2 class="text-2xl font-bold mb-4">Mis Mascotas</h2>
                ${
                    mascotas.length === 0
                        ? `<p>No tienes mascotas registradas.</p>`
                        : `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${mascotas
                                .map(
                                    (m) => `
                                <div class="bg-white shadow rounded p-4">
                                    <h3 class="text-xl font-semibold mb-2">${m.nombre}</h3>
                                    <p><strong>Especie:</strong> ${m.especie}</p>
                                    <p><strong>Raza:</strong> ${m.raza}</p>
                                    <p><strong>Sexo:</strong> ${m.sexo}</p>
                                    <p><strong>Edad:</strong> ${m.edad} año(s)</p>
                                </div>
                            `
                                )
                                .join("")}
                          </div>`
                }
            </section>
        `;
    } catch (error) {
        console.error("Error al cargar mascotas del cliente:", error);
        alert("No se pudieron cargar tus mascotas");
    }
}
