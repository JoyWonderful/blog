---
title: C++ 文件操作
date: 2023-07-17 17:23:11 +08:00
tags: 语言入门
categories: Programming
---

我曾经用 Python 的 tkinter 库写过一个[文本编辑器](https://github.com/JoyWonderful/My-Python-File/blob/main/text-txt.py)，一百多行，当时幼稚的我以为自己很了不起，因为当时的我认为读写文件是一件很复杂的事情。后来看看，这个东西做得很蹩脚，一个简单的 `with open()` 就完成了读写文件的操作，可见文件的读写是个很平常的事情。当年的喜悦大概是学到读写文件的喜悦吧。  
C++ 读写文件，也算是比较平常的。当数据点大的时候输出到文件里更方便。就在这里小记一下读写文件的操作。
<!--more-->

<hr>

`fstream` 有两个类，分别是 `ofstream` 和 `ifstream`。`ofstream` 是写文件的，`ifstream` 是读文件的。这是一个打开文件的语法：
```cpp
file.open("./text.txt", ios::in | ios::out);

[file object].open([file path], [open mode]);
inline void std::ofstream::open(const char *__s, std::ios_base::openmode __mode);
inline void std::ifstream::open(const char *__s, std::ios_base::openmode __mode);

open(const char* __s, ios_base::openmode __mode = ios_base::in); // ifstream
open(const char* __s, ios_base::openmode __mode = ios_base::out | ios_base::trunc); // ofstream
```
其中，`|` 可以将多个打开模式加在一起。打开模式有：
1. 常用的
    - `ios::in` 打开文件读取，用于 `ifstream`。
    - `ios::out` 打开文件写入，用于 `ofstream`。
2. 不常用的
    - `ios::app` 将写入的内容追加在末尾。用于 `ofstream`。
    - `ios::ate` 打开定位到末尾。用于 `ofstream`。
    - `ios::trunc` 若文件存在，则覆盖文件，不保留原始内容。在 `ofstream` 中，默认是 `ios::trunc`。

当写入或读取文件时，和 `cin` `cout` 差不多。例如：
```cpp
#include <iostream>
#include <fstream>
using namespace std;

ofstream outfile;
int main()
{
    outfile.open("./text.txt", ios::out);
    outfile << "text" << endl;
    char c = 'P';
    outfile << c << endl;
    outfile.close()
    return 0;
}
```
这段代码会向当前目录下 `text.txt` 写入 `"text\n"` 和 `"P\n"`。  
程序结束，最好**关闭文件**，使用 `[file object].close()`，虽然不关闭文件也没关系。
