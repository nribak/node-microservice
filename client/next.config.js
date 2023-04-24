const withPWA = require('next-pwa')({
    dest: 'public/service'
})

module.exports = withPWA({
    reactStrictMode: false
})
