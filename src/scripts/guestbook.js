/*
import { unified } from "unified";
import rehypeParse from "rehype-parse";
// import rehypeRemark from "rehype-remark";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkCjkFriendly from "remark-cjk-friendly/parseOnly";
import remarkCjkFriendlyGfmStrikethrough from "remark-cjk-friendly-gfm-strikethrough/parseOnly";
// import remarkStringify from "remark-stringify";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
// import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import { registerCodeCopy } from "./code-copy";

const processor = unified()
    // .use(rehypeParse)
    // .use(rehypeRemark)
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkCjkFriendly)
    .use(remarkCjkFriendlyGfmStrikethrough)
    // .use(remarkStringify) //
    .use(remarkRehype, {
        allowDangerousHtml: true
    })
    .use(rehypeKatex, {
        output: "html",
        strict: false
    })
    // .use(rehypeShiki, {
    //     theme: "dark-plus",
    //     langs: [
    //         "html", "javascript", "typescript", "css", "json",
    //         "c", "cpp", "python",
    //         "astro", "scss", "sass",
    //         "diff"
    //     ],
    //     transformers: [transformerColorizedBrackets()]
    // })
    .use(rehypeStringify, {
        allowDangerousCharacters: true,
        allowDangerousHtml: true
    });
const processorReprocess = unified()
    .use(rehypeParse)
    // .use(rehypeRemark)
    // .use(remarkParse)
    // .use(remarkMath)
    // .use(remarkGfm)
    // .use(remarkCjkFriendly)
    // .use(remarkCjkFriendlyGfmStrikethrough)
    // .use(remarkStringify) //
    // .use(remarkRehype, {
    //     allowDangerousHtml: true
    // })
    .use(rehypeKatex, {
        output: "html",
        strict: false
    })
    // .use(rehypeShiki, {
    //     theme: "dark-plus",
    //     langs: [
    //         "html", "javascript", "typescript", "css", "json",
    //         "c", "cpp", "python",
    //         "astro", "scss", "sass",
    //         "diff"
    //     ],
    //     transformers: [transformerColorizedBrackets()]
    // })
    .use(rehypeStringify, {
        allowDangerousCharacters: true,
        allowDangerousHtml: true
    });
*/

Sodesu.init({
    el: "#comment",
    path: window.location.pathname.replace(/\/$/,''),
    serverURL: "https://comment-jywon.netlify.app/.netlify/functions/comment",
    requiredMeta: ["nick"],
    lang: "zh-CN",
    locale: {
        admin: "管理员",
        login: "管理员登录",
        logout: "退出登录",
        placeholder: "请不要发布违反法律的内容。\nEnter键是换行，Ctrl+Enter可以发送。"
    }/*,
    renderPreview: async function(text) { // 预览 markdown
        const rendered = await processor.process(text);
        return rendered.toString();
    }*/
});

/*
var interval_id = setInterval(() => {
    var comments_contents = document.querySelectorAll("#comment .sds-content > div:not(:has(.reprocessed))");
    if(comments_contents.length > 0) { // 有未重新渲染过的评论
        comments_contents.forEach(async (content) => {
            const rendered = await processorReprocess.process(content.innerHTML);
            const html = rendered.toString();
            // console.debug(html);
            content.innerHTML = html;
            content.childNodes[0].classList.add("reprocessed"); // 之所以这样做，是因为那个 div 加入后本身不会被替换，而是 div 内的内容被替换。
            // content.querySelectorAll("pre.shiki")?.forEach((target) => {target.classList.add("astro-code");});
            // registerCodeCopy();
        });
    }
}, 300);*/