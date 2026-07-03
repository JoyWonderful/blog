// @ts-check
import { defineConfig } from "astro/config";
import { unified, rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import rehypeExternalLinks from "rehype-external-links"; // rehype 管 HTML，remark 管 Markdown.
import rehypeAutolinkHeadings from "rehype-autolink-headings";

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
            rehypePlugins: [ // 一系列 content https://github.com/syntax-tree/hast#readme-ov-file
                rehypeHeadingIds, // 默认情况下，Astro 会在你的 rehype 插件运行后注入 id 属性。但如果其中一个自定义 rehype 插件需要访问 Astro 注入的 ID，你可以直接导入并使用 Astro 的 rehypeHeadingIds 插件。确保在任何依赖它的插件之前添加 rehypeHeadingIds。 https://docs.astro.build/zh-cn/guides/markdown-content/#%E6%A0%87%E9%A2%98-id-%E4%B8%8E%E6%8F%92%E4%BB%B6
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
                }],
                [rehypeAutolinkHeadings, {
                    behavior: "prepend", // inject link before the heading text
                    content: {
                        type: "text",
                        value: ""
                    },
                    properties: {
                        class: "headerlink"
                    }
                }]
            ]
        })
    },
    integrations: [mdx({
        extendMarkdownConfig: true
    })]
});
