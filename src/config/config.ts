export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    port: process.env.PORT || 3000,
}