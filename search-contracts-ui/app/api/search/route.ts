import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query");
    const response = await fetch(`https://sepolia.voyager.online/api/search?query=${query}`);

    if (!response.ok) {
        console.error('Error fetching search results:', response);
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
        status: 200,
    });
}