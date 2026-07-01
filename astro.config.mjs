// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import rehypeExternalLinks from "rehype-external-links"; // rehype 管 HTML，remark 管 Markdown.

// https://astro.build/config
export default defineConfig({
    site: "https://blog-jywon.pages.dev",
    redirects: {
        "/": {
            status: 301, // Moved Permanently
            destination: "/1"
        }
    },
    output: "static", // 默认值
    build: {
        format: "file",
    },
    markdown: {
        processor: unified({
            rehypePlugins: [
                [rehypeExternalLinks, {
                    rel: ["noopener noreferer"],
                    target: "_blank",
                    contentProperties: {
                        class: "external-link-icon"
                    },
                    content: [{
                        type: "element",
                        tagName: "i",
                        properties: {
                            class: "fa fa-up-right-from-square"
                        }
                    }]
                    // https://github.com/syntax-tree/hast#readme-ov-file
                    /* content:
                    interface Element <: Parent {
                        type: 'element'
                        tagName: string
                        properties: Properties
                        content: Root?
                        children: [Comment | Element | Text]
                    }*/
                }]
            ]
        })
    }
});
