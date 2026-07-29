---
title: 最小生成树
date: 2024-08-16 17:50:32 +08:00
updated: 2026-06-21 21:30:27 +08:00
categories: CourseNotes
tags:
  - 树
  - 图论
math: true
---

## 前置概念

**生成树** 即从一个*连通图*中选择结点数减一条边构成一个树。  
最小生成树，即所有生成树中边权和*最小*。

<!--more-->

## Kruskal

克鲁斯卡尔（？好像这么译），使用贪心。  
它的思想就是从小到大加入边，同时避免形成环（使用[并查集](/posts/disjoint-set-union/)判断两点是否联通【是否在同一集合中】，这是树的要求）。当加入的边数为结点数减一时，就可以退出了。

### 例题

:::details 洛谷 P3366 【模板】最小生成树

#### 输入格式

第一行包含两个整数 $N,M$，表示该图共有 $N$ 个结点和 $M$ 条无向边。  
接下来 $M$ 行每行包含三个整数 $X_i,Y_i,Z_i$，表示有一条长度为 $Z_i$ 的无向边连接结点 $X_i,Y_i$。

#### 输出格式

如果该图连通，则输出一个整数表示最小生成树的各边的长度之和。如果该图不连通则输出 `orz`。

#### 输入

```
4 5
1 2 2
1 3 2
1 4 3
2 3 4
3 4 3
```

#### 输出

```
7
```

#### 说明/提示

数据规模：  
对于 $20\%$ 的数据，$N\le 5$，$M\le 20$。  
对于 $40\%$ 的数据，$N\le 50$，$M\le 2500$。  
对于 $70\%$ 的数据，$N\le 500$，$M\le 10^4$。  
对于 $100\%$ 的数据：$1\le N\le 5000$，$1\le M\le 2\times 10^5$，$1\le Z_i \le 10^4$，$1\le X_i,Y_i\le N$。


样例解释：

 ![](https://cdn.luogu.com.cn/upload/pic/2259.png) 

所以最小生成树的总边权为 $2+2+3=7$。

:::

:::details 代码

```cpp
#include <cstdio>
#include <algorithm>
using namespace std;

const int TMP = 5e5 + 3;
int fa[TMP]/*并查集*/, n/*结点数*/, m/*边数*/, ans;

struct node
{
    int x, y, z; // x --z--> y
} a[TMP];
bool cmp(node a, node b)
{
    return a.z < b.z; // 按照边权从小到达排序（思想）
}

// 并查集模板：这里只使用路径压缩
void init() // 初始化
{
    for(int i = 1; i <= n; i++)
    {
        fa[i] = i;
    }
}
int find(int num) // 寻找其所在集合根节点
{
    if(fa[num] != num) fa[num] = find(fa[num]);
    return fa[num];
}
void merge(int x, int y) // 合并
{
    fa[find(fa[x])] = find(fa[y]);
}

int main()
{
    scanf("%d %d", &n, &m);
    init();
    for(int i = 1; i <= m; i++)
    {
        scanf("%d %d %d", &a[i].x, &a[i].y, &a[i].z);
    }
    sort(a + 1, a + m + 1, cmp); // 按照边权从小到达排序
    
    int cnt = 0; // 加入的边数
    for(int i = 1; i <= m; i++)
    {
        if(cnt == n - 1) // 已经是生成树了（加入的边为 n - 1），不用再找
        {
            break;
        }
        if(find(a[i].x) != find(a[i].y)) // 判断 x, y 是否联通（在同一集合中），避免形成环
        {
            merge(a[i].x, a[i].y); // 如果不在同一集合中，就合并（加入了边）
            ++cnt;
            ans += a[i].z;
        }
    }
    if(cnt >= n - 1) printf("%d\n", ans);
    else printf("orz\n"); // 加入的边数不到 n - 1，生成的不是树
    
    return 0;
}
```

:::

## Prim

与 Kruskal 不同，它的思想是加点，类似于 [Dijkstra](/posts/shortest-pth/#Dijkstra)。

> 堆优化的方式类似 Dijkstra 的堆优化，但如果使用二叉堆等不支持 O(1) decrease-key 的堆，复杂度就不优于 Kruskal，常数也比 Kruskal 大。所以，一般情况下都使用 Kruskal 算法，在稠密图尤其是完全图上，暴力 Prim 的复杂度比 Kruskal 优，但**不一定**实际跑得更快。  
> <span style="text-align:right; display:block">
—— [OI-Wiki](https://oi-wiki.org/graph/mst/#%E5%AE%9E%E7%8E%B0_1)
</span>

主要原因是老师没具体说，所以也不知道代码怎么写。~~所以就偷懒不写了。~~