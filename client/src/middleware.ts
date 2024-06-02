
import { API_AUTH_PREFIX, AUTH_ROUTES, PUBLIC_ROUTES } from '@/routes';
import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

// IMPORTANT: middlewares are running on the Edge
// IMPORTANT: we should use auth function from the auth.config file because of separated logic that doesn't contain ORM stuff
const { auth } = NextAuth(authConfig);

// Simple redirection control by route and auth status
export default auth(req => {
    const isLoggedIn = !!req.auth;
    const onApiRoute = req.nextUrl.pathname.startsWith(API_AUTH_PREFIX);
    const onPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname);
    const onAuthRoute = AUTH_ROUTES.includes(req.nextUrl.pathname);
    if (onApiRoute || onPublicRoute) {
        return;
    }
    if (onAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(`/home`, req.nextUrl));
        }
        return;
    }
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    return;
});

export const config = {
    // Making middleware to not be triggered by requests to _next and some other 'service' requests
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
