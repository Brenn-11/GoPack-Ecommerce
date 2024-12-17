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


document.addEventListener("DOMContentLoaded", function () {
    // Array de productos
    const productos = [
        { nombre: "Mochila de Viaje", precio: 150000, descripcion: "Mochila espaciosa y resistente para viajes largos. Es perfecta para viajes largos y se adapta a diversas necesidades de almacenamiento." },
        { nombre: "Mochila Escolar", precio: 20000, descripcion: "Mochila ligera y práctica para el día a día. Ideal para llevar libros y útiles escolares." },
        { nombre: "Mochila Ejecutiva", precio: 40000, descripcion: "Ideal para profesionales, con compartimentos para laptops y documentos. Estilo elegante para el trabajo." },
        { nombre: "Mochila Deportiva", precio: 50000, descripcion: "Mochila cómoda para actividades deportivas y trekking. Perfecta para excursiones y deportes al aire libre." },
        { nombre: "Mochila Deportiva", precio: 50000, descripcion: "Mochila cómoda para actividades deportivas y trekking. Perfecta para excursiones y deportes al aire libre." }
    ];

    console.log("Productos disponibles:");
    productos.forEach(producto => {
        console.log(`Nombre: ${producto.nombre}`);
        console.log(`Precio: $${producto.precio}`);
        console.log(`Descripción: ${producto.descripcion}`);
        console.log("---------------");
    });


    function mostrarProductos() {
        const listaProductos = document.getElementById("productos-lista");
        
        productos.forEach((producto, index) => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("producto");
            

            divProducto.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p class="descripcion-corta">${producto.descripcion.substring(0, 50)}...</p>
                <p class="descripcion-completa" style="display:none;">${producto.descripcion}</p>
                <button class="ver-mas">Ver más</button>
            `;
            
            listaProductos.appendChild(divProducto);
            
            const botonVerMas = divProducto.querySelector(".ver-mas");
            botonVerMas.addEventListener("click", function() {
                const descripcionCorta = divProducto.querySelector(".descripcion-corta");
                const descripcionCompleta = divProducto.querySelector(".descripcion-completa");

                if (descripcionCompleta.style.display === "none") {
                    descripcionCompleta.style.display = "block";
                    descripcionCorta.style.display = "none";
                    botonVerMas.textContent = "Ver menos";
                } else {
                    descripcionCompleta.style.display = "none";
                    descripcionCorta.style.display = "block";
                    botonVerMas.textContent = "Ver más";
                }
            });
        });
    }

    mostrarProductos();
});





