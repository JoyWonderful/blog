---
title: 动态规划：01 背包
date: 2023-08-16 19:21:10 +08:00
tags: 
    - 搜索
    - 动态规划
categories: CourseNotes
---

背包问题是动态规划中很典型的一个问题。一个背包有特定的重量，去装重量为 w 价值为 d 的物品，在不超过背包重量上限的前提下使物品的价值和最高。  
这个问题一看，就不是贪心可以做的来的。所以，就可以用上我们的~~爆搜！！（暴力出奇迹）~~动态规划来解决背包问题。

<!--more-->

## 从暴搜到记搜的引入

自然，动规能解决的问题爆搜也一定能解决，无非慢了点儿而已。例如 [洛谷 P2871]，只需：

```cpp
int w[3410], d[3410];
int maxn = 0;

void dg(int x, int tw, int td)
{
    if(tw > m)
    {
        return;
    }
    if(x > n)
    {
        maxn = max(maxn, td);
        return;
    }
    
    dg(x + 1, tw + w[x], td + d[x]);
    dg(x + 1, tw, td);
}
```

这样一个简单的爆搜就可以拿到 37 分。

进一步优化呢？可以考虑记忆化搜索。用 dp\[i\]\[j\] 数组记录重量为 i 价值为 j 时的情况。由于需要记忆化，可以通过返回参数的形式。代码如下：

```cpp
int dp[3410][12883];

int dg(int x, int tw)
{
    if(x > n)
    {
        return 0;
    }
    if(dp[x][tw]) return dp[x][tw];
    
    int t = 0;
    if(tw + w[x] <= m)
    {
        t = dg(x + 1, tw + w[x]) + d[x];
    }
    dp[x][tw] = max(t, dg(x + 1, tw));
    return dp[x][tw];
}
```

这样一个程序可以拿到 82 分，9 10 两点超时，若开启 O2 优化变成超出内存限制。显然，这么大的数据数组的大小肯定炸掉。

## 使用动态规划
其实，通过上面的我们已经可以推出式子：`dp[i][j] = max(dp[i + 1][j + w[i]], dp[i + 1][j]);`，实现就很简单了：

```cpp
#include <cstdio>
#include <algorithm>
using namespace std;

int n, m;
int w[3410], d[3410];
int dp[3410][12883];

int main()
{
    scanf("%d %d", &n, &m);
    for(int i = 1; i <= n; i++)
    {
        scanf("%d %d", &w[i], &d[i]);
    }
    
    for(int i = n; i >= 1; i--)
    {
        for(int j = 0; j <= m; j++)
        {
            int t = 0;
            if(j + w[i] <= m)
            {
                t = dp[i + 1][j + w[i]] + d[i];
            }
            dp[i][j] = max(t, dp[i + 1][j]);
        }
    }
    
    printf("%d\n", dp[1][0]);
    
    return 0;
}
```

这次，不开 O2 也不会超时，但是内存仍然爆炸。

## 滚动数组

可以发现，状态转移方程用过前面的数据之后，前面的数据就废弃了，因此，可以使用滚动数组。

```cpp
#include <cstdio>
#include <algorithm>
using namespace std;

int n, m;
int w[3410], d[3410];
int dp[2][12883];

int main()
{
    scanf("%d %d", &n, &m);
    for(int i = 1; i <= n; i++)
    {
        scanf("%d %d", &w[i], &d[i]);
    }
    
    for(int i = 1; i <= n; i++)
    {
        for(int j = 0; j <= m; j++)
        {
            int t = 0;
            if(j - w[i] >= 0)
            {
                t = dp[1 - i % 2][j - w[i]] + d[i];
            }
            dp[i % 2][j] = max(t, dp[1 - i % 2][j]);
        }
    }
    
    printf("%d\n", dp[n % 2][m]);
    
    return 0;
}
```