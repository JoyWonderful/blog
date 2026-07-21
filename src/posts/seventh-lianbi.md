---
title: 一些随笔记录和想法
date: 2023-12-31 17:20:14 +08:00
tags: 作文
categories: Others
---

<style>
    [aria-label][balloon-shown] {
        position: relative;
    }
    [aria-label][balloon-shown="left"]::before {
        border: 5px solid transparent;
        border-left-color: #202335;
    }
    [aria-label][balloon-shown="right"]::before {
        border: 5px solid transparent;
        border-right-color: #202335;
    }
    [aria-label][balloon-shown="up"]::before {
        border: 5px solid transparent;
        border-top-color: #202335;
    }
    [aria-label][balloon-shown="down"]::before {
        border: 5px solid transparent;
        border-bottom-color: #202335;
    }
    [aria-label][balloon-shown]::before {
        width: 0;
        height: 0;
        /* pointer-events: none; */ /* 让鼠标无法悬浮在所弹出的伪元素上 */
        z-index: 10;
        content: "";
        position: absolute;
        opacity: 0;
        visibility: hidden;
        transition: opacity .4s, transform .4s, visibility .4s;
    }
    [aria-label][balloon-shown]::after {
        opacity: 0;
        z-index: 10;
        /* pointer-events: none; */ /* 让鼠标无法悬浮在所弹出的伪元素上 */
        visibility: hidden;
        background-color: #202335;
        content: attr(aria-label);
        white-space: nowrap;
        border-radius: 2px;
        position: absolute;
        padding: .5em 1em;
        transition: opacity .4s, transform .4s, visibility .4s;
        color: #eee;
    }
    [aria-label][balloon-shown]:hover::after, [aria-label][balloon-shown]:hover::before {
        opacity: 0.9;
        visibility: visible;
    }
    [aria-label][balloon-shown="left"]::after {
        margin-right: 10px;
    }
    [aria-label][balloon-shown="left"]::after, [aria-label][balloon-shown="left"]::before {
        right: 100%;
        top: 50%;
        transform: translate(5px, -50%);
    }
    [aria-label][balloon-shown="right"]::after {
        margin-left: 10px;
    }
    [aria-label][balloon-shown="right"]::after, [aria-label][balloon-shown="right"]::before {
        left: 100%;
        top: 50%;
        transform: translate(-5px, -50%);
    }
    [aria-label][balloon-shown="left"]:hover::after, [aria-label][balloon-shown="left"]:hover::before, [aria-label][balloon-shown="right"]:hover::after, [aria-label][balloon-shown="right"]:hover::before {
        transform: translate(0, -50%);
    }
    [aria-label][balloon-shown="up"]::after {
        margin-bottom: 10px;
    }
    [aria-label][balloon-shown="up"]::after, [aria-label][balloon-shown="up"]::before {
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, 5px);
    }
    [aria-label][balloon-shown="down"]::after {
        margin-top: 10px;
    }
    [aria-label][balloon-shown="down"]::after, [aria-label][balloon-shown="down"]::before {
        left: 50%;
        top: 100%;
        transform: translate(-50%, -5px);
    }
    [aria-label][balloon-shown="up"]:hover::after, [aria-label][balloon-shown="up"]:hover::before, [aria-label][balloon-shown="down"]:hover::after, [aria-label][balloon-shown="down"]:hover::before {
        transform: translate(-50%, 0);
    }
    .hide-blur {
        filter: blur(5px);
        transition: filter .1s
    }
    .hide-blur:hover {
        filter: none;
    }
    .lianbi-block p:not(.pinyu) {
        text-indent: 2ic;
        line-height: 1.5;
        margin-bottom: .2em;
    }
    .lianbi-block .lianbi-title {
        font-weight: bold;
        text-align: center;
        display: block;
    }
    .lianbi-block .gdg {
        text-decoration: #d60000 wavy underline;
        text-decoration-thickness: 1px;
    }
    .lianbi-block .pinyu {
        color: #d60000;
        font-family: fangsong;
        font-weight: 900;
        line-height: 1.5;
        text-align: right;
        margin: 0 0 1em;
        display: block;
    }
    .lianbi-block#lianbi3 del {
        background-color: #999;
    }
