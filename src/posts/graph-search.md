---
title: 普通图的储存和遍历
date: 2024-04-13 13:29:52 +08:00
tags: 
    - 搜索
    - 树
categories: CourseNotes
---

其实之前也写过关于[图的储存](/posts/graph-tree/#树的储存)的文章，但是没写全，也没有写代码。在这里把最近复习的重新补上来。  
这里只讲了三种储存：邻接矩阵、邻接表、链式前向星，对于遍历，只记录写法较简单的邻接表。

<!--more-->

## 储存
题目：[洛谷 B3643 图的存储](https://www.luogu.com.cn/problem/B3643)

### 邻接表
由于这个方法是比较常用的，把它提到前面。

用一个**动态数组**（通常是 STL 提供的 `std::vector`）存储每一个结点的出边。二维数组 e 中，`e[i]` 中的每一个元素 j 代表结点有一条从 i 到 j 的边。  
对于无向图，若 u, v 存在边，则将 `v` 加入 `e[u]`，将 `u` 加入 `e[v]`。  
对于路径权值，通常使用结构体（包含两个变量）。分别代表该出边的权值和连接到的结点。

示例：

```cpp
vector<int> e[1003];
int main()
{
    scanf("%d %d", &n, &m); // n 代表该图的结点数，m 是该图的边数
    
    for(int i = 1; i <= m; i++)
    {
        int u, v; // 输入 u, v 表示 u 和 v 之间有一条边
        scanf("%d %d", &u, &v);
        e[u].push_back(v);
        e[v].push_back(u); // 这里是无向图的写法
    }
}
// 以下关于“储存”代码示例的输入也按照上面的格式
```

邻接表的空间、时间复杂度都比较优异，平常一般使用它。  
下面所写的遍历就使用了邻接表

### 邻接矩阵（一般不用）
用一个**二维的布尔数组**存储。数组 a 中，`a[i][j]` 如果为 1 则代表着编号为 i 的结点与编号为 j 的结点之间存在一条从 i 到 j 的边。对于无向图，若 u, v 间存在边，直接使 `a[u][v]` 和 `a[v][u]` 同时为 1 即可（代表着 u 和 v 之间有一条双向边）。

示例：

```cpp
bool a[1003][1003];
int main()
{
    scanf("%d %d", &n, &m);
    
    for(int i = 1; i <= m; i++)
    {
        int u, v;
        scanf("%d %d", &u, &v);
        a[u][v] = 1;
        a[v][u] = 1;
    }
}
```

使用它存图，时间复杂度（遍历整张图）和空间复杂度自然都很大。一般只会在边数接近点数平方的图（**稠密图**）上使用。

### 链式前向星
实际上就是用链表重现邻接表。详见代码：

```cpp
struct node
{
    int to, next; // to: 边的终点  next: 下一条边
};
const int TEMP = 2e6 + 100;
int head[TEMP], cnt = 0; // head[i]: 以 i 为起点的第一条边的编号  cnt: 当前边的编号
node tree[TEMP]; // 这里是本体数组

void add(int a, int b)
{
    ++cnt;
    tree[cnt].to = b;
    tree[cnt].next = head[a];
    head[a] = cnt;
}

int n, m;
int main()
{
    scanf("%d", &n, &m);
    for(int i = 1; i <= m; i++)
    {
        int u, v;
        scanf("%d %d", &u, &v);
        add(u, v);
        add(v, u);
    }
}
```

> 链式前向星主要用于边比较多，顶点比较少的情况  
> 链式前向星的优点：比邻接表还省空间，可以解决某些卡空间的问题，删除边也很方便，只需要更改next指针的指向即可。  
> 根据图的疏密选择存储方式，一般情况下用邻接表，卡空间时间这些要求比较高的题目或者需要删除边操作的用链式前向星。
> [https://www.acwing.com/blog/content/6994/](https://www.acwing.com/blog/content/6994/)

## 遍历
以下的遍历都使用**邻接表**。以**有向图**为例。

直接使用代码吧，解释都在注释了。

::::tabs{#searchGraph @tab=2}

:::tab DFS

遍历了**从结点编号为 1 到最后一个结点（编号为 n）的所有路径**，

```cpp
// 有向图（不保证无环）
int n; // 结点个数
vector<int> e[1503]; // e: 一个图的邻接表
bool flag[1503]; // 记录该结点（同一条路径）是否访问过
// 递归实现
void dfs(int now) // now: 当前结点
{
    if(now == n) return; // 遍历到了最后一个结点
    flag[now] = 1; // 防止重复走一个环
    for(int i = 0; i < e[now].size(); i++)
    {
        if(!flag[now]) dfs(e[now][i]);
    }
    flag[now] = 0; // 搜索回溯，若只要遍历一次结点，请把这行代码注释掉
}
```

所有的搜索遍历都大同小异。

:::

:::tab BFS (更常用)

遍历了**所有结点**

```cpp
// 有向图（不保证无环）
int n; // 结点个数
vector<int> e[1503]; //  一个图的邻接表
bool flag[1503]; // 记录该结点（同一条路径）是否访问过

queue<int> q;
for(int i = 0; i < e[1].size(); i++)
{
    q.push(e[1][i]); // 从结点 1 开始访问，就先把它连向的所有加入队列
}
while(!q.empty()) {
    int now = q.front();
    q.pop();
    for(int i = 0; i < e[now].size(); i++)
    {
        if(!flag[e[now]]) // 没有访问过
        {
            q.push(e[now]);
            flag[e[now]] = 1;
        }
    }
}
```

:::

::::

一个例题：[洛谷 P1807 最长路](https://www.luogu.com.cn/problem/P1807)。  
简述：n 个顶点，m 条边的**带权有向无环图**，各结点编号为 1 到 n。求从 1 到 n 的最长路径，输出最大权值。若无法从 1 到达 n 输出 -1。  
输入：n(`1<=n<=1500`), m(`0<=m<=5e4`)。接下来 m 行，每行三个整数 u, v, w(`-1e5<=w<=1e5`)，表示有一条从 u 到 v 的有向边，边权为 w。

:::details 解题（DFS）

```cpp
#include <cstdio>
#include <vector>
using namespace std;

struct node {
    int next, weight; // next: 该有向边指向的结点  wei: 该有向边的权值
};

        // /=> 设置为负数是因为防止负权值
int n, m, maxw = -0x7fffffff, flag[1503]; // maxw: 最大权值（从 1 到 n 的最长路权值）  flag[i]: 从 1 到 i 的最大权值
bool isvis; // 是否访问到第 n 个结点
vector<node> e[1503]; // 邻接表

void dfs(int now, int wei) // now: 当前访问到的结点  wei: 当前走到这个结点的权值
{
    if(now == n) // 访问到第 n 个结点
    {
        isvis = 1;
        maxw = (wei > maxw) ? (wei) : (maxw); // 将最大权值替换成本次所得结果
        return;
    }
    // /=> 剪枝
    if(flag[now] != 0 && flag[now] >= wei) return; // 上次的答案比本次运算结果要大，本次结果一定偏小，直接退出
    flag[now] = wei; // 记录本次（更大）的答案

    for(int i = 0; i < e[now].size(); i++)
    {
        dfs(e[now][i].next, wei + e[now][i].weight); // 按次序遍历当前结点的下一个结点
    }
}

int main()
{
    scanf("%d %d", &n, &m); // 存图开始（邻接表）
    for(int i = 1; i <= m; i++)
    {
        int u, v, w;
        node data;
        scanf("%d %d %d", &u, &v, &w);
        data.next = v;
        data.weight = w;
        e[u].push_back(data);
    } // 存图结束

    dfs(1, 0); // 从 1 开始访问，最初的权值为 0
    if(isvis) // 到达过第 n 个结点
    {
        printf("%d\n", maxw);
        return 0;
    }
    printf("-1\n"); // 没有到达

    return 0;
}
```

:::