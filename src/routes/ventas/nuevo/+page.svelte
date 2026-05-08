<script>
    let { data } = $props();
    
    // Si tu DB dice: 0 = Entregado, 1 = Pendiente
    function getEstado(estado) {
        if (estado === 1) return { texto: "Pendiente", clase: "bg-green-100 text-green-800" };
        return { texto: "Pendiente", clase: "bg-yellow-100 text-yellow-800" };
    }
</script>

<div class="max-w-xl mx-auto mt-10 p-8 bg-white border border-gray-200 shadow-lg rounded-xl">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800">Nueva Venta</h2>
        <a href="/ventas" class="text-gray-500 hover:text-gray-700">Cancelar</a>
    </div>

    <form method="POST" action="?/crear" class="space-y-4">
        <div>
        <label class="block text-sm font-medium text-gray-700">Seleccionar Producto</label>
        <select name="producto_id" required class="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
            <option value="" disabled selected>Seleccione un producto...</option>
            {#each data.productos as prod}
                <option value={prod.id}>{prod.codigo} - {prod.cliente}</option>
            {/each}
        </select>
    </div>
        
        <div>
            <label class="block text-sm font-medium text-gray-700">Cantidad</label>
            <input type="number" name="cantidad" required class="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div>
            <label class="block text-sm font-medium text-gray-700">Precio</label>
            <input type="number" name="precio" step="0.01" required class="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div>
            <label class="block text-sm font-medium text-gray-700">O/C (Orden de Compra)</label>
            <input type="text" name="oc" class="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <button type="submit" class="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-md">
            Registrar Venta
        </button>
    </form>
</div>
