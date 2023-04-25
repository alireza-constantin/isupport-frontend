export const __isProd__ = process.env.NODE_ENV === 'production'
export const URL = __isProd__ ? 'http://' : 'http://localhost:8000/api';
