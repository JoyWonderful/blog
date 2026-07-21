---
title: 消失效果
tags:
    - HTML
    - JavaScript
date: 2023-12-16 09:58:12 +08:00
categories: Programming
---


从 ncase.me 学来的，可以自己看源码。主要是通过**背景图片**的位置实现。结合了 CSS 和 JS。  
可以自己增加一个函数在隐藏时执行。  
你只要这样就可以：

```html
<p>
    美好的文字
    Have a good day!
    <div class="scratcher"></div>
</p>
```

代码和示例请看下面。

<!--more-->

## 代码和使用方法

模拟的笔涂白是通过 CSS 背景图片的位置完成的。代码如下：

```css
.scratcher {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(https://s2.loli.net/2023/12/16/NOVHCgALzK4Fd1Q.png);
    background-size: 200% 2000%;
    display: none;
    z-index: 200;
}
```

其中，`width` `height` 设为 100% 是为了铺满元素（整个使用时用到），`z-index` 进行覆盖。  
使用时请添加 `<div class="scratcher"></div>` 在准备显示隐藏的元素**内**，使其成为准备隐藏的元素的**子元素**，方便更改容器的位置。下面的 JS 会更改它的位置和大小。

```javascript
var divList = document.querySelectorAll(".scratcher");
for(let i = 0; i < divList.length; i++) {
    divList[i].style.display = "none";
    divList[i].style.backgroundPosition = "-100% -1900%";
    var lpnt = divList[i].parentNode;
    if(window.getComputedStyle(lpnt).position == "relative") {
        divList[i].style.bottom = "0";
        divList[i].style.right = "0";
    }
    else {
        divList[i].style.top = String(lpnt.offsetTop) + "px";
        divList[i].style.left = String(lpnt.offsetLeft) + "px";
    }
    divList[i].style.width = String(lpnt.offsetWidth) + "px";
    divList[i].style.height = String(lpnt.offsetHeight) + "px";
}
```

为了应对相对定位这种特殊情况，代码中也进行了判断。其他情况则是设置相同大小和位置（`left`,`top`），覆盖其父元素。  
进行擦除和显示时，也采用 JS，自己可以在下面的代码中添加隐藏后执行的函数。

```javascript
var divList = document.querySelectorAll(".scratcher");
function eraseAndShow(num) { // 这里是第 num 个覆盖元素
    divList[num].style.display = "block";
    for(let i = 1; i <= 19; i++) {
        setTimeout(() => {
            divList[num].style.backgroundPosition = `0% ${i * -100}%`; // 更改背景位置
        }, i * 100);
    }
    // 在这里可以添加准备执行的函数，使用 `setTimeout` 设置延时为 1900 毫秒。
    // 例如：
    // setTimeout(() => {myFunction();}, 1900);
    // 或者在第二行代码处添加参数，传递要执行的函数。
    for(let i = 1; i <= 19; i++) {
        setTimeout(() => {
            divList[num].style.backgroundPosition = `-100% ${i * -100}%`;
        }, i * 100 + 2100);
    }
    setTimeout(() => {divList[num].style.display = "none";}, 4000);
}
```

在添加以上所有代码后，就可以在任意一个元素内添加 `<div class="scratcher"></div>`，再在执行 JavaScript 代码 `eraseAndShow(0)`，试验性地查看效果。

## 示例

下面是一些示例，点击按钮“隐藏和显示”可以看到效果

