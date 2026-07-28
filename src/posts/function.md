---
title: 函数
date: 2023-05-03 20:25:59 +08:00
tags:
    - 语言入门
    - 函数，参数
categories: CourseNotes
---

## 函数的作用

一般来说，我都是懂的。函数的总用比较简单：

1. 优化代码量
2. 让程序代码更加清晰明了
3. 调用时更加方便

总之，函数的存在就是为了更加**方便**，**清晰**，**快速**。

<!--more-->

## 定义函数

方法：

```cpp
<函数类型> <函数名称>([参数])
{
    [主体];
    [return [值]]; // 如果为类型 void，就不能返回值，直接 `return` 即可。
}
```

如：

```cpp
int add(int x, int y)
{
    int ans = x + y;
    return ans;
}
```

<hr>

**注意**：当不返回(无`return`)时，函数类型应为`void`(表面含义*无类型*)。

## 形参和实参

当你运行**这段代码**时：

```cpp
#include <stdio.h>
using namespace std;

int swap(int x, int y)
{
    int t = x;
    x = y;
    y = t;
}

int main()
{
    int a, b;
    scanf("%d %d", &a, &b);
    
    swap(a, b);
    printf("%d %d\n", a, b);
}
```

你会发现`a`还是`a`，`b`还是`b`。

这是因为`swap(int, int)`只是把**函数内的**`x`和`y`交换了而已，`a`和`b`没有交换。

因为`x`和`y`对于*`main`函数*来说只是形参，`x`和`y`只是拷了一份`a`和`b`。

如果想交换`a`和`b`需要这样写：

```cpp
#include <stdio.h>
using namespace std;

int swap(int &x, int &y)
{
    int t = x;
    x = y;
    y = t;
}

int main()
{
    int a, b ;
    scanf("%d %d", &a, &b) ;
    
    swap(a, b) ;
    printf("%d %d\n", a, b) ;
}
```

此时此刻，你使用`x`和`y`就相当于引用了`a`和`b`。

## 函数重载

函数名不可重复。

但是有几种方法可以重复：

- 函数参数类型不同
- 函数参数数量不同

比如：

```cpp
#include <stdio.h>
using namespace std;

int add(int a, int b)
{
    return a + b;
}
void add()
{
    printf("Hello\n");
}

int main()
{
    int n = add(1, 2);
    printf("%d\n", n);
    add();
    
    return 0;
}
```

输出：

```ansi
3
Hello
```

<hr>

**注意：**仅仅函数类型不同不足以区分两个函数！

## 拓展：主函数中的`argc`和`argv` ~~实际上我不懂~~

用法：

```cpp
int main(int argc, char *argv[])
```

或：

```cpp
int main(int argc, char **argv)
```

<hr>

含义：

1. `argc`：**是argument count 的缩写，保存运行时传递给main函数的参数个数。**
2. `argv`：**是argument vector 的缩写，保存运行时传递main函数的参数，类型是一个字符指针数组，每个元素是一个字符指针，指向一个命令行参数。**

比如：

```cpp
#include <stdio.h>
using namespace std;

int main(int argc, char *argv[])
{
    printf("sum: %d\n", argc) ;
    for(int i = 0; i < argc; i ++)
    {
        printf("argc[%d], %s\n", i, argv[i]) ;
    }
    
    return 0 ;
}
```

打开命令行，`cd`文件所在文件夹，输入：`[file name].[file extension] hello world i am so happy`

结果为：

```ansi
sum: 7
argc[0], 未命名1.exe
argc[1], hello
argc[2], world
argc[3], i
argc[4], am
argc[5], so
argc[6], happy
```

这就是`main`函数参数作用。