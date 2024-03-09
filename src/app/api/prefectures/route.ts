import { NextResponse } from 'next/server';

interface Prefecture {
  prefCode: number;
  prefName: string;
}

const apiUrl = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const apiKey = process.env.RESAS_API_KEY;

export async function GET() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-API-KEY': apiKey || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch prefectures');
    }

    const data: { result: Prefecture[] } = await response.json();
    return NextResponse.json(data.result);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}