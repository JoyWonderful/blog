---
title: CSS 鼠标悬浮窗口效果
date: 2023-11-12 11:45:14 +08:00
tags: 
    - HTML
    - CSS
categories: Programming
---

最近弄的 github 卡片，弄了半天弄出来的鼠标悬浮显示文字的效果。使用 CSS 伪元素弄出来的小提示。但是不适合 `overflow: hidden;` 的元素。不管怎么说，还是很好用的，忘掉了就不太好，也就放到博客里来了。

<!--more-->

| 代码 | 效果 |
| :--- | :--- |
| `<span aria-label="左边提示" balloon-shown="left">鼠标</span>` | <span aria-label="左边提示" balloon-shown="left">鼠标</span> |
| `<span aria-label="右边提示" balloon-shown="right">悬浮</span>` | <span aria-label="右边提示" balloon-shown="right">悬浮</span> |
| `<span aria-label="上边提示" balloon-shown="up">文字</span>` | <span aria-label="上边提示" balloon-shown="up">文字</span> |
| `<span aria-label="上边提示" balloon-shown="down">提示</span>` | <span aria-label="下边提示" balloon-shown="down">提示</span> |

<style>
    [aria-label][balloon-shown] {
        position: relative;
    }
    [aria-label][balloon-shown="left"]::before {
        border: 5px solid transparent;
        border-left-color: #202335;
    }
    [aria-label][balloon-shown="right"]::before {
        border: 5px solid transparent;
        border-right-color: #202335;
    }
    [aria-label][balloon-shown="up"]::before {
        border: 5px solid transparent;
        border-top-color: #202335;
    }
    [aria-label][balloon-shown="down"]::before {
        border: 5px solid transparent;
        border-bottom-color: #202335;
    }
    [aria-label][balloon-shown]::before {
        width: 0;
        height: 0;
        /* pointer-events: none; */ /* 让鼠标无法悬浮在所弹出的伪元素上 */
        z-index: 10;
        content: "";
        position: absolute;
        opacity: 0;
        visibility: hidden;
        transition: opacity .4s, transform .4s, visibility .4s;
    }
    [aria-label][balloon-shown]::after {
        opacity: 0;
        z-index: 10;
        /* pointer-events: none; */ /* 让鼠标无法悬浮在所弹出的伪元素上 */
        visibility: hidden;
        background-color: #202335;
        content: attr(aria-label);
        white-space: nowrap;
        border-radius: 2px;
        position: absolute;
        padding: .5em 1em;
        transition: opacity .4s, transform .4s, visibility .4s;
        color: #eee;
    }
    [aria-label][balloon-shown]:hover::after, [aria-label][balloon-shown]:hover::before {
        opacity: 0.9;
        visibility: visible;
    }
    [aria-label][balloon-shown="left"]::after {
        margin-right: 10px;
    }
    [aria-label][balloon-shown="left"]::after, [aria-label][balloon-shown="left"]::before {
        right: 100%;
        top: 50%;
        transform: translate(5px, -50%);
    }
    [aria-label][balloon-shown="right"]::after {
        margin-left: 10px;
    }
    [aria-label][balloon-shown="right"]::after, [aria-label][balloon-shown="right"]::before {
        left: 100%;
        top: 50%;
        transform: translate(-5px, -50%);
    }
    [aria-label][balloon-shown="left"]:hover::after, [aria-label][balloon-shown="left"]:hover::before, [aria-label][balloon-shown="right"]:hover::after, [aria-label][balloon-shown="right"]:hover::before {
        transform: translate(0, -50%);
    }
    [aria-label][balloon-shown="up"]::after {
        margin-bottom: 10px;
    }
    [aria-label][balloon-shown="up"]::after, [aria-label][balloon-shown="up"]::before {
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, 5px);
    }
    [aria-label][balloon-shown="down"]::after {
        margin-top: 10px;
    }
    [aria-label][balloon-shown="down"]::after, [aria-label][balloon-shown="down"]::before {
        left: 50%;
        top: 100%;
        transform: translate(-50%, -5px);
    }
    [aria-label][balloon-shown="up"]:hover::after, [aria-label][balloon-shown="up"]:hover::before, [aria-label][balloon-shown="down"]:hover::after, [aria-label][balloon-shown="down"]:hover::before {
        transform: translate(-50%, 0);
    }
</style>

:::details 代码是这样的

```css
[aria-label][balloon-shown] {
    position: relative;
}
[aria-label][balloon-shown="left"]::before {
    border: 5px solid transparent;
    border-left-color: #202335;
}
[aria-label][balloon-shown="right"]::before {
    border: 5px solid transparent;
    border-right-color: #202335;
}
[aria-label][balloon-shown="up"]::before {
    border: 5px solid transparent;
    border-top-color: #202335;
}
[aria-label][balloon-shown="down"]::before {
    border: 5px solid transparent;
    border-bottom-color: #202335;
}
[aria-label][balloon-shown]::before {
    width: 0;
    height: 0;
    /* pointer-events: none; */ /* 让鼠标无法悬浮在所弹出的伪元素上 */
    z-index: 10;
    content: "";
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: opacity .4s, transform .4s, visibility .4s;
}
[aria-label][balloon-shown]::after {
    opacity: 0;
    z-index: 10;
    /* pointer-events: none; */ /* 让鼠标无法悬浮在所弹出的伪元素上 */
    visibility: hidden;
    background-color: #202335;
    content: attr(aria-label);
    white-space: nowrap;
    border-radius: 2px;
    position: absolute;
    padding: .5em 1em;
    transition: opacity .4s, transform .4s, visibility .4s;
    color: #eee;
}
[aria-label][balloon-shown]:hover::after, [aria-label][balloon-shown]:hover::before {
    opacity: 0.9;
    visibility: visible;
}
[aria-label][balloon-shown="left"]::after {
    margin-right: 10px;
}
[aria-label][balloon-shown="left"]::after, [aria-label][balloon-shown="left"]::before {
    right: 100%;
    top: 50%;
    transform: translate(5px, -50%);
}
[aria-label][balloon-shown="right"]::after {
    margin-left: 10px;
}
[aria-label][balloon-shown="right"]::after, [aria-label][balloon-shown="right"]::before {
    left: 100%;
    top: 50%;
    transform: translate(-5px, -50%);
}
[aria-label][balloon-shown="left"]:hover::after, [aria-label][balloon-shown="left"]:hover::before, [aria-label][balloon-shown="right"]:hover::after, [aria-label][balloon-shown="right"]:hover::before {
    transform: translate(0, -50%);
}
[aria-label][balloon-shown="up"]::after {
    margin-bottom: 10px;
}
[aria-label][balloon-shown="up"]::after, [aria-label][balloon-shown="up"]::before {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 5px);
}
[aria-label][balloon-shown="down"]::after {
    margin-top: 10px;
}
[aria-label][balloon-shown="down"]::after, [aria-label][balloon-shown="down"]::before {
    left: 50%;
    top: 100%;
    transform: translate(-50%, -5px);
}
[aria-label][balloon-shown="up"]:hover::after, [aria-label][balloon-shown="up"]:hover::before, [aria-label][balloon-shown="down"]:hover::after, [aria-label][balloon-shown="down"]:hover::before {
    transform: translate(-50%, 0);
}
```

:::

使用时这样使用：
```html
<标签 aria-label="文字" balloon-shown="up"或"down"或"left"或"right">文字</标签>
```

