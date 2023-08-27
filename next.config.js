/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                // hostname: 'teaseteeth.s4-tastewp.com',
                hostname: 'wordpress-1084996-3795066.cloudwaysapps.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}
