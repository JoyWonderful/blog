---
title: Git 的连接 Github 小记
date: 2023-08-13 17:23:21 +08:00
tags: Git
categories: Programming
---

又是一个随记，方便自己使用的。  
首先，得到 [官网下载](https://git-scm.com/downloads)，随后测试一下：

```ansi
[1;94m$[0m git -v
git version [35m<VERSION>[0m
```

就下载好了。
<!--more-->
## 使用 SSH 连接 Github

首先确保拥有一个 Github 账号，打开终端，生成 SSH 密钥：

```ansi
[1;94m$[0m ssh-keygen -t rsa -C "[35m<email>[0m"
```

它的提示全部回车就可以了。\<email\> 是 Github 注册使用的邮箱地址。

成功后会在用户文件夹（Windows 下通常是 `%USERPROFILE%` 环境变量，Linux 直接打开 `~/`）下生成一个 `.ssh` 文件夹，打开 `id_rsa.pub` 文件，复制里面的密钥后回到 Github 打开设置，找到 "**SSH anf PGP keys**" 一栏，点击 "New SSH key"，Title 填上，将刚刚复制的密钥粘贴到 "Key" 一栏，点击 "Add SSH key" 保存。

![git-github](/images/git-github/1.webp)

随后可以验证是否完成，打开终端输入：

```ansi
[1;94m$[0m ssh -T git@github.com
The authenticity of host 'github.com [35m<IP ADDRESS>[0m' can't be established.
RSA key fingerprint is [35m<FINGERPRINT>[0m.
Are you sure you want to continue connecting (yes/no)? yes [3;32m#在这里输入 yes[0m
Hi [35m<USER NAME>[0m! You've successfully authenticated, but GitHub does not provide shell access. [3;32m#连接成功[0m
```

## 连接 Github 仓库
新建 Github 仓库。在电脑新建一个文件夹，创建一些文件，然后打开终端：

```ansi
[1;94m$[0m git init
Initialized empty Git repository in /.git/

[1;94m$[0m git add [35m<FILE NAME> [3;32m#你可以不断 add，也可以直接 git add .[0m
create mode 100644 [35m<FILE NAME>[0m

[1;94m$[0m git commit -m "The commit information" [3;32m#建议 commit 信息用英文写详细，养成好习惯[0m

[1;94m$[0m git branch -M main [3;32m#现在的 Github 默认为 main 分支[0m

[1;94m$[0m git remote add origin git@github.com:(USER NAME)/(REPOSITORY NAME).git [3;32m#改成自己的用户名和仓库名[0m

[1;94m$[0m git push -u origin main
Enumerating objects: 7735, done.
Counting objects: 100% (7735/7735), done.
Delta compression using up to 4 threads
Compressing objects: 100% (7413/7413), done.
Writing objects: 100% (7735/7735), 55.74 MiB | 1.53 MiB/s, done.
Total 7735 (delta 2030), reused 0 (delta 0), pack-reused 0      
remote: Resolving deltas: 100% (2030/2030), done.
To github.com:[35m<USER NAME>[0m/[35m<REPOSITORY NAME>[0m.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

打开 Github，可以看到 Commit 记录和提交的文件。