<style>
    .scratcher {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(https://s2.loli.net/2023/12/16/NOVHCgALzK4Fd1Q.png);
        background-size: 200% 2000%;
        display: none;
        z-index: 200;
    }
</style>

以下文字在点击按钮后会被更改：

<div id="theFirstExmDiv" style="height:16em;margin-bottom:2em;background-color:#eee;border-radius:3px;border:none;padding:.5em;">
    <p style="margin-bottom:5px;">心情，是一种感情状态，拥有了好心情，也就拥有了自信，继而拥有了年轻和健康。就拥有了对未来生活的向往，充满期待，让我们拥有一份好心情吧，因为生活着就是幸运和快乐。</p>
    <p style="margin-bottom:5px;">当你孤独时，风儿就是我的歌声，愿它能使你得到片刻的安慰；当你骄傲时，雨点就是我的警钟，愿它能使你获得永恒的谦逊。</p>
    <p style="margin-bottom:5px;">友情如水，淡而长远；友情如茶，香而清纯；友情如酒，烈而沁心；友情如雨，细而连绵；友情如雪，松而亮洁。人生短暂，珍惜友情。</p>
    <!-- 乱摘的甜鸡汤 -->
    <a class="btn" id="hidebtn1" href="javascript:eraseAndShow(0, 1);" style="margin-top:0;">隐藏和显示</a>
    <div class="scratcher"></div>
</div>

由于是通过背景图片的位置模拟擦除效果，所以当点击按钮后在消失前按钮无法被点击。这个特性很好地使用在切换容器内容上。

以下是一个简单的示例：

:::note{.danger} danger #d9534f

<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<p>test</p><p>test</p><p>test</p>
<a class="btn" id="hidebtn2" href="javascript:eraseAndShow(1);">隐藏和显示</a>
<div class="scratcher"></div>

:::

<script>
    var divList = document.querySelectorAll(".scratcher");
    for(let i = 0; i < divList.length; i++) {
        divList[i].style.display = "none";
        divList[i].style.backgroundPosition = "-100% -1900%";
        var lpnt = divList[i].parentNode;
        if(window.getComputedStyle(lpnt).position == "relative") {
            divList[i].style.bottom = "0";
            divList[i].style.right = "0";
        }
        else {
            divList[i].style.top = String(lpnt.offsetTop) + "px";
            divList[i].style.left = String(lpnt.offsetLeft) + "px";
        }
        divList[i].style.width = String(lpnt.offsetWidth) + "px";
        divList[i].style.height = String(lpnt.offsetHeight) + "px";
    }
    function eraseAndShow(num, a) {
        divList[num].style.display = "block";
        for(let i = 1; i <= 19; i++) {
            setTimeout(() => {
                divList[num].style.backgroundPosition = `0% ${i * -100}%`;
            }, i * 100);
        }
        if(num == 0) {
            if(a) {
                setTimeout(() => {
                    document.querySelectorAll("div#theFirstExmDiv p")[0].innerHTML = "112 files changed, 3471 insertions(+), 2065 deletions(-)";
                    document.querySelectorAll("div#theFirstExmDiv p")[1].innerHTML = "Enumerating objects: 425, done.<br>Counting objects: 100% (425/425), done.";
                    document.querySelectorAll("div#theFirstExmDiv p")[2].innerHTML = "Writing objects: 100% (227/227), 1.44 MiB | 875.00 KiB/s, done.<br>Total 227 (delta 111), reused 0 (delta 0), pack-reused 0";
                    document.querySelector("div#theFirstExmDiv a.btn").innerHTML = "重新演示";
                    document.querySelector("div#theFirstExmDiv a.btn").href = "javascript:eraseAndShow(0, 0);";
                }, 1900);
            }
            else {
                setTimeout(() => {
                    document.querySelectorAll("div#theFirstExmDiv p")[0].innerHTML = "心情，是一种感情状态，拥有了好心情，也就拥有了自信，继而拥有了年轻和健康。就拥有了对未来生活的向往，充满期待，让我们拥有一份好心情吧，因为生活着就是幸运和快乐。";
                    document.querySelectorAll("div#theFirstExmDiv p")[1].innerHTML = "当你孤独时，风儿就是我的歌声，愿它能使你得到片刻的安慰；当你骄傲时，雨点就是我的警钟，愿它能使你获得永恒的谦逊。";
                    document.querySelectorAll("div#theFirstExmDiv p")[2].innerHTML = "友情如水，淡而长远；友情如茶，香而清纯；友情如酒，烈而沁心；友情如雨，细而连绵；友情如雪，松而亮洁。人生短暂，珍惜友情。";
                    document.querySelector("div#theFirstExmDiv a.btn").innerHTML = "隐藏和显示";
                    document.querySelector("div#theFirstExmDiv a.btn").href = "javascript:eraseAndShow(0, 1);";
                }, 1900);
            }
        }
        for(let i = 1; i <= 19; i++) {
            setTimeout(() => {
                divList[num].style.backgroundPosition = `-100% ${i * -100}%`;
            }, i * 100 + 2100);
        }
        setTimeout(() => {divList[num].style.display = "none";}, 4000);
    }
</script>

<hr>

希望对自己，对别人都有帮助！

<!-- https://ncase.me/trust/ -->
