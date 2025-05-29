// modules/facturas.js

export async function cargarFacturas() {
    try {
        const res = await fetch("http://localhost:8000/api/facturas");
        const facturas = await res.json();
        const tbody = document.getElementById("tablaFacturas");
        tbody.innerHTML = "";

        facturas.forEach((f) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="p-2 border-b">${f.id}</td>
                <td class="p-2 border-b">${
                    f.cliente?.nombre ?? "Sin cliente"
                }</td>
                <td class="p-2 border-b">Bs. ${parseFloat(f.total).toFixed(
                    2
                )}</td>
                <td class="p-2 border-b">${new Date(
                    f.fecha
                ).toLocaleDateString()}</td>
                <td class="p-2 border-b text-right">
                    <button class="btn-ver text-blue-600 hover:underline">📄</button>
                    <button class="btn-pdf text-green-600 hover:underline">🖨️</button>
                    <button class="btn-eliminar text-red-600 hover:underline">🗑️</button>
                </td>
            `;

            tr.querySelector(".btn-ver").addEventListener("click", () =>
                verFactura(f)
            );
            tr.querySelector(".btn-pdf").addEventListener("click", () =>
                generarFacturaPDF(f.id)
            );
            tr.querySelector(".btn-eliminar").addEventListener("click", () =>
                eliminarFactura(f.id)
            );

            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al cargar facturas:", error);
    }
}

export async function verFactura(factura) {
    try {
        const res = await fetch(
            `http://localhost:8000/api/facturas/${factura.id}`
        );
        const data = await res.json();

        const servicios = data.consulta?.servicios ?? [];
        let detalle = servicios
            .map((s) => `• ${s.nombre} - Bs. ${s.precio}`)
            .join("\n");

        alert(
            `Factura #${data.id}\nCliente: ${
                data.cliente?.nombre
            }\nFecha: ${new Date(
                data.fecha
            ).toLocaleDateString()}\nTotal: Bs. ${parseFloat(
                data.total
            ).toFixed(2)}\n\nServicios:\n${detalle || "Sin servicios"}`
        );
    } catch (error) {
        console.error("Error al obtener detalle:", error);
        alert("Error al cargar detalle de factura");
    }
}

export async function generarFacturaPDF(id) {
    try {
        const res = await fetch(`http://localhost:8000/api/facturas/${id}`);
        const data = await res.json();

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(14);
        doc.text(`Factura #${data.id}`, 10, 10);
        doc.text(`Cliente: ${data.cliente?.nombre}`, 10, 20);
        doc.text(`Fecha: ${new Date(data.fecha).toLocaleDateString()}`, 10, 30);

        let y = 40;
        doc.text("Servicios:", 10, y);
        y += 10;

        const servicios = data.consulta?.servicios ?? [];

        if (servicios.length === 0) {
            doc.text("- Sin servicios", 10, y);
            y += 10;
        } else {
            servicios.forEach((s) => {
                doc.text(`- ${s.nombre} (Bs. ${s.precio})`, 10, y);
                y += 10;
            });
        }

        doc.text(`Total: Bs. ${parseFloat(data.total).toFixed(2)}`, 10, y + 5);
        doc.save(`factura_${data.id}.pdf`);
    } catch (error) {
        console.error("Error al generar PDF:", error);
        alert("No se pudo generar el PDF");
    }
}

export async function eliminarFactura(id) {
    if (!confirm("¿Seguro que deseas eliminar esta factura?")) return;

    try {
        const res = await fetch(`http://localhost:8000/api/facturas/${id}`, {
            method: "DELETE",
        });

        const resultado = await res.json();

        if (res.ok) {
            alert(resultado.mensaje || "Factura eliminada correctamente");
            cargarFacturas();
        } else {
            alert(resultado.mensaje || "Error al eliminar");
        }
    } catch (error) {
        console.error("Error al eliminar factura:", error);
        alert("Error de conexión");
    }
}

// ✅ NUEVO: inicializador modular
export function initFacturasUI() {
    cargarFacturas(); // Solo lectura por ahora, botones individuales están dentro de cada fila
}

// ✅ NUEVO: generar factura real desde consulta
window.generarFactura = async function (idConsulta) {
    if (!confirm("¿Deseas generar una factura para esta consulta?")) return;

    try {
        const res = await fetch("http://localhost:8000/api/facturas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_consulta: idConsulta }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Factura generada correctamente");
            cargarFacturas();
        } else {
            alert(data.mensaje || "Error al generar factura");
        }
    } catch (error) {
        console.error("❌ Error al generar factura:", error);
        alert("Error de conexión");
    }
};
