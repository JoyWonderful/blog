---
title: 数论：质数筛法
date: 2023-08-08 14:34:23 +08:00
tags:
    - 基础算法
    - 数学
categories: CourseNotes
math: true
---

**筛法**是快速找出质数的一种方法。平常没有使用任何筛法的的找质数的时间复杂度通常为 $O(\sqrt n)$，比较慢，但是筛法更快一些。我们学的筛法是埃氏筛和欧拉筛(线性筛)。  
平常的找质数方法是判断一个数是否能被 $1$ 和它本身以外的数整除，但是筛法的思想不一样。筛法可以说是通常方法的逆向思维，挨个儿寻找当前数的倍数，打上标记，再继续寻找，最后没有被打上标记的就是质数。这种思想的时间复杂度快很多。

<!--more-->

## 埃氏筛
**埃氏筛**，全称其实是**埃拉托斯特尼筛法** **\(Eratosthenes\)**。它的时间复杂度为 $O(n \log_2 \log_2 n)$，其实也就是刚才说的方法。这里放一个演示：

<p style="overflow-x:auto; white-space:nowrap;"><span style="font-family:Consolas, Menlo, Monaco, 'Andale Mono', 'Ubuntu Mono', 'Courier New', monospace;">
    2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 &ensp;&ensp;&ensp; <span style="font-family: lxgw;">这是初始的表</span>
    <br>
    <span style="font-weight:bold; color:#000000;">2</span> 3 <del style="color:#d9d9d9;">4</del> 5 <del style="color:#d9d9d9;">6</del> 7 <del style="color:#d9d9d9;">8</del> 9 <del style="color:#d9d9d9;">10</del> 11 <del style="color:#d9d9d9;">12</del> 13 <del style="color:#d9d9d9;">14</del> 15 <del style="color:#d9d9d9;">16</del> 17 <del style="color:#d9d9d9;">18</del> 19 <del style="color:#d9d9d9;">20</del>  &ensp;&ensp;&ensp; <span style="font-family: lxgw;">2 筛掉了 4 6 8 10 12 14 16 18 20，2 是质数</span>
    <br>
    <span style="font-weight:bold; color:#000000;">2</span> <span style="font-weight:bold; color:#000000;">3</span> <del style="color:#d9d9d9;">4</del> 5 <del style="color:#d9d9d9;">6</del> 7 <del style="color:#d9d9d9;">8</del> <del style="color:#d9d9d9;">9</del> <del style="color:#d9d9d9;">10</del> 11 <del style="color:#d9d9d9;">12</del> 13 <del style="color:#d9d9d9;">14</del> <del style="color:#d9d9d9;">15</del> <del style="color:#d9d9d9;">16</del> 17 <del style="color:#d9d9d9;">18</del> 19 <del style="color:#d9d9d9;">20</del>  &ensp;&ensp;&ensp; <span style="font-family: lxgw;">3 筛掉了 6 9 12 15 18，3 是质数</span>
    <br>
    <span style="font-weight:bold; color:#000000;">2</span> <span style="font-weight:bold; color:#000000;">3</span> <del style="color:#d9d9d9;">4</del> <span style="font-weight:bold; color:#000000;">5</span> <del style="color:#d9d9d9;">6</del> <span style="font-weight:bold; color:#000000;">7</span> <del style="color:#d9d9d9;">8</del> <del style="color:#d9d9d9;">9</del> <del style="color:#d9d9d9;">10</del> <span style="font-weight:bold; color:#000000;">11</span> <del style="color:#d9d9d9;">12</del> <span style="font-weight:bold; color:#000000;">13</span> <del style="color:#d9d9d9;">14</del> <del style="color:#d9d9d9;">15</del> <del style="color:#d9d9d9;">16</del> <span style="font-weight:bold; color:#000000;">17</span> <del style="color:#d9d9d9;">18</del> <span style="font-weight:bold; color:#000000;">19</span> <del style="color:#d9d9d9;">20</del>  &ensp;&ensp;&ensp; <span style="font-family: lxgw;">5 筛掉了 10 15 20，其实 5 已经大于 根号 20，剩下的数都是质数，可以退出了，但在这儿继续演示下去</span>
    <br>
    <span style="color:#e74c3c">-------------------- break; --------------------</span>  &ensp;&ensp;&ensp; <span style="font-family:lxgw; color:#e74c3c">实际循环已经在这儿之前就退出了，但这里继续演示下去</span>
    <br>
    <span style="font-weight:bold; color:#000000;">2</span> <span style="font-weight:bold; color:#000000;">3</span> <del style="color:#d9d9d9;">4</del> <span style="font-weight:bold; color:#000000;">5</span> <del style="color:#d9d9d9;">6</del> <span style="font-weight:bold; color:#000000;">7</span> <del style="color:#d9d9d9;">8</del> <del style="color:#d9d9d9;">9</del> <del style="color:#d9d9d9;">10</del> <span style="font-weight:bold; color:#000000;">11</span> <del style="color:#d9d9d9;">12</del> <span style="font-weight:bold; color:#000000;">13</span> <del style="color:#d9d9d9;">14</del> <del style="color:#d9d9d9;">15</del> <del style="color:#d9d9d9;">16</del> <span style="font-weight:bold; color:#000000;">17</span> <del style="color:#d9d9d9;">18</del> <span style="font-weight:bold; color:#000000;">19</span> <del style="color:#d9d9d9;">20</del>  &ensp;&ensp;&ensp; <span style="font-family: lxgw;">7 筛掉了 14，7 是质数</span>
    <br>
    <span style="font-weight:bold; color:#000000;">2</span> <span style="font-weight:bold; color:#000000;">3</span> <del style="color:#d9d9d9;">4</del> <span style="font-weight:bold; color:#000000;">5</span> <del style="color:#d9d9d9;">6</del> <span style="font-weight:bold; color:#000000;">7</span> <del style="color:#d9d9d9;">8</del> <del style="color:#d9d9d9;">9</del> <del style="color:#d9d9d9;">10</del> <span style="font-weight:bold; color:#000000;">11</span> <del style="color:#d9d9d9;">12</del> <span style="font-weight:bold; color:#000000;">13</span> <del style="color:#d9d9d9;">14</del> <del style="color:#d9d9d9;">15</del> <del style="color:#d9d9d9;">16</del> <span style="font-weight:bold; color:#000000;">17</span> <del style="color:#d9d9d9;">18</del> <span style="font-weight:bold; color:#000000;">19</span> <del style="color:#d9d9d9;">20</del>  &ensp;&ensp;&ensp; <span style="font-family: lxgw;">11 13 17 19 的倍数都不在数列中，它们都是倍数</span>
