import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMessage = async (req: Request, res: Response): Promise<Response> => {
    const { msgTitle, msgContent, userId } = req.body;

    if (!msgTitle || !msgContent || !userId) {
        return res.status(400).json({ msg: 'Please. Send your msgTitle, msgContent and userId.' });
    }

    try {
        const newMessage = await prisma.message.create({
            data: { msgTitle, msgContent, userId }
        });
        return res.status(200).json({
            message: 'Message created successfully.',
            data: newMessage
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error saving message.', error });
    }
};

export const getAllMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const allMessages = await prisma.message.findMany();
        return res.status(200).json({
            message: 'All messages were obtained.',
            data: allMessages
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error getting all messages.', error });
    }
};

export const getMessagesByUserId = async (req: Request, res: Response): Promise<Response> => {
    const { idUser } = req.params;
    
    try {
        const messages = await prisma.message.findMany({
            where: { userId: idUser }
        });
        return res.status(200).json({
            message: 'Messages obtained by userId.',
            data: messages
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error getting user messages.', error });
    }
};

export const updateMessage = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { msgTitle, msgContent } = req.body;

    if (!msgTitle || !msgContent) {
        return res.status(400).json({ msg: 'Please. Send your msgTitle and msgContent.' });
    }

    try {
        const updatedMessage = await prisma.message.update({
            where: { id: id },
            data: { msgTitle, msgContent }
        });
        return res.status(200).json({
            message: 'Message updated successfully.',
            data: updatedMessage
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error updating message.', error });
    }
};

export const deleteMessage = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        await prisma.message.delete({
            where: { id: id }
        });
        return res.status(200).json({
            message: 'Message deleted successfully.'
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error deleting message.', error });
    }
}