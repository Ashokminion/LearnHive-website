// Google Auth Configuration
const GOOGLE_AUTH_CONFIG = {
    CLIENT_ID: '830692205687-9pfd2gpn7vkbjrdo06ruahdob1jp4iu5.apps.googleusercontent.com',
    CLIENT_SECRET: 'YOUR_GOOGLE_CLIENT_SECRET_HERE',
    REDIRECT_URIS: [
        'https://learnhive.lindy.site',
        'https://learnhive.lindy.site/oauth2callback',
        'http://localhost:3000/oauth2callback',
        'http://localhost:8000',
        'https://ashokminion.github.io/learnhive-website/oauth2callback'
    ],
    SCOPES: ['profile', 'email']
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_AUTH_CONFIG;
}
