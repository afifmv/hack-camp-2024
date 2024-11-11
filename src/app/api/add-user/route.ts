import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Parse JSON body
  const { name, weight, height, score } = await request.json();

  try {
    // Validate input data
    if (!name || !weight || !height || !score) {
      throw new Error("Invalid Data: All fields are required");
    }

    // Insert into the database
    await sql`INSERT INTO userInformation (Name, Weight, Height, Calories, Score) VALUES (${name}, ${weight}, ${height}, ${0}, ${score});`;

    return NextResponse.json(
      { message: "User data added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userInformation = await sql`SELECT * FROM userInformation;`;
    return NextResponse.json({ userInformation }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
