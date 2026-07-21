---
title: 区间最大/小值
tags:
    - 数据结构
    - 动态规划
categories: CourseNotes
date: 2024-05-19 09:36:37 +08:00
---


求区间最大/小值，即 **Range maximum/minimum query**(RMQ)。可以通过几种方法实现。  
最简单实现的方法就是直接遍历。假设有 q 次查询，平均每次查询的长度为 n，则时间复杂度为 O(nq)。简单遍历自然是不行的。

通常用几种更快的方法实现，缺点各不同，如下。（单调栈，ST 表）

<!--more-->

## 单调栈
### 定义
用栈实现。但是栈中的元素是单调递增或递减的。  
为了实现，当要压入的元素使栈不再单调递增或递减时，需要将栈顶的元素尽量少地弹出，再将元素压入。  
如单调递增栈从栈顶到栈底的元素依次为 {1, 3, 6}，压入 2，需要先将 1 弹出（为 {2, 3, 6}）。再压入 5，需要将 2, 3 都弹出，最终栈为 {5, 6}。

与 RMQ 的关系：对于栈顶到栈底从小到大的单调递增栈，可以求出第 i 个元素之后第一个大于 i 的元素。

### 实现 & 例题
对于普通单调栈，实现如下（直接用 STL 给的 stack 了）：

```cpp
stack<int> stk;
for(int i = 1; i <= n; i++)
{
    int t; scanf("%d", &t);
    while(!stk.empty() && stk.top() < t) // 递增
    {
        // 对于 stk.top() 来说，t 就是长度为 n 的数列中之后第一个大于它的元素
        stk.pop();
    }
    stk.push(t);
}
```

例题模板：[洛谷 P5788 单调栈](https://www.luogu.com.cn/problem/P5788)

:::details 完整代码

```cpp
#include <cstdio>
#include <stack>
using namespace std;

struct node {
    int val, id; // val: 值，id: 编号
};
stack<node> stk;
int n, ans[3000003];
int main()
{
    scanf("%d", &n);

    for(int i = 1; i <= n; i++)
    {
        node t;
        t.id = i;
        scanf("%d", &t.val);
        if(i == 1) stk.push(t); // 栈空
        else
        {
            if(stk.top().val >= t.val) stk.push(t); // 
            else
            {
                while(!stk.empty() && stk.top().val < t.val)
                {
                    ans[stk.top().id] = t.id;
                    stk.pop();
                }
                stk.push(t);
            }
        }
    }

    for(int i = 1; i <= n; i++)
    {
        printf("%d ", ans[i]);
    }
    printf("\n");

    return 0;
}
```

:::

## ST 表

基于倍增。即以 2 的 x 次方增加求解，可以直接给出答案。但是 ST 表不支持修改操作，即只能求静态区间的最值。
这其实就是区间动态规划。

[洛谷 P3865 ST表](https://www.luogu.com.cn/problem/P3865)

:::details 完整代码

```cpp
// 1 << j 就是 2 的 j 次方
#include <cstdio>
#include <algorithm>
#include <cmath>
using namespace std;

int n, m;
const int TMP = 1e5 + 3;
int st[TMP][20]; // st[i][j] 从 i 开始到 (2^j)-1 的区间最大值
//          ^ 这里只有 20 是因为 log_2^100000 只约为 17，否则开 [TMP][TMP] 在测评机上会 RE（尽管实际没有用那么多）
int main()
{
    scanf("%d %d", &n, &m);
    for(int i = 1; i <= n; i++)
    {
        scanf("%d", &st[i][0]);
    }

    for(int j = 1; (1 << j) <= n; j++) // 处理
    {
        for(int i = 1; i + (1 << j) - 1 <= n; i++)
        {
            st[i][j] = max(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
        }
    }

    for(int i = 1; i <= m; i++)
    {
        int l, r;
        scanf("%d %d", &l, &r);
        int tm = log2(r - l + 1);
        printf("%d\n", max(st[l][tm], st[r - (1 << tm) + 1][tm])); // 两个 max 覆盖了区间
    }

    return 0;
}
```

:::