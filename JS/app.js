const productos = [
    {
        titulo: 'Anillo de Compromiso Nenna "PETITE"- Oro 18k Blanco',
        imagen: '../img/joyeria/anillocomp2.jpg',
        precio: '$35,500.00 MX'
    },
    {
        titulo: 'Anillo de Compromiso "CINDIRELLA" Oro-18K combinado',
        imagen: '../img/joyeria/anillocomp2.jpg',
        precio: '$55,000.00 MX'
    },
    {
        titulo: 'Anillo de compromiso "lovestone"- oro 18k blanco- cushion',
        imagen: '../img/joyeria/anillocomp3.jpg',
        precio: '$70,800.00 MX'
    },
    {
        titulo: 'Anillo de compromiso "lovestone"- oro 18k blanco- cushion',
        imagen: '../img/joyeria/anillocomp3.jpg',
        precio: '$70,800.00 MX'
    }
];

// Función para cargar productos
const cargarProductos = () => {
    const contenedorItems = document.querySelector('.contenedor-items');
    productos.forEach(producto => {
        const itemHTML = `
            <div class="item">
                <span class="titulo-item">${producto.titulo}</span>
                <img src="${producto.imagen}" alt="" class="img-item">
                <span class="precio-item">${producto.precio}</span>
                <button class="boton-item">Comprar Ahora</button>
            </div>
        `;
        contenedorItems.innerHTML += itemHTML;
    });
    // Agregar event listeners a los nuevos botones
    const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        const button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }
};

// Función para manejar clic en agregar carrito
const agregarAlCarritoClicked = (event) => {
    const button = event.target;
    const item = button.parentElement;
    const titulo = item.querySelector('.titulo-item').textContent;
    const precio = item.querySelector('.precio-item').textContent;
    const imagenSrc = item.querySelector('.img-item').src;
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    actualizarTotalCarrito();
    mostrarCarrito();
};

// Función para agregar item al carrito
const agregarItemAlCarrito = (titulo, precio, imagenSrc) => {
    const carritoItems = document.querySelector('.carrito-items');
    const nombresItemsCarrito = carritoItems.getElementsByClassName('carrito-item-titulo');
    
    // Verificar si el item ya está en el carrito
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].textContent === titulo) {
            alert("Este item ya está agregado al carrito");
            return;
        }
    }

    const itemCarritoHTML = `
        <div class="carrito-item">
            <img src="${imagenSrc}" alt="" width="80px">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <span class="btn-eliminar"><i class="fa-solid fa-trash"></i></span>
        </div>
    `;
    carritoItems.innerHTML += itemCarritoHTML;

    // Agregar event listeners a los nuevos botones en el carrito
    actualizarEventListenersCarrito();
};

// Función para actualizar los event listeners del carrito
const actualizarEventListenersCarrito = () => {
    const botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        const button = botonesEliminarItem[i];
        button.removeEventListener('click', eliminarItemCarrito); 
        button.addEventListener('click', eliminarItemCarrito);
    }

    const botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        const button = botonesSumarCantidad[i];
        button.removeEventListener('click', sumarCantidad); 
        button.addEventListener('click', sumarCantidad);
    }

    const botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        const button = botonesRestarCantidad[i];
        button.removeEventListener('click', restarCantidad); // Eliminar event listener existente para evitar duplicados
        button.addEventListener('click', restarCantidad);
    }
};

// Función para eliminar item del carrito
const eliminarItemCarrito = (event) => {
    const buttonClicked = event.target;
    buttonClicked.closest('.carrito-item').remove();
    actualizarTotalCarrito();
};

// Función para sumar cantidad
const sumarCantidad = (event) => {
    const buttonClicked = event.target;
    const selectorCantidad = buttonClicked.parentElement;
    const inputCantidad = selectorCantidad.querySelector('.carrito-item-cantidad');
    inputCantidad.value = parseInt(inputCantidad.value) + 1;
    actualizarTotalCarrito();
};

// Función para restar cantidad
const restarCantidad = (event) => {
    const buttonClicked = event.target;
    const selectorCantidad = buttonClicked.parentElement;
    const inputCantidad = selectorCantidad.querySelector('.carrito-item-cantidad');
    if (parseInt(inputCantidad.value) > 1) {
        inputCantidad.value = parseInt(inputCantidad.value) - 1;
        actualizarTotalCarrito();
    }
};

// Función para actualizar el total del carrito
const actualizarTotalCarrito = () => {
    const carritoItems = document.querySelector('.carrito-items');
    const carritoItemContenedores = carritoItems.querySelectorAll('.carrito-item');
    let total = 0;

    carritoItemContenedores.forEach(item => {
        const precioElemento = item.querySelector('.carrito-item-precio');
        const precio = parseFloat(precioElemento.textContent.replace('$', '').replace(',', ''));
        const cantidadElemento = item.querySelector('.carrito-item-cantidad');
        const cantidad = parseInt(cantidadElemento.value);
        total += precio * cantidad;
    });

    document.querySelector('.carrito-precio-total').textContent = `$${total.toLocaleString()} MX`;
};

// Función para mostrar el carrito
const mostrarCarrito = () => {
    const carrito = document.querySelector('.carrito');
    carrito.style.display = 'block';
};

// Función para manejar clic en pagar
const pagarClicked = () => {
    window.location.href = "formulariotarj.html";
};

// Cargar productos y asignar eventos
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    document.querySelector('.btn-pagar').addEventListener('click', pagarClicked);
    actualizarEventListenersCarrito(); 
});

