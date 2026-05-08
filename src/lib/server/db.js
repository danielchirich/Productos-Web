import { createClient } from '@libsql/client';
import { TURSO_URL, TURSO_AUTH_TOKEN } from '$env/static/private';

export const db = createClient({
    url: TURSO_URL,
    authToken: TURSO_AUTH_TOKEN
});
