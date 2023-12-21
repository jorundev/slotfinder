import type { Token42 } from '$lib/token';
import { validate } from 'class-validator';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const cookie = cookies.get('slotfinder-session');

    if (!cookie) {
        // Unauthenticated
        return {
            loggedIn: false,
        };
    }

    const session: { token: Token42 } = JSON.parse(cookie);

    if ((await validate(session?.token)).length > 0) {
        // Session is incorrect
        error(500);
    }

    return {
        loggedIn: true,
    };
};
