import { API42_UID, API42_SECRET, API42_URL, SERVER_URL } from '$env/static/private';
import type { Token42 } from '$lib/token';
import { error, json, redirect, type RequestHandler } from '@sveltejs/kit';
import { validate } from 'class-validator';

async function getToken(code: string): Promise<Token42> {
    const url = new URL(`${API42_URL}/oauth/token`);

    const params = {
        grant_type: 'authorization_code',
        client_id: API42_UID,
        client_secret: API42_SECRET,
        code,
        redirect_uri: `${SERVER_URL}/oauth/callback`,
    };

    const formData = new FormData();

    for (const [name, value] of Object.entries(params)) {
        formData.set(name, value);
    }

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    }).catch((e) => console.error(e));

    if (!response) {
        error(500);
    }

    if (!response.ok) {
        console.log(response.statusText);
        error(500);
    }

    const json = await response.json();

    const validationError = await validate(json);
    if (validationError.length > 0) {
        error(503);
    }

    return json;
}

export const GET: RequestHandler = async ({ request, cookies }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (code === null) {
        error(422, {
            message: 'Invalid or missing OAuth2 callback code',
        });
    }

    const token = await getToken(code);

    cookies.set('slotfinder-session', JSON.stringify({ token }), {
        path: '/',
    });

    redirect(307, '/');
};
