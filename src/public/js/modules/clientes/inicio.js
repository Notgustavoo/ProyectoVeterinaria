export function initInicioCliente() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        alert("No hay sesión iniciada");
        return;
    }

    const contenedor = document.getElementById("contenidoCliente");
    contenedor.innerHTML = `
        <div class="text-center py-8">
            <h1 class="text-2xl font-bold mb-2">Bienvenido, ${usuario.nombre}</h1>
            <p class="text-gray-600">Este es tu panel de cliente de VetControl</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div class="bg-blue-100 p-4 rounded shadow">
                <p class="text-lg font-semibold">Mascotas registradas</p>
                <span id="clienteTotalMascotas" class="text-3xl font-bold text-blue-800">0</span>
            </div>
            <div class="bg-yellow-100 p-4 rounded shadow">
                <p class="text-lg font-semibold">Citas activas</p>
                <span id="clienteTotalCitas" class="text-3xl font-bold text-yellow-800">0</span>
            </div>
            <div class="bg-green-100 p-4 rounded shadow">
                <p class="text-lg font-semibold">Facturas generadas</p>
                <span id="clienteTotalFacturas" class="text-3xl font-bold text-green-800">0</span>
            </div>
        </div>
    `;

    // Llamamos funciones para cargar los contadores
    cargarTotalesCliente(usuario.id);
}

async function cargarTotalesCliente(idCliente) {
    try {
        const [mascotasRes, citasRes, facturasRes] = await Promise.all([
            fetch(
                `http://localhost:8000/api/cliente/${idCliente}/mascotas/total`
            ),
            fetch(
                `http://localhost:8000/api/cliente/${idCliente}/citas/activas`
            ),
            fetch(
                `http://localhost:8000/api/cliente/${idCliente}/facturas/total`
            ),
        ]);

        const mascotas = await mascotasRes.json();
        const citas = await citasRes.json();
        const facturas = await facturasRes.json();

        document.getElementById("clienteTotalMascotas").textContent =
            mascotas.total || 0;
        document.getElementById("clienteTotalCitas").textContent =
            citas.total || 0;
        document.getElementById("clienteTotalFacturas").textContent =
            facturas.total || 0;
    } catch (error) {
        console.error("Error al cargar totales del cliente:", error);
    }
}
