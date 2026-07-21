---
title: Github 仓库与 Glitch同步 
date: 2025-03-09 21:40:36 +08:00
updated: 2026-06-21 21:30:27 +08:00
categories: Programming
tags: Git
---

:::note{.danger} Glitch 好像要关了?……

详见这篇[官方公告](https://blog.glitch.com/post/changes-are-coming-to-glitch)，和[讨论](https://support.glitch.com/t/discussion-thread-project-hosting-ending-july-8/75660)。官方也说得模棱两可的。  
因此这篇文章可能会在 2025 年 7 月 8 日过时。请注意不要再在 Glitch 上部署新项目。

这篇文章好像又要没用了。  
为什么好像我用什么东西部署我的网站，什么东西不久就要关闭？先是 [Deta space](/posts/waline-set/)，再是 Glitch。  
我的留言板、博客又要进行痛苦的迁移了……

:::

由于 Github Pages 实在太慢，我的很多东西都迁移到功能和速度都更好的 Glitch 上。如你所见。  
Glitch 项目也是一个 Git Repository，可以 push。这里利用 Github Actions，使用 [wei/git-sync](https://github.com/wei/git-sync) 项目，进行落实。

参考 [https://support.glitch.com/t/automating-deployment-from-github-how-to/64642](https://support.glitch.com/t/automating-deployment-from-github-how-to/64642)。

<!--more-->

## Glitch 方面

打开项目的控制台，依次输入下列语句：

```bash
git config receive.denyCurrentBranch ignore

cat << EOF > .git/hooks/post-receive
unset GIT_INDEX_FILE
git --work-tree=/app --git-dir=/app/.git checkout -f
refresh
EOF

chmod u+x .git/hooks/post-receive
```

就是让 git 在收到 force push 的时候接受并且刷新项目。

## Github 方面

新建 `.github/workflows/sync.yml` 文件（其实文件名可以随便），添加如下内容：

:::note{.warning} Glitch 默认分支变更

现在的 Glitch 新建项目默认分支 `master` 好像变成了 `main`，老项目不用改，但新项目要把 `destination_branch` 改成 `main`。

:::

```yml
name: Glitch Sync

on:
  push:
    branches:
      - main # 改成你要推送的分支

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Glitch Project
        uses: wei/git-sync@v3
        with:
          source_repo: https://${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}.git
          source_branch: main # 改成你要推送的分支
          destination_repo: ${{ secrets.GLITCH_GIT_URL }}
          destination_branch: main # 最好在项目的控制台中看看 git branch 是什么，一般来说默认是 main，不用改
```

### Hexo 问题

如果是 Hexo 博客，你要在 `source` 下进行操作（即在 `source` 下建立 `.github/workflows/sync.yml`），并且在总的 `_config.yml` 中把这些改成：

```yml
skip_render: .github/**/*
include: .github/**/*
```
