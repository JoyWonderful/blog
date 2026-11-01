---
title: Arch Linux 的线性安装流程
categories: Programming
tags:
  - Linux
  - 终端
date: 2026-10-24 22:32:23 +08:00
license: GFDL-1.3-or-later
license_reason: | 
  文章有内容引用自 [Arch Linux Wiki](https://wiki.archlinuxcn.org/)，文章使用 GFDL 进行授权，要求使用相同许可。  
  感谢社区贡献者的付出。
---

最近安装了 Arch Linux。所以把**线性**的安装流程记录在这里。

:::note{.info} 本文的记录性质

与 [Wiki 上的安装指南](https://wiki.archlinuxcn.org/wiki/Installation_Guide) 不同，本文更偏向于记录自己的安装流程。  
而且，与 Wiki 用超链接指向其他流程不同，本文流程按操作顺序记录。

:::

<!--more-->
提示
## 安装前期准备

### 下载与准备安装介质

你可以根据 [Arch 的官方网站](https://archlinux.org/download/#:~:text=China)下载并校验镜像。  
当然，在[新版的 MirrorZ](https://mirrors.cernet.edu.cn/os/archlinux)找**中国镜像站**下载更方便一些。推荐 **USTC** 和 **NJU** 这两个镜像站。**NYIST** 和 **ZJU** 也不错。

创建安装介质的话，推荐使用 [Ventoy](https://www.ventoy.net/)，可以避免反复格式化 U 盘。Windows 上，你想使用 [Rufus](https://rufus.ie/zh) 写镜像也行。这里就不多说了。

随后，重启电脑并引导 ISO 镜像文件。应该会看到这个：

```ansi
To install [38;2;23;147;209mArch Linux[0m follow the installation guide:
https://wiki.archlinux.org/title/Installation_guide

For Wi-Fi, authenticate to the wireless network using the [35miwctl[0m utility.
For mobile broadband (WWAN) modems, connect with the [35mmmcli[0m utility.
Ethernet, WLAN and WWAN interfaces using DHCP should work automatically.

After connecting to the internet, the installation guide can be accessed
via the convenience script [35mInstallation_guide[0m.

[31m█[31m█[31m█[30m█[34m█[30m█[31m█[36m█[35m█[31m█[36m█[33m█[31m█[34m█[35m█[30m█[34m█[30m█[31m█[34m█[31m█[31m█[36m█[32m█[31m█[34m█[33m█[31m█[35m█[30m█[30m█[34m█[30m█[31m█[34m█[32m█[31m█[36m█[34m█[31m█[36m█[37m█[0m

[1;91mroot[0m@archiso: ~ [1;94m#[0m
```

### 调整控制台字体

一开始，字体肯定很小。终端字体在 `/usr/share/kbd/consolefonts` 下。*运行* `setfont <font>`。通常使用的字体名（或者说，*不同的 Terminus 字体大小*）有 `ter-120b`, `ter-122b`, `ter-124b`, `ter-128b`, `ter-132b`。  
多试试，把字体调整到觉得舒服的大小。

### 连接网络

:::note{.warning} 假定引导模式

以下假设系统**以 UEFI 模式引导且使用 64 位 x64 UEFI**。

:::

随后，检查网络连接。*运行* `ip link`，列出可用的网络接口。示例输出：

```ansi
1: [1;96mlo: [0m<LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback [1;93m00:00:00:00:00:00[0m brd [1;93m00:00:00:00:00:00[0m
2: [1;96mwlo1: [0m<BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state [1;92mUP [0mmode DORMANT group default qlen 1000
    link/ether [1;93mec:2e:98:ab:cf:05[0m brd [1;93mff:ff:ff:ff:ff:ff[0m
    altname wlp1s0
    altname wlxec2e98abcf05
```

如果你**连接了有线以太网**，那么应该会找到一个以“en”开头的网络接口，并且处于绿色的“UP”状态。那么可以继续下一步。  
如果你使用**无线网络**，那么会找到一个以“wl”开头的网络接口，处于红色的“DOWN”状态。那么需要配置无线网。

:::details{@open} 配置无线网络

由于 Arch 官方 ISO 映像[包含的软件包](https://mirrors.cernet.edu.cn/archlinux/iso/latest/arch/pkglist.x86_64.txt)中网络管理器只安装了 `iwd`，所以只能使用 `iwctl` CLI 进行无线连接。

1. *运行* `iwctl device list`，查看可用的无线网络设备（可能是 `wlan0`，以下以它为例）。  
2. *运行* `iwctl station wlan0 scan`，`iwctl station wlan0 get-networks`，应该列出了附近的 Wi-Fi 和信号强度。  
3. *运行* `iwctl station wlan0 connect <ssid>`，其中 `<ssid>` 是你想连接的 Wi-Fi 名称。输入密码后，应该就完成了。

随后，再次*运行* `ip link`，红色的“DOWN”应该变成了绿色的“UP”。还可以 `ping` 任意网址测试网络连通性。

:::

:::note{.success} 一种查看安装指南的方法

连接好网络后，就可以边看 Wiki 边进行操作了。多开几个 tty，就好像“**虚拟桌面**”一样。

按下 `Ctrl`+`Alt`+`F<n>`（`F<n>` 是 `F1`，`F2`，`F3`…），即可在多个控制台（tty）间切换。  
一开始登录的应该是 tty1。现在可以按下 `Ctrl`+`Alt`+`F2`，切换到 tty2，*运行* `Installation_guide`，即可使用 *Lynx* 打开英文 Arch Wiki 里的安装指南。再按 `Ctrl`+`Alt`+`F1` 就可以回到安装进程。

不要尝试打开中文 Arch Wiki，**tty 无法显示中文的**。

:::

### 磁盘分区

:::note{.warning} 注意数据备份

即使是**目的不是破坏性的**磁盘操作也会有概率损坏数据。  
在安装任何系统前，都应该做好备份。

:::

1. *运行* `lsblk` 查看磁盘（可以根据大小判断）。随后，*运行* `cfdisk /dev/<device name>` 在图形化的 TUI 里分区。还请参见 [Wiki 上的分区示例](https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97#%E5%88%86%E5%8C%BA%E6%96%B9%E6%A1%88%E7%A4%BA%E4%BE%8B)。
2. *运行*分区对应类型的 `mkfs`（例如 `mkfs.ext4`, `mkfs.fat`, `mkswap`）来格式化分区。
3. *运行* `mount /dev/<partition> <mount point>` 来挂载分区。*运行* `swapon /dev/<swap partition>` 来启用交换空间分区。
4. 确定一切无误后，*运行* `genfstab -U /mnt > /mnt/etc/fstab` 来生成 fstab 配置文件。建议检查一下是否无误。

::::details 运行示例

```ansi
[1;94m#[0m lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
nvme0n1     259:0    0 476.9G  0 disk
[1;94m#[0m cfdisk /dev/nvme0n1
```

:::details cfdisk 的使用说明

一开始可能会让你选择分区表类型。一般来说，现代硬件*选择*“GPT”。

- 如果有原来系统的分区，不想弄双系统的话，用“[DELETE]”删除所有分区就可以了。
- 用“[NEW]”新建分区。此时会提示指定大小。
- 用“[TYPE]”更改分区类型。
- 完成所有后，用“[WRITE]”写入分区表，并且用“[QUIT]”退出。

:::

:::details TUI 呈现与我的分区方案

```ansi
                                         [1mDisk: /dev/nvme0n1[0m
                      Size: 476.94 GiB, 512110190592 bytes, 1000215216 sectors
                    Label: gpt, identifier: C62954AB-A636-4BB8-B19A-D4777598BF5F

[1m    Device                     Start             End        Sectors       Size Type[0m
[7m>>  /dev/nvme0n1p1              2048         2203647        2201600         1G EFI System           [0m
    /dev/nvme0n1p2           2203648       539074559      536870912       256G Linux filesystem
    /dev/nvme0n1p3         539074560       973185023      434110464       207G Linux filesystem
    /dev/nvme0n1p4         973185024      1000214527       27029504      12.9G Linux swap


 ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ Partition name: boot                                                                           │
 │ Partition UUID: 4EBB8F70-A742-4A0C-B1C5-ED58C6F8CA46                                           │
 │ Partition type: EFI System (C12A7328-F81F-11D2-BA4B-00A0C93EC93B)                              │
 │Filesystem UUID: A7F4-F477                                                                      │
 │     Filesystem: vfat                                                                           │
 └────────────────────────────────────────────────────────────────────────────────────────────────┘
         [ Delete ]  [ Resize ]  [7m[  Quit  ][0m  [  Type  ]  [  Help  ]  [  Write ]  [  Dump  ]
                                [1mQuit program without writing changes[0m
```

:::

<!--这里应该继续 mkfs, mount 等演示流程-->

::::