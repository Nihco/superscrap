// src/app/api/urls/route.ts
import { NextResponse } from 'next/server';
import * as urlService from '../../services/url.services';

export async function GET() {
    try {
        const urls = await urlService.getAllUrls();
        return NextResponse.json(urls);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener las URLs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { address } = await request.json();
        if (!address) {
            return NextResponse.json({ error: 'La dirección es requerida' }, { status: 400 });
        }
        const newUrl = await urlService.addUrl(address);
        return NextResponse.json(newUrl, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}