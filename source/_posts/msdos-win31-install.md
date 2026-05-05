---
title: MS-DOS 6.22 和 Windows 3.1 的安装
date: 2026-05-05 16:47:43
categories: Programming
tags: Other-Tag
---

在 [MSDN, I Tell You](https://msdn.itellyou.cn) “操作系统”里可以找到 MS-DOS 和 Windows 3.1 (16-bit) 一栏，当即决定研究一下它俩怎么安装。  
下载下来的文件似乎是 Win-RAR 自解压文件的形式，打开就好了。

<!--more-->

## MS-DOS

参考：  
<https://www.zoxoy.club/post/Install-MSDOS-in-VM/>；  
<https://www.bilibili.com/read/cv2995730/>。

### 制作软盘

解压后是一堆文件夹的形式。可以猜测到每一个文件夹相当于软盘分卷。

1. `文件`->`新建`->`软盘映像`；“引导扇区”选择 MS-DOS 6.22；
2. 在 UltraISO 左侧将 `FDD_BOOT` 改为 `DISK      1`（六个空格）；
3. 要先把 `DISK1` 目录下的 `IO.SYS` 和 `MSDOS.SYS` 这两个文件先后拖进 UltraISO。（并且设置IO.SYS为引导文件，我测出来好像不设也行）然后再把其他的所有文件拖进 UltraISO；
4. 保存为 `DISK1.ima`。（`.ima`,`.img` 好像无所谓？）

{% cdnimg uiso, uiso.png, loading="lazy" %}

{% note warning %}
一定要先把 `IO.SYS` 和 `MSDOS.SYS` 加进去

PC 的 DOS 系统启动顺序，先将第一个扇区的内容载入内存执行，如果可引导，就载入后面头三个扇区的IO.SYS文件进入内存，将执行权交给 `IO.SYS`。  
磁盘结构为：
- 根目录下头两个文件必须是 `IO.SYS` 和 `MSDOS.SYS`
- `IO.SYS` 必须是 `fat` 目录表保存的第一个文件
- `IO.SYS`+`MSDOS.SYS` 必须是连续的
{% endnote %}

之后同样把其他的都做成软盘映像。

### 安装

这里均以 VMware Workstation 为例。

#### 主系统

创建虚拟机选择 `其他`->`MS-DOS` 就行。  
要添加软盘驱动器，并且在开机前先换上 `DISK1.ima`。

{% cdnimg add-floppy-driver, floppy.png, loading="lazy" %}

开始安装之前要先分区磁盘并且格式化。  
**分区**：

1. 按 F3 退出安装界面，继续按 F3 确定退出；
2. 输入 `fdisk` 后回车；
3. 选择 1（Create DOS partition or Logical DOS Drive），回车；
4. 继续选择 1（Create Primary DOS Partition）；
5. 输入Y后，回车；
6. 继续回车，虚拟机就会重新启动。

{% cdnimg fdisk, fdisk.png, loading="lazy" %}

**格式化**：

1. 按两次 F3 退出安装界面；
2. 输入 `format C:` 后回车；
3. 选择 `Y`；
4. 磁盘卷标命名可以随便取，或者直接默认回车。

{% cdnimg format-c, format.png, loading="lazy" %}

然后就可以开始**安装**了。（可以先重启一下）  
不重启就输入 `C:` 和 `setup`，进入那个蓝色的安装界面。按提示换上对应的软盘（映像）就行。

{% cdnimg dos-setup, dossetup.png, loading="lazy" %}


#### 中文系统（可选）

这对于安装 *Windows 3.1 中文版*是没有影响的的。

1. 将 `PDOS1.ima` 换上（不要忘了连接软盘驱动器）；
2. 输入 `A:` 进入软盘目录，输入 `csetup`；
3. 按提示进行，并换上相应软盘；
4. 重启。

之后，可以输入 `pdos` 加载中文环境，`Ctrl`+`Space` 切换中英文输入，`Ctrl`+`Shift` 切换输入法。（和现在电脑的输入法切换热键是一模一样的）  
输入 `quit` 可以退出中文环境。

{% cdnimg pdos, pdos.png, loading="lazy" %}

## Windows

### 制作虚拟磁盘(vmdk)

解压后就是一个 `windows31` 文件夹。  
由于没法给 MS-DOS 安装 *VMware Tools*，而且它似乎读不了光盘，只能读文件系统为 FAT16 的磁盘。Windows 10 还没有 FAT16 这个格式化选项，只能用 *DG 专业版*了。

- 打开 DiskGenius（[专业版](https://down.hotpe.top/HotProgMods/%E7%A3%81%E7%9B%98%E5%B7%A5%E5%85%B7/DiskGenius%E4%B8%93%E4%B8%9A%E7%89%88_hjinke_6.0.1.1645_%E4%B8%93%E4%B8%9A%E5%88%86%E5%8C%BA%E8%BD%AF%E4%BB%B6.HPM)，按 7z 压缩包打开），选择 `磁盘`->`新建虚拟磁盘文件`->`新建 VMware 虚拟磁盘文件`。大小选择定为 1GB 够用了。  
  {% cdnimg vmdk-create, vmdkcreate.png, loading="lazy" %}
- 选中虚拟磁盘的“空闲”部分，选择上方工具栏 `建立新分区`，文件系统选 **FAT16**，其他默认。完成后选择 `保存更改`。  
  {% cdnimg vmdk-partition, vmdkpartition.png, loading="lazy" %}
- 提示是否立即格式化“未格式化”部分，选择 `是`。
  {% cdnimg vmdk-format, vmdkformat.png, loading="lazy" %}
- 选中磁盘“主分区”部分，将 `windows31` 文件夹复制（拖）进去，“文件复制选项”窗口全默认。将该文件夹命名为 `window31`。（防止 8.3 命名限制）
- 选择 `磁盘`->`关闭虚拟磁盘文件`。

{% note danger %}
不要把散文件复制到根目录下

让 `window31` 文件夹包着所有文件，不然部分文件复制不进去的，应该是 FAT16 的问题。
{% endnote %}

### 安装

如果你想留一份 MS-DOS，可以使用*克隆虚拟机*。  
在库中的虚拟机条目上右键，选择 `管理`->`克隆...`（`Manage`->`Clone...`），用链接克隆（Linked Clone）更省空间。

把制作好的虚拟磁盘 `vmdk` 文件挂到虚拟机上。打开 MS-DOS 6.22，输入 `D:`（假如提示找不到，那你可能上面的步骤做错了）。再输入 `setup`。进入蓝色的 Windows Setup。按步骤操作即可。

{% cdnimg window-install-command, wincommand.png, loading="lazy" %}
{% cdnimg windows-setup, setup.png, loading="lazy" %}
{% cdnimg windows-setup-gui, setupgui.png, loading="lazy" %}

### Windows 自启动

打开已经安装好 Windows 3.1 的虚拟机，要输入 `win` 才能打开 Windows。我们可以让它开机自启。  
打开“附件”文件夹里的记事本，打开 `C:\autoexec.bat`，在行尾加上 `WIN` 就可以了。

## 情怀？

<details>

<summary style="opacity:0;user-select:none">&emsp;&emsp;</summary>

{#我是 10 后，#}我接触电脑定然不是从 Windows 3.1 开始的，而是从 Windows XP，而且那时 XP 已经过时了。{#之所以还能接触到 XP，是因为爸妈开着一个需要电脑操控激光切割机的服装加工厂，像那种厂自然不会换电脑或是升级系统的。#}  
后来{#上小学时有信息课，用的是 Windows 7。但我当时还不懂这些系统，只是觉得学校电脑比厂里的高级#}觉得 Windows 7 比 Windows XP 好看多了。【之前都追求拟物、圆角。】  
再后来，我听说 Windows 7 过时了（其实就是微软停止支持了），心血来潮{#给家里的唯一一台台式机#}装上 Windows 10，感觉探照灯效果很好看。买{#现在在用的#}笔记本时 Windows 11 已经出来了，但是我害怕它不稳定，还是买了预装 Windows 10 的。{#事实证明，当时我是对的。#}【现在改成扁平、直角了。】  
Windows 10 用了几年，感觉 Windows 11 应该成熟了？~~成熟地植入了更多广告和生草的中文~~再说了，听说 2025 年微软要停止支持 Windows 10 了。给{#现在在用的#}笔记本装上 Windows 11，但是感觉小 Bug 更频繁了，资源占用更多了（之前什么都不开内存占用 ~30%，后来占用 ~50%，虽然说内存就是拿来用的，但我感觉不好），奇奇怪怪的“微软式中文”增加了很多很多。【圆角又回来了。】

严格来讲，我没有{#想比我更年长一点的人一样#}对 Windows 有什么“情怀”，但我希望 Windows 能越做越好。但是 Windows 11 越用越难用。

- Microsoft 拼命地往里面塞一大堆在中国根本用不了，同时也是没人用的 *Features of Artifital Intelligence*
- 右键菜单加载极慢
- 更新的东西默认打开。For example：“试用~~Microsoft Edge~~*微软边缘*的新外观”。我根本不喜欢在网页外面套一个圆角，好像眼睛被套住了。不仅 Microsoft Edge，甚至 Windows 都这样
- 无论是微软做的网页、应用还是系统，机翻还没人审查很难绷。偶尔出现微软式中文就算了，当一个有趣的笑话。但是，处处都能看到，还不改，这就是对用户的不尊重、不重视了
- ...

为何感觉 Microsoft 越来越不把用户当作尊重的人呢？反观 Windows 3.1，那里面的每一处中文肯定是翻译人员字句斟酌过的。即使有翻译错误也可以谅解。（也确实有）  
那里面的每一个应用都让人感觉是用心做过的。光从 Windows 3.1 有彩蛋来看，就知道“他们”是一群有“情怀的人”。

{#我现在已经用上 Ubuntu 了。#}

<span style="color:transparent;filter:blur(5px);word-break:break-word;user-select:none;">U29tZSB0ZXh0cyBhcmUgaGlkZGVuLiBZb3UgbWF5IGZpbmQgaXQgb3V0IGluIE1hcmtkb3duIHNvdXJjZSBjb2RlLgpJJ20gbm90IGdvb2QgYXQgRW5nbGlzaC4gU29ycnku</span>

</details>

----------

图片请参见 <https://drv-jywon.pages.dev/pixel/windows31>。

{% note info %}
彩蛋

按下 `Ctrl`+`Shift` 不放，选择 `帮助(H)`->`关于程序管理器(A)...`，点几下 Windows 徽标，再点确定，多重复几次，就能看到下面的东西：

{% cdnimg easter-flag, easteregg.png, loading="lazy" %}
<br>
{% cdnimg easter-bradsilverberg, easter1.png, loading="lazy"; class="pixel" %}

<p style="overflow-y:auto">
<span style="position:sticky;left:0">所有可能出现的“人”“物”：&nbsp;&nbsp;（请滑动）</span><br>

{% cdnimg easter-all-of-the-people, easterall.png, loading="lazy"; class="pixel p1" %}

</p>

{% endnote %}

{% note success %}
直接从 `windows31` 中找到的开机封面

<div class="flex">
<img alt="CoverEN" class="pixel" src="https://drv-jywon.pages.dev/api/raw?path=/pixel/windows31/EGALOGO.png">
<img alt="CoverZH" class="pixel" src="https://drv-jywon.pages.dev/api/raw?path=/pixel/windows31/VGALOGO.png">
</div>

{% endnote %}


<style>
    .pixel {
        image-rendering: pixelated;
        width: 100%;
    }
    .flex {
        display: flex;
    }
    .p1 {
        width: 150%;
        max-width: 150%;
    }
    summary::marker {
        content: none; /* 伪元素没了 */
        /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/content#none */
    }
</style>