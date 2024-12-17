document.addEventListener("DOMContentLoaded", () =>{
    console.log("El archivo JavaScript está conectado correctamente.");

    const form = document.getElementById("miFormulario");

    if(form) {
        console.log("Formulario encontrado.");

        form.addEventListener("submit", (e) =>{
            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const mensaje = document.getElementById("message").value;

            const errorMessage = document.getElementById("error-message")

            if (nombre === ""  || email === "" || mensaje === ""){
                e.preventDefault();
                errorMessage.style.display = "block";

                if (nombre === ""){
                    document.getElementById("nombre").style.border = "2px solid red";
                }

                if (email === ""){
                    document.getElementById("email").style.border = "2px solid red"
                }

                if (mensaje === ""){
                    document.getElementById("message").style.border = "2px solid red"
                }

            } else {
                console.log("Formulario enviado correctamente.");
                errorMessage.style.display = "none";

                document.getElementById("nombre").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
            }
        });
    } else {
        console.log("Formulario no encontrado. Revisa el HTML");
    }
});
