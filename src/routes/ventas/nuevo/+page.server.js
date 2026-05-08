
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';

// 1. Esta función carga los datos para el menú desplegable (el select)
export async function load() {
    const productos = await db.execute("SELECT id, codigo, cliente FROM productos");
    return {
        productos: productos.rows
    };
}

// 2. Esta acción procesa el envío del formulario
export const actions = {
    crear: async ({ request }) => {
        const data = await request.formData();
        
        const producto_id = data.get('producto_id');
        const cantidad = data.get('cantidad');
        const precio = data.get('precio');
        const oc = data.get('oc');
        const fecha = new Date().toISOString().split('T')[0];
        
        await db.execute({
            sql: "INSERT INTO ventas (fecha, producto_id, cantidad, precio, oc, estado) VALUES (?, ?, ?, ?, ?, ?)",
            args: [fecha, producto_id, cantidad, precio, oc, 1] // 1 = Pendiente
        });

        throw redirect(303, '/ventas');
    }
};
