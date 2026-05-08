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

<nav class="bg-gray-800 p-4 mb-6 text-white shadow-md">
    <div class="max-w-6xl mx-auto flex gap-6">
       
        <a href="/ventas" class="hover:text-blue-300 font-bold">Ventas</a>
    </div>
</nav>

<div class="max-w-5xl mx-auto p-6">
    
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Inventario de Productos</h1>
        <a href="inventario/nuevo" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-bold">
            + Nuevo Producto
        </a>
    </div>

    <div class="mb-6">
        <input 
            type="text" 
            bind:value={busqueda} 
            placeholder="Filtrar por cliente o código..." 
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table class="w-full text-left">
            <thead class="bg-gray-50 border-b">
                <tr>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600">ID</th>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600">Nombre</th>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600">Medidas</th>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600">Material</th>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600">Acción</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                {#each productosFiltrados as producto}
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 text-sm text-gray-500">{producto.id}</td>
                        <td class="px-6 py-4 text-sm text-gray-800">
                            <div class="font-bold">{producto.cliente}</div>
                            <div class="text-sm text-gray-800">Cod: {producto.codigo}</div>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">{producto.medidas || '-'}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">{producto.material || '-'}</td>
                        
                        <td class="px-6 py-4 flex gap-2">
                           <a href="/inventario/editar/{producto.id}" class="text-blue-600 hover:text-blue-900 font-medium text-sm">
                               Modificar
                           </a>
                           
                           <form 
                                method="POST" 
                                action="?/eliminar" 
                                onsubmit={(e) => { if (!confirm('¿Seguro que quieres borrar este producto?')) e.preventDefault(); }}
                            >
                               <input type="hidden" name="id" value={producto.id} />
                               <button type="submit" class="text-red-600 hover:text-red-900 font-medium text-sm">
                                   Eliminar
                               </button>
                           </form>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
