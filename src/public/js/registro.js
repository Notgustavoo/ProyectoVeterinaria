document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();

        // Validación frontend de contraseña
        const tieneMayuscula = /[A-Z]/.test(contraseña);
        const tieneNumero = /[0-9]/.test(contraseña);
        const tieneEspecial = /[\W_]/.test(contraseña);
        const largoMinimo = contraseña.length >= 8;

        if (!nombre || !correo || !contraseña) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (!largoMinimo || !tieneMayuscula || !tieneNumero || !tieneEspecial) {
            alert(
                "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
            );
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
