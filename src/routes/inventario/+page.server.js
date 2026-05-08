// src/routes/+page.server.js
import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
    const q = url.searchParams.get('q') || '';
    
    let sql = "SELECT * FROM productos ORDER BY cliente ASC";
    let params = [];

    if (q) {
        sql = "SELECT * FROM productos WHERE cliente LIKE ? OR codigo LIKE ? ORDER BY cliente ASC";
        params = [`%${q}%`, `%${q}%`];
    }
    
    try {
        const result = await db.execute({ sql, params });
        return {
            productos: result.rows,
            query: q
        };
    } catch (error) {
        console.error("Error al consultar Turso:", error);
        return { productos: [], query: q };
    }
}

// SOLO UN BLOQUE DE ACTIONS
export const actions = {
    // Acción para crear un producto
    crear: async ({ request }) => {
        const data = await request.formData();
        const cliente = data.get('cliente');
        const codigo = data.get('codigo');
        const medidas = data.get('medidas');
        const material = data.get('material');

        await db.execute({
            sql: "INSERT INTO productos (cliente, codigo, medidas, material) VALUES (?, ?, ?, ?)",
            args: [cliente, codigo, medidas, material]
        });

        throw redirect(303, '/');
    },

    // Acción para eliminar un producto
    eliminar: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');

        await db.execute({
            sql: "DELETE FROM productos WHERE id = ?",
            args: [id]
        });

        return { success: true };
    }
};
