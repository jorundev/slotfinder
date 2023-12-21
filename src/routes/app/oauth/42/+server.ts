import { redirect, type RequestHandler } from '@sveltejs/kit';
import { API42_UID, API42_SECRET, API42_URL, SERVER_URL } from '$env/static/private';

export const GET: RequestHandler = async () => {
    const url = new URL(`${API42_URL}/oauth/authorize`);

    url.searchParams.set('client_id', API42_UID);
    url.searchParams.set('client_secret', API42_SECRET);
    url.searchParams.set('redirect_uri', `${SERVER_URL}/oauth/callback`);
    url.searchParams.set('response_type', 'code');

    redirect(307, url.toString());
};
