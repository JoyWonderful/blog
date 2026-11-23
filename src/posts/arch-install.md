---
title: Arch Linux 的线性安装流程
categories: Programming
tags:
  - Linux
  - 终端
date: 2026-11-03 22:32:23 +08:00
license: GFDL-1.3-or-later
license_reason: | 
  文章有内容引用自 [Arch Linux Wiki](https://wiki.archlinuxcn.org/)，文章使用 GFDL 进行授权，要求使用相同许可。  
  感谢社区贡献者的付出。
draft: true
---

最近安装了 Arch Linux。所以把**线性**的安装流程记录在这里。

:::note{.info} 本文的记录性质

与 [Wiki 上的安装指南](https://wiki.archlinuxcn.org/wiki/Installation_Guide) 不同，本文更偏向于记录自己的安装流程。  
而且，与 Wiki 用超链接指向其他流程不同，本文流程按操作顺序记录。

:::

<!--more-->

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
4. ~~确定一切无误后，*运行* `genfstab -U /mnt > /mnt/etc/fstab` 来生成 fstab 配置文件。建议检查一下是否无误。~~**这一步等安装完基本系统后再做。**

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

**按照上面的分区方案进行的格式化与挂载**：

```ansi
[1;94m#[0m mkfs.fat -F 32 /dev/nvme0n1p1 [3;32m# 这是 EFI 系统分区，可使用 -n 指定卷标，使用 fatlabel 更改卷标[0m
[1;94m#[0m mkfs.ext4 /dev/nvme0n1p2 [3;32m# 根分区，可使用 -L 指定卷标，使用 e2label 更改卷标[0m
[1;94m#[0m mkfs.ext4 /dev/nvme0n1p3 [3;32m# 用户目录分区[0m
[1;94m#[0m mkswap /dev/nvme0n1p4 [3;32m# 交换空间，可使用 -L 指定卷标，使用 swaplabel 更改卷标[0m
[3;32m# 注意挂载顺序[0m
[1;94m#[0m mount /dev/nvme0n1p2 /mnt
[1;94m#[0m mount --mkdir /dev/nvme0n1p1 /mnt/boot
[1;94m#[0m mount --mkdir /dev/nvme0n1p3 /mnt/home
[1;94m#[0m swapon /dev/nvme0n1p4
[3;32m# 以下安装好基本系统后再做[0m
[1;94m#[0m genfstab -U /mnt > /mnt/etc/fstab
[1;94m#[0m cat /mnt/etc/fstab [3;32m# 确认无误[0m
# Static information about the filesystems.
# See fstab(5) for details.

# <file system> <dir> <type> <options> <dump> <pass>
# /dev/nvme0n1p2
UUID=5dfeff69-4c2f-43c9-9ae0-d036da9aa9ec	/         	ext4      	rw,relatime	0 1

# /dev/nvme0n1p1
UUID=A7F4-F477      	/boot     	vfat      	rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro	0 2

# /dev/nvme0n1p3
UUID=854ee50a-7abc-404a-b223-574dd098179e	/home     	ext4      	rw,relatime	0 2

# /dev/nvme0n1p4
UUID=5bf9af85-f34e-42c4-ae79-e0b917b44af7	none      	swap      	defaults  	0 0


```

::::

## 开始使用 pacman 安装基本系统

### 选择镜像站

原本的 `mirrorlist` 的排序往往并不合适。我们通常只需要中国的。*运行* `curl -L 'https://archlinux.org/mirrorlist/?country=CN&protocol=https' -o /etc/pacman.d/mirrorlist` 获取中国镜像站。根据需要自行*去除注释*或*删除*以及*排序*。  
**建议以下**：

```ini
# 中国科学技术大学
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
# 南京大学
Server = https://mirrors.nju.edu.cn/archlinux/$repo/os/$arch
# 浙江大学
Server = https://mirrors.zju.edu.cn/archlinux/$repo/os/$arch
# 南阳理工学院
Server = https://mirror.nyist.edu.cn/archlinux/$repo/os/$arch
# 哈尔滨工业大学
Server = https://mirrors.hit.edu.cn/archlinux/$repo/os/$arch
```

### 安装软件包

我建议在这里先让基本系统**能用**，重启到新系统后再开始让它变得**好用**。  
必要软件包：

- *`base` 包*：`base` 就是**唯一的定死的必须软件包**，它是一个*元包*（Meta Package）。剩下必要软件包的你可以随意搭配。
- *内核*：通常说用 `linux`（原版 kernel 稳定版）就行。找官方支持的内核[请搜索](https://archlinux.org/packages/?q=KSMBD-MODULE)（提供）`KSMBD-MODULE` 的包。
- *CPU 微码更新*：`intel-ucode`, `amd-ucode`。用于硬件错误和安全修复。  
  > 使用 AMD 或 Intel CPU 的用户都应该安装微码更新以确保系统稳定性。在虚拟机或容器中，微码更新应在主机上实施，而不是在客户机系统中。 
- *固件*：虚拟机通常也不用安装。
  - *必需*：如果你不清楚到底要安装什么固件，安装 `linux-firmware` 元包。如果你想节省空间，而且很清楚自己的配置，就看看它的依赖，自己决定安装什么。
  - *额外*：`sof-firmware` 用于音频。不安装它电脑就无法发声。
- *文件系统的用户空间工具*：如果你想用其他文件系统，例如 BTRFS 就安装 `btrfs-progs`；想操作 U 盘的文件系统（比方说格式化，改卷标啥的），就安装 `exfatprogs`。参见 [Arch Wiki](https://wiki.archlinuxcn.org/wiki/File_systems)。
- *联网所需的程序*：**网络管理器**和/或 **DHCP 客户端**推荐 `networkmanager`（因为它有一个 TUI，同时 GNOME Settings 也默认使用它）。通常来说安装它就够了。参见 [Arch Wiki](https://wiki.archlinuxcn.org/wiki/Network_configuration#网络管理器)。
- *控制台文本编辑器*：例如 `vim`, `nano`。根据你的偏好安装就好。
- *访问命令文档*：`man-db`, `man-pages`, `texinfo`。
- *引导加载程序*：没有特殊需求就安装 `grub`, `efibootmgr`。

有一种维护已安装软件包列表的方法，参见 [Arch Wiki](https://wiki.archlinuxcn.org/wiki/Pacman/Tips_and_tricks#已安装软件包的列表)。这里我们就使用这种方法，更方便一些。

```ansi
[1;94m#[0m vim pkglist.txt [3;32m# 编辑该文件，以下是一个示例[0m
base
linux
linux-firmware
sof-firmware
grub
efibootmgr
networkmanager
vim
man-db
man-pages
tex-info
[3;32m# 如果你想添加以 `#` 开头的注释，可以运行
# sed -e 's/#.*//' -e 's/[[:space:]]*$//' -e '/^[[:space:]]*$/d' pkglist.txt | sort
# 来获得去掉注释的版本。[0m
[3;32m# :wq[0m
[1;94m#[0m pacstrap -K /mnt --needed - < pkglist.txt
```

## 配置基本系统

**不要忘记***运行* `genfstab -U /mnt > /mnt/etc/fstab` 来生成 fstab 配置文件。  
*运行* `arch-chroot -S /mnt` 来 chroot 到新的系统。

### 时区、本地化与控制台设置

1. *运行* `ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime` 来设置时区为上海。
2. *运行* `hwclock --systohc` 来将系统时钟设置到硬件时钟并生成 `/etc/adjtime`。
3. *启用* `systemd-timesyncd.service` 即时间同步服务。
4. *编辑* `/etc/locale.gen`，取消 `en_US.UTF-8 UTF-8`, `zh_CN.UTF-8 UTF-8` 的注释。*运行* `locale-gen`。
5. *编辑* `/etc/locale.conf`，设置变量 `LANG=zh_CN.UTF-8`。（tty 乱码时，运行 `LANG=en_US.UTF-8` 临时更改 locale 即可，或者可以修改 profile 来实现检测到 tty 自动更改 `LANG`）

### 网络设置

*编辑* `/etc/hostname`，键入你喜欢的主机名。标准要求如下，但实际上个人使用，不符合规范**也没太大关系**。  

> Each element of the hostname must be from 1 to 63 characters long and the entire hostname, including the dots, can be at most 253 characters long. Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, and the hyphen (-). A hostname may not start nor end with a hyphen.  
> 每一部分的主机名（由点分割）包含 1-63 个字符，整个主机名（包括点）最多长 253 个字符。仅使用小写的 a-z、0-9 以及 -，但不得以 - 开头或结尾。

*启用* `NetworkManager.service`。

### 用户设置

*运行* `passwd` 设置 root 密码。  
随后**添加一个具有管理权限的非 root 用户**：

1. *安装* `sudo`。
2. *运行* `useradd <user> -m -G wheel`。其中，`<user>` 替换为你想要的用户名。
    - 找到可用的常用用户组，参见 [Arch Wiki](https://wiki.archlinuxcn.org/wiki/Users_and_groups#用户组)。
    - 如果你只想创建一个**没有管理权限**的用户，那就不要键入 `-G wheel`。  
      若已加入，则*运行* `usermod <user> -rG wheel` 来把它从 `wheel` 组里移除。
    - 如果你忘记加 `-m`，则没有创建用户目录。*运行* `mkdir /home/<user>` 来创建它的用户目录。
    - 如果你忘记加 `-G wheel`，*运行* `usermod <user> -aG wheel` 来把它添加到 `wheel` 组中。
3. *运行* `passwd <user>` 设置该用户的密码。
4. *运行* `EDITOR=vim visudo` 来*编辑* `/etc/sudoers`，找到 `%wheel ALL=(ALL:ALL) ALL` 并取消注释。
5. 如果你想增强安全性，正确添加了具有管理权限的非 root 用户后，可以*运行* `passwd -l root` 禁用 root 用户，以增强安全性。

### 安装并配置 GRUB

```ansi
[1;94m#[0m grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
Installing for x86_64-efi platform.
Installation finished. No error reported.
[1;94m#[0m cd /boot; tree -CAd [3;32m# 需安装 tree[0m
[1;34m.[0m
├── [1;34mEFI[0m
│   └── [1;34mGRUB[0m
└── [1;34mgrub[0m
    ├── [1;34mfonts[0m
    ├── [1;34mlocale[0m
    ├── [1;34mthemes[0m
    │   └── [1;34mstarfield[0m
    └── [1;34mx86_64-efi[0m

9 directories
[3;32m# 出现这样的目录结构就说明基本没有问题了[0m
[1;94m#[0m grub-mkconfig -o /boot/grub/grub.cfg [3;32m# 生成 GRUB 配置很重要，不执行就无法正确引导新的 Arch Linux 系统了[0m
```

### 其他

- **pacman 命令彩色输出**：*编辑* `/etc/pacman.conf`，找到 `COLOR` 并取消注释。
- **sudo 输入密码显示星号**：*运行* `EDITOR=vim visudo` 来*编辑* `/etc/sudoers`，添加 `Defaults pwfeedback` 行。
- **控制台字体**：*编辑* `/etc/vconsole.conf`，设置字体 `FONT=ter-128b`，可以避免每次进 tty 改字体大小。（需要*安装* `terminus-font`，按照你喜欢的来）

----------

确认你已经干好该干的事，尤其是要**执行好 GRUB 安装**（`grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB` 和 `grub-mkconfig -o /boot/grub/grub.cfg`）。  
确认好后：

- *运行* `exit` 退出 chroot。（这步不干也行，你甚至可以直接 `reboot`）
- *运行* `umount -R /mnt` 手动卸载分区。（这步不干也行，systemd 会自动在关机前卸载）
- *运行* `reboot` 重启系统，不要忘记移除安装介质。（即记得把 U 盘拔了，防止又回到 Live ISO 里了）

## 进一步配置系统

:::note{.info} 虚拟机中的 SSH vsock

在我们可以通过 SSH 连接虚拟机运行命令，这样更方便。

**在虚拟机中***安装* `openssh`，*启用* `sshd.service`。下次开机未登录时，你会看到类似于 `Try contacting this VM's SSH server via 'ssh vsock%<number>' from host.`。
**在宿主机中***运行* `ssh <user>@vsock%<number>`，其中 `<user>` 替换为你在[用户配置](#用户设置)添加的具有管理权限的非 root 用户的用户名。输入该用户的密码后，理论上就可以连接上了。

如果是在虚拟机中安装 Arch，在进入 Arch Live ISO 中后用 `passwd` 设置 root 密码，然后用 `ssh vsock%<number>` 也行。

:::

**现在我们该在真实的系统里进行操作了。**  
如果你的步骤没有错误，你应该会看到一个类似于下面的 GRUB 菜单。

![grub-list](/images/arch-install/grub-list.webp)

*运行* `LANG=en_US.UTF-8` 避免中文乱码。  
*运行* `nmtui` 来通过一个图形化界面连接 Wi-Fi。

:::details 一些验证上述操作是否无误

```ansi
[1;94m$[0m systemctl status NetworkManager.service
[0;1;32m●[0m NetworkManager.service - Network Manager[m
     Loaded: loaded ([4m/usr/lib/systemd/system/NetworkManager.service[0m; [0;1;32menabled[0m; preset: [0;1;33mdisabled[0m)
     Active: [0;1;32mactive (running)[0m since Mon 2026-11-23 22:25:07 CST; 8min ago[m
 Invocation: 4524d9f995b74b30be459d7a228d40e8[m
       Docs: [4mman:NetworkManager(8)[0m
   Main PID: 450 (NetworkManager)[m
[3;32m# ... 只要看到 loaded, enabled 就可以了，下同[0m

[1;94m$[0m systemctl status systemd-timesyncd
[0;1;32m●[0m systemd-timesyncd.service - Network Time Synchronization[m
     Loaded: loaded ([4m/usr/lib/systemd/system/systemd-timesyncd.service[0m; [1;32menabled[0m; preset: [0;1;32menabled[0m)[m
     Active: [0;1;32mactive (running)[0m since Mon 2026-11-23 22:25:06 CST; 8min ago[m
 Invocation: fa827ae065a4483eb319d74216d0f79c[m
       Docs: [4mman:systemd-timesyncd.service(8)[0m
   Main PID: 380 (systemd-timesyn)[m
     Status: "[0;1;36mContacted time server 193.182.111.143:123 (2.arch.pool.ntp.org).[0m"[m
[3;32m# ...[0m

[1;94m$[0m timedatectl
[0;94m               Local time:[0m 一 2026-11-23 22:33:52 CST [3;32m# 本地时间要同步[0m
[0;94m           Universal time:[0m 一 2026-11-23 14:33:52 UTC
[0;94m                 RTC time:[0m 一 2026-11-23 14:33:52
[0;94m                Time zone:[0m Asia/Shanghai (CST, +0800) [3;32m# 时区得在 +0800[0m
[0;94mSystem clock synchronized:[0m yes
[0;94m              NTP service:[0m active [3;32m# 时间同步已启用[0m
[0;94m          RTC in local TZ:[0m no

[1;94m$[0m hostnamectl
[0;94m  Static hostname:[0m vm.arch.jywon.com [3;32m# 主机名正确[0m
[0;94m        Icon name:[0m computer-vm
[0;94m          Chassis:[0m vm 💽
[0;94mChassis Asset Tag:[0m No Asset Tag
[0;94m       Machine ID:[0m fe6c2c0892cf4973994adbde1a5f3640
[0;94m          Boot ID:[0m 2b2fec9b15394124bf89e76b7141f4ef
[0;94m     AF_VSOCK CID:[0m 848841942
[0;94m   Virtualization:[0m vmware
[0;94m Operating System:[38;2;23;147;209m Arch Linux[0m
[0;94m           Kernel:[0m Linux 7.3.5-arch1-1
[0;94m     Architecture:[0m x86-64
[0;94m  Hardware Vendor:[0m VMware, Inc.
[0;94m   Hardware Model:[0m VMware20,1
[0;94m Hardware Version:[0m None
[0;94m Firmware Version:[0m VMW201.00V.25600138.B64.2607151225
[0;94m    Firmware Date:[0m Wed 2026-07-15
[0;94m     Firmware Age:[0m 4month 1w 2d
```

:::

<!--还可能写：关于“急救”的提示-->