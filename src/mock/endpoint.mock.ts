export const MOCK_API = {
    POST_SHORTEN : {
        POST: {
        description: 'Shorten a URL',
        body: {
            fullUrl: 'https://www.google.com',
        },
        response: {
            shortUrl: 'http://localhost:3000/url/abc123',
        },
        },
    },
    GET_SHORTEN_URL: {
        GET: {
        description: 'Redirect to the original URL',
        response: 'https://www.google.com',
        },
    },
}