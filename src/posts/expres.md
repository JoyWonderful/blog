---
title: 后缀表达式
categories: CourseNotes
tags: 数学
math: true
date: 2024-05-26 10:29:51 +08:00
---

## 基本的
### 定义
后缀表达式，也叫逆波兰表达式，指的就是将运算符置于运算数之后。前缀表达式亦然。平时使用的是中缀表达式。  
其实，也就是将表达式表示成**表达式树**。前、中、后缀表达式分别是这个树的前、中、后序遍历。  
由于后缀表达式运算的顺序就是从左往右，所以它不需要括号。

<!--more-->

### 转换

例如 $14 + (1 + 2) \times (7 - (6 \div 2))$，表示为：

{% cdnimg mermaid-expr-tree, 1.svg %}

使用后序遍历即表示为 $\mathtt{14 \ \ 1 \ \ 2 \ \ + \ \ 7 \ \ 6 \ \ 2 \ \ \div \ \ - \ \ \times \ \ +}$，这就是它的后缀表达式。它们的结果都是 $26$。

## 实现计算
### 演示
后缀表达式的模拟用栈实现，仅维护数字栈。其实就是把每一个数字压进栈，遇到符号时，就将栈顶两个元素弹出进行运算，再把结果重新压进栈。例如当栈顶元素是 $s_1$，弹出 $s_1$ 后栈顶元素是 $s_2$。遇到符号减号，将两个元素弹出，加入 $s_2 - s_1$。

其实就是：

```math
\begin{array}{|c|}
\hdashline
s_1 \\
\hline
s_2 \\
\hline
\end{array}

\to

\begin{array}{|c|}
\hdashline
s_2 - s_1 \\
\hline
\end{array}
```

例如上面表达式树的栈的演示：

```math
\begin{array}{c}
{\color{#3969f5}\texttt{+}} \\
\begin{array}{|c|}
\hdashline
{\color{#3969f5}2} \\
\hline
{\color{#3969f5}1} \\
\hline
14 \\
\hline
\end{array}
\end{array}

\to

\begin{array}{c}
{\color{#3969f5}\texttt{/}} \\
\begin{array}{|c|}
\hdashline
{\color{#3969f5}2} \\
\hline
{\color{#3969f5}6} \\
\hline
7 \\
\hline
{\color{#5cb85c}3} \\
\hline
14 \\
\hline
\end{array}
\end{array}

\to

\begin{array}{c}
{\color{#3969f5}\texttt{-}} \\
\begin{array}{|c|}
\hdashline
{\color{#5cb85c}3} \\
\hline
{\color{#3969f5}7} \\
\hline
3 \\
\hline
14 \\
\hline
\end{array}
\end{array}

\to

\begin{array}{c}
{\color{#3969f5}\texttt{*}} \\
\begin{array}{|c|}
\hdashline
{\color{#5cb85c}4} \\
\hline
{\color{#3969f5}3} \\
\hline
14 \\
\hline
\end{array}
\end{array}

\to

\begin{array}{c}
{\color{#3969f5}\texttt{+}} \\
\begin{array}{|c|}
\hdashline
{\color{#5cb85c}12} \\
\hline
{\color{#3969f5}14} \\
\hline
\end{array}
\end{array}

\to

\begin{array}{|c|}
\hdashline
{\color{5cb85c}26} \\
\hline
\end{array}
```

### 代码

[洛谷 P1449](https://www.luogu.com.cn/problem/P1449)  
和上面的栈是一样的。

:::details 完整代码

```cpp
#include <cstdio>
#include <stack>
#include <cstdlib>
using namespace std;

int n, m;
stack<int> stk;
char s[53];
int main()
{
    scanf("%s", &s);
    
    char ts[53];
    int cnt = 0;
    for(int i = 0; s[i] != '\0'; i++)
    {
        if(s[i] == '@') break;

        if(s[i] == '.')
        {
            int temp = atoi(ts); // 将记录的所有数字字符转化为数字
            // printf("temp:%d\n", temp);
            stk.push(temp);
            for(int i = 0; i <= cnt; i++){ts[i] = ' ';}
            cnt = 0;
        }
        else if(s[i] >= '0' && s[i] <= '9') ts[cnt++] = s[i];
        else
        {
            int temp1 = stk.top();
            stk.pop();
            int temp2 = stk.top();
            stk.pop();
            // printf("t1:%d t2:%d op:%c\n", temp2, temp1, s[i]);
            switch(s[i])
            {
                case '+':
                    stk.push(temp2 + temp1);
                    break;
                case '-':
                    stk.push(temp2 - temp1);
                    break;
                case '*':
                    stk.push(temp2 * temp1);
                    break;
                case '/':
                    stk.push(temp2 / temp1);
                    break;
            }
        }
    }

    printf("%d", stk.top());

    return 0;
}
```

:::