/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shoptoad.s1-tastewp.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}