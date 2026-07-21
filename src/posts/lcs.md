---
title: 最长上升/公共子序列
date: 2024-07-11 16:44:28 +08:00
categories: CourseNotes
tags: 动态规划
---

## 最长上升子序列

即从原序列中按顺序取出数字排列在一起，保证这些数字是**递增**（不包括相等）的。

<!--more-->

### 第一种

尝试将任意元素接到某个子序列之后。

```cpp
#include <cstdio>
#include <algorithm>
using namespace std;

int n;
int dp[5003], a[5003]; // dp[i] 表示 a 中前 i 个数字的最长上升子序列
int main()
{
    scanf("%d", &n);
    for(int i = 1; i <= n; i++)
    {
        scanf("%d", &a[i]);
        dp[i] = 1;
    }
    
    for(int i = 1; i <= n; i++)
    {
        for(int j = 1; j < i; j++)
        {
            if(a[i] > a[j])
            {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    
    int maxn = 0;
    for(int i = 1; i <= n; i++)
    {
        maxn = max(maxn, dp[i]);
    }
    printf("%d\n", maxn);
    
    return 0;
}
```

### 第二种

维护一个数组储存当前的子序列。  
加入数字时，如果当前数字比序列末尾数字大，直接追加到末尾；否则寻找序列中第一个大于等于它的数进行替换。

```cpp
#include <cstdio>
#include <algorithm>
using namespace std;

int n, a[5003], dp[5003], cnt = 0;
int main()
{
    scanf("%d", &n);
    for(int i = 0; i < n; i++)
    {
        scanf("%d", &a[i]);
        
        if(i == 0) dp[cnt++] = a[i];
        else if(a[i] > dp[cnt - 1]) dp[cnt++] = a[i]; //  不可以等于！！！ 
        else *lower_bound(dp, dp + cnt, a[i]) = a[i];
        // lower_bound(*__first, *__last, &__val) 从 __first 到 __last 二分查找返回第一个大于等于 __val
    }
    
    // for(int i = 0; i < cnt; i++) printf("%d ", dp[i]);
    printf("%d\n", cnt);
    
    return 0;
}
```

## 最长公共子序列

```cpp
#include <cstdio>
#include <cstring>
using namespace std;

int dp[3003][3003]; // dp[i][j] 代表第一个字符串前 i 个字符 和 第二个前 j 个字符的最长公共子序列
int longest_common_subsequence(char a[3003], char b[3003])
{
    int lena = strlen(a), lenb = strlen(b);
    for(int i = 0; i <= lena; i++)
    {
        for(int j = 0; j <= lenb; j++)
        {
            if(i == 0 || j == 0) dp[i][j] = 0; // 前零个字符，没有公共子序列
            else if(a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = (dp[i - 1][j] > dp[i][j - 1]) ? (dp[i - 1][j]) : (dp[i][j - 1]);
        }
    }
    return dp[lena][lenb];
}

char str1[3003], str2[3003];
int main()
{
    scanf("%s", &str1);
    scanf("%s", &str2);
    
    printf("%d\n", longest_common_subsequence(str1, str2));
    
    return 0;
}
```
