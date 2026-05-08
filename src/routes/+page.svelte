<script>
    let { data } = $props();
    
    // Estado para el filtro
    let busqueda = $state('');
    
    // Filtrado en tiempo real
    let productosFiltrados = $derived(data.productos.filter(p => 
        (p.cliente?.toLowerCase() || '').includes(busqueda.toLowerCase()) || 
        (p.codigo?.toLowerCase() || '').includes(busqueda.toLowerCase())
    ));
</script>

<div class="max-w-4xl mx-auto p-10 text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-10">Sistema de Gestión</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/inventario" class="p-8 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-500 transition-all shadow-sm">
            <h2 class="text-2xl font-bold text-blue-600">Inventario</h2>
            <p class="text-gray-600 mt-2">Gestionar productos, stock y precios</p>
        </a>
        
        <a href="/ventas" class="p-8 bg-white border-2 border-green-200 rounded-xl hover:border-green-500 transition-all shadow-sm">
            <h2 class="text-2xl font-bold text-green-600">Ventas</h2>
            <p class="text-gray-600 mt-2">Registrar ventas y ver historial</p>
        </a>
    </div>
</div>
