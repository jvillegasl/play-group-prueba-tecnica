import { pool } from "@/config/db";
import { NextResponse } from "next/server";
import { productSchema } from "./schemas";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET() {
    try {
        const [products] = await pool.query(
            "SELECT id, name, description, image_url FROM products"
        );

        return NextResponse.json({ products }, { status: 200 });
    } catch {
        return NextResponse.json(
            {
                error: {
                    message:
                        "Failed to fetch the products. Please try again later.",
                },
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(req: Request) {
    const body = await req.json()

    const response = productSchema.safeParse(body);

    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json(
            {
                error: { message: "Invalid request", errors },
            },
            {
                status: 400,
            }
        );
    }

    const { description, image_url, name } = response.data;

    try {
        await pool.query(
            "INSERT INTO products (name, description, image_url) VALUES (?,?,?)",
            [name, description, image_url]
        );

        return NextResponse.json(
            { message: "Successfully created product." },
            {
                status: 201,
            }
        );
    } catch {
        return NextResponse.json(
            {
                error: {
                    message:
                        "Failed to add the product. Please try again later.",
                },
            },
            {
                status: 500,
            }
        );
    }
}
