// src/app/page.tsx
import * as urlService from '../services/url.services';
import { UrlList } from './components/url-list';
import { AddUrlForm } from './components/add-url-form';

export default async function HomePage() {
    const urls = await urlService.getAllUrls();

    return (
        <main className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Gestor de URLs a Scrapear</h1>
            <AddUrlForm />
            <div className="mt-8">
                <UrlList initialUrls={urls} />
            </div>
        </main>
    );
}