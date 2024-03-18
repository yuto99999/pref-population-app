import { NextResponse } from "next/server";

interface Population {
  message: string | null;
  result: {
    prefCode: number;
    label:string
    data: PopulationData[];
  };
}

interface PopulationData {
  year: number;
  value: number;
}

const apiUrl =
  "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear";
const apiKey = process.env.RESAS_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prefCode = searchParams.get("prefCode");

    if (!prefCode) {
      return NextResponse.json(
        { message: "prefCode is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${apiUrl}?prefCode=${prefCode}`, {
      headers: {
        "X-API-KEY": apiKey || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch population data");
    }

    const data: Population = await response.json();
    return NextResponse.json(data.result.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch population data" },
      { status: 500 }
    );
  }
}
