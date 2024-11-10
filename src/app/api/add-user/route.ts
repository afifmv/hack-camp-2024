import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("Role");
  const weight = searchParams.get("Company");
  const height = searchParams.get("Date");
  const calories = searchParams.get("0");
  const score = searchParams.get("0");

  try {
    if (!name || !weight || !height || !calories || !score)
      throw new Error("Invalid Data");
    await sql`INSERT INTO userInformation (Name, Weight, Height, Calories, Score) VALUES (${name}, ${weight}, ${height},  ${calories}, ${score});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userInformation = await sql`SELECT * FROM experience;`;
    return NextResponse.json({ userInformation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
