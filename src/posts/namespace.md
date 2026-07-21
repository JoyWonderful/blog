---
title: 命名空间
date: 2023-05-05 20:21:43 +08:00
tags: 语言入门
categories: CourseNotes
math: true
---

## C++命名空间的概念

**在同一个作用域中，不同的数据不能起同一个名字**，但是C++命名空间概念的出现，提供了解决问题的方案。在不同的命名空间中，可以随意定义相同的名字。命名空间就是为了避免你包含的头文件中与你自己定义的任意类，数据，函数重名，造成令人迷惑的错误而产生的。

<!--more-->

## 定义命名空间

我们可以自己定义一个命名空间，并且使用它。定义命名空间使用 `namespace` 关键字，使用命名空间使用 `namespace::subject` 使用命名空间中的函数，数据等。例如：

```cpp
#include <stdio.h> // 方便演示，使用了C头文件

namespace mylib
{
    int a = 1, b = 2, c = 3;
    void hello()
    {
        printf("Hello World!\n");
    }
}
namespace libbb
{
    int a = 10, b = 20, c = 30;
    void hello()
    {
        printf("HELLO WORLD!!!!\n");
    }
}

int main()
{
    printf("%d %d %d\n", mylib::a, mylib::b, mylib::c) ;
    printf("%d %d %d\n", libbb::a, libbb::b, libbb::c) ;
    mylib::hello() ;
    libbb::hello() ;
    
    return 0 ;
}
```

期望输出：

```plain
1 2 3
10 20 30
Hello World!
HELLO WORLD!!!!
```

在命名空间 $mylib$ 和 $libbb$ 中，三个变量和一个函数的名字相同，但是所调用的命名空间不同，结果也不一样。

在C++中，大部分函数都在命名空间 $std$ 中，全称 $stdandard$ 。

## `using`使用命名空间

在上段程序中，我们可以在包含头文件后加入几句：

```cpp
using namespace mylib;
```

这样 $mylib$ 命名空间里的 $a ~ b ~ c ~ hello()$ 可以直接写为它原本的样子，不用加上 `mylib::` 。这很方便。但是这种方法也有他的局限性，比如我再加入一句：

```cpp
using libbb::a;
```

这样 $libbb$ 命名空间里的 $a$ 使用时也不用加上 `libbb::` 了。但是再次出现了两个同样的 $a$ ，谁也分不清使用的到底是 $mylib$ 命名空间里的 $a$ 还是 $libbb$ 命名空间里的 $a$ ，因此会引发错误，这也是 `using` 的弊端。但是有时候只会用到一个命名空间里的东西时，就比如 $std$ ，就可以直接加上一句 `using namespace std;` 这样子更方便，省的 `cin` 一类的各种东西前面都要加上 `std::`。