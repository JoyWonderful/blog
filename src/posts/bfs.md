---
title: 广度优先搜索
date: 2023-07-30 17:43:12 +08:00
updated: 2024-03-31 09:34:43 +08:00
tags:
    - 搜索
    - 队列
    - 基础算法
categories: CourseNotes
---

这不，刚学完[深搜](/posts/dfs)没多久，又来写广搜笔记了（话说我队列笔记还没来得急写呢）。**广度优先搜索**，广搜，英文为**Breadth First Search**，简称 **BFS**。是从一个结点向其他方向的结点不断扩散，如同一道水晕在湖面上荡漾开来。主要可以用来找路径**权值一定**的最短路径。

<!--more-->

深搜可以用到队列先进先出的特性。当一个结点准备扩散时，即弹出队列，再将接下来扩散到结点加入队列。随后按照队首扩散、弹出，不断循环。这也是叫它广度优先搜索的原因。

----------

例题：[洛谷 P2360](https://www.luogu.com.cn/problem/P2360)  
广搜可以做，直接通过路径扩散就好。  

:::details 代码：（想水博文 QwQ）

```cpp
#include <iostream>
#include <queue>
using namespace std;

struct node
{
    int x, y, z;
};
int l, r, c;
char themap[33][33][33];
int flag[33][33][33], dist[33][33][33];

int bx[6] = {1, -1, 0,  0, 0,  0};
int by[6] = {0,  0, 1, -1, 0,  0};
int bz[6] = {0,  0, 0,  0, 1, -1};

void bfs(int x, int y, int z)
{
    queue<node> q;
    node pdata;
    pdata.x = x; pdata.y = y; pdata.z = z;
    q.push(pdata);
    flag[x][y][z] = 1;

    while(q.size())
    {
        node p = q.front();
        q.pop();
        for(int i = 0; i < 6; i++)
        {
            int tx = p.x + bx[i];
            int ty = p.y + by[i];
            int tz = p.z + bz[i];
            //cout << tx << " " << ty << " " << tz << endl;
            if(tx <= r && tx > 0 && ty <= c && ty > 0 && tz <= l && tz > 0 && flag[tx][ty][tz] == 0 && (themap[tx][ty][tz] == '.' || themap[tx][ty][tz] == 'E'))
            {
                node tdata;
                tdata.x = tx;
                tdata.y = ty;
                tdata.z = tz;
                q.push(tdata);
                flag[tdata.x][tdata.y][tdata.z] = 1;
                dist[tdata.x][tdata.y][tdata.z] = dist[p.x][p.y][p.z] + 1;
            }
            
        }
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin >> l >> r >> c;
    int sx, sy, sz;
    int ex, ey, ez;
    for(int i = 1; i <= l; i++)
    {
        for(int j = 1; j <= r; j++)
        {
            for(int k = 1; k <= c; k++)
            {
                cin >> themap[j][k][i];
                if(themap[j][k][i] == 'S')
                {
                    sx = j;
                    sy = k;
                    sz = i;
                }
                if(themap[j][k][i] == 'E')
                {
                    ex = j;
                    ey = k;
                    ez = i;
                }
            }
        }
    }

    bfs(sx, sy, sz);
    if(flag[ex][ey][ez] == 0) cout << "Trapped!" << endl;
    else cout << "Escaped in " << dist[ex][ey][ez] << " minute(s)." << endl;

    return 0;
}
```

:::