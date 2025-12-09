import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      category: z.string(),
      image: z.string()
    })
  })
};
