"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type NewProductForm = {
    name: string;
    description: string;
    image_url: string;
};

export default function New() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<NewProductForm>();
    const [error, setError] = useState<string | null>();

    const onSubmit: SubmitHandler<NewProductForm> = (data) => {
        setError(null);

        axios
            .post("http://localhost:3000/api/products", data)
            .then(() => router.push("/"))
            .catch(() =>
                setError("Product creation failed. Please try again later.")
            );
    };

    return (
        <>
            <h1 className="text-4xl mb-6">New Product</h1>

            <form
                className="grid grid-cols-1 gap-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid grid-cols-1 gap-4">
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

                    {error && <p className="text-sm text-red-700">{error}</p>}
                </div>
            </form>
        </>
    );
}