</style>

**写在前面的废话：**  
又是一篇分类于“琐碎”的文章。  
加上这篇文章，这个分类下~~才~~有三篇文章。想来这个博客在运行 `hexo init` 之初，我就没想过写生活向的文章。如今“琐碎”下，一篇是画，两篇是作文收集，勉强算是透露了点生活向。  
想想自己喜欢的，是 HTML, CSS, JavaScript 给我带来的**样式美化**、**多样性**和**自主性**。不然我怎么不记到 .txt 里呢？也不知初衷是什么，唉，这样弄又有些喧宾夺主了。多年后看到，也就微微一笑，笑自己写出的东西<span class="hide-blur" balloon-shown="up" aria-label="看它有什么用呢">古怪？</span>吧。

<!--more-->

下面，红字和红色波浪线都是老师做的标记。红字是批语。红线大概是老师认为有想法的句子吧。
**按时间排序的文章：**

## 一
### 记录
<blockquote class="lianbi-block">
    <span class="lianbi-title" aria-label="这篇文章有些假，自己不太喜欢" balloon-shown="up">运动会跳高随记</span>
    <p>我在操场上观看男子跳高。哪怕只讲跳高场地的气氛也是十分紧张激烈得了。运动员刚跳完，学生裁判和助理就飞快地冲上去把杆子重新架好，再用手推或脚踢将软垫重新压紧实，另一位运动员又跑步向前，一跃而起，脸上带着坚定和紧张。节奏之快，把观众观赛的热情都点燃了。</p>
    <p>这时，一位跳高运动员吸引了我的注意。根据他服装上的号码牌，我得知他是四班的一名运动员。他起跳了，但没有跳过，带着杆子跌向软垫。我感觉，他脸上写满不甘心与不服输，他和教师裁判要求再跳一遍。于是，我看到他咬紧牙关，再次冲向调高杆，似乎把腿尽可能地抬高，落向软垫——但他又失败了，脚带动杆子滑落下来，杆子落到地上发出哗啦一声。这声音对他来说可能是震天动地的，意味着失败的响声。我看到他再一次向裁判要求重新跳。我从我们班作为跳高裁判助理的施同学口中得知，如果失败，这次起跳是最后一次了。<span class="gdg">忽地，我联想到了一个人的坚定和决绝，这是不太容易做到的。这一次，他像鸟儿一样轻捷，越过杆子，似乎还有些紧张，但稳稳地落到软垫上，他成功了。</span></p>
    <p style="margin:0">我知道，在把杆子升高增加难度后，他最后一次失败了，退出了比追逐战还要激烈的跳高比赛。但能这样重复要求重新跳一次，连续跳三次的精神已经很好了，这是运动员的精神，因而留给我很深的印象。我坐在看台上喝奶茶时想到，尽管他是四班的，而我是三班的人。</p>
    <p class="pinyu" style="margin-right:12ch;">运动精神感染每一个人.</p>
</blockquote>

### 想法
这篇文章是开完运动会老师叫写的~~（废话）~~。个人认为这届初中运动会不如小学的时候有那种热情、激动、高兴等等开运动会的感觉了。一方面因为<strong aria-label="流感横行" balloon-shown="up" style="border-bottom:1px dotted">延期</strong>和<strong aria-label="三天缩水成两个下午" balloon-shown="up" style="border-bottom:1px dotted">运动会时间的缩短</strong>，更重要的另一方面**运动会项目减少**、就在**一个操场**看、**不写通讯稿**，对于我来说<span aria-label="从第一次运动会到现在，我就没参加过比赛" balloon-shown="up" style="border-bottom:1px dotted">乐趣</span>都没了。这篇作文 30% 都不算真实感受。  
至于真实事件，主要是因为有同班同学在跳高场地那儿当助理（也就是扶扶杆子）便跑到那儿和同学聊聊天。男子跳高我们班没人参加，去那儿只为**聊天**（还顺便当好人帮同学扔橘子皮？）。四班体委跳高，看了看，感觉那种跳了三次的事件适合写到作文里，回家一想到就写了。

