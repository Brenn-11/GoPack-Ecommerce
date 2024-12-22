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
        console.log("Formulario no encontrado.");
    }
});


// Función para agregar un producto al carrito (fuera del bloque DOMContentLoaded)
// Función para agregar un producto al carrito
// Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya está en el carrito
    if (carrito.some(producto => producto.id === id)) {
        alert("El producto ya está en el carrito.");
        return;
    }

    // Agregar el producto al carrito
    carrito.push({ id, nombre, precio, imagen });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para eliminar un producto del carrito (global)
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Filtrar el producto que se quiere eliminar
    carrito = carrito.filter(producto => producto.id !== id);
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Actualizar el carrito en la interfaz
    actualizarCarrito();
}

// Función para vaciar el carrito (global)
function vaciarCarrito() {
    // Eliminar todo el carrito de localStorage
    localStorage.removeItem("carrito");

    // Actualizar el carrito en la interfaz
    actualizarCarrito();
}

// Función para actualizar el carrito (global)
function actualizarCarrito() {
    cargarCarrito();
}

// Función para cargar el carrito (global)
// Función para agregar un producto al carrito
function agregarAlCarrito(id, nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya está en el carrito
    if (carrito.some(producto => producto.id === id)) {
        alert("El producto ya está en el carrito.");
        return;
    }

    // Agregar el producto al carrito
    carrito.push({ id, nombre, precio, imagen });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para eliminar un producto del carrito (global)
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Filtrar el producto que se quiere eliminar
    carrito = carrito.filter(producto => producto.id !== id);
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Actualizar el carrito en la interfaz
    actualizarCarrito();
}

// Función para vaciar el carrito (global)
function vaciarCarrito() {
    // Eliminar todo el carrito de localStorage
    localStorage.removeItem("carrito");

    // Actualizar el carrito en la interfaz
    actualizarCarrito();
}

// Función para actualizar el carrito (global)
function actualizarCarrito() {
    cargarCarrito();
}

// Función para cargar el carrito (global)
function cargarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    // Limpiar el contenido actual del carrito
    listaCarrito.innerHTML = "";

    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Revisar si el carrito está vacío
    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>El carrito está vacío.</li>";
        totalCarrito.textContent = "Total: $0.00";
        return;
    }

    // Variable para calcular el total
    let total = 0;

    // Iterar por los productos del carrito
    carrito.forEach((producto) => {
        // Crear elementos para mostrar cada producto (incluyendo la imagen)
        const li = document.createElement("li");
        li.classList.add("item-carrito"); // Añadir clase para el estilo

        // Crear estructura para cada item
        li.innerHTML = `
            <img src="${producto.imagen}" class="imagen-carrito" alt="${producto.nombre}">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
            </div>
            <button class="eliminar-producto" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;

        listaCarrito.appendChild(li);

        // Sumar el precio del producto al total
        total += parseFloat(producto.precio);
    });

    // Actualizar el total en el HTML
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", function() {
    let productosPorPagina = 6; // Número de productos por página
    let paginaActual = 1; // Página inicial

    // Fetch de la API para cargar los productos en productos.html
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const contenedor = document.getElementById("productos-container");
            const totalProductos = data.length;
            const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

            // Función para mostrar productos en la página actual
            function mostrarProductos(pagina) {
                const start = (pagina - 1) * productosPorPagina;
                const end = start + productosPorPagina;
                const productosPagina = data.slice(start, end);

                // Limpiar el contenedor antes de agregar los nuevos productos
                contenedor.innerHTML = '';

                // Mostrar los productos de la página actual
                productosPagina.forEach(producto => {
                    const productoCard = `
                        <div class="card">
                            <img src="${producto.image}" alt="${producto.title}">
                            <h3>${producto.title}</h3>
                            <p>$${producto.price}</p>
                            <button onclick="agregarAlCarrito(${producto.id}, '${producto.title.replace(/'/g, "\\'")}', ${producto.price}, '${producto.image}')">Añadir al carrito</button>
                        </div>
                    `;
                    contenedor.innerHTML += productoCard;
                });

                // Mostrar los botones de paginación
                mostrarPaginacion(totalPaginas, pagina);
            }

            // Función para mostrar los botones de paginación
            function mostrarPaginacion(totalPaginas, pagina) {
                const paginacion = document.getElementById("paginacion");
                paginacion.innerHTML = ''; // Limpiar la paginación

                for (let i = 1; i <= totalPaginas; i++) {
                    const boton = document.createElement('button');
                    boton.textContent = i;
                    boton.classList.add('paginacion-btn');
                    if (i === pagina) {
                        boton.disabled = true; // Deshabilitar el botón de la página actual
                    }
                    boton.addEventListener('click', () => mostrarProductos(i));
                    paginacion.appendChild(boton);
                }
            }

            // Mostrar los productos en la primera página
            mostrarProductos(paginaActual);
        });

    // Eventos iniciales en carrito.html
    actualizarCarrito();
    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
});





