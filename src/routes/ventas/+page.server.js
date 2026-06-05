import { db } from '$lib/server/db';

export async function load() {
    // 1. Consulta para listar las ventas
    const sql = `
        SELECT 
            ventas.id, 
            ventas.fecha, 
            ventas.producto_id, 
            ventas.cantidad, 
            ventas.precio, 
            ventas.oc, 
            ventas.estado,
            productos.cliente,
            productos.codigo
        FROM ventas
        LEFT JOIN productos ON ventas.producto_id = productos.id
        ORDER BY ventas.fecha DESC
    `;
    
    // 2. Consulta para el total (Ajustada automáticamente para el mes en curso)
    const totalResult = await db.execute(`
        SELECT SUM(cantidad * precio) as total 
        FROM ventas 
        WHERE strftime('%m', fecha) = strftime('%m', 'now', 'localtime')
        AND strftime('%Y', fecha) = strftime('%Y', 'now', 'localtime')
    `);

    const result = await db.execute(sql);
    
    // Log para depurar en la consola del servidor
    //console.log("Total calculado:", totalResult.rows[0].total);

    return { 
        ventas: result.rows,
        totalMensual: totalResult.rows[0].total || 0 
    };
}

export const actions = {
    // Acción 1: Cambiar estado
    cambiarEstado: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const nuevoEstado = data.get('nuevoEstado');
        
        await db.execute({
            sql: "UPDATE ventas SET estado = ? WHERE id = ?",
            args: [nuevoEstado, id]
        });

        return { success: true };
    },

    // Acción 2: Eliminar venta
    eliminar: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');

        await db.execute({
            sql: "DELETE FROM ventas WHERE id = ?",
            args: [id]
        });

        return { success: true };
    }
};
