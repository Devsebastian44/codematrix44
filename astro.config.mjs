// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  
  // Opcional: Configuración adicional recomendada para Astro 5
  build: {
    // Asegura compatibilidad con assets
    assets: '_astro'
  }
});