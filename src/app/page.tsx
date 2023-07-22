"use client";

import { Product } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FaTrash as DeleteIcon,
    FaEdit as EditIcon,
    FaPlus as NewIcon,
} from "react-icons/fa";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/products").then((res) => {
            setProducts(res.data["products"]);
        });
    }, []);

    async function deleteProduct(id: number) {
        const confirmation = window.confirm(
            `Are you sure you want to delete the product with ID = ${id}?`
        );

        if (!confirmation) return;

        await axios.delete(`http://localhost:3000/api/products/${id}`);

        location.reload();
    }

    return (
        <>
            <div className="flex mb-4">
                <Link
                    href="/new"
                    className="flex items-center gap-2 justify-center px-4 py-2 rounded-lg border-2 border-white text-white hover:bg-green-600"
                >
                    New <NewIcon />
                </Link>
            </div>

            <div>
                <table className="table-auto w-full bg-gray-600 p-4 text-gray-400">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Description</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-gray-800">
                        {products.map((product, i) => {
                            return (
                                <tr key={i}>
                                    <td className="py-2 px-4">{product.id}</td>
                                    <td className="py-2 px-4 text-center">
                                        {product.name}
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                        {product.description}
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                        <div className="flex gap-2 justify-center">
                                            <Link
                                                href={`/edit/${product.id}`}
                                                className="p-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-800"
                                            >
                                                <EditIcon />
                                            </Link>
                                            <button
                                                className="p-1.5 rounded-md bg-red-600 text-white hover:bg-red-800"
                                                onClick={() =>
                                                    deleteProduct(product.id)
                                                }
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
