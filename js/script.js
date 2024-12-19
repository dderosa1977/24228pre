// Lista de productos
const productos = [
    {
        id: 1,
        nombre: "Tarta Frutal",
        descripcion: "Tarta de frutos frescos con crema pastelera.",
        precio: 10500,
        imagen: "./assets/images/producto1.jpg"
    },
     {
        id: 2,
        nombre: "Tarta de Ricota",
        descripcion: "La ricota mas fresca y dulce",
        precio: 11500,
        imagen: "./assets/images/producto2.jpg"
    },
    {
        id: 3,
        nombre: "Donas",
        descripcion: "Donas multicolor surtidas",
        precio: 12000.00,
        imagen: "./assets/images/producto4.jpg"
    },
    {
        id: 4,
        nombre: "Copitos",
        descripcion: "Chocolate, Oreo y dulce de leche",
        precio: 8500.00,
        imagen: "./assets/images/producto5.jpg"
    },
    {
        id: 5,
        nombre: "Cheese Cake",
        descripcion: "Con salsa de arandanos y frescos frutos de bosque",
        precio: 10500.00,
        imagen: "./assets/images/producto6.jpg"
    },
    {
        id: 6,
        nombre: "Pastafrola",
        descripcion: "La clasica de membrillo",
        precio: 10000.00,
        imagen: "./assets/images/producto7.jpg"
    },
    {
        id: 7,
        nombre: "Budin XL",
        descripcion: "sabor limón",
        precio: 9500.00,
        imagen: "./assets/images/producto8.jpg"
    },
    {
        id: 8,
        nombre: "Cookies",
        descripcion: "Enormes cookies con extra chocolate",
        precio: 8500.00,
        imagen: "./assets/images/producto3.jpg"
    }
];

// Función para renderizar las cards
function renderizarProductos() {
    const contenedor = document.getElementById("productos-container");

    productos.forEach(producto => {
        // Crear la estructura de la card
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <a href="../pages/detalles.html">
            <img src="${producto.imagen}" alt="${producto.nombre}"> </a>
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>$${producto.precio.toFixed(2)}</strong></p>
            <button onclick="añadirAlCarrito(${producto.id})">Añadir al Carrito</button>
        `;

        // Agregar la card al contenedor
        contenedor.appendChild(card);
    });
}

// Función para añadir productos al carrito (inicialmente solo muestra un mensaje)
function añadirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    console.log(`Producto añadido: ${producto.nombre}`);
   

}

// Renderizar los productos al cargar la página
document.addEventListener("DOMContentLoaded", renderizarProductos);

// Array para almacenar los productos del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencias a elementos del DOM
const cartCount = document.getElementById("cart-count");

// Función para añadir un producto al carrito
function añadirAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    actualizarCarrito();
    //calcularTotal();
    guardarCarrito();
}

// Función para actualizar la cantidad mostrada en el ícono del carrito
function actualizarCarrito() {
    const totalProductos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    cartCount.textContent = totalProductos;
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarCarrito();
    guardarCarrito();
}

// Inicializar el contador del carrito al cargar la página
actualizarCarrito();

function mostrarCarrito() {
    const cartTableBody = document.getElementById("cart-table-body");
    const cartTotal = document.getElementById("cart-total");
    cartTableBody.innerHTML = ""; // Limpia la tabla antes de llenarla

    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.cantidad * producto.precio;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="modificarCantidad(${producto.id}, -1)">-</button>
                ${producto.cantidad}
                <button class="btn btn-sm btn-success" onclick="modificarCantidad(${producto.id}, 1)">+</button>
            </td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            </td>
        `;
        cartTableBody.appendChild(fila);    
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Modificar la cantidad
function modificarCantidad(id, cantidad) {
    const producto = carrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(id);
        }
        actualizarCarrito();
        guardarCarrito();
        mostrarCarrito(); // Refresca la tabla
    }
}

// Eliminar un producto
function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarCarrito();
    guardarCarrito();
    mostrarCarrito();
}

// Mostrar carrito al hacer clic en el ícono
document.getElementById("cart-icon").addEventListener("click", () => {
    mostrarCarrito();
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // Muestra/oculta el menú
}

// Seleccionamos el formulario
const form = document.getElementById('contact-form');



