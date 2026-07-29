---
title: C++ STL
date: 2024-08-01 08:01:00 +08:00
categories: Programming
tags:
  - 队列
  - 排序
  - 搜索
---


## 概述

STL，即为**标准模板库**，是 Standard Tenplate Library 的简称。它里面包含容器、算法等。  
因为是 C++ 标准库，所以以下提到的容器、函数等都处于 `std` 命名空间中。

有时候写题目时很有帮助。

<!--more-->

## 容器


### vector

*In header `<vector>`.*

`vector` 是动态的连续数组。创建时尖括号中填写要存的数据类型。

**成员函数**：

**构造**（创建时可选）(`vector()`)：  
构造的参数有两个，第一个填写容器大小（将 vector 变为定长的），第二个填写初始化数字（可选）。  
例如：`std::vector<int> a(3, 5)` 创建一个数据类型为 int，长度为 10，内容为 {5, 5, 5} 的 vector。

- 访问
    - `at(pos)`: 带越界检查的访问，若越界抛出 `std::out_of_range` 类型的异常。
    - `operator[]`: 访问指定元素。
    - `front()`: 访问第一个元素。
    - `back()`: 访问最后一个元素。
- 迭代器（弄不懂）
    - `begin()`: 返回指向起始的迭代器。
    - `end()`: 返回指向末尾的迭代器。
- 容量
    - `empty()`: 返回是否为空。
    - `size()`: 返回容器大小。
- 修改
    - `push_back(value)`: 向末尾追加 `value`。
    - `clear()`: 清除所有元素，此后调用 `size()` 返回 0。
- 其他
    - `operator=`: 将一个 vector 容器赋值给另一个容器。

例子：

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> a; // int 类型的容器
    vector<short> b(10); // short 类型的容器，大小为 10
    vector<int> c(100, 1); // int 类型，大小为 100，全部初始赋值为 1

    a.push_back(114); // 追加 114
    a.push_back(514);
    printf("a:: size:%d {%d, %d}\n", a.size(), a[0], a.at(1)); // a:: size:2 {114, 514}
    // 大小；访问

    printf("b:: size:%d {", b.size()); // 大小已确定为 10
    b[5] = 32767;
    for(int i = 0; i < 10; i++)
    {
        printf("%d", b[i]);
        if(i != 9) printf(", ");
        else printf("}\n");
    }
    // b:: size:10 {0, 0, 0, 0, 0, 32767, 0, 0, 0, 0}
    
    c.back() = 2; // 将最后一个元素赋值为 2
    printf("c:: front:%d back:%d  ", c.front(), c.back());
    c.clear();
    printf("afterClear-> size: %d", c.size());
    // c:: front:1 back:2  afterClear-> size: 0
}
/*
a:: size:2 {114, 514}
b:: size:10 {0, 0, 0, 0, 0, 32767, 0, 0, 0, 0}
c:: front:1 back:2  afterClear-> size: 0
*/
```


### stack/queue

*In header `<stack>`.*  
stack，STL 的栈，提供先进后出 (FILO, First In Last Out) 的结构。

*In header `<queue>`.*  
queue，STL 的队列，提供先进先出 (FIFO, First In First Out) 的结构。

在[数据结构：队列和栈](/posts/stackandqueue)讲过，不再赘述


### priority_queue

*In header `<queue>`.*

优先队列，默认为最大优先队列（大的元素在上）(`std::less<typename>`)。填写模板形参时，第一个填写数据类型，第二个填写容器（默认和通常都写 `vector<typename>`，第三个填写该如何比较（默认为 `std::less<typename>`，通常另外填 `std::greater<typename>` 最小优先队列）。

它的成员函数与[数据结构：队列和栈 **#**栈](/posts/stackandqueue/#栈)类似，不再赘述。

**例子**：

```cpp
#include <queue>
#include <cstdio>
using namespace std;

priority_queue<int, vector<int>, greater<int>> a; // 小数在上，升序
priority_queue<int> b; // priority_queue<int, vector<int>, less<int>> b; // 大数在上，降序
int mp[6] = {10, 5, 20, 1, 35, 30};
int main()
{
    for(int i = 0; i < 6; i++)
    {
        a.push(mp[i]);
        b.push(mp[i]);
    }

    printf("a:  ");
    while(!a.empty())
    {
        printf("%2d ", a.top());
        a.pop();
    }
    printf("\nb:  ");
    while(!b.empty())
    {
        printf("%2d ", b.top());
        b.pop();
    }
    printf("\n");

    return 0;
}
/*
a:   1  5 10 20 30 35 
b:  35 30 20 10  5  1
*/
```



## 函数

*In header `<algorithm>`.*


### lower-bound / upper-bound

`lower-bound(first, last, value)`:  
`first`, `last` 为要查找的起始和终止范围；  
`value` 为要查找的值。  
返回第一个**大于等于** `value` 的值的地址（迭代器）。

`upper_bound` 参数同上，返回第一个**大于** `value` 的值的地址（迭代器）。

**例子**：[最长上升/公共子序列 **#**第二种](/posts/lcs/#第二种)


### sort

见 [`<algorithm>` 头文件 `sort()` 排序](/posts/sort/#algorithm-头文件-sort-排序)


### swap

两个参数，交换元素。
