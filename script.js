const productos = [
    {
        id: 1,
        nombre: "Betta Splendens",
        tipo: "splendens",
        color: "rojo",
        precio: 25,
        imagen: ""
    },
    {
        id: 2,
        nombre: "Betta Halfmoon",
        tipo: "halfmoon",
        color: "azul",
        precio: 40,
        imagen: ""
    },
    {
        id: 3,
        nombre: "Betta Crowntail",
        tipo: "crowntail",
        color: "turquesa",
        precio: 35,
        imagen: ""
    },
    {
        id: 4,
        nombre: "Betta Plakat",
        tipo: "plakat",
        color: "acero",
        precio: 30,
        imagen: ""
    },
    {
        id: 5,
        nombre: "Betta Double Tail",
        tipo: "doubletail",
        color: "opaco",
        precio: 45,
        imagen: ""
    },
    {
        id: 6,
        nombre: "Betta Elephant Ear",
        tipo: "elephant",
        color: "negro",
        precio: 50,
        imagen: ""
    },
    {
        id: 7,
        nombre: "Betta Splendens",
        tipo: "splendens",
        color: "nemo",
        precio: 55,
        imagen: ""
    },
    {
        id: 8,
        nombre: "Betta Halfmoon",
        tipo: "halfmoon",
        color: "rojo",
        precio: 42,
        imagen: ""
    },
    {
        id: 9,
        nombre: "Betta Halfmoon",
        tipo: "halfmoon",
        color: "azul",
        precio: 48,
        imagen: ""
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando tienda...');
    inicializarTienda();
});

function inicializarTienda() {
    const productosGrid = document.getElementById('productos-grid');
    const filtroTipo = document.getElementById('filtro-tipo');
    const filtroColor = document.getElementById('filtro-color');
    const filtroPrecio = document.getElementById('filtro-precio');
    const valorPrecio = document.getElementById('valor-precio');
    const btnLimpiarFiltros = document.getElementById('btn-limpiar-filtros');

    if (!productosGrid) {
        console.error('No se encontró el elemento productos-grid');
        return;
    }

    mostrarProductos(productos, productosGrid);

    if (filtroTipo && filtroColor && filtroPrecio && valorPrecio && btnLimpiarFiltros) {
        configurarFiltros(filtroTipo, filtroColor, filtroPrecio, valorPrecio, btnLimpiarFiltros, productosGrid);
    }
}

function mostrarProductos(productosArray, gridElement) {
    gridElement.innerHTML = '';
    
    if (productosArray.length === 0) {
        gridElement.innerHTML = '<p class="no-resultados">No se encontraron productos que coincidan con los filtros seleccionados.</p>';
        return;
    }
    
    productosArray.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        
        const nombreTipo = obtenerNombreTipo(producto.tipo);
        
        productoCard.innerHTML = `
            <div class="producto-imagen">
                <i class="fas fa-fish"></i>
            </div>
            <div class="producto-info">
                <span class="producto-tipo">${nombreTipo}</span>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-color">Color: ${producto.color.charAt(0).toUpperCase() + producto.color.slice(1)}</p>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="btn-primary" onclick="mostrarDetallesProducto(${producto.id})">Ver Detalles</button>
            </div>
        `;
        
        gridElement.appendChild(productoCard);
    });
}

function obtenerNombreTipo(tipo) {
    const tipos = {
        'splendens': 'Betta Splendens',
        'halfmoon': 'Betta Halfmoon',
        'crowntail': 'Betta Crowntail',
        'plakat': 'Betta Plakat',
        'doubletail': 'Betta Double Tail',
        'elephant': 'Betta Elephant Ear'
    };
    
    return tipos[tipo] || tipo;
}

function configurarFiltros(filtroTipo, filtroColor, filtroPrecio, valorPrecio, btnLimpiarFiltros, gridElement) {
    filtroTipo.addEventListener('change', function() {
        filtrarProductos(filtroTipo, filtroColor, filtroPrecio, gridElement);
    });
    
    filtroColor.addEventListener('change', function() {
        filtrarProductos(filtroTipo, filtroColor, filtroPrecio, gridElement);
    });
    
    filtroPrecio.addEventListener('input', function() {
        valorPrecio.textContent = this.value === '100' ? 'Cualquier precio' : `Hasta $${this.value}`;
        filtrarProductos(filtroTipo, filtroColor, filtroPrecio, gridElement);
    });
    
    btnLimpiarFiltros.addEventListener('click', function() {
        filtroTipo.value = 'todos';
        filtroColor.value = 'todos';
        filtroPrecio.value = '100';
        valorPrecio.textContent = 'Cualquier precio';
        mostrarProductos(productos, gridElement);
    });
}

function filtrarProductos(filtroTipo, filtroColor, filtroPrecio, gridElement) {
    const tipoSeleccionado = filtroTipo.value;
    const colorSeleccionado = filtroColor.value;
    const precioMaximo = parseInt(filtroPrecio.value);
    
    const productosFiltrados = productos.filter(producto => {
        const coincideTipo = tipoSeleccionado === 'todos' || producto.tipo === tipoSeleccionado;
        const coincideColor = colorSeleccionado === 'todos' || producto.color === colorSeleccionado;
        const coincidePrecio = precioMaximo === 100 || producto.precio <= precioMaximo;
        
        return coincideTipo && coincideColor && coincidePrecio;
    });
    
    mostrarProductos(productosFiltrados, gridElement);
}

function mostrarDetallesProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        alert(`Detalles de ${producto.nombre}\n\nTipo: ${obtenerNombreTipo(producto.tipo)}\nColor: ${producto.color}\nPrecio: $${producto.precio}\n\nPara más información, contacte al +53 5 6374820`);
    }
}