---
title: Git 的连接 Github 小记
date: 2023-08-13 17:23:21 +08:00
tags: Git
categories: Programming
---

又是一个随记，方便自己使用的。  
首先，得到 [官网下载](https://git-scm.com/downloads)，随后测试一下：

```bash
$ git -v
git version (VERSION)
```

就下载好了。
<!--more-->
## 使用 SSH 连接 Github

首先确保拥有一个 Github 账号，打开终端，生成 SSH 密钥：

```bash
$ ssh-keygen -t rsa -C "email"
```

它的提示全部回车就可以了。"email" 是 Github 注册使用的邮箱地址。

成功后会在用户文件夹（Windows 下通常是 `%USERPROFILE%` 环境变量，Linux 直接打开 `~/`）下生成一个 `.ssh` 文件夹，打开 `id_rsa.pub` 文件，复制里面的密钥后回到 Github 打开设置，找到 "**SSH anf PGP keys**" 一栏，点击 "New SSH key"，Title 填上，将刚刚复制的密钥粘贴到 "Key" 一栏，点击 "Add SSH key" 保存。

![git-github](https://src-jywon.pages.dev/img/blog/git-github/1.png)

随后可以验证是否完成，打开终端输入：

```bash
$ ssh -T git@github.com
The authenticity of host 'github.com (IP ADDRESS)' can't be established.
RSA key fingerprint is (FINGERPRINT).
Are you sure you want to continue connecting (yes/no)? yes #在这里输入 yes
Hi (USER NAME)! You've successfully authenticated, but GitHub does not provide shell access. #连接成功
```

## 连接 Github 仓库
新建 Github 仓库。在电脑新建一个文件夹，创建一些文件，然后打开终端：

```bash
$ git init
Initialized empty Git repository in /.git/

$ git add (FILE NAME) #你可以不断 add，也可以直接 git add .
create mode 100644 (FILE NAME)

$ git commit -m "The commit information" #建议 commit 信息用英文写详细，养成好习惯

$ git branch -M main #现在的 Github 默认为 main 分支

$ git remote add origin git@github.com:(USER NAME)/(REPOSITORY NAME).git #改成自己的用户名和仓库名

$ git push -u origin main
Enumerating objects: 7735, done.
Counting objects: 100% (7735/7735), done.
Delta compression using up to 4 threads
Compressing objects: 100% (7413/7413), done.
Writing objects: 100% (7735/7735), 55.74 MiB | 1.53 MiB/s, done.
Total 7735 (delta 2030), reused 0 (delta 0), pack-reused 0      
remote: Resolving deltas: 100% (2030/2030), done.
To github.com:(USER NAME)/(REPOSITORY NAME).git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

打开 Github，可以看到 Commit 记录和提交的文件。
