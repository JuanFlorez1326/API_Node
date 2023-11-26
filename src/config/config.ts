export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    port: process.env.PORT || 3000,
    DB: {
        DATABASE: process.env.DATABASE_URL || 'postgresql://postgres:0210@localhost:5432/dbtest?schema=public',
    }
}