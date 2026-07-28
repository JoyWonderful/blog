---
title: 最短路
date: 2024-05-11 23:59:59 +08:00
categories: CourseNotes
tags: 
    - 图论
    - 动态规划
---

最短路即从某一结点到另一结点的路径，使其权值最小。这是一个动态规划问题。

<!-- more -->

## Floyd

### 实现
Floyd 解决任意两点之间的最短路路径问题，但是图中不能有负环（无向图中不能有负路径权值）。  
主要实现是确定一个点，如果起始点与结束点经过这个点的距离比原来距离要小，即更新两点间的距离。  
代码如下：

```cpp
int n; // n 为节点数
for(int k = 1; k <= n; k++) { // 中转点
    for(int i = 1; i <= n; i++) { // 起
        for(int j = 1; j <= n; j++) { // 终
            dis[i][j] = min(dis[i][k] + dis[k][j], dis[i][j]);
        }
    }
}
```

### 例题
[洛谷 B3647 Floyd](https://www.luogu.com.cn/problem/B3647)

:::details 完整代码

```cpp
#include <cstdio>
using namespace std;

int dis[103][103]; // 邻接表和实现数组
int n, m; // 结点数，边数
int main()
{
    scanf("%d %d", &n, &m);
    for(int i = 1; i <= m; i++)
    { // 邻接表存图
        int u, v, w; // u, v 之间有权值为 w 的无向边
        scanf("%d %d %d", &u, &v, &w);
        if(dis[u][v] != 0) { // 判断重边
            if(w < dis[u][v]) {dis[u][v] = w; dis[v][u] = w;}
            continue;
        }
        dis[u][v] = w;
        dis[v][u] = w;
    }
    
    for(int k = 1; k <= n; k++) // Floyd
    {
        for(int i = 1; i <= n; i++)
        {
            for(int j = 1; j <= n; j++)
            {
                if(i == j) continue; // 从节点自己到本身，距离一定为 0
                if(dis[i][k] != 0 && dis[k][j] != 0) // i -> k -> j 路径存在（0 即不存在)
                {
                    if(dis[i][k] + dis[k][j] < dis[i][j] || dis[i][j] == 0) dis[i][j] = dis[i][k] + dis[k][j]; // 转移方程
                }
            }
        }
    }
    for(int i = 1; i <= n; i++)
    {
        for(int j = 1; j <= n; j++)
        {
            printf("%d ", dis[i][j]);
        }
        printf("\n");
    }
    
    return 0;
}
```

:::

## SPFA 代码（仅记录）

:::details{@open} SPFA

```cpp
#define typec int
const typec INF = 0x3f3f3f3f;
struct Edge
{
    int v;
    int cost;
    Edge(int _v = 0, int _cost = 0) : v(_v), cost(_cost) {}
};
vector<Edge> E[MAXN];
void addedge(int u, int v, int w)
{
    E[u].push_back(Edge(v, w));
}
bool vis[MAXN]; // 在队列标志
int cnt[MAXN];  // 每个点的入队列次数
typec dis[MAXN];
bool SPFA(int start, int n)
{ // 附带判定负环
    for (int i = 1; i <= n; i++)
    {
        dis[i] = INF;
    }
    vis[start] = true;
    dis[start] = 0;
    queue<int> que;
    que.push(start);
    cnt[start] = 1;
    while (!que.empty())
    {
        int u = que.front();
        que.pop();
        vis[u] = false;
        for (int i = 0; i < E[u].size(); i++)
        {
            int v = E[u][i].v;
            if (dis[v] > dis[u] + E[u][i].cost)
            {
                dis[v] = dis[u] + E[u][i].cost;
                if (!vis[v])
                {
                    vis[v] = true;
                    que.push(v);
                    if (++cnt[v] > n)
                        return false;
                    // cnt[i] 为入队列次数，判定是否存在负环
                }
            }
        }
    }
    return true;
}
```

:::

## Dijkstra

### 实现

迪克斯特拉（？），用于求**单源**最短路（只从一个结点出发到另一结点的最短路径），*不可以有负权值的边*。

使用优先队列优化的 dijkstra 步骤：

1. 设从起点到编号为 i 的结点的最短路为 dis\[i\]，设起点编号为 s。初始时 dis[s] = 0; 其他的均为无穷大。
2. 优先队列(pq) 里存该遍历的结点，排序方案为按结点的最短路大小（dis\[结点\]）排序。
3. 将 pq 顶部元素弹出，是前一个点。如果从起点到  前一个点(top) 的最短路(dis\[top\])  加上到  这个点(tv) 的边的权值(tw)  小于  从起点到这个点的最短路(dis\[tv\])  ，则执行 `dis[tv] = dis[top] + tw`，将 {tv, dis[tv]}(结构体) 加入 pq。

重复第 3 步，直到 pq 为空。

### 代码

[洛谷 P4779 单源最短路径](https://www.luogu.com.cn/problem/P4779)

:::details 完整代码

```cpp
#include <cstdio>
#include <vector>
#include <queue>
using namespace std;

const int TMP = 2e5 + 3;
struct edge
{
    int v, w;
};
struct node
{
    int id, dis;
    bool operator< (const node &x) const
    {
        return x.dis < dis;
    }
};
int n, m, s, dis[TMP], vis[TMP];
vector<edge> gr[TMP];
priority_queue<node> pq;
int main()
{
    scanf("%d %d %d", &n, &m, &s);
    for(int i = 1; i <= m; i++)
    {
        int v, u, w;
        scanf("%d %d %d", &u, &v, &w); // u --w--> v
        edge tmp;
        tmp.v = v; tmp.w = w;
        gr[u].push_back(tmp);
    }
    
    for(int i = 1; i <= n; i++)
    {
        dis[i] = 0x7fffffff;
    }
    dis[s] = 0;
    node tmp; tmp.id = s; tmp.dis = 0;
    pq.push(tmp);
    while(!pq.empty())
    {
        node top = pq.top();
        pq.pop();
        if(!vis[top.id])
        {
            vis[top.id] = 1;
            for(int i = 0; i < gr[top.id].size(); i++)
            {
                int tv = gr[top.id][i].v, tw = gr[top.id][i].w;
                if(dis[top.id] + tw < dis[tv])
                {
                    dis[tv] = dis[top.id] + tw;
                    node ptmp; ptmp.id = tv; ptmp.dis = dis[tv];
                    pq.push(ptmp);
                }
            }
        }
    }
    for(int i = 1; i <= n; i++)
    {
        printf("%d ", dis[i]);
    }
    
    return 0;
}
```

:::

### 演示

设 起点(s) 为 1，INF 代表无穷大，上方注释 c 表示这次访问并改变了，v 表示仅访问过。如下：

![spth1](/images/shortest-pth/1.webp)

```cpp
dis[4] = {0, INF, INF, INF};
vis[4] = {0, 0, 0, 0};
pq = {{.id=1, .dis=0}};
```

----------

![spth2](/images/shortest-pth/2.webp)

```cpp
//           c  c  c
dis[4] = {0, 2, 5, 4};
vis[4] = {1, 0, 0, 0};
pq = {{.id=2, .dis=2},  {.id=4, .dis=4},  {.id=3, .dis=5}};
```

----------

![spth3](/images/shortest-pth/3.webp)

```cpp
//              c  c
dis[4] = {0, 2, 4, 3};
vis[4] = {1, 1, 0, 0};
pq = {{.id=4, .dis=3},  {.id=4, .dis=4},  {.id=3, .dis=4},  {.id=3, .dis=5}};
```

----------

![spth4](/images/shortest-pth/4.webp)

```cpp
//              v  v
dis[4] = {0, 2, 4, 3};
vis[4] = {1, 1, 1, 1};
pq = {};
```

