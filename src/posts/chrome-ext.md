---
title: 更改 Edge 新标签页 —— 简单浏览器扩展
date: 2024-03-02 17:13:45
categories: Programming
tags: JavaScript
---

这是记录写简单的一个 Chomium 扩展的一篇文章。  
主要是用扩展覆盖~~万恶的 Edge 的~~默认标签页，随后 HTML 引用 JS 进行（模拟）重定向到 chrome-search://local-ntp/local-ntp.html。

<!--more-->

## 开始
浏览器扩展都需要 **manifest.json** 文件。先新建一个文件夹，在里面添加了这个文件。

由于需要覆盖新标签页，需要 [`chrome_url_overrides.newtab`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/chrome_url_overrides) 属性。它可以覆盖新的标签页，指定为扩展（文件夹）内的 HTML 文件（不能使用第三方 URL）。  
随后还需要增加必要的值：`name`，`version` 和 `manifest_version`。它们分别对应扩展显示的名字，显示的版本和 manifest 的版本，manifest 的版本填 3 就可以了。

最终，manifest.json 是这样的：

```json
{
    "name": "Change Newtab",
    "description": "自己（JoyWonderful）弄的一个重定向新标签页的东西啦。",
    "version": "0.1",
    "manifest_version": 3,
    "chrome_url_overrides": {
        "newtab": "chntp.html"
    }
}
```

## 重定向
随后，开始写 chntp.html 的内容。由于需要（模拟）重定向，还需要再写一个 JavaScript 文件，命名为 chp.js。  
由于想重定向到的 chrome-search://local-ntp/local-ntp.html 是本地文件，不可以直接将 `window.location.href` 直接更改为它，只能使用扩展的 API [`chrome.tabs.create`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/create) 新建一个指向它的标签页。随后用 `window.close()` 关闭自身标签页。

chp.js 的代码是这样的：

```javascript
chrome.tabs.create({url:"chrome-search://local-ntp/local-ntp.html"});
window.opener = null;
window.close();
```

chntp.html 是这样的：

```html
<html lang="en">
    <head>
        <title>Changing page...</title>
        <meta charset="utf-8">
    </head>
    <body>
        <script src="chp.js"></script>
    </body>
</html>
```

## 导入这个扩展到浏览器
Edge 是这样的，Chrome 也基本一样。
进入到浏览器[扩展界面](about:extensions)，打开“开发人员模式”，点击“加载解压缩的扩展”，选择一开始新建的扩展文件夹就可以了。

如果没问题，新建标签页会跳到 chrome-search://local-ntp/local-ntp.html。（标签页会闪一下）

## 后面的废话
自己写一个简单扩展的原因是 Edge 默认的新标签页太离谱了些，默认是[这样](#edgentp)的<del>（很好奇微软中国怎么也搞什么传奇“开局领礼包”的广告了）</del>。这时打开 DevTools，可以发现 `window.location.href` 指向 [https://ntp.msn.cn/edge/ntp](https://ntp.msn.cn/edge/ntp)。即使可以设置把那一大堆花里胡哨的东西关掉，但它还是要加载第三方资源，存奇怪的缓存和其他东西用了 [十几 MiB](#ntpstroage)。  
Edge 在断网的时候其实有个[干净的标签页](#localntp)，实际是 [chrome-search://local-ntp/local-ntp.html](chrome-search://local-ntp/local-ntp.html)，所以就想用这个新标签页。

随后，我准备把新标签页换掉。欣喜地发现设置改不了新标签页。研究了半天发现浏览器扩展可以改新标签页，随后又进行很多奇奇怪怪的试错才成功运行的。

~~因为想搞贡献点~~，把它传到了[**个人仓库**](https://github.com/JoyWonderful/JoyWonderful/tree/main/change-ntp)里。那个扩展名为 crx 的是打包后的扩展，可以删。

原本这篇文章想上周发的，但因颓废，搁了。。。

<hr>

**图片们：**
{% cdnimg edgentp, edgentp.jpg, id="edgentp"; loading="lazy" %}
{% cdnimg ntpstroage, ntpstorage.png, id="ntpstroage"; loading="lazy" %}
{% cdnimg localntp, localntp.png, id="localntp"; loading="lazy" %}