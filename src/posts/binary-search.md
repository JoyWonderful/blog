---
title: 二分
date: 2023-05-21 15:22:53 +08:00
updated: 2026-07-05 17:40:23 +08:00
tags:
    - 基础算法
    - 优化
categories: CourseNotes
math: true
---

## 二分的意义
**优化**。顾名思义，将一整个**有序的**数列分成两个部分，不断缩小边界，查找某个数字。  
二分的时间复杂度为 $O(log\ 2\ n)$ 。

此时，我们学的还是整数二分以及浮点二分。

## 整数二分的两个模板
二分的前提是这个序列是**有序的**，也就是单调递增的。  
一般来说，二分会取中间值进行初始化，再判断这个中间值是否大于目标值。若是，则缩减左边界，否则缩减右边界。直至逼近答案。  
说“逼近”，是因为有时查找的元素不存在于序列中，那所二分出的答案是接近于的，但又是不正确的。所以要加上一个特判。除非说明给出的想查询的元素所有都是存在于序列中的。

<!--more-->

二分听起来还简单，但是实现起来~~可能对我来说~~还要多方面考虑。例如，当这样一段二分代码（假设数组 $a$ 的下标从 $1$ 开始）：
```cpp
for(int i = 1; i <= m; i++)
{
    int x;
    scanf("%d", &x);
    int l = 1, r = m;
    while(l < r)
    {
        int mid = (l + r) / 2;
        if(x > a[mid]) l = mid;
        else r = mid;
    }
}
```
此时， $l$ 或 $r$ 其实已经是正确答案了，但是它会陷入死循环。例如 $a$ 为 $1 \ 2 \ 3 \ 4 \ 5$， $x$ 为 $4$ 时，是这样的：

```math
{\color{green}1 \ 2 \ 3 \ 4 \ 5} \\
(\texttt{mid}=(1+5)/2=3, a[\texttt{mid}]=3, 4>3, l=\texttt{mid}=3, r=5) \\
{\color{red}1 \ 2 \ }{\color{green} 3 \ 4 \ 5} \\
(\texttt{mid}=(4+5)/2=4, a[\texttt{mid}]=4, 4=4, l=3, r=\texttt{mid}=4) \\
{\color{red}1 \ 2 \ }{\color{green} 3 \ 4 \ }{\color{red}5} \\
(\texttt{mid}=(3+4)/2=3, a[\texttt{mid}]=3, 4>3, l=\texttt{mid}=3, r=4) \\
{\color{red}1 \ 2 \ }{\color{green} 3 \ 4 \ }{\color{red}5} \\
(\texttt{mid}=(3+4)/2=3, a[\texttt{mid}]=3, 4>3, l=\texttt{mid}=3, r=4) \\
{\color{red}1 \ 2 \ }{\color{green} 3 \ 4 \ }{\color{red}5} \\
(\texttt{mid}=(3+4)/2=3, a[\texttt{mid}]=3, 4>3, l=\texttt{mid}=3, r=4) \\
\textup{...Forever...}
```

因此，我们为什么不把 $l$ 的赋值加上一个呢？这样就不会无限循环下去了。就像这样：

```cpp
for(int i = 1; i <= m; i++)
{
    int x;
    scanf("%d", &x);
    int l = 1, r = m;
    while(l < r)
    {
        int mid = (l + r) / 2;
        if(x > a[mid]) l = mid + 1;
        else r = mid;
    }
}
```
这就是整数二分的一个模板了。又或者：
```cpp
int x;
scanf("%d", &x);
int l = 1, r = n;
while(l < r)
{
    int mid = (l + r + 1) / 2;
    if(x > a[mid]) l = mid;
    else r = mid - 1;
}
```

## 浮点数二分
其实，任何一个算法都是相通的。二分也是一样。浮点二分可能比整数二分简单一些。~~（出自于我们老师之口）~~

但，最重要的就是**精度问题**。  
它决定了 ${\texttt{TLE}}$ 和 $\texttt{WA}$ 以及 $\texttt{AC}$ 之间的差距。详见 [洛谷P3743](https://www.luogu.com.cn/problem/P3743) 以及 [我可怜的评测记录](https://www.luogu.com.cn/record/list?user=857826&pid=P3743&language=28&orderBy=0&status=&page=1)。这就是残酷的现实！代码是简单了很多，但是要确定***精度***!!!

好了，模版代码~~大放送~~：
```cpp
double l = -1e10, r = 1e10; // 此处数字仅作为一个演示值！！请不要把这个数字当成固定的写法，此处的数字应为题目提供的数据。
while(r - l > 1e-6) // 此处的数字同上，模板应为 1e-x
{
    double mid = (l + r) / 2; // 这就是老师所说的了：它是浮点，管他什么整除呢，除就是了！！！什么 mid r l ++ -- 的，去它的！！ (doge)
    if(/*这里是判断条件，可以是check函数(二分答案)，可以是普通查找*/)
    {
        l = mid; // 此处仅为演示，请根据条件写 l=mid 或 r=mid
    }
    else
    {
        r = mid; // 同上
    }
}
```

## 二分答案
当我们想要枚举时，二分自然就是枚举的首选前提。一般来说，二分答案会写一个函数，传统名称为 `check` 。  
其实它还是二分，只不过判断的条件由单一的 `valuname > name[mid]` 变成了一个判断函数而已。~~我是不是没讲清楚啊~~ $\text{\color{white}但也没什么好讲的了}$

----------

- [x] Not Friendly
- [ ] That's Good