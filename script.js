class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

class Carrito {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("carrito")) || [];
  }

  agregarProducto(producto) {
    this.items.push(producto);
    this.guardarEnStorage();
  }

  eliminarProducto(index) {
    this.items.splice(index, 1);
    this.guardarEnStorage();
  }

  vaciarCarrito() {
    this.items = [];
    this.guardarEnStorage();
  }

  obtenerTotal() {
    return this.items.reduce((total, item) => total + item.precio, 0);
  }

  guardarEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }
}

const carrito = new Carrito();

const productosDisponibles = [
  { id: 1, nombre: "NVIDIA GT 1030", precio: 120 },
  { id: 2, nombre: "NVIDIA GTX 1660 Super", precio: 250 },
  { id: 3, nombre: "NVIDIA RTX 4090", precio: 1600 },
];

function mostrarProductos() {
  const contenedorProductos = document.getElementById("lista-productos");
  contenedorProductos.innerHTML = "";

  productosDisponibles.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("producto");
    divProducto.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
    contenedorProductos.appendChild(divProducto);
  });
}

function mostrarCarrito() {
  const contenedorCarrito = document.getElementById("items-carrito");
  const montoTotal = document.getElementById("monto-total");

  contenedorCarrito.innerHTML = "";
  carrito.items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${item.nombre} - $${item.precio}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
    contenedorCarrito.appendChild(li);
  });

  montoTotal.textContent = `Monto total: $${carrito.obtenerTotal()}`;
}

function agregarAlCarrito(idProducto) {
  const producto = productosDisponibles.find((p) => p.id === idProducto);
  carrito.agregarProducto(producto);
  mostrarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.eliminarProducto(index);
  mostrarCarrito();
}

document.getElementById("boton-vaciar").addEventListener("click", () => {
  carrito.vaciarCarrito();
  mostrarCarrito();
});

document.getElementById("boton-comprar").addEventListener("click", () => {
  if (carrito.items.length > 0) {
    Swal.fire("Compra realizada", "Gracias por tu compra!", "success");
    carrito.vaciarCarrito();
    mostrarCarrito();
  } else {
    Swal.fire("Carrito vacío", "Agrega productos antes de comprar.", "error");
  }
});

mostrarProductos();
mostrarCarrito();
