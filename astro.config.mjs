// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    redirects: {
        "/": {
            status: 301, // Moved Permanently
            destination: "/1"
        }
    }
});
