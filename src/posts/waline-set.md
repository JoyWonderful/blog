---
title: Waline 评论加入记录
date: 2024-02-05 15:53:18 +08:00
updated: 2026-07-04 16:09:32 +08:00
tags: JavaScript
categories: Programming
---

:::note{.danger} Deta space 已经关闭

Deta 官方已经把 space 关闭了，着手开发 [surf](https://deta.surf/)（好像是一个 AI 浏览器）。不能再使用 Deta，所以本篇文章的 [服务端](#服务端) 部分已经没有意义。  
[留言板](/guestbook) 部分已经换用 Twikoo，使用 glitch 部署。

附：现在又换回 waline(sodesu frontend) 了。

:::

看了看“[归档](/archives)”页面才发现自己没有在 2024 **发布**过文章。最近寒假作业写累了（思维导图太烦啦），就更新了下留言板，从 [giscus](https://giscus.app/zh-CN) 换成了 [waline](https://waline.js.org)，不用登录就可以留言了，管理也更方便。  

<!--more-->

## 服务端
按照官方文档，我注册了 [LeanCloud](https://console.leancloud.app/register) **国际版** 账号（华东或华北节点需要备案域名，可我没有钱买域名）。随后点击“创建应用”，填写应用名称（计费方式选择“开发版”）。  
创建应用完毕后依次点击 `设置  ->  应用凭证`，三个 KEY 等下要使用。

随后我选择了 [DetaSpace](https://deta.space/signup) 部署。注册账号，随后[下载 Waline 应用](https://deta.space/discovery/@lizheming/waline)，点击“Install on Space”等待完成。随后返回首页，点击底部任务栏 deta 图标呼出菜单，依次点击 `Add Card to Horizon  ->  Installed App  ->  Waline`。  
鼠标悬浮到新增加的卡片上，点击灰色的 deta 图标点击 “Open Settings”，点击“Configuration”选项卡，将 LeanCloud 中 `AppID`, `AppKey`, `MasterKay` 依次加入到 `LEAN_ID`, `LEAN_KEY`, `LEAN_MASTER_KEY` 中。滑动到底部点击“Save Changes”。服务端完成。

可以通过“Configuration”中 `GRAVATAR_STR` 更改用户默认头像。更改 `DISABLE_REGION` `DISABLE_USERAGENT` 为 true 隐藏评论下方用户代理和位置。

鼠标悬浮到卡片上，点击右上角“Waline”及其徽标，在 url 后增加 `/ui/register`，也就是 `https://waline-x-xxxxxxx.deta.app/ui/register`，注册一个账号成为管理员，就可以点击“管理”选项卡管理用户和评论了。

:::note{.info} 直接使用

不需要 LeanCloud，直接将 Waline 部署到 DetaSpace 上，Waline 会自动将数据存储到 DetaBase 里。  
点击灰色的 deta 图标，选择 `View App Data -> Base` 选项卡，这里就是 Waline 直接存储的数据。

:::

## 客户端
通过 CDN 引入 [waline.js](https://cdnjs.cloudflare.com/ajax/libs/waline/2.15.8/waline.js) 和 [waline.css](https://cdnjs.cloudflare.com/ajax/libs/waline/2.15.8/waline.css)，在想加入评论框的页面引入。  
新增 script 标签，可参考：

```javascript
import '/comments/waline.js';
    
Waline.init({
    el: "#waline",
    path: location.pathname,
    lang: "zh-CN",
    serverURL: "https://yoursite.deta.app",
    locale: { /* 自己更改 */
        admin: "管理员",
        login: "管理员登录",
        placeholder: "友善的评论会收获更多美好",
    },
});
```