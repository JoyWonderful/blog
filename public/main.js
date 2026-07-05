"use strict";

const blog = {
    registerCodeCopy: function() {
        var codeBlockList = document.querySelectorAll("pre.astro-code");
        codeBlockList.forEach((target) => {
            var lang = target.hasAttribute("data-language") ? target.getAttribute("data-language") : "plain";
            var container = document.createElement("div");
            var copyBtn = document.createElement("button");
            copyBtn.className = "copy";
            var copyRes = "";
            copyBtn.addEventListener("click", function() {
                navigator.clipboard.writeText(target.querySelector("code").innerText)
                .then(() => { // onfulfilled
                    copyRes = "success";
                }, () => { // onrejected
                    copyRes = "error";
                }).then(() => {
                    copyBtn.classList.add(copyRes);
                    setTimeout(() => {copyBtn.classList.remove(copyRes)}, 500);
                });
                
            });
            container.className = "language-"+lang;
            container.setAttribute("data-language", lang);
            // 将一个节点插入到指定父节点的子节点中，并位于参考节点之前
            // <父结点>.insertBefore(<要插入的父结点中的新结点>, <要使新结点插入到它前面的结点>)
            target.parentNode.insertBefore(container, target);
            container.append(target, copyBtn); // 由于 target 已经存在，所以会被移动到 container 内
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    blog.registerCodeCopy();
});