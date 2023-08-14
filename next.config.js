/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'teaseteeth.s4-tastewp.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}
