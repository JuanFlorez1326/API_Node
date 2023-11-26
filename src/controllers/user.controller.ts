import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const createToken = (user: Prisma.UserCreateInput) => {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 86400
    });
};

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    const { email, names, surnames, password } = req.body;
    const hashedPassword = await hashPassword(password);

    if (!email || !names || !surnames || !password) {
        return res.status(400).json({ msg: 'Please. Send your email, names, surnames and password.' });
    }
    
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (user) {
        return res.status(400).json({ msg: 'The user with that email already exists.' });
    } else {
        const newUser = await prisma.user.create({
            data: {
                email, names, surnames, password: hashedPassword
            }
        });
        return res.status(200).json({
            message: 'User created successfully.',
            data: newUser
        });
    }
};

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please. Send your email and password.' });
    }
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
    if (!user) {
        return res.status(400).json({ msg: 'The user does not exists.' });
    }
    const isMatch = await comparePassword(password, user.password as string);
    if (isMatch) {
        return res.status(200).json({ token: createToken(user), userId : user.id });
    }
    return res.status(400).json({
        msg: 'The email or password are incorrect.'
    });
};

const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

const hashPassword = async (plainPassword: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(plainPassword, saltRounds);
};