"use strict";

function registerTabs() {
    document.querySelectorAll(".tabs").forEach((tabs) => {
        let i = 1;
        const TABDEFAULT = Number(tabs.getAttribute("data-tab-default"));
        tabs.querySelectorAll(".tabs > .tab").forEach((tab) => {
            if(i == TABDEFAULT) {
                tab.classList.add("active");
            }
            tab.id = `${tabs.id}-${i}`;
            ++i;
        });

        i = 1;
        var newTitleLst = document.createElement("nav");
        tabs.querySelectorAll(".tab.title").forEach((title) => {
            var newTitleEl = document.createElement("a");
            newTitleEl.href = `#${tabs.id}-${i}`;
            newTitleEl.innerHTML = title.innerHTML;
            newTitleEl.className = "tab title";
            if(i == TABDEFAULT) newTitleEl.classList.add("active");
            newTitleEl.addEventListener("click", (event) => {
                event.preventDefault(); // 防止自动导航
                tabs.querySelectorAll(".tabs > .tab").forEach((tab) => {
                    if(tab.classList.contains("active")) tab.classList.remove("active");
                    if(tab.id == new URL(newTitleEl.href).hash.replace(/^#/,"")) tab.classList.add("active");
                });
                tabs.querySelector(".tab.title.active")?.classList.remove("active");
                newTitleEl.classList.add("active");
            });
            newTitleLst.append(newTitleEl);
            title.remove();
            ++i;
        });
        tabs.insertAdjacentElement("afterbegin", newTitleLst);
    });
}

window.addEventListener("DOMContentLoaded", registerTabs);