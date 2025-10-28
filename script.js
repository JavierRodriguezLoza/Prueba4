// Datos de productos - Nombres en español
const productos = [
    {
        id: 1,
        tipo: "splendens",
        color: "Rojo",
        precio: 1500,
        imagen: "fas fa-fish"
    },
    {
        id: 2,
        tipo: "halfmoon",
        color: "Azul",
        precio: 1800,
        imagen: "fas fa-fish"
    },
    {
        id: 3,
        tipo: "crowntail",
        color: "Turquesa",
        precio: 1200,
        imagen: "fas fa-fish"
    },
    {
        id: 4,
        tipo: "plakat",
        color: "Acero",
        precio: 1000,
        imagen: "fas fa-fish"
    },
    {
        id: 5,
        tipo: "doubletail",
        color: "Opaco",
        precio: 2000,
        imagen: "fas fa-fish"
    },
    {
        id: 6,
        tipo: "dumbo",
        color: "Negro",
        precio: 1600,
        imagen: "fas fa-fish"
    },
    {
        id: 7,
        tipo: "splendens",
        color: "Naranja",
        precio: 1400,
        imagen: "fas fa-fish"
    },
    {
        id: 8,
        tipo: "halfmoon",
        color: "Blanco",
        precio: 1900,
        imagen: "fas fa-fish"
    },
    {
        id: 9,
        tipo: "crowntail",
        color: "Verde",
        precio: 1300,
        imagen: "fas fa-fish"
    },
    {
        id: 10,
        tipo: "plakat",
        color: "Violeta",
        precio: 1100,
        imagen: "fas fa-fish"
    },
    {
        id: 11,
        tipo: "doubletail",
        color: "Amarillo",
        precio: 1700,
        imagen: "fas fa-fish"
    },
    {
        id: 12,
        tipo: "dumbo",
        color: "Rosa",
        precio: 1500,
        imagen: "fas fa-fish"
    }
];

// Mapeo de tipos a nombres en español
const tipoNombres = {
    "splendens": "Splendens",
    "halfmoon": "Media Luna",
    "crowntail": "Corona",
    "plakat": "Plakat",
    "doubletail": "Doble Cola",
    "dumbo": "Dumbo"
};

// Variables globales
let productosFiltrados = [...productos];
const productosGrid = document.getElementById('productos-grid');
const filtroTipo = document.getElementById('filtro-tipo');
const filtroColor = document.getElementById('filtro-color');
const filtroPrecio = document.getElementById('filtro-precio');
const valorPrecio = document.getElementById('valor-precio');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando tienda elegante...');
    mostrarProductos(productos);
    configurarFiltros();
    configurarMenuMovil();
});

// Mostrar productos en el grid
function mostrarProductos(productosArray) {
    productosGrid.innerHTML = '';
    
    if (productosArray.length === 0) {
        productosGrid.innerHTML = `
            <div class="no-resultados">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: var(--color-texto-claro);"></i>
                <p>No se encontraron peces con los filtros seleccionados.</p>
                <p>Intenta ajustar los criterios de búsqueda.</p>
            </div>
        `;
        return;
    }
    
    productosArray.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        
        // Formatear el precio
        const precioFormateado = new Intl.NumberFormat('es-CU', {
            style: 'currency',
            currency: 'CUP'
        }).format(producto.precio);
        
        // Obtener el nombre del tipo
        const tipoNombre = tipoNombres[producto.tipo] || producto.tipo;
        
        productoCard.innerHTML = `
            <div class="producto-imagen">
                <i class="${producto.imagen}"></i>
            </div>
            <div class="producto-info">
                <span class="producto-tipo">${tipoNombre}</span>
                <h3 class="producto-nombre">Betta ${tipoNombre}</h3>
                <p class="producto-color">${producto.color}</p>
                <p class="producto-precio">${precioFormateado}</p>
                <button class="btn-primary" onclick="contactarPorProducto('${tipoNombre}', '${producto.color}', ${producto.precio})">
                    <i class="fas fa-info-circle"></i> Más Información
                </button>
            </div>
        `;
        
        productosGrid.appendChild(productoCard);
    });
}

// Configurar filtros
function configurarFiltros() {
    // Configurar valores iniciales de la barra de precio
    filtroPrecio.min = 0;
    filtroPrecio.max = 2000;
    filtroPrecio.value = 2000;
    valorPrecio.textContent = 'Cualquier precio';
    
    // Filtro por tipo
    filtroTipo.addEventListener('change', aplicarFiltros);
    
    // Filtro por color
    filtroColor.addEventListener('change', aplicarFiltros);
    
    // Filtro por precio
    filtroPrecio.addEventListener('input', function() {
        const valor = parseInt(this.value);
        if (valor === 2000) {
            valorPrecio.textContent = 'Cualquier precio';
        } else {
            valorPrecio.textContent = `Hasta ${valor} CUP`;
        }
        aplicarFiltros();
    });
    
    // Botón limpiar filtros
    const btnLimpiarFiltros = document.getElementById('btn-limpiar-filtros');
    if (btnLimpiarFiltros) {
        btnLimpiarFiltros.addEventListener('click', function() {
            filtroTipo.value = 'todos';
            filtroColor.value = 'todos';
            filtroPrecio.value = 2000;
            valorPrecio.textContent = 'Cualquier precio';
            aplicarFiltros();
        });
    }
}

// Aplicar todos los filtros
function aplicarFiltros() {
    const tipoSeleccionado = filtroTipo.value;
    const colorSeleccionado = filtroColor.value;
    const precioMaximo = parseInt(filtroPrecio.value);
    
    productosFiltrados = productos.filter(producto => {
        // Filtro por tipo
        if (tipoSeleccionado !== 'todos' && producto.tipo !== tipoSeleccionado) {
            return false;
        }
        
        // Filtro por color
        if (colorSeleccionado !== 'todos' && producto.color.toLowerCase() !== colorSeleccionado.toLowerCase()) {
            return false;
        }
        
        // Filtro por precio
        if (precioMaximo < 2000 && producto.precio > precioMaximo) {
            return false;
        }
        
        return true;
    });
    
    mostrarProductos(productosFiltrados);
}

// Función para contactar por un producto específico
function contactarPorProducto(tipo, color, precio) {
    const precioFormateado = new Intl.NumberFormat('es-CU', {
        style: 'currency',
        currency: 'CUP'
    }).format(precio);
    
    const mensaje = `Hola, estoy interesado en el Betta ${tipo} de color ${color} (${precioFormateado}). ¿Podrían darme más información?`;
    const telefono = "+5356374820";
    
    // Crear enlace de WhatsApp
    const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir en nueva ventana
    window.open(urlWhatsApp, '_blank');
}

// Configurar menú móvil
function configurarMenuMovil() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Cambiar icono
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                if (menuToggle.querySelector('i')) {
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
}

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});