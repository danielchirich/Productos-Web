<script>
    let { data } = $props();
</script>

<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
    <h1 class="text-xl font-bold mb-4">Modificar Producto</h1>
    
    <form method="POST" action="?/actualizar" class="flex flex-col gap-4">
        <input type="hidden" name="id" value={data.producto.id} />
        
        <input type="text" name="cliente" value={data.producto.cliente} required class="p-2 border rounded" />
        <input type="text" name="codigo" value={data.producto.codigo} required class="p-2 border rounded" />
        <input type="text" name="medidas" value={data.producto.medidas} class="p-2 border rounded" />
        <input type="text" name="material" value={data.producto.material} class="p-2 border rounded" />
        
        <div class="flex gap-2">
            <button type="submit" class="bg-blue-600 text-white p-2 rounded flex-1 hover:bg-blue-700">Guardar Cambios</button>
            <a href="/" class="bg-gray-200 p-2 rounded text-center">Cancelar</a>
        </div>
    </form>
</div>
