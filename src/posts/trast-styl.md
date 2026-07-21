---
title: 样式过渡动画
date: 2024-03-17 09:13:44 +08:00
tags: CSS
categories: Programming
---

一些可以用到 `:hover` 状态上的样式过渡。

以下的效果主要是通过 **伪元素** 实现的。感觉麻烦，直接加上 `transition: all .4s ease-in-out`。把下面那些记在这儿是方便自己以后用。<del>“感觉麻烦...”这句话也是给自己看的（逃</del>

<!--more-->

## 下划线
这里的样式过渡适用于**从无下划线到有下划线**的样式过渡。

### 淡入淡出
这里更改下划线的颜色，或者说是 `border-bottom-color`。因为直接设置过渡 `border` 不会有效果。

<style>
    .post-body span.egunlcolor {
        border-bottom: 1px solid transparent;
        cursor: pointer;
        transition: border-bottom-color .2s;
    }
    .post-body span.egunlcolor:hover {
        border-bottom-color: #555;
    }
</style>

代码比较简单：

```css
span { /* 这里的选择器改成要用的元素，所有的状态、颜色和数值也是，下同 */
    border-bottom: 1px solid transparent;
    transition: border-bottom-color .2s;
}
span:hover {
    border-bottom-color: #555;
}
```

<span class="egunlcolor">鼠标放在这里，效果就是这个样子</span>

### 从某个方向出现
这里更改下划线（伪元素）的长度，或者说是 `transform:scaleX()`。

<style>
    .post-body div.egunderline span {
        margin-bottom: 5px;
        cursor: pointer;
        position: relative;
    }
    .post-body div.egunderline span::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background-color: #555;
        transform: scaleX(0);
        transform-origin: inherit;
        transition: transform .2s;
    }
    .post-body div.egunderline span:hover::before {
        transform: scaleX(1);
    }
    .post-body div.egunderline span#egleftirighto:hover::before {
        transform-origin: left;
    }
</style>

代码是这样的：

```css
span {
    margin-bottom: 5px;
    position: relative;
}
span::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #555;
    transform: scaleX(0);
    transform-origin: right; /* , center, left */ /* 更改这里可以把动画的位置改变 */
    transition: transform .2s;
}
span:hover::before {
    transform: scaleX(1);
    /* transform-origin: left; */ /* 上一处设为 right  这里设为 left  有左进右出的效果 */
}
```

效果：

<div class="egunderline" style="margin-bottom:20px;">
    <span style="transform-origin:left;">下划线从<strong>左</strong>出现：<code>transform-origin:left;</code></span><br>
    <span style="transform-origin:center;">下划线从<strong>中间</strong>出现：<code>transform-origin:right;</code></span><br>
    <span style="transform-origin:right;">下划线从<strong>右</strong>出现：<code>transform-origin:right;</code></span><br>
</div>

还可以把未触发状态下的 `transform-origin` 与触发状态下的值分别改成 `left` 和 `right`，像这样子：

<div class="egunderline" style="margin-bottom:20px;"><span style="transform-origin:right;" id="egleftirighto">左边出现，右边消失&ensp;的效果</span></div>

## 下划线上升到背景色
比较适用于链接。其实是通过 `box-shadow` 的 `inset` 和 y偏移量 实现的。

代码是：

```css
.post-body span.egultobg {
    box-shadow: inset 0px -1px 0 0 #555;
    transition: box-shadow .2s, color .2s;
}
.post-body span.egultobg:hover {
    box-shadow: inset 0px -1lh 0 0 #555; /* 注意：lh 单位一些浏览器还不支持 */
    color: #eee;
}
```

<style>
    .post-body span.egultobg {
        box-shadow: inset 0px -1px 0 0 #555;
        transition: box-shadow .2s, color .2s;
        cursor: pointer;
    }
    .post-body span.egultobg:hover {
        box-shadow: inset 0px -1.5em 0 0 #555;
        color: #eee;
    }
</style>

<span class="egultobg">下划线上升为背景色</span>

## 模拟按钮

就是加上一些 `box-shadow` 和 `padding` 啦。代码：

```css
button.egprsbtn {
    --egprs-bgcolor: #fff;
    --egprs-color: #555;
    --egprs-hvbgc: #eee;
    --egprs-btnhei: 4px;
    cursor: pointer;
    padding: 15px 15px calc(15px + var(--egprs-btnhei)) 15px;
    border-radius: 8px;
    border: 2px solid var(--egprs-color);
    color: var(--egprs-color);
    background-color: var(--egprs-bgcolor);
    box-shadow: 0 var(--egprs-btnhei) 0 0 var(--egprs-color);
    transition: transform .2s, color .2s, box-shadow .2s, background-color .2s;
}
button.egprsbtn:hover {
    background-color: var(--egprs-hvbgc);
}
button.egprsbtn:active {
    color: var(--egprs-bgcolor);
    background-color: var(--egprs-color);
    box-shadow: none;
    transform: translateY(var(--egprs-btnhei))
}
```

<style>
    button.egprsbtn {
        --egprs-bgcolor: #fff;
        --egprs-color: #555;
        --egprs-hvbgc: #eee;
        --egprs-btnhei: 4px;
        cursor: pointer;
        padding: 15px 15px calc(15px + var(--egprs-btnhei)) 15px;
        border-radius: 8px;
        border: 2px solid var(--egprs-color);
        color: var(--egprs-color);
        background-color: var(--egprs-bgcolor);
        box-shadow: 0 var(--egprs-btnhei) 0 0 var(--egprs-color);
        transition: transform .2s, color .2s, box-shadow .2s, background-color .2s;
    }
    button.egprsbtn:hover {
        background-color: var(--egprs-hvbgc);
    }
    button.egprsbtn:active {
        color: var(--egprs-bgcolor);
        background-color: var(--egprs-color);
        box-shadow: none;
        transform: translateY(var(--egprs-btnhei))
    }
</style>

<button class="egprsbtn">按钮的样式</button>
