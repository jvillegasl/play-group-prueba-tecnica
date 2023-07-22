import { z } from "zod";

export const productSchema = z.object({
    name: z.string().max(255),
    description: z.string().max(400),
    image_url: z.string().url(),
});
