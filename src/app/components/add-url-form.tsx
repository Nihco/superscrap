// src/app/(components)/add-url-form.tsx
'use client';

import { useFormState } from 'react-dom';
import { addUrlAction } from '@/services/url.services'; // Ajusta la ruta a tu servicio
import { useEffect, useRef } from 'react';

// Define el estado inicial que coincida con el tipo State del server action
const initialState = {
    success: false,
    error: undefined,
};

export function AddUrlForm() {
    // useFormState recibe la acción y el estado inicial
    // Devuelve el estado más reciente y una nueva acción para el formulario
    const [state, formAction] = useFormState(addUrlAction, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    // Efecto para limpiar el formulario después de un envío exitoso
    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state.success]);

    return (
        <form ref={formRef} action={formAction}>
            <div className="flex gap-2">
                <input
                    type="text"
                    name="address" // El 'name' es crucial, debe coincidir con formData.get('address')
                    placeholder="https://www.ejemplo.com"
                    className="flex-grow p-2 border rounded"
                    required
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Agregar
                </button>
            </div>

            {/* Muestra los mensajes de error o éxito basados en el estado */}
            {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
            {state.success && <p className="text-green-500 mt-2">URL agregada correctamente!</p>}
        </form>
    );
}