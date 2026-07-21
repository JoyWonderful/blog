---
title: 使用 gdb 调试代码
tags: 编译
categories: Programming
date: 2023-08-30 11:09:49 +08:00
---


这几天刚去学习了一下用 gdb 调试代码，在这儿记下来。

首先，编译代码的时候需要加上 `-g` 选项，说明要加上调试信息，这样才可以正常调试。例如：

```bash
$ g++ -g oi.cpp -o oi.exe
```

随后，即可使用 gdb 打开文件进行调试。直接使用 `gdb [file name]` 即可。

```bash
$ gdb oi
GNU gdb (GDB) 7.8.1
Copyright (C) 2014 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
# ...[很多信息]
For help, type "help".
Type "apropos word" to search for commands related to "word"...
Reading symbols from oi...done. # 成功信息
(gdb)  # 现在可以键入调试命令了
```

<!--more-->

gdb 一些常用调试命令（命令缩写）的详细解释：

## 代码、路径

### list

命令缩写是 `l`。  
可以查看代码，后面跟上数字说明要查看**第几行附近的代码**，或者跟上函数名说明要查看这个**函数附近的代码**。若没有参数则继续从上一次最后显示的那一行显示下去。

例如：

```bash
(gdb) l 17
12          for(int i = 0; s[i] != '\0'; i++)
13          {
14              char l, r;
15              if((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= '0' && s[i] <= '9'))
16              {
17                  l = s[i]; # 这是代码外的注释：行显示在中间。
18                  ans[cnt++] = s[i];
19              }
20              if(s[i] == '-')
21              {
(gdb) list main
3
4       int p1, p2, p3, cnt;
5       char s[200];
6       char ans[7000];
7       int main()
8       {
9           scanf("%d %d %d\n", &p1, &p2, &p3);
10          scanf("%s", &s);
11
12          for(int i = 0; s[i] != '\0'; i++)
(gdb) l # 继续显示
13          {
14              char l, r;
15              if((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= '0' && s[i] <= '9'))
16              {
17                  l = s[i];
18                  ans[cnt++] = s[i];
19              }
20              if(s[i] == '-')
21              {
22                  r = s[i + 1];
```

### info source

可以简写为 `i source`
获取代码信息，可以查看 gdb 获取的代码路径是否正确。

例如：
```bash
(gdb) info source
Current source file is oi.cpp
Compilation directory is D:\MyCode
Located in D:\MyCode\oi.cpp
Contains 65 lines.
Source language is c++.
Compiled with DWARF 2 debugging format.
Does not include preprocessor macro info.
```

### file

参数是文件路径，可以重新打开一个文件调试。  
例如：

```bash
(gdb) file D:\\MyCode\\oi
Reading symbols from D:\MyCode\oi...done.
```

### cd

同任何命令行的 cd 命令一样，切换工作文件夹。

## 程序运行时

`run` 命令。
命令缩写是 `r`。  
**运行程序**，直至遇到断点或程序结束。

`print` 命令。
命令缩写是 `p`。
在**程序运行**时输出变量（数组）的值。

`break` 命令。  
命令缩写是 `b`，参数是行号或函数名。  
表示在函数或第几行设置断点。  
例如：

```bash
(gdb) break main
Breakpoint 1 at 0x40153d: file oi.cpp, line 9.
(gdb) b 43
Breakpoint 2 at 0x401722: file oi.cpp, line 43.
```

`continue` 命令。
命令缩写是 `c`。
遇到断点后使用，**继续执行**，运行到下一个断点或程序结束。

`delete` 命令。
命令缩写是 `d`。
删除断点，参数是**断点编号**。就是 `Breakpoint 1 at []: file [], line [].` Breakpoint 后面的数字。

`next` 命令。
命令缩写是 `n`。
执行当前行语句，如果当前行有函数调用，则将其视为一个整体执行。

熟知以上这些，就可以简单地调试代码了。  
一个实例：

```bash
(gdb) break 25
Breakpoint 1 at 0x4016b1: file oi.cpp, line 25.
(gdb) break 32
Breakpoint 2 at 0x4016ea: file oi.cpp, line 32.
(gdb) break 35
Breakpoint 3 at 0x4016fe: file oi.cpp, line 35.
(gdb) run
Starting program: D:\MyCode\oi.exe
[New Thread 37568.0x97c8]
[New Thread 37568.0x25fc]
2 3 2
a-d-d

Breakpoint 2, main () at oi.cpp:33
33                          l = l - 'a' + 'A';
(gdb) print p1
$2 = 2
(gdb) print p2
$3 = 3
(gdb) p p3
$4 = 2
(gdb) c
Continuing.

Breakpoint 3, main () at oi.cpp:37
37                  if(p3 == 1)
(gdb) print l
$5 = 65 'A'
(gdb) print r
$6 = 68 'D'
(gdb) continue
Continuing.

Breakpoint 1, main () at oi.cpp:25
25                      ans[cnt++] = '-';
(gdb) print ans[cnt - 1]
$7 = 100 'd'
(gdb) print ans
$8 = "aCCCBBBd", '\000' <repeats 6991 times>
(gdb) continue
Continuing.
aCCCBBBd-d
[Thread 37568.0x25fc exited with code 0]
[Inferior 1 (process 37568) exited normally] # 程序结束
```

## 获取信息

获取信息通常使用 `info` 命令。就介绍常用的那些。

`info breakpoint`  
可以简写为 `i b`，查看断点信息。

`info registers`  
可以简写为 `i reg`，查看寄存器信息。

`info stack`  
可以简写为 `i s`，查看堆栈使用，在递归的时候很有效。

实例：

```bash
(gdb) info breakpoint
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x000000000040153b in dfs(int) at oi.cpp:10
        breakpoint already hit 5 times
2       hw watchpoint  keep y                      x
(gdb) info reg
rax            0x4      4
rbx            0x1      1
rcx            0x4      4
rdx            0x3      3
rsi            0x11     17
rdi            0xc41440 12850240
rbp            0x6cfcf0 0x6cfcf0
rsp            0x6cfcc0 0x6cfcc0
r8             0xc43d10 12860688
r9             0x1      1
r10            0xc40000 12845056
r11            0x6ceac0 7137984
r12            0x1      1
r13            0x8      8
r14            0x0      0
r15            0x0      0
rip            0x40153b 0x40153b <dfs(int)+11>
eflags         0x206    [ PF IF ]
cs             0x33     51
ss             0x2b     43
ds             0x0      0 
es             0x0      0 
fs             0x0      0 
gs             0x0      0
(gdb) info stack
#0  dfs (x=10) at oi.cpp:10
#1  0x00000000004015b5 in dfs (x=9) at oi.cpp:20
#2  0x00000000004015b5 in dfs (x=8) at oi.cpp:20
#3  0x00000000004015b5 in dfs (x=7) at oi.cpp:20
#4  0x00000000004015b5 in dfs (x=6) at oi.cpp:20
#5  0x00000000004015b5 in dfs (x=5) at oi.cpp:20
#6  0x00000000004015b5 in dfs (x=4) at oi.cpp:20
#7  0x00000000004015b5 in dfs (x=3) at oi.cpp:20
#8  0x00000000004015b5 in dfs (x=2) at oi.cpp:20
#9  0x00000000004015b5 in dfs (x=1) at oi.cpp:20
#10 0x00000000004015b5 in dfs (x=0) at oi.cpp:20
#11 0x000000000040163c in main () at oi.cpp:30
```

## 其他

`shell` 命令。  
可以执行终端命令。

`quit` 命令。  
简写为 `q`。  
退出 gdb 调试。
