---
title: 一些有用的东西又没有用的东西
date: 2023-05-17 20:13:18 +08:00
updated: 2026-07-05 17:54:23 +08:00
tags: 语言入门
categories: CourseNotes
math: true
---

:::note{.danger} 过时观点警告

这些东西**以前**对我大概没用，但是**现在**我认为还是很有必要学习的。  
~~所以说我为什么要更新这个。~~

:::

## 宏定义和类型定义

*宏定义*，**将一个指令导向另一个指令**。<!--more-->宏定义属于**预处理指令**，使用规范为：

```cpp
#define [标识符] [常量]
```

与变量不同的是：宏定义可以理解为把一个文本**替换**成另一个文本。比如说：

```cpp
#include <cstdio>
#define a 3 + 2
using namespace std;

int main()
{
    printf("%d", a * 3);
    
    return 0;
}
```

和

```cpp
#include <cstdio>
using namespace std;

int main()
{
    int a = 3 + 2;
    printf("%d", a * 3);
    
    return 0;
}
```

使用了 `#define` 的输出 $9$，使用了 `int` 的输出 $15$。这是因为 `#define` 只是把 $a$ 替换为了 $3+2$，因此先算 $2 \times 3=6$，再算 $6+3=9$，而 `int` 将 $a$ 定为 $5$，再算 $5 \times 3=15$。从这些角度来看，`define` 只是一个“替换”的操作。

----------

*类型定义*，**将变量类型导向简单的标识符**。类型定义属于**语句**，使用规范为：

```cpp
typedef [变量类型] [标识符];
```

与 `#define` 不同的是：`#define` 属于**预处理指令**，需要在预处理器处理。而且 `#define` 可以将任何指令或字符指向标识符；而 `typedef` 属于**语句**，需要在编译器中编译。且 `typedef` 只支持将变量类型指向标识符。例如：

```cpp
#include <cstdio>
#define pnt printf // printf可以写成pnt
#define scn scanf // scanf可以写成scn
using namespace std;

int main()
{
    typedef long long ll; // long long可以写成ll
    // typedef scanf scn ; -> 这句话是错误的
    ll a; // 定义了变量a，类型为long long
    scn("%lld", &a) ;
    pnt("%lld", a + 1) ;
    
    return 0 ;
}
```

## 常量

无论是 `int` 还是 `double` 类型，他们都是变量，即随时可以改变。当想用到不用改变的量时，就要用到**常量**了。

定义一个常量很简单，只需要在变量类型前加上一个 `const` 就行了。例如：

```cpp
#include <cstdio>
using namespace std;

const int a = 100;
int b[a] = {0, 1, 2};
int main()
{
    for(int i = 0; i < 100; i++)
    {
        printf("%d\n", b[i]);
    }
    
    return 0 ;
}
```

在这里，我们建立了一个名为 $a$ 的常量，其值为 $100$。随后定义一个名为 $b$ 的数组，大小为 $a$， $a=100$， $b$ 数组的大小就是 $100$。

~~一般来说~~对于我来说，常量的作用不算特别大，但是拿来定义数组却很方便。

## 有符号和无符号

*有符号*， `signed`，符号即为 $-$，在一般的数据定义中，**都是**有符号的类型。*无符号*， `unsigned`，即**没有**复数，正数数据范围会大很多。比如普通的 `int`（`signed int`）数据范围是 $-2147483648 \sim 2147483647$ 而无符号 `int`（`unsigned int`）数据范围是 $0 \sim 4294967295$，这是因为 `unsigned int` 将负数部分拿来存正数部分，所以可以存的正数会大很多。

在变量类型中，只有 `signed` 会被认作 `signed int`；只有 `unsigned` 也会被认作 `unsigned int`；不带 `signed` 和 `unsigned` 的任何数据类型都会被认做有符号 `signed` 数据类型。因此，在某些时候主函数 `int main()` 也可以写成 `signed main()`。

## 读写数据
当数据很大时，直接从控制台输入是不可能的。同样地，控制台输出数据过多也不方便比较数据。

```cpp
#include <stdio.h>
using namespace std;

int main()
{
    FILE *fpi = freopen("test.in", "r", stdin);
    FILE *fpo = freopen("test.out", "w", stdout);

    fclose(fpi);
    fclose(fpo);
    return 0;
}
```

```bash
fc test.out test.ans
code -d test.out test.ans
```
