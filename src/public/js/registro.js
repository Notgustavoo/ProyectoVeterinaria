document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();

        if (!nombre || !correo || !contraseña) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const res = await fetch(
                "http://localhost:8000/api/registro-cliente",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre,
                        correo,
                        contraseña,
                    }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert(data.mensaje);
                window.location.href = "login.html";
            } else {
                alert(data.mensaje || "Error en el registro");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error de red al intentar registrarse.");
        }
    });
});
