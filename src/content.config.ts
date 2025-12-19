// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  blog: defineCollection({
    // Nuevo en Astro 5: loader para especificar cómo cargar el contenido
    loader: glob({ 
      pattern: "**/*.md",  // Busca todos los archivos .md
      base: "./src/content/blog"  // En tu carpeta blog
    }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),  // Ahora usa pubDate en lugar de date
      category: z.string(),
      image: z.string(),
      tags: z.array(z.string()).default([])  // Tags con valor por defecto vacío
    })
  })
};