至于老师的评语嘛，<span aria-label="包括句尾的一点" balloon-shown="up" style="border-bottom:1px dotted">原话是这样写的</span>，也不知道老师写这个是不是想到了什么。大概没什么别的深意。

**题外话：**那天有奶茶和泡芙供应，只喝了一瓶不知名品牌普通奶茶，味道还好。其他同学吃喝也蛮开心的。

## 二
### 记录
<blockquote class="lianbi-block">
    <span class="lianbi-title" aria-label="不好说自己写这篇文章时的精神状态" balloon-shown="up">周五那些琐碎事</span>
    <p>此刻，我正坐在微格教室里，写这篇随记。自修的时间大家都很安静，只有教室里不知什么设备发出低沉且有规律的“咚咚”声，正是回忆和写作的耗时间，想想在一个半小时之前发生的琐事，我想。</p>
    <p>下午，五点，同学们乱哄哄地换完了座位，准备排队出校。而包括我的四个人却还要留在学校里，这真的是一种很奇特的感觉，我在独自去往食堂时想到。几个同学吃完了饭回到教室，有打扫一会儿卫生才去微格教室准备上课。来到微格教室，看到教室的布局，让我想到了母校的微格教室，给人一种很宁静的感觉。原本着急上完课，着急回家的心绪也平静下来。在现在想，<span class="gdg">大概是这种平静才是名词里“素养”与“提升”的感觉，竟有一种置身世外的超然感。</span></p>
    <p>这次科学老师上课，居然没有数学课那样急切，没有争分夺秒的感觉，甚至没有往常的节奏快。不知是我心里的主观认为还是微格教室的影响。还是给人一种宁静感，甚至悠闲，但又不是。现在想，那种感觉确实是<span class="gdg">安心学习的基础啊，不急功近利，而是宁静平和，甚至有限，轻松，太急躁反而容易犯错呢。我想。</span></p>
    <p>平时的课一般上一个小时，数学课通常还要拖几分钟，因为任务太多了。但这次不一样，宁静的教室，没有是么非常紧迫的任务。科学老师只上了半个小时的课，刚好在第一节晚自习一半的铃声响起时讲完了作业，剩下的时间老师让我们自修。一切都是平静的。于是，我开始写随记，也就是开头呈现的景象，一切都给人以平静，安静的感觉。</p>
    <p>想着想着，自修已经到了末尾，班里的同学开始吵闹起来，打破了原有的宁静，以及原有的那份奇特的心境。我意识到，我还要进行枯燥、有条不紊、节奏快的生活。生活的节奏很快，这种宁静是很难再找到了。我想找一句话来总结我的所思所想所写，但周围不再宁静，脑海中全是纷乱的思绪，如同一大片散乱的拼图，十分烦躁。突然几句话拨开纷乱的拼图“夫学须静也，才须学也。”“淫慢则不能励精，险躁则不能治性”。是的，无论干什么，都需要平静，需要宁静专一。宁静，不仅让人放松，还让人奋斗。</p>
    <p>正准备盖上笔合上本子，却又有一个想法冒出来，我翻到前面看了看开头的自己，抿嘴笑了，添上一句话：</p>
    <p style="margin:0">从本文开头到结尾，细微的自己变化和涂改状况能看出，这间教室和我在写这篇文章时的宁静与否吧？</p>
    <span class="pinyu" style="margin-right:15ch">“静能生慧”，一直觉得你是个能<br>“沉得住气”的孩子，很棒哦！</span>
</blockquote>

