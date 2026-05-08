<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-10">
    <h2 class="text-xl font-bold mb-4">Nuevo Producto</h2>
    <form method="POST" action="?/crear" class="flex flex-col gap-4">
        <input type="text" name="cliente" placeholder="Nombre del Cliente" required class="p-2 border rounded" />
        <input type="text" name="codigo" placeholder="Código" required class="p-2 border rounded" />
        <input type="text" name="medidas" placeholder="Medidas" class="p-2 border rounded" />
        <input type="text" name="material" placeholder="Material" class="p-2 border rounded" />
        <button type="submit" class="bg-green-600 text-white p-2 rounded hover:bg-green-700 font-bold">Guardar</button>
        <a href="/" class="text-center text-gray-500 hover:text-gray-700">Cancelar</a>
    </form>
</div>
