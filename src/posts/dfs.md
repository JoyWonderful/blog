---
title: 深度优先搜索
date: 2023-07-14 17:18:43 +08:00
tags: 
    - 递归
    - 搜索
    - 基础算法
categories: CourseNotes
math: true
---

## 前置知识：图论
引用广为人知的一句话：

> 图论 (Graph Theory) 是数学的一个分支。它以图为研究对象。图论中的图是由若干给定的点及连接两点的线所构成的图形，这种图形通常用来描述某些事物之间的某种特定关系，用点代表事物，用连接两点的线表示相应两个事物间具有这种关系。

<!--more-->

像深度优先搜索，其实也要用到“图”这个概念。其实，“图”体现了搜索（递归）的过程，计算机中的“图”有很多使用的场景。

## 概述
**深度优先搜索**（深搜），英文名 **Depth First Search**，简称 **DFS**。即从初始节点出发，按一定顺序不断地向下一节点扩展，达到条件则返回上一个节点，以此类推。这正是一个[递归](/posts/recursion)的过程。叫深搜是因为它递归的过程若形象来看是不断“加深”的，这样一搜到底也是递归的特性。  
深搜有一个很重要的一点：不能重复访问已经访问过的元素。深搜通常有很多路径（线）可以选择，若重复访问可能会造成死循环，因此需要定义一个数组存访问情况。（当然这个数组在很多其他的地方也可以运用到，也就是回溯，详见下面的例题）

## 深搜例题
例如：[洛谷 B3625](https://www.luogu.com.cn/problem/B3625) 这是一个很典型的迷宫问题，迷宫为 $n \times m$。`#` 为墙，`.`为空地。起点为左上角，终点在右下角。  
首先，就是路径搜索的问题，要搜索上、下、左、右的的路径，同时，还有几点条件不能搜：

- 目标位置不能为 `#`。（即为墙）
- 不能跃出边界，即 $0 \le x < n$，$0 \le y < m$（以 $0$ 为起点）
- 不能重复搜索

选择路径之后就扩展，将位置标记为已搜索。若终点被标记为搜索过，则输出 `Yes`，否则输出 `No`。

:::details 代码区

```cpp
#include <iostream>
#include <string>
using namespace std;

int n, m;
string a[103];
bool flag[103][103];

void dg(int x, int y)
{
    if(x - 1 >= 0 && a[x - 1][y] != '#' && flag[x - 1][y] == 0) // 当时没想到打表，老师也没说，就写屎山了
    {
        flag[x - 1][y] = 1;
        dg(x - 1, y);
    }
    if(x + 1 <= n - 1 && a[x + 1][y] != '#' && flag[x + 1][y] == 0)
    {
        flag[x + 1][y] = 1;
        dg(x + 1, y);
    }
    if(y - 1 >= 0 && a[x][y - 1] != '#' && flag[x][y - 1] == 0)
    {
        flag[x][y - 1] = 1;
        dg(x, y - 1);
    }
    if(y + 1 <= m - 1 && a[x][y + 1] != '#' && flag[x][y + 1] == 0)
    {
        flag[x][y + 1] = 1;
        dg(x, y + 1);
    }
}

int main()
{
    ios::sync_with_stdio(false);
    
    cin >> n >> m;
    for(int i = 0; i < n; i++) // 题目中说 (1, 1)，我在这儿以 (0, 0) 开始
    {
        cin >> a[i];
    }
    
    dg(0, 0);
    if(flag[n - 1][m - 1] == 1) cout << "Yes";
    else cout << "No";
    
    return 0;
}
```

:::

## 回溯
对于一些情况，我们需要回到上一次的结果。例如寻找路径数，若用纯 DFS，那路径肯定搜不全。因为深搜是不能重复搜索的，而寻找路径数可能需要走一些重复的路。此时，就可以用到回溯。即找完一条路径，再把它还原。

题目举例：[洛谷 P1605](https://www.luogu.com.cn/problem/P1605) 跟刚才的题目有一点像，只是字符变数字，而要输出方案数。跟刚才差不多：不能越界、不能走到障碍物、方格最多经过一次。  
当坐标等于终点的坐标时，答案加上一，将标记还原（回溯），`return` 回去。需要注意的是：起点一定要打上标记。

:::details 代码

```cpp
#include <cstdio>
using namespace std;

int n, m, t;
int sx, sy, fx, fy;
int sum = 0;
bool a[10][10];
bool flag[10][10];

void dg(int x, int y)
{
    if(x == fx && y == fy)
    {
        sum++ ;
        return;
    }
    if(x - 1 >= 1 && a[x - 1][y] != 1 && flag[x - 1][y] == 0)
    {
        flag[x - 1][y] = 1;
        dg(x - 1, y);
        flag[x - 1][y] = 0;
    }
    if(x + 1 <= n && a[x + 1][y] != 1 && flag[x + 1][y] == 0)
    {
        flag[x + 1][y] = 1;
        dg(x + 1, y);
        flag[x + 1][y] = 0;
    }
    if(y - 1 >= 1 && a[x][y - 1] != 1 && flag[x][y - 1] == 0)
    {
        flag[x][y - 1] = 1;
        dg(x, y - 1);
        flag[x][y - 1] = 0;
    }
    if(y + 1 <= m && a[x][y + 1] != 1 && flag[x][y + 1] == 0)
    {
        flag[x][y + 1] = 1;
        dg(x, y + 1);
        flag[x][y + 1] = 0;
    }
}

int main()
{
    scanf("%d %d %d", &n, &m, &t);
    scanf("%d %d %d %d", &sx, &sy, &fx, &fy);
    for(int i = 1; i <= t; i++)
    {
        int zx, zy;
        scanf("%d %d", &zx, &zy);
        a[zx][zy] = 1;
    }
    
    flag[sx][sy] = 1;
    dg(sx, sy);
    printf("%d\n", sum);
    
    return 0;
}
```

:::