### 想法
因为那天开家长会，照理说是所有学生都不用上<span aria-label="“双减”政策，你值得拥有！" balloon-shown="up" style="border-bottom:1px dotted">晚自习</span>五点就回家的。但是我非常遗憾地参加了~~光明**优倍**鲜牛奶班~~<strong aria-label="某重点中学搞出的“提前批”政策，导致所谓培优班出现" balloon-shown="up" style="border-bottom:1px dotted" class="hide-blur">培优班</strong>，得继续留在学校，上一个小时的<span class="hide-blur">培优班</span>，再写作业写到八点晚自习放学。就感觉很离谱，吐槽一下。  
实际上，我们四个<span class="hide-blur">培优班</span>的同学吃完了饭确实*受老师委托*回到教室打扫卫生，才去的微格教室。平常的课都在二班旁边的普通教室上，这次去微格教室<span aria-label="家长会先在报告厅开，后来到各班教室开" balloon-shown="up" style="border-bottom:1px dotted">大概是为了不打扰家长会</span>吧。  
那天语文课和科学课换了，上的是科学课。老师说就讲三十分钟作业，剩下时间自修，就那样做了。我大概写了五十分钟的其他作业，剩下的时间都拿来写上面这篇作文了。当时想不到写什么好，<span aria-label="每次我都这样做" balloon-shown="up" style="border-bottom:1px dotted">干脆直接写当时场景了</span>。其实也是想在作文里“诉说不易”吧。

至于老师的评价。。。很难确定老师理解到的是我想写什么，甚至连我自己也不清楚了。也不知道老师为什么评价的字写得比上一篇大。

附：真不想写“<span class="hide-blur">培优班</span>”三个字。

## 三
:::note{.danger} 地名替换

原作文中有真实地名，为了避免泄露信息，使用划掉的“占位”进行了替换。  
显示为这样：<span style="text-decoration:line-through;background-color:#999;">占位</span>

:::

### 记录
<blockquote class="lianbi-block" id="lianbi3">
    <span class="lianbi-title"><del>占位</del>旅途记</span>
    <p>在<del>占位</del>，说起<del>占位岛</del>就让人想起连接<del>占位岛</del>与大陆的那座桥和“海洋”这个字眼来。又是两天后，坐在教室里，细细地回想两到四天前的事。</p>
    <p>海洋和桥，自然是在路上看到的。从<del>占位</del>海边到<del>占位岛</del>上的路就值得一提。经过<del>（占位占线）</del>和<del>占位占路</del>，我看到了海、海港和船只。基本只在城区待着的我没见过这般略显壮观的景象，立刻被吸引了：<span class="gdg">一排排轮船靠在岸边，船身下的水些许浑黄，仿佛同船一起睡着。海港在休息，但不减其威严气势，自然很引人注目。</span>和庞大的轮船与广阔无垠的海比起来，“小”客车自然没趣。突然间想到“海洋文化”正是这种意蕴。客车走上山路，越走越高。刹那间，眼前凭空出现一座仿佛横跨海面的桥。我的目光立刻又被桥捉了去。桥的支点是在两边的山上的，桥下面没有柱子支撑，所以看起来仿佛悬浮在海面上，桥也很高。车接近了桥，越发显得小了。还没上桥，就已觉得桥下海之广袤。走在桥上，仿佛神话中天神自由在空中行走，越过海洋。</p>
    <p>过了桥，便上了岛。又走了一会儿，到了活动基地。基地中发生的事反而没让我想到大海的悠远，似乎没什么特别让人印象深刻的事。海边桥上车中，自我上的一节课更让我印象深刻得多。</p>
    <p style="margin:0">海的<span class="gdg">广阔，如广阔得胸怀，容纳着船只和桥。船只和桥也容纳着其他事物。它们相互包容，相对广阔包容相对渺小的。这是海洋的精神：</span>包容。同样地，我们也得学习传承海洋文化精神。想来，这也算是<del>占位</del>之旅给我带来的收获——包容和责任。</p>
    <span class="pinyu" style="margin-right:3ch">多去外面走走，会有记很多不一样<br>的启示.</span>
</blockquote>
