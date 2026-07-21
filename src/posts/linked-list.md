---
title: 线性数据结构：链表的模板
date: 2023-07-19 15:23:32 +08:00
tags:
    - 基础算法
    - 数据结构
categories: CourseNotes
---

链表类似于数组，与数组不同的是，链表可以更加方便地更改数据和删除数据。数组若想将中间的数据删除，则要非很大功夫，而链表就不同了，它的操作更加简单一些（后面说）。

<!--more-->

链表的数据组可以叫做“结点”，结点分成两个部分：一个是数据域，一个是指针域，数据域存数据，指针域指向下一个结点的数据地址。正是指针域将链表的每一个结点连在了一起。这种特性有一个好处：内存地址可以不连续，而数组的内存地址是必须要连续的。  
比如内存还有 2GB 空闲，我申请了一个 1GB 大的数组，理论上是可以申请下来的，但占用的内存不一定完全是连续的。假设内存被一大堆东西占用的零零碎碎：确实有 2GB，但分成 4 个 500MB，这就申请不下来。而链表呢，可以充分利用内存碎片，通过指针变量，将分开的数据连在一起。

## 普通的链表
链表还有一个好处：它是**动态**的，也就是说，使用的内存想申请就申请，想销毁就销毁(C/C++中，其他语言我不确定)
，可以节约内存。  
申请内存，可以用到 `<malloc.h>` 头文件中的 `malloc()` 函数，只有一个参数，填上你想要申请的内存大小(字节)，可以和 `sizeof` 一起用。但它返回的是 `void` 类型，所以最好在它前面加上一个类型强制转换。而销毁内存，则可以用到这个头文件中 `free()` 函数，一个参数，往里面填上地址（指针变量）即可销毁，但从此不可以再调用 使用这个内存的变量，若调用会报错，需要注意。

无论什么链表，还要有一个头指针，以便寻找元素时更好的去找。链表的结点一般用一个结构体，结构体里面一个是数据(`data`)，一个是存着下一个结点数据地址的指针变量(`next`)。  
示例代码如下：

```cpp
struct node
{
    int x;
    node *next;
};

node *head;
```

首先说直接往末尾加上元素。先要判断链表是否为空，可以通过头指针 `head` 是否为空（`NULL`），若是第一个便创建新结点，申请为 `node` 类型的大小的内存，将那个结点的数据域赋值为加上的数据，再将结点的指针域设为 `NULL`（以防万一），将 `head` 设为新结点的地址。  
否则通过指针域穷举当前指针域是否为 `NULL`，也就是最后一个元素，若到了最后一个元素，则申请内存，新建结点，数据域赋值，将上一个结点的指针域赋值为当前结点数据域的地址，将打钱结点指针域设为 `NULL`。  
示例代码如下：
```cpp
void push(int data)
{
    if(head == NULL)
    {
        node *New = (node *) malloc(sizeof(node));
        (*New).x = data;
        (*New).next = NULL;
        head = New;
    }
    else
    {
        node *s = head;
        while((*s).next != NULL)
        {
            s = (*s).next;
        }
        node *New = (node *) malloc(sizeof(node));
        (*New).x = data;
        (*New).next = NULL;
        (*s).next = New;
    }
}
```

插入也差不多，穷举到目标位置，申请内存，更改指针域。访问即是穷举，顺着指针走。更改数据还要穷举，将数据域改掉就好了。重点将删除。  
首先，判断删除的是否是第一个，若是则将 `head` 更改为下一个结点的指针域。否则穷举目标，新建一个 `node` 类型的零时变量，将它赋值为删除目标的下一个结点的指针域，销毁准备删除的内存，将删除的地方的指针域赋值为那个零时变量。  

:::details 完整代码

```cpp
#include <malloc.h>
#include <cstdio>
using namespace std;

struct node // 结点
{
    int x; // 数据
    node *next; // 下一个结点的地址
};

node *head; // 指针变量

void push(int data) // 往末尾追加元素，`data` 是要追加的数据
{
    if(head == NULL) // 链表为空
    {
        node *New = (node *) malloc(sizeof(node)); // 申请内存
        (*New).x = data; // 存数据
        (*New).next = NULL; // 以防万一
        head = New; // 因为链表是空的，所以要给头指针赋值。
    }
    else
    {
        node *s = head; // 开始遍历
        while((*s).next != NULL) // 条件的意思是不为链表的最后一个
        {
            s = (*s).next; // 通过下一个结点的地址不但遍历
        }
        node *New = (node *) malloc(sizeof(node)); // 同上的 `head==NULL`
        (*New).x = data;
        (*New).next = NULL;
        (*s).next = New;
    }
}
void insert(int x, int y) // 插入， `x` 是要加的数据，`y` 表示在链表的第 `y` 个元素后插入数据
{
    node *s = head;
    y-- ;
    while(y)
    {
        s = (*s).next;
        y-- ;
    }
    node *New = (node *) malloc(sizeof(node));
    (*New).x = x;
    (*New).next = (*s).next;
    (*s).next = New;
}
int find(int x) // 返回链表的第 `x` 个结点的数据
{
    node *s = head;
    x-- ;
    while(x)
    {
        s = (*s).next;
        x-- ;
    }
    return (*s).x;
}
void update(int x, int y) // 更改链表第 `x` 个结点的数据域为 `y`
{
    node *s = head;
    x-- ;
    while(x)
    {
        s = (*s).next;
        x-- ;
    }
    (*s).x = y;
}
void deletes(int x) // 删除链表第 `x` 个结点
{
    if(x == 1)
    {
        head = (*head).next;
        return;
    }
    node *s = head;
    x-- ;
    x-- ;
    while(x--)
    {
        s = (*s).next;
        x-- ;
    }
    node *t = (*((*s).next)).next; // 零时指针变量，下下个结点的指针域
    free((*s).next); // 销毁内存
    (*s).next = t;
}

int main() // main() 是示例
{
    push(100); // 在末尾追加 100
    push(200); // 在末尾追加 200
    insert(300, 1); // 在第一个结点的后面加上 300
    printf("first:%d, second:%d, third:%d\n", find(1), find(2), find(3)); // 链表现在为 100 300 200
    deletes(1); // 删掉第一个元素
    insert(400, 1); // 在第一个结点的后面插入 400
    printf("first:%d, second:%d, third:%d\n", find(1), find(2), find(3)); // 链表现在为 300 400 200
    return 0;
}
```

:::

虽然代码注释讲了，为了更清楚，再说一遍输出：
```plain
first:100, second:300, third:200
first:300, second:400, third:200
```
**附演示**：<https://visualgo.net/zh/list>

