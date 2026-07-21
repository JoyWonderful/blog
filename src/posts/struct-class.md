---
title: C++类（结构体）
date: 2023-05-31 19:16:45 +08:00
tags: 语言入门
categories: CourseNotes
---

## 结构体
结构体使用 `struct` 关键字定义。~~对于目前的我来说，没什么要记的。~~例如：

```cpp
struct test {
    int val, num;
}a;
a.val;
```

<!--more-->

需要记的是：  
当使用该类型的指针变量时，访问其子元素应使用 `->` 而不是直接使用 `.`，也可以通过解地址（但比较麻烦）的写法：`(*a).val`。  
例子：

```cpp
struct test {
    int val;
};
test a, *b, c; // b 是指针变量

b = &a;
a.val = 114;
printf("%d %d %d\n", a.val, b->val, (*b).val); // 因为 b 存储 a 的地址，又 `b->val` 和 `(*b).val` 相同，输出为：
// 114 114 114

c.val = 810;
b = &c;
printf("%d %d %d\n", c.val, b->val, (*b).val); // 同上解释。输出为：
// 810 810 810

b->val = 70; // 相当于 `(*b).val=70;`。由于 b 存储 c 的地址，c 的 val 的值被改变了。
b = &a;
(*b).val = 80; // 同上，相当于 `b->val=80;`。b 存 a 的地址，a.val 被改变了。
printf("%d %d %d", a.val, c.val, b->val); // b 还指向 a，a, c 分别被改为 80, 70。则输出为：
// 80 70 80
```


## 创建一个类

**类**类似于结构体，只不过他是C++独有的而已。对于我这个入门者来说，类几乎等于结构体，只不过他出现了一种概念：公有 `public` 私有 `private` 受保护的 `protected` 。当然，对于我来说，除了 `public` 能用，其他的**都不能用**。~~我还是**太蒻了**。捂脸.jpg~~ 但是继承类似乎可以用。例如：

```cpp
class myclass
{
    public :
        int a ;
    private :
        int b ;
    protected :
        int c ;
}
```

对于我来说，除了 a 都不能用。  
好像也没啥能记的了。再次捂脸.jpg