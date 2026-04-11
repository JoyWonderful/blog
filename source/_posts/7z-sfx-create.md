---
title: 7-Zip 自解压程序的创建
tags: Other-Tag
categories: Programming
date: 2026-04-11 21:30:30
---


如果有制作单文件便携版(Portable)程序（通常也被称作“绿色版软件”）的需求，可以使用 7-Zip 自解压程序。  
这里的“*自解压程序*”是指 "*SFX Modules for Installers*"，不是 7-Zip 下载下来自带的“创建自解压程序”功能及安装目录中自带的 `7z.sfx`, `7zCon.sfx`。

于[这里](https://7-zip.org/sdk.html)下载 LZMA SDK，里面的 `./bin/*.sfx` 文件（3 个，`7zSD.sfx` 其实才是这里用的）就是我们所需要的。  
你可能还需要 [Resource Hacker](https://www.angusj.com/resourcehacker/) 和 [ImHex](https://imhex.werwolv.net/)。

<!--more-->

## 官方说明

SDK中 `./DOC/installer.txt` 中的官方说明文档附在此，供参考。

{% tabs doc-installer, -1 %}
<!-- tab 文档（点击展开） -->
```
7-Zip for installers 9.38
-------------------------

7-Zip is a file archiver for Windows NT/2000/2003/2008/XP/Vista/7/8/10. 

7-Zip for installers is part of LZMA SDK.
LZMA SDK is written and placed in the public domain by Igor Pavlov.

It's allowed to join 7-Zip SFX module with another software.
It's allowed to change resources of 7-Zip's SFX modules.


HOW to use
-----------

7zr.exe is reduced version of 7za.exe of 7-Zip.
7zr.exe supports only format with these codecs: LZMA, LZMA2, BCJ, BCJ2, ARM, Copy.

Example of compressing command for installation packages:

7zr a archive.7z files

7zSD.sfx is SFX module for installers. 7zSD.sfx uses msvcrt.dll.

SFX modules for installers allow to create installation program. 
Such module extracts archive to temp folder and then runs specified program and removes 
temp files after program finishing. Self-extract archive for installers must be created 
as joining 3 files: SFX_Module, Installer_Config, 7z_Archive. 
Installer_Config is optional file. You can use the following command to create installer 
self-extract archive:

copy /b 7zSD.sfx + config.txt + archive.7z archive.exe

The smallest installation package size can be achieved, if installation files was 
uncompressed before including to 7z archive.

-y switch for installer module (at runtime) specifies quiet mode for extracting.

Installer Config file format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Config file contains commands for Installer. File begins from string 
;!@Install@!UTF-8! and ends with ;!@InstallEnd@!. File must be written 
in UTF-8 encoding. File contains string pairs: 

ID_String="Value"

ID_String          Description 

Title              Title for messages 
BeginPrompt        Begin Prompt message 
Progress           Value can be "yes" or "no". Default value is "yes". 
RunProgram         Command for executing. Default value is "setup.exe". 
                   Substring %%T will be replaced with path to temporary 
                   folder, where files were extracted 
Directory          Directory prefix for "RunProgram". Default value is ".\\" 
ExecuteFile        Name of file for executing 
ExecuteParameters  Parameters for "ExecuteFile" 


You can omit any string pair.

There are two ways to run program: RunProgram and ExecuteFile. 
Use RunProgram, if you want to run some program from .7z archive. 
Use ExecuteFile, if you want to open some document from .7z archive or 
if you want to execute some command from Windows.

If you use RunProgram and if you specify empty directory prefix: Directory="", 
the system searches for the executable file in the following sequence:

1. The directory from which the application (installer) loaded. 
2. The temporary folder, where files were extracted. 
3. The Windows system directory. 


Config file Examples
~~~~~~~~~~~~~~~~~~~~

;!@Install@!UTF-8!
Title="7-Zip 4.00"
BeginPrompt="Do you want to install the 7-Zip 4.00?"
RunProgram="setup.exe"
;!@InstallEnd@!



;!@Install@!UTF-8!
Title="7-Zip 4.00"
BeginPrompt="Do you want to install the 7-Zip 4.00?"
ExecuteFile="7zip.msi"
;!@InstallEnd@!



;!@Install@!UTF-8!
Title="7-Zip 4.01 Update"
BeginPrompt="Do you want to install the 7-Zip 4.01 Update?"
ExecuteFile="msiexec.exe"
ExecuteParameters="/i 7zip.msi REINSTALL=ALL REINSTALLMODE=vomus"
;!@InstallEnd@!



Small SFX modules for installers
--------------------------------

7zS2.sfx     - small SFX module (GUI version)
7zS2con.sfx  - small SFX module (Console version)

Small SFX modules support this codecs: LZMA, LZMA2, BCJ, BCJ2, ARM, COPY

Small SFX module is similar to common SFX module for installers.
The difference (what's new in small version):
 - Smaller size (30 KB vs 100 KB)
 - C source code instead of ?+
 - No installer Configuration file
 - No extracting progress window
 - It decompresses solid 7z blocks (it can be whole 7z archive) to RAM.
   So user that calls SFX installer must have free RAM of size of largest 
   solid 7z block (size of 7z archive at simplest case).

How to use
----------

copy /b 7zS2.sfx + archive.7z sfx.exe

When you run installer sfx module (sfx.exe)
1) It creates "7zNNNNNNNN" temp folder in system temp folder.
2) It extracts .7z archive to that folder
3) It executes one file from "7zNNNNNNNN" temp folder. 
4) It removes "7zNNNNNNNN" temp folder

You can send parameters to installer, and installer will transfer them to extracted .exe file.

Small SFX uses 3 levels of priorities to select file to execute:

  1) Files in root folder have higher priority than files in subfolders.
  2) File extension priorities (from high to low priority order): 
       bat, cmd, exe, inf, msi, cab (under Windows CE), html, htm
  3) File name priorities (from high to low priority order): 
       setup, install, run, start

Windows CE (ARM) version of 7zS2.sfx is included to 7-Zip for Windows Mobile package.


Examples
--------

1) To create compressed console 7-Zip:

7zr a c.7z 7z.exe 7z.dll -mx
copy /b 7zS2con.sfx + c.7z 7zCompr.exe
7zCompr.exe b -md22


2) To create compressed GUI 7-Zip:

7zr a g.7z 7zg.exe 7z.dll -mx
copy /b 7zS2.sfx + g.7z 7zgCompr.exe
7zgCompr.exe b -md22


3) To open some file:

7zr a h.7z readme.txt -mx
copy /b 7zS2.sfx + h.7z 7zTxt.exe 
7zTxt.exe
```
<!-- endtab -->
{% endtabs %}

## 创建程序

首先，你自然得把你想单文件处理的软件文件下载下来。  
那个软件最好是有“便携版本”，但是非单个文件。（例如 FDM）  

将它们打包成一个 `.7z` 压缩包。  
**注意**：压缩包根目录下不要有文件夹嵌套。

### 配置文件

创建一个 `config.txt`，一般来说，你只要写入以下就够了：

```
;!@Install@!UTF-8!
ExecuteFile="fdm.exe" # 改成要运行的程序的名字，路径按压缩包内路径来。
;!@InstallEnd@!
```

----------

{% note info %}
关于其配置文件（参见文档“Installer Config file format”）

配置文件是一个编码为 UTF-8 的文本文档。开头以 `;!@Install@!UTF-8!` 开始，以 `;!@InstallEnd@!` 结束。  
文件的配置格式应为 `ID_String="Value"` 的字符串对形式。
| `ID_String` | 简介 |
| :---------- | :--- |
| `Title` | 解压消息的标题。 |
| `BeginPrompt` | 若有这个项，会先显示一个含有这条消息的确认对话框。 |
| `Progress` | 值为 `yes` 或 `no`，默认为 `yes`。若为 `yes`，则在解压时显示进度条。 |
| `RunProgram` | 运行的命令。默认为 `setup.exe`。 |
| `Directory` | 给 `RunProgram` 的文件夹前缀。默认为 `.\\`。 |
| `ExecuteFile` | 运行文件的名字。 |
| `ExecuteParameters` | 给 `ExecuteFile` 传的参数。 |

有两种方式运行程序：  
如果你想运行压缩包中的程序（就是直接打开 .exe），用 `RunProgram`；  
如果你想打开压缩包中的文档或运行 Windows 命令（对于非 .exe 文件直接调用其他程序打开），用 `ExecuteFile`。
{% endnote %}

### 打包

将 `7zSD.sfx`, `config.txt` 和压缩包放在同一目录下，运行：

```bat
copy /b 7zSD.sfx + config.txt + archive.7z archive.exe
::将 "archive" 改成需要的名字
```

尝试运行 `archive.exe`，看看效果。

### 解决“兼容性问题”&更改图标

可以发现解压对话框进度条和按钮都是复古样式~~Windows 兼容性真强~~，退出程序后会出现“兼容性程序助手”的提示，而且程序的图标不是我们想要的。所以用 Resource Hacker 进行修改。

打开 Resource Hacker，菜单 File -> Open，打开打包好的 .exe。  
于左侧资源树右键 "Icon" -> Replace Icon -> Open File with new icon...，打开源文件，选择图标。  
菜单 Action -> Add using Script Template... -> 下拉菜单中选择 "MANIFEST"。替换：

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">
  <compatibility xmlns="urn:schemas-microsoft-com:compatibility.v1"> 
      <application> 
        <!--This Id value indicates the application supports Windows Vista functionality -->
          <supportedOS Id="{e2011457-1546-43c5-a5fe-008deee3d3f0}"/> 
        <!--Win7-->
          <supportedOS Id="{35138b9a-5d96-4fbd-8e2d-a2440225f93a}"/>
        <!--Win8-->
          <supportedOS Id="{4a2f28e3-53b9-4441-ba9c-d69d4a4a6e38}"/>
        <!--Win8.1-->
          <supportedOS Id="{1f676c76-80e1-4239-95bb-83d0f6d0da78}"/>
        <!--Win10/11-->
          <supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}"/>
      </application> 
  </compatibility>
  <dependency>
    <dependentAssembly>
        <assemblyIdentity
            type="win32"
            name="Microsoft.Windows.Common-Controls"
            version="6.0.0.0"
            processorArchitecture="*"
            publicKeyToken="6595b64144ccf1df"
            language="*"
        />
    </dependentAssembly>
  </dependency>
  <application xmlns="urn:schemas-microsoft-com:asm.v3">
    <windowsSettings>
        <dpiAware  xmlns="http://schemas.microsoft.com/SMI/2005/WindowsSettings">true</dpiAware>
    </windowsSettings>
  </application>  
</assembly>
```

菜单 Action -> Compile，随后菜单 File -> Save。  
新的文件应该没问题了。

## 其他

如果你安装了 7-zip（其他压缩软件应该也行？），可以以压缩包的形式打开制作好的便携版程序。毕竟 sfx 和图种的实现方式是一样的。  
在未退出制作的程序时，可以在 `%temp%\7zSXXXXXXXX` 里找到解压的压缩包。（`XXXXXXXX` 为随机的字母数字）当程序退出时，该文件夹随即被删除。

Resource Hacker 里一样可以改公司、版本信息一类的。

使用 ImHex 一类的软件可以找到程序里的 Manifest 和配置。