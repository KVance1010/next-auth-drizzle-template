/**
 * an array of public routes
 * there is no need to be logged in to access these routes
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * an array of routes that require authentication
 * these routes will redirect logged out users to the login page
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login", "/register", "/verification", "/reset", "/new-password"];

/**
 * an array of routes that require admin privileges
 * these routes will redirect logged out users to the profile page
 * @type {string[]}
 */
export const adminRoutes: string[] = ["/admin"];

/**
 * the prefix for all api routes for all users
 * these routes are needed to login
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * the default route to redirect to after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/profile";
