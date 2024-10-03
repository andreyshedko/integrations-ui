export const logtoConfig = {
    endpoint: 'https://lhsjm8.logto.app/',
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    baseUrl: 'http://localhost:3000', // Change to your own base URL
    cookieSecret: process.env.COOKIE_SECRET, // Auto-generated 32 digit secret
    cookieSecure: process.env.NODE_ENV === 'production',
  };