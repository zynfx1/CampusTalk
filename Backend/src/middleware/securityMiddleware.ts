import { doubleCsrf } from 'csrf-csrf';

export const {
  invalidCsrfTokenError,
  generateCsrfToken,
  doubleCsrfProtection,
} = doubleCsrf({
  getSessionIdentifier: (req) => req.cookies.auth_token,
  getSecret: () => process.env.CSRF_SECRET || 'super-secret-csrf-key',
  cookieName: 'x-csrf-token',
  cookieOptions: {
    httpOnly: false,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getCsrfTokenFromRequest: (req) => req.headers['x-csrf-token'],
});
