---
title: 在 Arch Linux 上安装 VMware Workstation Pro
date: 2026-09-13 22:11:32 +08:00
categories: Programming
tags:
  - Linux
  - 虚拟机
license: GFDL-1.3-or-later
license_reason: | 
  文章有内容引用自 [Arch Linux Wiki](https://wiki.archlinuxcn.org/wiki/VMware)，文章使用 GFDL 进行授权，要求使用相同许可。  
  Arch Linux Wiki（无论英文还是中文）内容都很详细，能解决大部分问题了。在此要**感谢那些贡献者们的辛勤付出**。
---

之前觉得在 Linux 上用 VMware Workstation Pro（以下简称“**Workstation**”）很麻烦，于是就换用 Virtual Box。  
用了大概有四个月吧，感觉它一些系统适配得不太好，虚拟机性能也不如 Workstation，于是~~兜兜转转~~又回到了 Workstation。  
但是在我的 Arch Linux 上安装 Workstation **似乎**会有*亿*点儿问题，故有此一记。

<!--more-->

:::note{.success} 适用性

尽管本文章以 Arch 为例，但是本文章的有些部分也适用于其他发行版。  
例如：下载安装文件、解决 GNOME & Wayland 键盘捕获问题等。

:::

## Virtual Box 与 Workstation 的比较

开始之前，先列举一下两者的槽点。  
这里的体验都是 **Linux** 上的。

| 内容 \ 软件 | Virtual Box | Workstation |
| :--- | :------- | :---------- |
| 许可 | GPL-3.0-only，[开源](https://github.com/VirtualBox/virtualbox)许可，免费 | 闭源，现在免费了 |
| 安装 | 更方便一些，Arch 和 Debian 官方仓库里都有。 | 需要自己下载那个 `.bundle` 文件 |
| 用户界面（GNOME 上） | 它比 Workstation 更好看及现代一点，同时，虚拟机*控制台视图*与虚拟机*管理器*是分开的窗口 | ~~我怀疑自从十年前 gtk3 的 UI 定型后，从来没改过~~比 VBox 多了标签页 |
| 用户界面-语言 | 支持简体中文 | 不支持中文，只能用英文 |
| 虚拟机-硬盘 | 虚拟硬盘文件支持更广泛，也支持 `.vmdk` | 虚拟硬盘文件基本只支持 `.vmdk`。但是支持压缩，碎片整理 |
| 虚拟机-网络 | 配置定义有限 | 有*虚拟网络编辑器*，很灵活 |
| 虚拟机-快照 | **有子快照时，不支持删除父快照**。也就是说，对于快照树来说，想要删除父结点必要先删除它的子树。这一点很糟糕 | 没有 VBox 的问题 |
| 虚拟机-图形性能 | 更差 | 更好 |
| 虚拟机-拖放及剪贴板共享 | 需要安装 Additions，可以选择开启或关闭。剪贴板共享没问题，但是**拖放总是报错**。想要传文件最好通过*共享文件夹* | 安装 Tools 后就会启用，没有关闭选项。拖放从客户机到宿主机有些问题 |

## 安装

:::note{.warning} 未使用 AUR 助手

我选择使用**克隆仓库**的方式获取构建文件。  
如果使用 yay 一类的 AUR 助手，我**不清楚**如何干预安装（自己下载源文件、改 `PKGBUILD`）。在这里恕不赘述。

每个用户都应该在构建和安装 AUR 前审查其 `PKGBUILD` 等构建文件。  
详情参阅 [Arch Wiki](https://wiki.archlinuxcn.org/wiki/AUR)。

:::

在 Arch Linux 上，你只需要安装 [vmware-workstation](https://aur.archlinux.org/packages/vmware-workstation) AUR……  
然后就会~~惊喜地~~发现卡在下载源文件。

```ansi
[1;94m$[0m makepkg
[1m[32m==>[0m[1m 正在创建软件包：vmware-workstation 25688693:26H1u1-3 (2026年09月13日 星期日 22时10分39秒)[0m
[1m[32m==>[0m[1m 正在检查运行时依赖关系...[0m
[1m[32m==>[0m[1m 正在检查编译时依赖关系[0m
[1m[32m==>[0m[1m 获取源代码...[0m
[1m[34m  ->[0m[1m 正在下载 VMware-Workstation-Full-26H1u1-25688693.x86_64.bundle...[0m
```

### 获取源文件

查看 `PKGBUILD` 文件，发现 Workstation 的 `.bundle` 安装包是通过 archive.org 下载的，所以在中国下不下来。

:::details 部分 PKGBUILD

```bash
source=(
  "VMware-Workstation-Full-${pkgver}-${_buildver}.${CARCH}.bundle::https://archive.org/download/VMware-Workstation-Full-${pkgver}-${_buildver}.${CARCH}/VMware-Workstation-Full-${pkgver}-${_buildver}.${CARCH}.bundle"

  "https://packages-prod.broadcom.com/tools/frozen/linux/linux.iso"
  "https://packages-prod.broadcom.com/tools/frozen/linux/linuxPreGlibc25.iso"
  "https://packages-prod.broadcom.com/tools/frozen/netware/netware.iso"
  "https://packages-prod.broadcom.com/tools/frozen/solaris/solaris.iso"
  "https://packages-prod.broadcom.com/tools/frozen/windows/winPre2k.iso"
  "https://packages-prod.broadcom.com/tools/frozen/windows/winPreVista.iso"

  "winVistaSP1.iso::https://packages-prod.broadcom.com/tools/frozen/windows/WindowsToolsVista/SP1/windows.iso"
  "winVistaSP2.iso::https://packages-prod.broadcom.com/tools/frozen/windows/WindowsToolsVista/SP2/windows.iso"
)
```

:::

即使 Workstation 现在已经免费了，但是下载它还要费些周折。你必须得**注册 Broadcom 账号**，填一大堆奇奇怪怪的信息。  
嫌麻烦的话，我们可以在 [201853910/VMwareWorkstation](https://github.com/201853910/VMwareWorkstation) 仓库下载。Release 更新基本及时，通过 [GitHub Release 下载加速](https://github.akams.cn/) 一类的网站下载，速度还是不错的。

下面要下载的是 VMware Tools 的 ISO 镜像文件。只能通过 PKGBUILD 里提供的 Broadcom 官方链接下载了。白天下载速度更高。

将下载到的源文件放到*放有构建文件的文件夹里*（克隆的仓库），确保文件名与 `PKGBUILD` 中的文件名保持一致，`makepkg` 应该会找到源文件并且校验完整性。若有校验失败的文件，只能重下，没有更好的方法。

:::note{.info} 一种保持 Git 工作区干净的方法

我是将源文件放到别的路径下（USB 闪存盘）里，随后用一段简单的 shell 脚本将它们在仓库文件夹里创建软链。

```sh
#! /usr/bin/bash
DEST="/path/to/aur/repo/of/vmware-workstation"
for file in *; do
    if ! [ $file = $0 ]; then
        echo $file
        ln -sr $file "$DEST" # r: 相对于链接位置
    fi
done
```

:::

### 按需求修改 `PKGBUILD`

默认的 `PKGBUILD` 配置通常不符合一般要求。主要就是要修改 `_remove_vmware_keymaps_dependency` 项。

```sh
# vmware-keymaps dependency is needed to avoid some conflicts when you install
# this package with vmware-horizon-client. If you don't plan to install
# vmware-horizon-client and don't want to add this dependency, you can
# uncomment the line below:
_remove_vmware_keymaps_dependency=y
```

如果你**不安装 vmware-horizon-client**，可以按提示去掉该行注释，不然还要多出 vmware-keymaps 这个 AUR 依赖，很麻烦。

### 构建并安装

准备完成后，目录下是这样的：

:::details 目录

```ansi
[01;34m.[0m
├── config
├── [01;32mconfigure-initscript.sh[0m
├── dkms.conf.in
├── efi-patches.txt
├── [01;36mlinux.iso[0m -> [01;32m/path/to/linux.iso[0m
├── [01;36mlinuxPreGlibc25.iso[0m -> [01;32m/path/to/linuxPreGlibc25.iso[0m
├── Makefile
├── [01;36mnetware.iso[0m -> [01;32m/path/to/netware.iso[0m
├── PKGBUILD
├── [01;36msolaris.iso[0m -> [01;32m/path/to/solaris.iso[0m
├── unlocker.py
├── vmmon.patch
├── vmnet.patch
├── vmware-bootstrap
├── vmware-environment.sh
├── vmware-networks-configuration.service
├── vmware-networks.path
├── vmware-networks.service
├── vmware-usbarbitrator.path
├── vmware-usbarbitrator.service
├── vmware-vix-bootstrap
├── [01;36mVMware-Workstation-Full-26H1u1-25688693.x86_64.bundle[0m -> [01;32m/path/to/VMware-Workstation-Full-26H1u1-25688693.x86_64.bundle[0m
├── vmware-workstation.install
├── [01;36mwinPre2k.iso[0m -> [01;32m/path/to/winPre2k.iso[0m
├── [01;36mwinPreVista.iso[0m -> [01;32m/path/to/winPreVista.iso[0m
├── [01;36mwinVistaSP1.iso[0m -> [01;32m/path/to/winVistaSP1.iso[0m
└── [01;36mwinVistaSP2.iso[0m -> [01;32m/path/to/winVistaSP2.iso[0m

1 directories, 27 files
```

:::

确认好后，可以开始构建。运行 `makepkg -sic`，有类似下面的输出。

:::details 输出

```ansi
[1;94m$[0m makepkg -sic
[1m[32m==>[0m[1m 正在创建软件包：vmware-workstation 25688693:26H1u1-3 (2026年09月17日 星期四 22时26分16秒)[0m
[1m[32m==>[0m[1m 正在检查运行时依赖关系...[0m
[1m[32m==>[0m[1m 正在检查编译时依赖关系[0m
[1m[32m==>[0m[1m 获取源代码...[0m
[1m[34m  ->[0m[1m 找到 VMware-Workstation-Full-26H1u1-25688693.x86_64.bundle[0m
[1m[34m  ->[0m[1m 找到 linux.iso[0m
[1m[34m  ->[0m[1m 找到 linuxPreGlibc25.iso[0m
[1m[34m  ->[0m[1m 找到 netware.iso[0m
[1m[34m  ->[0m[1m 找到 solaris.iso[0m
[1m[34m  ->[0m[1m 找到 winPre2k.iso[0m
[1m[34m  ->[0m[1m 找到 winPreVista.iso[0m
[1m[34m  ->[0m[1m 找到 winVistaSP1.iso[0m
[1m[34m  ->[0m[1m 找到 winVistaSP2.iso[0m
[1m[34m  ->[0m[1m 找到 vmware-bootstrap[0m
[1m[34m  ->[0m[1m 找到 vmware-vix-bootstrap[0m
[1m[34m  ->[0m[1m 找到 config[0m
[1m[34m  ->[0m[1m 找到 configure-initscript.sh[0m
[1m[34m  ->[0m[1m 找到 vmware-environment.sh[0m
[1m[34m  ->[0m[1m 找到 vmware-networks-configuration.service[0m
[1m[34m  ->[0m[1m 找到 vmware-networks.service[0m
[1m[34m  ->[0m[1m 找到 vmware-usbarbitrator.service[0m
[1m[34m  ->[0m[1m 找到 vmware-networks.path[0m
[1m[34m  ->[0m[1m 找到 vmware-usbarbitrator.path[0m
[1m[34m  ->[0m[1m 找到 dkms.conf.in[0m
[1m[34m  ->[0m[1m 找到 Makefile[0m
[1m[34m  ->[0m[1m 找到 vmmon.patch[0m
[1m[34m  ->[0m[1m 找到 vmnet.patch[0m
[1m[32m==>[0m[1m 正在验证 source 文件，使用sha256sums...[0m
[1m[32m==>[0m[1m 正在释放源码...[0m
[1m[34m  ->[0m[1m 正在解压缩 linux.iso，使用 bsdtar[0m
[1m[34m  ->[0m[1m 正在解压缩 linuxPreGlibc25.iso，使用 bsdtar[0m
[1m[34m  ->[0m[1m 正在解压缩 netware.iso，使用 bsdtar[0m
[1m[34m  ->[0m[1m 正在解压缩 solaris.iso，使用 bsdtar[0m
[1m[34m  ->[0m[1m 正在解压缩 winPre2k.iso，使用 bsdtar[0m
[1m[34m  ->[0m[1m 正在解压缩 winPreVista.iso，使用 bsdtar[0m
[1m[34m  ->[0m[1m 正在解压缩 winVistaSP1.iso，使用 bsdtar[0m
[1m[34m  ->[0m[1m 正在解压缩 winVistaSP2.iso，使用 bsdtar[0m
[1m[32m==>[0m[1m 正在开始 prepare()...[0m
Extracting VMware Installer...done.
[1m[32m==>[0m[1m 正在进入 fakeroot 环境...[0m
[1m[32m==>[0m[1m 正在开始 package()...[0m
[1m[32m==>[0m[1m Patching vmmon module for DKMS[0m
patching file Makefile
[1m[32m==>[0m[1m Patching vmnet module for DKMS[0m
patching file Makefile
[1m[32m==>[0m[1m 正在清理安装...[0m
[1m[34m  ->[0m[1m 正在删除 libtool 文件...[0m
[1m[34m  ->[0m[1m 正在移除静态库文件...[0m
[1m[34m  ->[0m[1m 正在清除不打算要的文件...[0m
[1m[34m  ->[0m[1m 正在压缩 man 及 info 文档...[0m
[1m[32m==>[0m[1m 正在检查打包问题...[0m
[1m[32m==>[0m[1m 正在构建软件包"vmware-workstation"...[0m
[1m[34m  ->[0m[1m 正在生成 .PKGINFO 文件...[0m
[1m[34m  ->[0m[1m 正在生成 .BUILDINFO 文件...[0m
[1m[34m  ->[0m[1m 正在添加 install 文件...[0m
[1m[34m  ->[0m[1m 正在生成 .MTREE 文件...[0m
[1m[34m  ->[0m[1m 正在压缩软件包...[0m
[1m[32m==>[0m[1m 正在离开 fakeroot 环境。[0m
[1m[32m==>[0m[1m 完成创建：vmware-workstation 25688693:26H1u1-3 (2026年09月17日 星期四 22时26分37秒)[0m
[1m[32m==>[0m[1m 正在安装软件包 vmware-workstation，使用 pacman -U...[0m
正在加载软件包...
正在解析依赖关系...
正在查找软件包冲突...

软件包 (1) vmware-workstation-25688693:26H1u1-3

全部安装大小：  1181.58 MiB
净更新大小：       0.00 MiB

正在检查密钥环......
正在检查软件包完整性...
正在加载软件包文件...
正在检查文件冲突...
正在检查可用存储空间...
:: 正在运行事务前钩子函数...
(1/1) Remove upgraded DKMS modules
==> dkms remove --no-depmod vmware-workstation/26H1u1_25688693 -k 7.2.4-arch1-2
:: 正在处理软件包的变化...
正在升级 vmware-workstation...
:: 正在运行事务后钩子函数...
(1/8) Reloading system manager configuration...
(2/8) Enqueuing marked services...
(3/8) Arming ConditionNeedsUpdate...
(4/8) Loading new kernel modules...
(5/8) Install DKMS modules
==> dkms install --no-depmod vmware-workstation/26H1u1_25688693 -k 7.2.4-arch1-2
==> depmod 7.2.4-arch1-2
(6/8) Updating linux initcpios...
==> Building image from preset: /etc/mkinitcpio.d/linux.preset: 'default'
==> Using default configuration file: '/etc/mkinitcpio.conf'
  -> -k /boot/vmlinuz-linux -g /boot/initramfs-linux.img
==> Starting build: '7.2.4-arch1-2'
  -> Running build hook: [base]
  -> Running build hook: [systemd]
  -> Running build hook: [autodetect]
  -> Running build hook: [microcode]
  -> Running build hook: [modconf]
  -> Running build hook: [kms]
  -> Running build hook: [keyboard]
  -> Running build hook: [sd-vconsole]
  -> Running build hook: [block]
  -> Running build hook: [filesystems]
  -> Running build hook: [fsck]
==> Generating module dependencies
==> Creating zstd-compressed initcpio image: '/boot/initramfs-linux.img'
  -> Early uncompressed CPIO image generation successful
==> Initcpio image generation successful
(7/8) Updating icon theme caches...
(8/8) Updating the desktop file MIME type cache...
[1m[32m==>[0m[1m 清理中...[0m
```

:::

随后，安装**已安装内核对应的头文件包**（如 **linux-headers**）。

然后可以清理掉软链接。运行 `git clean -dfx` 和 `git restore PKGBUILD`，工作区就干净了。  
但是下次安装的时候记得重新改 `PKGBUILD`。

## 安装后的操作

### 按要求启用服务

若是*安装*而不是*升级*，你应该会看到以下提示：

```ansi
==> Before using VMware, you need to reboot or load vmw_vmci and vmmon kernel modules (in a terminal on root: modprobe -a vmw_vmci vmmon)
==> You may also need to enable some of the following services:
- vmware-networks: to have network access inside VMs
- vmware-usbarbitrator: to connect USB devices inside VMs
These services can be activated during boot by enabling .service units or only when a VM is started by enabling .path units.
```

我们可以知道，如果想在虚拟机内**使用网络**，需要启用 `vmware-networks.service`；如果想在虚拟机内**连接 USB 设备**，需要启用 `vmware-usbarbitrator.service`。  
在我的实际使用中，启用 `.path` 单元文件而不是 `.service` 的话，你只有在**启动虚拟机后**（而不是打开 Workstation 的主界面）服务才会启动。也就是说，你还要重新启动虚拟机才能用网络……因此最好使用 `.service` 单元文件。

### 解决 Wayland 下 GNOME 中键盘无法捕获

:::note{.info} 参考

<https://wiki.archlinuxcn.org/wiki/VMware#GNOME_%E4%B8%8B%E9%94%AE%E7%9B%98%E6%8D%95%E8%8E%B7%E6%97%A0%E6%95%88>

:::

由于 VMware 好像在使用 X on Wayland，会有一些兼容性问题。  
一旦按下 GNOME 的快捷键，不管键盘是否已被虚拟机捕获，都是 GNOME 的快捷键发挥作用，而不是将输入重定向至虚拟机中。

我们需要用 gsettings 配置 xwayland 选项，允许其捕获一切键盘键。

```ansi
[1;94m$[0m gsettings set org.gnome.mutter.wayland xwayland-allow-grabs "true"
[1;94m$[0m gsettings set org.gnome.mutter.wayland xwayland-grab-access-rules "['vmware', 'vmplayer', 'vmware-vmx', 'mksSandbox']"
```

或者，你也可以通过 [*Dconf 编辑器*](https://flathub.org/apps/ca.desrt.dconf-editor)来完成这些操作。

如果成功了，虚拟机捕获键盘后，按下 `Super`/`Windows` 键，应该不会跳出 GNOME 的活动概览了。

### 安装 Vulkan

:::note{.info} 参考

<https://wiki.archlinuxcn.org/wiki/Vulkan>

:::

要启用 3D 加速，需要安装 Vulkan。  
启用虚拟机 3D 加速后，就会看到虚拟机多出一个显卡。

根据你的显卡安装对应的 Vulkan 驱动。查找提供 **vulkan-driver** 的软件包，并安装对应的包以及 **vulkan-tools**。

```ansi
[1;94m$[0m pacman -Ss vulkan-driver
[1;35mextra/[0;1mnvidia-utils [1;32m615.71.09-1[0m
    NVIDIA drivers utilities [3;32m# 这是 Nvidia 专有的[0m
[1;35mextra/[0;1mvulkan-asahi [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for Apple GPUs
[1;35mextra/[0;1mvulkan-broadcom [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for VideoCore GPUs
[1;35mextra/[0;1mvulkan-dzn [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for D3D12
[1;35mextra/[0;1mvulkan-freedreno [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for Adreno GPUs
[1;35mextra/[0;1mvulkan-gfxstream [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for Graphics Streaming Kit
[1;35mextra/[0;1mvulkan-intel [1;32m1:26.2.3-1[0m [1;36m[已安装][0m
    Open-source Vulkan driver for Intel GPUs
[1;35mextra/[0;1mvulkan-nouveau [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for Nvidia GPUs [3;32m# 这属于 Mesa 项目的一部分[0m
[1;35mextra/[0;1mvulkan-panfrost [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for Mali GPUs
[1;35mextra/[0;1mvulkan-powervr [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for PowerVR GPUs
[1;35mextra/[0;1mvulkan-radeon [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for AMD GPUs
[1;35mextra/[0;1mvulkan-swrast [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for CPUs (Software Rasterizer)
[1;35mextra/[0;1mvulkan-virtio [1;32m1:26.2.3-1[0m
    Open-source Vulkan driver for Virtio-GPU (Venus)
[1;94m#[0m pacman -S vulkan-intel vulkan-tools [3;32m# 对于 Intel 显卡[0m
[1;94m$[0m vulkaninfo
==========
VULKANINFO
==========

Vulkan Instance Version: 1.4.357
[3;32m# ...
# 看看有没有 GPU 信息[0m
[1;94m$[0m vkcube [3;32m# 测试[0m
```
