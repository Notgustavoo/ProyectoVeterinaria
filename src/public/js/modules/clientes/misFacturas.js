export async function initMisFacturas() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return alert("No hay sesión activa");

    try {
        const res = await fetch(
            `http://localhost:8000/api/cliente/${usuario.id}/facturas`
        );
        const facturas = await res.json();

        const main = document.getElementById("contenidoCliente");
        main.innerHTML = `
            <section>
                <h2 class="text-2xl font-bold mb-4">Mis Facturas</h2>
                ${
                    facturas.length === 0
                        ? `<p>No tienes facturas registradas.</p>`
                        : `<div class="overflow-x-auto bg-white p-4 rounded shadow">
                            <table class="min-w-full text-left">
                                <thead>
                                    <tr>
                                        <th class="p-2 border-b">ID</th>
                                        <th class="p-2 border-b">Fecha</th>
                                        <th class="p-2 border-b">Total</th>
                                        <th class="p-2 border-b">Veterinario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${facturas
                                        .map(
                                            (f) => `
                                        <tr>
                                            <td class="p-2 border-b">${
                                                f.id
                                            }</td>
                                            <td class="p-2 border-b">${new Date(
                                                f.fecha
                                            ).toLocaleDateString()}</td>
                                            <td class="p-2 border-b">Bs. ${parseFloat(
                                                f.total
                                            ).toFixed(2)}</td>
                                            <td class="p-2 border-b">${
                                                f.consulta?.veterinario
                                                    ?.nombre ?? "-"
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
        console.error("Error al cargar facturas del cliente:", error);
    }
}
