import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not set in environment variables");
  process.exit(1);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} OR username = ${username}
    `;

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING id, username, email
    `;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json(
      { message: "User created successfully", user: result.rows[0] },
      { status: 201 }
    );

    // Determine if we're in a secure context
    const isSecure = process.env.NODE_ENV === 'production';
    console.log(isSecure)

    // Set the cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: false,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    // Set CORS headers
    const origin = req.headers.get('origin');
    response.headers.set('Access-Control-Allow-Origin', origin || '');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    // console.log("Response headers:", response.headers);
   // console.log("Response cookies:", response.cookies.getAll());

    return response;
    
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', origin || '');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}