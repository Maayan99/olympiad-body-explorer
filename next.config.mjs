/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['your-image-domain.com'], // Add any image domains you're using
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://twitter.com https://www.facebook.com https://www.linkedin.com",
                    },
                ],
            },
        ];
    },
};
export default nextConfig;
