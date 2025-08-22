import prisma from './prisma';
import { Supermercado } from '@/generated/prisma';

export const findAllUrls = async (): Promise<Supermercado[]> => {
    return await prisma.supermercado.findMany({
        orderBy: { createdAt: 'desc' },
    });
};

export const findUrlByAddress = async (address: string): Promise<Supermercado | null> => {
    return await prisma.supermercado.findUnique({
        where: { name: address },
    });
};

export const createUrl = async (address: string): Promise<Supermercado> => {

    return await prisma.supermercado.create({
        data: { name: address },
    });
};