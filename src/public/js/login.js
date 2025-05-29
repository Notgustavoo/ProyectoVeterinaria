document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();

        if (!correo || !contraseña) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo, contraseña }),
            });

            const data = await res.json();

            if (res.ok) {
                // Guardar datos en localStorage
                localStorage.setItem("usuarioId", data.usuario.id);
                localStorage.setItem("usuarioNombre", data.usuario.nombre);
                localStorage.setItem("usuarioRol", data.usuario.rol);

                // Redirigir según el rol
                if (data.usuario.rol === "admin") {
                    window.location.href = "admin.html";
                } else if (data.usuario.rol === "cliente") {
                    window.location.href = "cliente.html";
                } else {
                    alert("Rol no reconocido");
                }
            } else {
                alert(data.mensaje || "Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error en login:", error);
            alert("Error de conexión");
        }
    });
});
