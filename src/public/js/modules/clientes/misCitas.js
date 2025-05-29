export async function initMisCitas() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || !usuario.id) {
        alert("No hay sesión activa");
        return;
    }

    const clienteId = usuario.id;

    try {
        const res = await fetch(
            `http://localhost:8000/api/cliente/${clienteId}/citas`
        );
        const citas = await res.json();

        const main = document.getElementById("contenidoCliente");
        main.innerHTML = `
            <section>
                <h2 class="text-2xl font-bold mb-4">Mis Citas</h2>
                ${
                    citas.length === 0
                        ? "<p>No tienes citas registradas.</p>"
                        : `<div class="overflow-x-auto">
                            <table class="min-w-full text-left bg-white shadow rounded">
                                <thead>
                                    <tr>
                                        <th class="p-2 border-b">Fecha</th>
                                        <th class="p-2 border-b">Hora</th>
                                        <th class="p-2 border-b">Motivo</th>
                                        <th class="p-2 border-b">Veterinario</th>
                                        <th class="p-2 border-b">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${citas
                                        .map(
                                            (c) => `
                                            <tr>
                                                <td class="p-2 border-b">${
                                                    c.fecha
                                                }</td>
                                                <td class="p-2 border-b">${
                                                    c.hora
                                                }</td>
                                                <td class="p-2 border-b">${
                                                    c.motivo ?? "-"
                                                }</td>
                                                <td class="p-2 border-b">${
                                                    c.veterinario?.nombre ?? "-"
                                                }</td>
                                                <td class="p-2 border-b">${
                                                    c.estado
                                                }</td>
                                            </tr>
                                        `
                                        )
                                        .join("")}
                                </tbody>
                            </table>
                        </div>`
                }
            </section>
        `;
    } catch (error) {
        console.error("Error al cargar citas del cliente:", error);
        alert("Error al obtener tus citas.");
    }
}
