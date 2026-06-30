import { defineCollection } from "astro/content/config";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const blogPosts = defineCollection({
    loader: glob({base: "./src/posts", pattern: "**/*.{md,mdx}"}),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(), // coerce 强制转换 https://zod.dev/api?id=coercion#coercion
        updated: z.coerce.date().optional(),
        tags: z.array(z.string()).or(z.string()).optional(),
        categories: z.string().optional()
    })
});

export const collections = { blogPosts };