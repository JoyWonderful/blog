"use strict";

function registerHeadings() {
    window.blogTOCItems = document.querySelectorAll(".toc li");
    window.blogHeadings = [...document.querySelectorAll(".toc li > a")].map((link) => { // 获取 toc 内的所有导航链接
        return document.querySelector(decodeURI(new URL(link.href).hash)); // decodeURI 之后才能获取正常的选择器，如 `#安装`，而不是 `#%E5%AE%89%E8%A3%85`
    });
}
function activeTOC() {
    if(!window.blogHeadings || !window.blogHeadings.length) return; // 还没有 registerHeadings / 没有标题
    // 30 就是 h1,h2,h3,...,h6 的 margin-top 值。选取第一个 DOMRect.top 值比 30px 大的 heading，
    // (视口以上的 heading，DOMReact.top 为负值) 这个 heading 应该刚好是“能看得到的第一个段落所归属
    // 的 heading”的下一个 heading。
    var idx = window.blogHeadings.findIndex((heading) => heading.getBoundingClientRect().top > 30);
    if(idx > 0) --idx; // 我们还正在阅读这个 heading 上面的段落！
    else if(idx == -1) idx = window.blogHeadings.length - 1; // 所有 heading 都在视口以上，那么我们正在阅读最后一个标题所拥有的段落。

    window.blogTOCItems.forEach((item) => {
        if(item.classList.contains("active")) {
            item.classList.remove("active");
        }
    });
    window.blogTOCItems[idx].classList.add("active");
    window.blogTOCItems[idx].scrollIntoView({
        behavior: "smooth",
        container: "nearest", // 仅滚动最近的滚动祖先。不加上页面也跟着一起动了
        block: "nearest" // 沿垂直方向将元素滚动至最近边缘。若元素更靠近滚动容器顶部，则对齐顶部；若更靠近底部，则对齐底部。此方式可最小化滚动距离。
    });
}

export function registerAsideTitle() {
    var sideBar = document.querySelector(".main-area .column aside");
    var sideBarTitle = sideBar.querySelector(".title");
    // 12 是 .aside top CSS 属性(top:12px)
    if(!sideBarTitle.classList.contains("deactive") && sideBar.getBoundingClientRect().top <= 12) {
        sideBarTitle.classList.add("deactive");
    }
    else if(sideBarTitle.classList.contains("deactive") && sideBar.getBoundingClientRect().top > 12) {
        sideBarTitle.classList.remove("deactive");
    }
}

window.addEventListener("DOMContentLoaded", function() {
    registerHeadings();
    activeTOC();
    registerAsideTitle();
});
window.addEventListener("scroll", function() {
    activeTOC();
    registerAsideTitle();
});
