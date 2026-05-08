import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

// 1. Cargar el producto al entrar
export async function load({ params }) {
    const result = await db.execute({
        sql: "SELECT * FROM productos WHERE id = ?",
        args: [params.id]
    });
    return { producto: result.rows[0] };
}

// 2. Guardar cambios
export const actions = {
    actualizar: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const cliente = data.get('cliente');
        const codigo = data.get('codigo');
        const medidas = data.get('medidas');
        const material = data.get('material');

        await db.execute({
            sql: "UPDATE productos SET cliente = ?, codigo = ?, medidas = ?, material = ? WHERE id = ?",
            args: [cliente, codigo, medidas, material, id]
        });

        throw redirect(303, '/');
    }
};
