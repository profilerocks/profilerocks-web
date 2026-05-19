import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
    schema: z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      author: z.string()
    })
  })
};
