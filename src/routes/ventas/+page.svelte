<script>
    let { data } = $props();
    let mostrarModal = $state(false);
    let filtroCodigo = $state(""); // Variable para el buscador [cite: 1, 2]

    function getMes(fecha) {
        return fecha.substring(0, 7); // Extrae YYYY-MM [cite: 3]
    }

    // Lógica de filtrado reactiva basada en el código de producto [cite: 4]
    let ventasFiltradas = $derived(
        filtroCodigo.trim() === "" 
            ? data.ventas 
            : data.ventas.filter(v => v.codigo.toLowerCase().includes(filtroCodigo.toLowerCase()))
    );
</script>

<nav class="bg-gray-800 p-4 mb-6 text-white shadow-md">
    <div class="max-w-6xl mx-auto flex gap-6">
        <a href="/inventario" class="hover:text-blue-300 font-bold">Productos</a>
    </div>
</nav>

<div class="max-w-6xl mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Registro de Ventas</h1>
        <div class="flex gap-2">
            <button type="button" onclick={() => mostrarModal = true} class="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition">
                Ventas Mensuales
            </button>
            <a href="/ventas/nuevo" class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                + Nueva Venta
            </a>
        </div>
    </div>

    {#if mostrarModal}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
                <h2 class="text-xl font-bold mb-4">Total Ventas Mes</h2>
                <p class="text-4xl font-extrabold text-purple-600 mb-6">
                    ${data.totalMensual ? data.totalMensual.toFixed(2) : "0.00"}
                </p>
                <button onclick={() => mostrarModal = false} class="w-full bg-gray-200 py-2 rounded hover:bg-gray-300 font-bold">
                    Cerrar
                </button>
            </div>
        </div>
    {/if}
    
    <div class="mb-4 flex gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div class="flex-1">
            <label for="buscar-codigo" class="block text-xs font-bold text-gray-500 uppercase mb-1">Filtrar por Código de Producto</label>
            <input 
                id="buscar-codigo"
                type="text" 
                bind:value={filtroCodigo} 
                placeholder="Ej: 54/32/14..." 
                class="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
        </div>
        {#if filtroCodigo}
            <button onclick={() => filtroCodigo = ""} class="mt-5 text-sm text-gray-500 hover:text-red-500 underline">
                Limpiar filtro
            </button>
        {/if}
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table class="w-full text-left">
            <thead class="bg-gray-50 border-b">
                <tr>
                    <th class="px-4 py-3 text-sm">Fecha</th>
                    <th class="px-4 py-3 text-sm">O/C</th>
                    <th class="px-4 py-3 text-sm">Cliente</th>
                    <th class="px-4 py-3 text-sm">Producto</th>
                    <th class="px-4 py-3 text-sm">Cant.</th>
                    <th class="px-4 py-3 text-sm">Precio</th>
                    <th class="px-4 py-3 text-sm">Acciones</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                {#each ventasFiltradas as v, i}
                    {#if i > 0 && getMes(v.fecha) !== getMes(ventasFiltradas[i-1].fecha)}
                        <tr class="bg-gray-100 border-t-4 border-gray-400">
                            <td colspan="7" class="px-4 py-2 text-xs font-bold text-gray-700 uppercase tracking-widest text-center">
                                Comienzo de mes {getMes(v.fecha)}
                            </td>
                        </tr>
                    {/if}

                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm">{v.fecha}</td>
                        <td class="px-4 py-3 text-sm font-mono text-gray-600">{v.oc || '-'}</td>
                        <td class="px-4 py-3 text-sm font-bold">{v.cliente}</td>
                        <td class="px-4 py-3 text-sm">{v.codigo}</td>
                        <td class="px-4 py-3 text-sm">{v.cantidad}</td>
                        <td class="px-4 py-3 text-sm">${v.precio.toFixed(2)}</td>
                        <td class="px-4 py-3 text-sm flex items-center gap-3">
                            {#if v.estado === 1}
                                <form method="POST" action="?/cambiarEstado">
                                    <input type="hidden" name="id" value={v.id} />
                                    <input type="hidden" name="nuevoEstado" value="0" />
                                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold shadow-sm transition">
                                        Marcar Entregado
                                    </button>
                                </form>
                            {:else}
                                <span class="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-800">
                                    Entregado
                                </span>
                            {/if}

                            <form method="POST" action="?/eliminar" onsubmit={(e) => { if (!confirm('¿Seguro que quieres eliminar esta venta?')) e.preventDefault(); }}>
                                <input type="hidden" name="id" value={v.id} />
                                <button class="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1">
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
