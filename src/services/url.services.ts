'use server';
import * as urlRepository from '../repositories/url.repositories';
import { revalidatePath } from 'next/cache';
type State = {
    success: boolean;
    error?: string;
};


const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

export const getAllUrls = async () => {

    return await urlRepository.findAllUrls();
};

export const addUrl = async (address: string) => {
    if (!isValidUrl(address)) {
        throw new Error('El formato de la URL no es válido.');
    }

    const existingUrl = await urlRepository.findUrlByAddress(address);
    if (existingUrl) {
        throw new Error('La URL ya existe en la base de datos.');
    }

    return await urlRepository.createUrl(address);
};

export const addUrlAction = async (prevState: State, formData: FormData): Promise<State> => {
    const address = formData.get('address') as string;

    if (!address) {
        return { success: false, error: "La dirección de la URL no puede estar vacía." };
    }

    try {
        await addUrl(address); // Reutilizamos la lógica de negocio que ya tenías
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};