</span></p>

最终，筛选出了 `2 3 5 7 11 13 17 19` 这 8 个质数。  

埃氏筛的代码也比较简单：
```cpp
#include <cstdio>
using namespace std;

const int TEMP = 1e6 + 3; // 需要筛的数字的数量
int flag[TEMP]; // 记录是否是质数
void is_prime(int n)
{
    for(int i = 2; i * i <= n; i++) // 和普通的找质数一样
    {
        if(flag[i] == 0) // 找质数的倍数
        {
            for(int j = i * 2; j <= n; j += i) // 从 i * 2 开始是因为不能标记质数，+= i 就是倍数
            {
                flag[j] = 1;
            }
        }
    }
}

int main()
{
    int n;
    scanf("%d", &n);
    is_prime(n);
    FILE *fp = freopen("./ans.txt", "w", stdout); // 测试文件用，可以注释掉。
    for(int i = 2; i <= n; i++)
    {
        if(flag[i] == 0) // 未被标记过，是质数
        {
            printf("%d\n", i);
        }
    }
    fclose(fp); // 测试文件用，可以注释掉。
}
```

埃氏筛很快，上面数据 1000000 的代码一下就好了。  
更具体的，可以去看一下 [OI Wiki](https://oi-wiki.org/math/number-theory/sieve/)。

## 线性筛
线性筛也叫**欧拉筛**，它的出现就是为了找到比埃氏筛还要快的筛法，是由欧拉发现的。在埃氏筛中，一个数可能会被筛很多次，上面的演示也表现出来了。而线性筛每个数只会筛一次，是 $O(n)$ 的时间复杂度。只不过一般来说埃氏筛也够用，一些卡掉埃氏筛的毒瘤数据除外，例如 [洛谷 P3383](https://www.luogu.com.cn/problem/P3383)。

就按照 洛谷 P3383 来：

:::details 代码是这样的

```cpp
#include <cstdio>
using namespace std;

const int TEMP = 1e8 + 12;
bool vis[TEMP];
int pri[TEMP], cnt = 0;
void is_prime(int n)
{
    for(int i = 2; i <= n; ++i)
    {
        if(!vis[i])
        {
            pri[cnt++] = i;
        }
        for(int j = 0; j < cnt; ++j)
        {
            if(i * pri[j] > n)
            {
                break;
            }
            vis[i * pri[j]] = 1;
            if(i % pri[j] == 0)
            {
                break;
            }
        }
    }
}


int ns, q;
int ans[TEMP];
int main()
{
    scanf("%d %d", &ns, &q);
    is_prime(ns);
    // printf("done.\n");
    
    // int cnt = 0;
    // for(int i = 2; i <= ns; i++)
    // {
    //     if(vis[i] == 0)
    //     {
    //         printf("%d\n", i);
    //     }
    // }
    
    for(int i = 1; i <= q; i++)
    {
        int temp;
        scanf("%d", &temp);
        printf("%d\n", pri[temp - 1]);
    }
    
    return 0;
}
```

:::
