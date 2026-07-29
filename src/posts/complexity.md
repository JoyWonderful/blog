---
title: 时间复杂度和空间复杂度
date: 2023-05-08 20:13:18 +08:00
updated: 2026-07-05 18:03:00 +08:00
tags: 语言入门
categories: CourseNotes
math: true
---

## 时间复杂度

时间复杂度，就是**电脑运行一段程序所需要的时间**。

另外，电脑每秒可以运行 $1 \text{e} 8$ 次。($x \ \text{e} \ y$ 代表 $x \times 10^y$，即 $1 \text{e} 8 = 100000000$)

时间复杂度记作 $O(n)$。

<!--more-->

<hr>

普通的时间复杂度**\(常数时间\)**记作 $O(1)$，为一段最简单的程序的时间复杂度。

如以下程序的时间复杂度为 $O(1)$：

```cpp
#include <stdio.h>
using namespace std;

int main()
{
    int n;
    
    return 0;
}
```

没错，什么都没有干，只创建了一个变量。

<hr>

其他时间复杂度(我所知道的很少，只会 $O(n^n)$)，有几个循环时间复杂度就为 $n$。

如以下程序的时间复杂度为 $O(i^2)$

```cpp
#include <stdio.h>
using namespace std;

int main()
{
    for(int i = 0; i < 10; i++)
    {
        for(int j = 0; j < 10; j++)
        {
            printf("%d", i);
        }
    }
    
    return 0;
}
```

<hr>

~~老师的~~练习:

[数位和](https://vjudge.net/problem/%E8%AE%A1%E8%92%9C%E5%AE%A2-T3092)
<!--https://www.luogu.com.cn/problem/U262459-->

大意：输入一个整数 $x(0 \le x \le 10^6)$，求每一位加起来和为 $x$ 的自然数最小是多少。

:::note{.warning} 注意

这道题的数据范围很大，($0\le x \le 10^6$)，双重循环直接炸。  
双重循环复杂度为：$O((10^6)^2)$。

:::

所以需要**额外的技巧**：  
考虑到一个*各个数位之和为定值*的数要最小，则位数最少。  
因此偏向个位的数字均为 $9$。

:::details 提交代码

```cpp
#include <stdio.h>
using namespace std;

int main()
{
    int x;
    scanf("%d", &x);
    
    int a = x / 9, b = x % 9;
    printf("%d", b);
    for(int i = 0; i < a; i ++)
    {
        printf("9");
    }
    
    return 0;
}
```

:::

## 空间复杂度

和时间复杂度差不多，只不过这个是和**内存**有关的。

~~不多讲了。~~就比如：

```cpp
#include <stdio.h>
using namespace std;

int main()
{
    int a[100];
    
    return 0;
}
```

这里，我们定义了一个类型为 `int` 的数组，`int` 占4字节，产生的空间就为 $4 \times 1000$ 字节。

这就是**空间复杂度**。