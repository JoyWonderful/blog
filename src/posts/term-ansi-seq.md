---
title: ANSI 转义序列：控制终端文本样式及光标
date: 2026-08-01 21:22:43 +08:00
tags:
  - 终端
categories: Programming
math: true
---

## 写在前面

> Virtual terminal sequences are control character sequences that can control cursor movement, console color, and other operations when written to the output stream.  
> <span style="display:block;text-align:right">—— <a href="https://learn.microsoft.com/en-us/windows/console/console-virtual-terminal-sequences">Microsoft Learn</a></span>

### 简介

*ANSI 转义序列*(ANSI Escape Sequences)，也被微软称作*虚拟终端序列*(Virtual Terminal Sequences，也作 *VT 序列*)，还被一些人称作 *VT100 终端控制码*/*VT100 控制码*/*终端控制码*。

<!--more-->

正如上文引用所言，这一类序列用于控制*视频文本终端*(Video Text Terminals)及*终端模拟器*(Terminal Emulators)上的**光标位置**及**颜色**等。终端应该把这些序列解释为指令，而不是解释为普通的字符编码/输出它们。~~绝对没有内涵某些微软的老“终端模拟器”。~~

:::note{.success} 跳过

想直接看 cheatsheet，请跳转到[ANSI 转义序列](#ansi-转义序列)一节。  
想控制颜色与样式，请跳转到[选择图形再现](#颜色与样式选择图形再现)。  
不过看看相关的历史还是很有趣的。

:::

### 历史

以下历史主要整理自**维基百科**：  
<https://zh.wikipedia.org/wiki/ANSI转义序列>，  
<https://en.wikipedia.org/wiki/ANSI_escape_code>。

#### 相关标准

**最初**，几乎每个视频终端制造商都各自添加了特定的转义序列用于执行一些特殊操作，比如把光标置于屏幕上的某一个位置。  
由于这些序列各自为政，很多序列还要求借助字符的二进制发送数字（而某些编程语言做到这些是有困难甚至做不到的）；因此人们曾开发一些复杂的库（例如 *termcap* (terminal capabilities)）和一些实用工具（例如 *tput*），这样可以用同一套 API 应对各种终端序列。~~（条件编译、交叉编译的苦，我已经尝到了……）~~  

*ANSI 标准*试图解决这个问题。标准制订了一种所有终端共享的指令集，并要求用 *ASCII 的数字字符*传递所有数值信息。  
**1976 年**，该系列的第一个标准 [*ECMA-48*](https://ecma-international.org/publications-and-standards/standards/ecma-48/ "但是，第一版标准在官网上是看不了的……") 发布。  
**1979 年**，ANSI X3.64 标准（这里的 *ANSI* 是指 American National Standards Institute，美国国家标准学会）发布，*ANSI 转义序列*就是出自这里。  
**1983 年**，以上两个标准合并为 [ISO 6429](https://www.iso.org/standard/12780.html "旧标准已过时")（最新修改的标准为 1992 年的 [ISO/IEC 6429](https://www.iso.org/standard/12782.html)；[中国国家标准馆页面](https://www.ndls.org.cn/standard/detail/50f4ad5922de12c84dc41335b35756d2)）。  
**1994 年**，ANSI 取消了其标准，以支持国际标准。

#### 终端普及

第一个支持 ANSI X3.64 标准的流行视频终端是 **1978 年**推出的 [Digital VT100](https://vt100.net/dec/vt100/)，它在市场上非常成功，引发了各种各样的仿制品。（这大概就是有些人称“ANSI 转义序列”为“VT100 控制码”的原因）  
此后，许多其他品牌的视频终端都兼容可选 **VT 100**, **VT 103** 或 **ANSI** 模式。  
越来越多的软件依靠 ANSI 转义序列起作用，几乎所有**新的**终端和终端模拟器都支持了该标准。

类 Unix 系统中，到 **20 世纪 80 年代中期**，ANSI 转义序列几乎得到了全平台支持。  
尽管许多操作系统在标准文本输出中越来越多地支持 ANSI，但大多数情况下 ANSI 支持是由终端模拟器完成的（例如 xterm, GNOME Terminal, Konsole）。

2016 年前的 Windows 中（Windows 10 Threshold 2, 即 Windows 10 1511 之前），Win32 控制台（conhost.exe）完全不支持 ANSI 转义序列。~~（先进的微软大概晚了 40 年才跟上标准吧。）~~  
2019 年，微软推出了 Windows Terminal，并且正在用其替换掉 Win32 控制台。~~事实是，老电脑用不了 WT，而老电脑比比皆是。~~

## Windows 下附赠的准备条件

~~我再也不用 Windows 了，所以可以跳过这段内容不写。~~

正如上面的历史所言，Windows 的 conhost 对于 ANSI 转义序列支持**很晚**。  
除此之外，想要启用 conhost 中的*该功能*和*正常输出中文*，还要有一定手段。  
因此，我们暂且按下“怎么使用 ANSI 转义序列”不表，先来看怎么

例如以下代码（**UTF-8 编码**保存，这是**现代编辑器**【Dev-C++ 不算，它只能以 GB 2312 的编码保存】的惯例）：

```cpp
#include <cstdio>
using namespace std;

int main()
{
    printf("\033[1;31mred fg 红色 前景\n");
    return 0;
}
```

编译后直接放到比较新的 Windows 10 的 conhost 里运行，你会惊喜（xia）地发现输出了以下东西：

```ansi
□[1;31mred fg 绾㈣壊 鍓嶆櫙
```

原因有下：

1. 中文系统中，conhost 默认的代码页是 936（简体中文 - GBK），而现代的代码通常以 **UTF-8** 保存，输出时自然有乱码；
2. conhost 默认没有启用“虚拟终端序列”的功能，你只有用 Console API 手动启用，才能正常使用 ANSI 转义序列。

根据 [官方示例](https://learn.microsoft.com/windows/console/console-virtual-terminal-sequences#example-of-enabling-virtual-terminal-processing)，加上切换代码页，我曾写了以下函数（你肯定要加上 `windows.h` 头文件）：

:::details 函数

```cpp
/**
 * @brief 在 Windows 下启用虚拟终端序列。
 * @return `true` 代表成功，`false` 代表失败。
 * 
 * @details
 * 输出模式设定 `ENABLE_VIRTUAL_TERMINAL_PROCESSING` `DISABLE_NEWLINE_AUTO_RETURN`；
 * 输入模式设定 `ENABLE_VIRTUAL_TERMINAL_PROCESSING`；
 * 还设置代码页为 `65001`(`CP_UTF8`)。
 * 
 * @see https://learn.microsoft.com/windows/console/console-virtual-terminal-sequences#example-of-enabling-virtual-terminal-processing
 * @see https://learn.microsoft.com/windows/console/classic-vs-vt
 */
bool win_vt_setup() {
    // 设置输入、输出代码页为 65001
    SetConsoleCP(CP_UTF8); // 65001
    SetConsoleOutputCP(CP_UTF8);

    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE); // 输出句柄
    if (hOut == INVALID_HANDLE_VALUE)
    {
        return false;
    }
    HANDLE hIn = GetStdHandle(STD_INPUT_HANDLE); // 输入句柄
    if (hIn == INVALID_HANDLE_VALUE)
    {
        return false;
    }

    DWORD dwOriginalOutMode = 0;
    DWORD dwOriginalInMode = 0;
    if (!GetConsoleMode(hOut, &dwOriginalOutMode))
    {
        return false;
    }
    if (!GetConsoleMode(hIn, &dwOriginalInMode))
    {
        return false;
    }

    DWORD dwRequestedOutModes = ENABLE_VIRTUAL_TERMINAL_PROCESSING | DISABLE_NEWLINE_AUTO_RETURN;
    DWORD dwRequestedInModes = ENABLE_VIRTUAL_TERMINAL_INPUT;

    DWORD dwOutMode = dwOriginalOutMode | dwRequestedOutModes; // 合并原有终端模式与新的终端模式
    if (!SetConsoleMode(hOut, dwOutMode))
    {
        // we failed to set both modes, try to step down mode gracefully.
        dwRequestedOutModes = ENABLE_VIRTUAL_TERMINAL_PROCESSING;
        dwOutMode = dwOriginalOutMode | dwRequestedOutModes;
        if (!SetConsoleMode(hOut, dwOutMode))
        {
            // Failed to set any VT mode, can't do anything here.
            return false;
        }
    }

    DWORD dwInMode = dwOriginalInMode | dwRequestedInModes;
    if (!SetConsoleMode(hIn, dwInMode))
    {
        // Failed to set VT input mode, can't do anything here.
        return false;
    }

    return true;
}
```

:::

当然啦，如果你使用 [Windows Terminal](https://github.com/microsoft/terminal) 或 [Visual Studio Code](https://code.visualstudio.com/) [自带的 Xterm.js](https://xtermjs.org/) 或 [ConEmu](https://github.com/ConEmu/ConEmu)，就不会有类似的问题了。  
~~所以你为什么不去下载现代的终端（模拟器）？~~

正常输出（为了还原 VSC 里的 xterm 终端，粗体均使用亮色）：

```ansi
[1;91mred fg 红色 前景
```

## C0 控制码（也就是定义在 ASCII 里的特殊字符）

这些都是**单个字节**（单个字符），最开始定义在 ASCII 中。  
事实上，这些单个控制字符（对于普通文本来说）除了换行符、制表符（`\r`,`\n`,`\t`），并不常用。

也就是说，你通常**不会**用这单个字符来达到**控制终端**的目的，而是达到输出文本的目的。

以下是较常用（不常用中的较常用）的 C0 控制码。

<style>
    .special-table {
        white-space: nowrap;
        overflow-x: auto;
        width: 100%;
    }
    .special-table :is(code, p) {
        white-space: nowrap;
    }
</style>

<div class="special-table">

| 名称 | 缩写 | OCT | HEX | 转义字符 | ^（脱出字符） | 描述（在*终端*中的效果） |
| :--- | :--- | ---: | ---: | :--- | :--- | :--- |
| Bell | `BEL` | `007` | `0x07` | `\a` | `^G` | 终端响铃。 |
| BackSpace | `BS` | `010` | `0x08` | `\b` | `^H` | 退格，将光标左移一格。 |
| Horizontal Tab | `HT` | `011` | `0x09` | `\t` | `^I` | 将光标向右移一个制表符的长度。 |
| Line Feed | `LF` | `012` | `0x0A` | `\n` | `^J` | 移动到下一行。如果已在最后一行，则滚动显示。 |
| Form Feed | `FF` | `014` | `0x0C` | `\f` | `^L` | 换页。 |
| Carriage Return | `CR` | `015` | `0x0D` | `\r` | `^M` | （回车）将光标移动到第零列。 |
| Escape | `ESC` | `033` | `0x1B` | `\e` | `^[` | 所有转义字符的开始。 |

</div>

:::note{.info} 通过八进制/十六进制输出

通常而言，在某种语言中，你可以用转义字符（即反斜杠 `\`）加上 `0`+数（八进制）/`x`+数（十六进制）来通过其对应的 ASCII 码位输出。  
例如 ESC，可用 `\033` 或 `\x1b` 来输出。

**基于本人习惯，以下通常使用八进制表示法。**

:::

## ANSI 转义序列

ESC 之后的第二个字节接上 `@A–Z[\]^_` 的字符，即可变成 ANSI 转义序列。  
这里只列举两个通常会用到的。

- `\033[`(`ESC [`) *控制序列导入器*(Control Sequence Introducer)，简称 **`CSI`**。
- `\033]`(`ESC ]`) *操作系统命令*(Operating System Command)，简称 **`OSC`**。

:::note{.info} 格式约定

以下的内容，尖括号(`< >`)中的内容表示是某种参数。  
当然，这种参数的名字是我自己起的。

:::

### CSI 序列

CSI 序列应该是人们最常用，也最通用的。

组成形式为 `\033[<params><operation>`。  
其中：

- `<operation>` 是*指令*，为一个任意字母，**大小写敏感**。
- `<params>` 是该指令的*参数集*，由若干数字和分号组成。  
以分号分隔每一个参数。若没有给定数字（对应的参数），默认为 `0`。  
例如，`\033[m` 等同于 `\033[0m`；`\033[;3H` 等同于 `\033[0;3H`。

#### 光标

指令码有 `A`~`H`, `n`, `s`, `u`。

<div class="special-table"><table>
    <thead>
        <tr>
            <th>序列</th>
            <th>名称</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>\033[&lt;n&gt;A</code></td>
            <td>Cursor Up (CUU) —— 光标<strong>上</strong>移</td>
            <td rowspan="4">光标向指定方向移动 <code>&lt;n&gt;</code>。<br>若已到屏幕边缘，则<strong>无效</strong>。</td>
        </tr>
        <tr>
            <td><code>\033[&lt;n&gt;B</code></td>
            <td>Cursor Down (CUD) —— 光标<strong>下</strong>移</td>
        </tr>
        <tr>
            <td><code>\033[&lt;n&gt;C</code></td>
            <td>Cursor Forward (CUF) —— 光标<strong>右</strong>移</td>
        </tr>
        <tr>
            <td><code>\033[&lt;n&gt;D</code></td>
            <td>Cursor Back (CUB) —— 光标<strong>左</strong>移</td>
        </tr>
        <tr>
            <td><code>\033[&lt;n&gt;E</code></td>
            <td>Cursor Next Line (CNL) —— 光标<strong>到下一行</strong></td>
            <td rowspan="2">光标向对应方向移 <code>&lt;n&gt;</code> 行，并<strong>回到开头</strong>。<br>若已到屏幕边缘，则<strong>无效</strong>。</td>
        </tr>
        <tr>
            <td><code>\033[&lt;n&gt;F</code></td>
            <td>Cursor Previous Line (CPL) —— 光标<strong>到上一行</strong></td>
        </tr>
        <tr>
            <td><code>\033[&lt;col&gt;G</code></td>
            <td>Cursor Horizontal Absolute (CHA) —— 光标水平绝对定位</td>
            <td rowspan="2">光标移到<strong>第 <code>&lt;ln&gt;</code> 行（CHA 就是当前行），第 <code>&lt;col&gt;</code> 列</strong>。<br>行列从 1 开始。</td>
        </tr>
        <tr>
            <td><code>\033[&lt;ln&gt;;&lt;col&gt;H</code></td>
            <td>Cursor Position (CUP) —— 光标定位</td>
        </tr>
        <tr>
            <td><code>\033[s</code></td>
            <td>Save Cursor Position (SCP) —— 保存光标位置</td>
            <td rowspan="2">没有存进栈，因此只能存一个位置，恢复后“储存的”也是原来的位置。</td>
        </tr>
        <tr>
            <td><code>\033[u</code></td>
            <td>Restore Cursor Position (RCP) —— 恢复光标位置</td>
        </tr>
        <tr>
            <td><code>\033[6n</code></td>
            <td>Device Status Report (DSR) —— 设备状态报告</td>
            <td>以 <code>\033[&lt;ln&gt;;&lt;col&gt;R</code> 的形式报告光标位置。<br>（这个会重定向到到<strong>标准输入</strong>[stdin]，就像在键盘上输入）<br>建议去看看<a href="#项目">项目</a> rich.hpp 的 <code>cursor_coord()</code> 函数。</td>
        </tr>
    </tbody>
</table></div>


#### 清除

指令码有 `J`, `K`。

- `\033[<n>J` Erase in Display(ED) —— 擦除显示；
- `\033[<n>K` Erase in Line (EL) —— 擦除行。

参数效果如下。

<div class="special-table">

| 序列 | 说明 |
| :--- | :--- |
| `\033[0J` | 从**光标**处开始清除，直到**屏尾**。 |
| `\033[1J` | 从**屏首**处开始清除，直到**光标**。 |
| `\033[2J` | 清屏。 |
| `\033[0K` | 从**光标**处开始清除，直到**行尾**。 |
| `\033[1K` | 从**行首**处开始清除，直到**光标**。 |
| `\033[2K` | 清除光标所在的行的内容。 |

</div>

#### 颜色与样式（选择图形再现）

如果你想控制文本颜色样式，就会用到*选择图形再现*(Select Graphic Rendition, 缩写为 SGR)。

指令字符为 `m`。  
可以有多个参数，效果会叠加。（例如 `\033[1;3m` 会同时启用粗体和斜体）

:::details 参数规律总结

- $0$ —— 重置所有 SGR 属性；
- $1 \text{\textasciitilde} 9$ —— 多种图形样式；
- $22 \text{\textasciitilde} 29$ —— 重置对应的图形样式；
- $30 \text{\textasciitilde} 37$ —— 多种前景色；
- $40 \text{\textasciitilde} 47$ —— 对应背景色；
- $90 \text{\textasciitilde} 97$ —— 对应亮色版本前景色；（非标准，但大多数支持）
- $100 \text{\textasciitilde} 107$ —— 对应亮色版本背景色。（非标准，但大多数支持）

:::

##### 特殊

| 序列 | 说明 |
| :--- | :--- |
| `\033[0m` | **重置所有 SGR 属性。** |
| `\033[21m` | 双下划线（有些未支持）。若要关闭粗体，请用 `\033[22m`。 |
| `\033[39m` | 默认前景色。 |
| `\033[49m` | 默认背景色。 |
| `\033[53m` | 上划线（不常用，有些未支持）。 |

##### 图形模式/样式

用 `2<对应的图形样式码>` 作为参数可以**消除**对应的图形样式（粗体例外，只能用 `22`）。  
例如 `\033[23m` 可以清除斜体。

```ansi
        正常文字
[0;1m\033[1m 粗体 有些终端可能为亮色效果，或粗体+亮色效果
[0;2m\033[2m 虚化（黯淡）效果
[0;3m\033[3m 斜体
[0;4m\033[4m 下划线
[0;5m\033[5m 闪烁（**部分未支持，这里就演示不出**）
[0;7m\033[7m 反显（交换前景色、背景色）
[0m\033[8m 隐形（**这里无法演示**）
[0;9m\033[9m 删除线
```

##### 颜色

###### 8 色（3/4 位）

有一个色盘，数字对应相应的颜色。

| $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 黑 | 红 | 绿 | 黄 | 蓝 | 品红(MAGENTA) | 青 | 白 |

指定上方的 $0 \text{\textasciitilde} 7$ 为 color 参数，可以组合而成的 SGR 参数有：

- `3<color>` 前景色
- `4<color>` 背景色
- `9<color>` 前景亮色（非标准，但大多数支持）
- `10<color>` 背景亮色（非标准，但大多数支持）

```ansi
[1m黑色[0m \033[30m:[30m前景[0m \033[40m:[40m背景[0m \033[90m:[90m前景亮色[0m \033[100m:[100m背景亮色[0m
[1m红色[0m \033[31m:[31m前景[0m \033[41m:[41m背景[0m \033[91m:[91m前景亮色[0m \033[101m:[101m背景亮色[0m
[1m绿色[0m \033[32m:[32m前景[0m \033[42m:[42m背景[0m \033[92m:[92m前景亮色[0m \033[102m:[102m背景亮色[0m
[1m黄色[0m \033[33m:[33m前景[0m \033[43m:[43m背景[0m \033[93m:[93m前景亮色[0m \033[103m:[103m背景亮色[0m
[1m蓝色[0m \033[34m:[34m前景[0m \033[44m:[44m背景[0m \033[94m:[94m前景亮色[0m \033[104m:[104m背景亮色[0m
[1m品红[0m \033[35m:[35m前景[0m \033[45m:[45m背景[0m \033[95m:[95m前景亮色[0m \033[105m:[105m背景亮色[0m
[1m青色[0m \033[36m:[36m前景[0m \033[46m:[46m背景[0m \033[96m:[96m前景亮色[0m \033[106m:[106m背景亮色[0m
[1m白色[0m \033[37m:[37m前景[0m \033[47m:[47m背景[0m \033[97m:[97m前景亮色[0m \033[107m:[107m背景亮色[0m
```

:::details 上述输出可通过以下脚本得到

```bash
#! /usr/bin/bash
COLORS=("黑色" "红色" "绿色" "黄色" "蓝色" "品红" "青色" "白色")
CONTROLS=([3]="前景" [4]="背景" [9]="前景亮色" [10]="背景亮色")

for color_id in "${!COLORS[@]}"; do
    for control_id in "${!CONTROLS[@]}"; do
        escape_seq="\033[${control_id}${color_id}m"
        escape_seq_output="\\\\033[${control_id}${color_id}m"
        if [ $control_id -eq 3 ]; then
            echo -ne "\033[1m${COLORS[$color_id]}\033[0m"
        fi
        echo -ne " ${escape_seq_output}:${escape_seq}${CONTROLS[$control_id]}\033[0m"
    done
    echo
done
```

:::

###### 256 色（8 位）

*前景色*格式为 `\033[38;5;<id>m`；*背景色*格式为 `\033[48;5;<id>m`。  
其中，`<id>` 是 256 色表中的一个，值为 `0`~`255`。

规律：

- $0 \text{\textasciitilde} 7$ 标准色，同 `\033[<30~37>m`；
- $8 \text{\textasciitilde} 15$ 标准色亮色版本，同 `\033[<90~97>m`；
- $16 \text{\textasciitilde} 231$ $6 \times 6 \times 6$ 立方（216 色），$16 + (36 \times r) + (6 \times g) + b ~ (0 \leq r, g, b \leq 5)$；
- `232`~`255` 从黑到白的 24 阶灰度色。

```ansi
[48;5;0m   0[0m[48;5;1m   1[0m[48;5;2m   2[0m[48;5;3m[30m   3[0m[48;5;4m   4[0m[48;5;5m   5[0m[48;5;6m   6[0m[48;5;7m[30m   7[0m
[48;5;8m[30m   8[0m[48;5;9m[30m   9[0m[48;5;10m[30m  10[0m[48;5;11m[30m  11[0m[48;5;12m[30m  12[0m[48;5;13m[30m  13[0m[48;5;14m[30m  14[0m[48;5;15m[30m  15[0m

[48;5;16m  16[0m[48;5;17m  17[0m[48;5;18m  18[0m[48;5;19m  19[0m[48;5;20m  20[0m[48;5;21m  21[0m[48;5;22m  22[0m[48;5;23m  23[0m[48;5;24m  24[0m[48;5;25m  25[0m[48;5;26m  26[0m[48;5;27m  27[0m[48;5;28m  28[0m[48;5;29m  29[0m[48;5;30m  30[0m[48;5;31m  31[0m[48;5;32m  32[0m[48;5;33m  33[0m[48;5;34m[30m  34[0m[48;5;35m[30m  35[0m[48;5;36m[30m  36[0m[48;5;37m[30m  37[0m[48;5;38m[30m  38[0m[48;5;39m[30m  39[0m[48;5;40m[30m  40[0m[48;5;41m[30m  41[0m[48;5;42m[30m  42[0m[48;5;43m[30m  43[0m[48;5;44m[30m  44[0m[48;5;45m[30m  45[0m[48;5;46m[30m  46[0m[48;5;47m[30m  47[0m[48;5;48m[30m  48[0m[48;5;49m[30m  49[0m[48;5;50m[30m  50[0m[48;5;51m[30m  51[0m
[48;5;52m  52[0m[48;5;53m  53[0m[48;5;54m  54[0m[48;5;55m  55[0m[48;5;56m  56[0m[48;5;57m  57[0m[48;5;58m  58[0m[48;5;59m  59[0m[48;5;60m  60[0m[48;5;61m  61[0m[48;5;62m  62[0m[48;5;63m  63[0m[48;5;64m  64[0m[48;5;65m  65[0m[48;5;66m  66[0m[48;5;67m  67[0m[48;5;68m  68[0m[48;5;69m  69[0m[48;5;70m[30m  70[0m[48;5;71m[30m  71[0m[48;5;72m[30m  72[0m[48;5;73m[30m  73[0m[48;5;74m[30m  74[0m[48;5;75m[30m  75[0m[48;5;76m[30m  76[0m[48;5;77m[30m  77[0m[48;5;78m[30m  78[0m[48;5;79m[30m  79[0m[48;5;80m[30m  80[0m[48;5;81m[30m  81[0m[48;5;82m[30m  82[0m[48;5;83m[30m  83[0m[48;5;84m[30m  84[0m[48;5;85m[30m  85[0m[48;5;86m[30m  86[0m[48;5;87m[30m  87[0m
[48;5;88m  88[0m[48;5;89m  89[0m[48;5;90m  90[0m[48;5;91m  91[0m[48;5;92m  92[0m[48;5;93m  93[0m[48;5;94m  94[0m[48;5;95m  95[0m[48;5;96m  96[0m[48;5;97m  97[0m[48;5;98m  98[0m[48;5;99m  99[0m[48;5;100m[30m 100[0m[48;5;101m[30m 101[0m[48;5;102m[30m 102[0m[48;5;103m[30m 103[0m[48;5;104m[30m 104[0m[48;5;105m[30m 105[0m[48;5;106m[30m 106[0m[48;5;107m[30m 107[0m[48;5;108m[30m 108[0m[48;5;109m[30m 109[0m[48;5;110m[30m 110[0m[48;5;111m[30m 111[0m[48;5;112m[30m 112[0m[48;5;113m[30m 113[0m[48;5;114m[30m 114[0m[48;5;115m[30m 115[0m[48;5;116m[30m 116[0m[48;5;117m[30m 117[0m[48;5;118m[30m 118[0m[48;5;119m[30m 119[0m[48;5;120m[30m 120[0m[48;5;121m[30m 121[0m[48;5;122m[30m 122[0m[48;5;123m[30m 123[0m
[48;5;124m 124[0m[48;5;125m 125[0m[48;5;126m 126[0m[48;5;127m 127[0m[48;5;128m 128[0m[48;5;129m 129[0m[48;5;130m 130[0m[48;5;131m 131[0m[48;5;132m 132[0m[48;5;133m 133[0m[48;5;134m 134[0m[48;5;135m 135[0m[48;5;136m[30m 136[0m[48;5;137m[30m 137[0m[48;5;138m[30m 138[0m[48;5;139m[30m 139[0m[48;5;140m[30m 140[0m[48;5;141m[30m 141[0m[48;5;142m[30m 142[0m[48;5;143m[30m 143[0m[48;5;144m[30m 144[0m[48;5;145m[30m 145[0m[48;5;146m[30m 146[0m[48;5;147m[30m 147[0m[48;5;148m[30m 148[0m[48;5;149m[30m 149[0m[48;5;150m[30m 150[0m[48;5;151m[30m 151[0m[48;5;152m[30m 152[0m[48;5;153m[30m 153[0m[48;5;154m[30m 154[0m[48;5;155m[30m 155[0m[48;5;156m[30m 156[0m[48;5;157m[30m 157[0m[48;5;158m[30m 158[0m[48;5;159m[30m 159[0m
[48;5;160m 160[0m[48;5;161m 161[0m[48;5;162m 162[0m[48;5;163m 163[0m[48;5;164m 164[0m[48;5;165m 165[0m[48;5;166m[30m 166[0m[48;5;167m[30m 167[0m[48;5;168m[30m 168[0m[48;5;169m[30m 169[0m[48;5;170m[30m 170[0m[48;5;171m[30m 171[0m[48;5;172m[30m 172[0m[48;5;173m[30m 173[0m[48;5;174m[30m 174[0m[48;5;175m[30m 175[0m[48;5;176m[30m 176[0m[48;5;177m[30m 177[0m[48;5;178m[30m 178[0m[48;5;179m[30m 179[0m[48;5;180m[30m 180[0m[48;5;181m[30m 181[0m[48;5;182m[30m 182[0m[48;5;183m[30m 183[0m[48;5;184m[30m 184[0m[48;5;185m[30m 185[0m[48;5;186m[30m 186[0m[48;5;187m[30m 187[0m[48;5;188m[30m 188[0m[48;5;189m[30m 189[0m[48;5;190m[30m 190[0m[48;5;191m[30m 191[0m[48;5;192m[30m 192[0m[48;5;193m[30m 193[0m[48;5;194m[30m 194[0m[48;5;195m[30m 195[0m
[48;5;196m 196[0m[48;5;197m 197[0m[48;5;198m 198[0m[48;5;199m 199[0m[48;5;200m 200[0m[48;5;201m 201[0m[48;5;202m[30m 202[0m[48;5;203m[30m 203[0m[48;5;204m[30m 204[0m[48;5;205m[30m 205[0m[48;5;206m[30m 206[0m[48;5;207m[30m 207[0m[48;5;208m[30m 208[0m[48;5;209m[30m 209[0m[48;5;210m[30m 210[0m[48;5;211m[30m 211[0m[48;5;212m[30m 212[0m[48;5;213m[30m 213[0m[48;5;214m[30m 214[0m[48;5;215m[30m 215[0m[48;5;216m[30m 216[0m[48;5;217m[30m 217[0m[48;5;218m[30m 218[0m[48;5;219m[30m 219[0m[48;5;220m[30m 220[0m[48;5;221m[30m 221[0m[48;5;222m[30m 222[0m[48;5;223m[30m 223[0m[48;5;224m[30m 224[0m[48;5;225m[30m 225[0m[48;5;226m[30m 226[0m[48;5;227m[30m 227[0m[48;5;228m[30m 228[0m[48;5;229m[30m 229[0m[48;5;230m[30m 230[0m[48;5;231m[30m 231[0m

[48;5;232m 232[0m[48;5;233m 233[0m[48;5;234m 234[0m[48;5;235m 235[0m[48;5;236m 236[0m[48;5;237m 237[0m[48;5;238m 238[0m[48;5;239m 239[0m[48;5;240m 240[0m[48;5;241m 241[0m[48;5;242m 242[0m[48;5;243m 243[0m[48;5;244m[30m 244[0m[48;5;245m[30m 245[0m[48;5;246m[30m 246[0m[48;5;247m[30m 247[0m[48;5;248m[30m 248[0m[48;5;249m[30m 249[0m[48;5;250m[30m 250[0m[48;5;251m[30m 251[0m[48;5;252m[30m 252[0m[48;5;253m[30m 253[0m[48;5;254m[30m 254[0m[48;5;255m[30m 255[0m
```

:::details 生成色盘的屎山脚本

```bash
#! /usr/bin/bash
SEQ_PREFIX="\033[48;5;"
SEQ_SUFFIX="m"

for (( i=0; i<=15; i+=1 )); do
    addition=""
    if (( i == 3 || i >= 7 )); then addition="\033[30m"; fi # 变成黑色文字
    printf "${SEQ_PREFIX}${i}${SEQ_SUFFIX}${addition}%4d\033[0m" $i
    if (( (i + 1) % 8 == 0 )); then echo; fi
done
echo

for (( i=16; i<=231; i+=1 )); do
    addition=""
    if (( (i >= 34 && i <= 51) || (i >= 70 && i <= 87) || (i >= 100 && i <= 123) || (i >= 136 && i <= 159) || (i >= 136 && i <= 155) || (i >= 166 && i <= 195) || (i >= 202 && i <= 231) )); then
        addition="\033[30m"
    fi
    printf "${SEQ_PREFIX}${i}${SEQ_SUFFIX}${addition}%4d\033[0m" $i
    if (( (i - 15) % 36 == 0 )); then echo; fi
done
echo

for (( i=232; i<=255; i+=1 )); do
    addition=""
    if (( i >= 244 )); then addition="\033[30m"; fi
    printf "${SEQ_PREFIX}${i}${SEQ_SUFFIX}${addition}%4d\033[0m" $i
done
echo
```

:::

###### 真彩色（truecolor，24 位，~~16777216 色~~）

我认为这个相比 256 色更实用。现代终端（模拟器）基本上均支持它。

*前景色*格式为 `\033[38;2;<r>;<g>;<b>m`；*背景色*格式为 `\033[48;2;<r>;<g>;<b>m`。  
其中，`<r>`, `<g>`, `<b>` 值为 `0`~`255`。

例如：

```ansi
[0;38;2;241;137;19m\033[38;2;241;137;19m
[0;38;2;106;153;85m\033[38;2;106;153;85m
[0;48;2;181;206;168m[30m\033[48;2;181;206;168m
```

### OSC 序列

大部分 OSC 序列由 Xterm 首先定义，但是几乎所有终端模拟器都支持它们。

以下介绍两个常用的。

- **设置标题**：格式为 `\033]0;<title>\007`。`<title>` 即为你要设置的标题。
- **超链接**：格式为 `\033]8;;<uri>\007<text>\033]8;;\007`。  
`<uri>` 为链接，`<text>` 为显示的文字。  
通常显示为带虚线下划线的文字形式；通常按住 Ctrl 再单击才能访问链接。

## 项目

我为同学写过一个初中毕业礼物，写了处理输出样式的头文件（utils）。  
这就是用 ANSI 转义序列堆出来的。  
[Here rich.hpp](https://github.com/JoyWonderful/JoyWonderful/blob/main/one-file-object/rich.hpp).

小学毕业时，我也写过[类似的头文件](https://github.com/JoyWonderful/JoyWonderful/blob/main/one-file-object/clrftodsp.h)，但是使用 Windows Console API。  
没有写小学毕业礼物，只写了这个头文件，也没送出去。  
我甚至把这个头文件发到洛谷上了。

----------

:::note{.danger} 例外许可

由于[历史](#历史)部分主要修改、整理自 Wikipedia，百科使用 CC BY-SA 4.0 许可，要求使用“相同方式共享”。  
因此，本文许可为 [**CC BY-SA 4.0**](https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans "Creative Commons Attribution-ShareAlike 4.0 International（知识共享 署名—相同方式共享 4.0 协议 国际版）")。

:::