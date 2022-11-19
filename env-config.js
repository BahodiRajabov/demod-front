const prod = process.env.NEXT_PUBLIC_SERVER_URL === 'production'
module.exports = {
 'process.env.BACKEND_URL': prod ? 'https://api.example.com' : 'https://localhost:8080'
}