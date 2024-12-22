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

function mostrarMensaje(mensaje) {
    // Crear un div para mostrar el mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('mensaje-carrito');
    mensajeDiv.textContent = mensaje;

    // Añadir el mensaje al cuerpo de la página
    document.body.appendChild(mensajeDiv);

    // Hacer desaparecer el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000); // El mensaje desaparece después de 3 segundos
}

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
function agregarAlCarrito(id, nombre, precio, imagen) {
    console.log("Función agregarAlCarrito llamada");  // Verifica si se llama la función
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(producto => producto.id === id);

    if (productoExistente) {
        // Incrementar la cantidad del producto existente
        productoExistente.cantidad += 1;
    } else {
        // Agregar un nuevo producto con cantidad inicial 1
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    alert(`Producto "${nombre}" añadido al carrito.`)
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

document.addEventListener("DOMContentLoaded", () => {
    // Vincular el botón de pagar con la función pagar
    document.getElementById("pagar").addEventListener("click", pagar);
});


function pagar() {
    // Verificar si el carrito tiene productos
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío. No se puede procesar el pago.");
        return;
    }

    // Vaciar el carrito
    localStorage.removeItem("carrito");
    actualizarCarrito();
    // Mostrar el mensaje de "Gracias por su compra"
    const mensajeCompra = document.getElementById("mensaje-compra");
    mensajeCompra.style.display = "block";
    
    // Ocultar el mensaje después de unos segundos (opcional)
    setTimeout(() => {
        mensajeCompra.style.display = "none";
    }, 3000); // El mensaje se oculta después de 3 segundos
}


// Función para vaciar el carrito (global)
function vaciarCarrito() {
    // Vaciar el carrito en localStorage
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

    listaCarrito.innerHTML = "";

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>El carrito está vacío.</li>";
        totalCarrito.textContent = "Total: $0.00";
        return;
    }

    let total = 0;

    carrito.forEach((producto) => {
        // Crear un elemento de lista con un input para la cantidad
        const li = document.createElement("li");
        li.classList.add("item-carrito");

        li.innerHTML = `
            <img src="${producto.imagen}" class="imagen-carrito" alt="${producto.nombre}">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>Precio unitario: $${producto.precio}</p>
                <label>
                    Cantidad:
                    <input type="number" class="cantidad-producto" min="1" value="${producto.cantidad}" data-id="${producto.id}">
                </label>
                <p>Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
            </div>
            <button class="eliminar-producto" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;

        listaCarrito.appendChild(li);
        total += producto.precio * producto.cantidad;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

    // Agregar eventos para actualizar cantidades
    const inputsCantidad = document.querySelectorAll(".cantidad-producto");
    inputsCantidad.forEach(input => {
        input.addEventListener("change", (e) => actualizarCantidad(e.target.dataset.id, e.target.value));
    });
}

function actualizarCantidad(id, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    nuevaCantidad = parseInt(nuevaCantidad);

    if (nuevaCantidad < 1) {
        alert("La cantidad mínima es 1.");
        return;
    }

    carrito = carrito.map(producto => {
        if (producto.id === parseInt(id)) {
            producto.cantidad = nuevaCantidad;
        }
        return producto;
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
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





