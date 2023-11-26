import { Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import { PrismaClient } from '@prisma/client';
import config from '../config/config';

const prisma = new PrismaClient();

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: payload.id }
        });

        if (user) {
            return done(null, user);
        }else{
            return done(null, false, { message: 'User not found' });
        }
    } catch (error) {
        console.error(`Passport strategy error: ${error}`);
        return done(error, false, { message: 'Authentication failed' });
    } finally {
        await prisma.$disconnect();
    }
});