import { pool } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "../schemas";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);

    try {
        const [products] = await pool.query(
            "SELECT id, name, description, image_url FROM products WHERE id=? LIMIT 1",
            [id]
        );

        if ((products as any[]).length === 0) {
            return NextResponse.json(
                {
                    error: { message: "The requested product was not found." },
                },
                { status: 404 }
            );
        }

        const product = (products as any[])[0];

        return NextResponse.json({ product }, { status: 200 });
    } catch {
        return NextResponse.json(
            {
                error: {
                    message: "Failed to fetch product. Please try again later.",
                },
            },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);

    try {
        const [products] = await pool.query(
            "SELECT id, name, description, image_url FROM products WHERE id=? LIMIT 1",
            [id]
        );

        if (products.length === 0) {
            return NextResponse.json(
                {
                    error: { message: "The requested product was not found." },
                },
                { status: 404 }
            );
        }

        await pool.query("DELETE FROM products WHERE id=?", [id]);

        return new Response(null, { status: 204 });
    } catch (e) {
        return NextResponse.json(
            {
                error: {
                    message:
                        "Failed to delete the product. Please try again later.",
                },
            },
            {
                status: 500,
            }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);

    const body = await req.json();

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
        const [product] = await pool.query(
            "SELECT id, name, description, image_url FROM products WHERE id=? LIMIT 1",
            [id]
        );

        if (product.length === 0) {
            return NextResponse.json(
                {
                    error: { message: "The requested product was not found." },
                },
                { status: 404 }
            );
        }

        await pool.query(
            "UPDATE products SET name = ?, description = ?, image_url = ? WHERE id=?",
            [name, description, image_url, id]
        );

        return new Response(null, { status: 204 });
    } catch (e) {
        return NextResponse.json(
            {
                error: {
                    message:
                        "Failed to delete the product. Please try again later.",
                },
            },
            {
                status: 500,
            }
        );
    }
}
