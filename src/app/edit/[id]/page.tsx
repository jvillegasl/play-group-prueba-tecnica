"use client";

import { Product } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type EditProductForm = {
    name: string;
    description: string;
    image_url: string;
};

type EditProps = {
    params: { id: string };
};

export default function Edit({ params }: EditProps) {
    const id = params.id;

    const router = useRouter();
    const [product, setProduct] = useState<Product | null>();
    const [fetching, setFetching] = useState<boolean>(true);
    const { register, handleSubmit, reset } = useForm<EditProductForm>();
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/products/${id}`).then((res) => {
            const prod = res.data["product"];
            setProduct(prod);
            reset({ ...prod });
            setFetching(false);
        });
    }, []);

    const onSubmit: SubmitHandler<EditProductForm> = (data) => {
        setError(null);

        axios
            .patch(`http://localhost:3000/api/products/${id}`, data)
            .then(() => router.push("/"))
            .catch(() =>
                setError("Product edition failed. Please try again later.")
            );
    };

    return (
        <>
            <h1 className="text-4xl mb-6">Edit Product</h1>

            {fetching ? (
                <h2 className="text-xl">Loading...</h2>
            ) : !product ? (
                <h2 className="text-xl text-red-700">Fetching failed</h2>
            ) : (
                <form
                    className="grid grid-cols-1 gap-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <p className="block mb-1">ID</p>
                            <p className="w-full rounded-md bg-slate-800 p-2">
                                {product.id}
                            </p>
                        </div>

                        <div>
                            <label htmlFor="id" className="block mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                className="w-full rounded-md bg-slate-600 p-2"
                                type="text"
                                {...register("name")}
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                className="w-full rounded-md bg-slate-600 p-2"
                                cols={30}
                                rows={5}
                                {...register("description")}
                            />
                        </div>

                        <div>
                            <label id="image_url" className="block mb-1">
                                Image Url
                            </label>
                            <input
                                id="image_url"
                                className="w-full rounded-md bg-slate-600 p-2"
                                type="text"
                                {...register("image_url")}
                            />
                        </div>
                    </div>

                    <div>
                        <button className="py-2 px-4 mb-2 rounded-xl border-2 hover:bg-white hover:text-black">
                            Submit
                        </button>

                        {error && (
                            <p className="text-sm text-red-700">{error}</p>
                        )}
                    </div>
                </form>
            )}
        </>
    );
}
