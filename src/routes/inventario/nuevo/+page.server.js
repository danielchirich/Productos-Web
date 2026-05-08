// src/routes/nuevo/+page.server.js
import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const actions = {
    crear: async ({ request }) => {
        const data = await request.formData();
        await db.execute({
            sql: "INSERT INTO productos (cliente, codigo, medidas, material) VALUES (?, ?, ?, ?)",
            args: [data.get('cliente'), data.get('codigo'), data.get('medidas'), data.get('material')]
        });
        throw redirect(303, '/');
    }
};
