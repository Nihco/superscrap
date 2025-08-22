// src/app/components/url-list.tsx

// Importamos el tipo de Prisma para que TypeScript sepa cómo es un objeto 'Supermercado'
import { Supermercado } from '../../generated/prisma';

// Definimos los props que nuestro componente espera recibir
interface UrlListProps {
    initialUrls: Supermercado[];
}

export function UrlList({ initialUrls }: Readonly<UrlListProps>) {
    // Manejo del caso en que no hay URLs
    if (!initialUrls || initialUrls.length === 0) {
        return (
            <div className="text-center p-8 border-dashed border-2 rounded-lg text-gray-500">
                <p>No hay URLs para mostrar.</p>
                <p>Agrega una en el formulario de arriba para comenzar.</p>
            </div>
        );
    }

    // Si hay URLs, las mostramos en una lista
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">URLs Agregadas</h2>
            <ul className="space-y-3">
                {initialUrls.map((url) => (
                    <li
                        key={url.id} // La 'key' es crucial para que React optimice el renderizado
                        className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                    >
                        <span className="font-mono text-gray-800">{url.name}</span><br/>
                        <span className="text-sm text-gray-500">
              Agregada el: {new Date(url.createdAt).toLocaleDateString()}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}