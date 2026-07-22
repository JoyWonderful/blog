## Some Notes

这是我的博客，使用 Astro 构建。

一些配置都有 schema，可以去参考 schema 的解释。

文章在 `/src/posts` 下，这是一个[内容集合](https://docs.astro.build/zh-cn/guides/content-collections/)，在 `/src/content.config.ts` 中定义的名称为 `blogPosts`。

### Post Tags

有 note, details, tabs。

[注意事项](#container)。  
参见 [remark-flexible-containers](https://npmmirror.com/package/remark-flexible-containers#h-remark-flexible-containers) 文档。  
使用 `:::` 开始，`:::` 结束来标记一段内容。可以用更多的冒号嵌套在外面。  
例如：

```markdown
::::details{@open} 默认展开内容

默认展开的内容阿。

:::details details 内部嵌套 details

London. **Michaelmas term lately over**, and the Lord Chancellor sitting in Lincoln's Inn Hall. Implacable November weather. As much mud in the *streets* as if the waters had but newly retired from the ***face of the earth***.

:::

之后的文字再讲给你听。

::::
```

下面的用法中，尖括号指**必须值**，方括号指*可选值*。

#### Note

Container 使用 `note` 类型。  
使用 class 制定 `note` 的类型。有 `info`, `success`, `danger`, `waring`。

```markdown
:::note{.<type>} <title>

<content>

:::
```

#### Details

Container 使用 `details` 类型。  
可使用 `open` 属性使其默认打开。  
若未指定 [summary]，则 [summary] 为 "Details"

```markdown
:::details[{@open}] [summary]

<content>

:::
```

#### Tabs

Container 使用 `tabs`, `tab` 类型。  
`tabs` 不应有标题。
`tabs` 必需指定一个本文章内唯一的 id。  
`tabs` 可以通过 `tab` 属性指定默认打开的标签页，为从一开始的数字。

```markdown
::::tabs{#<id> [@tab=<tab_number>]}

:::tab <tab_title>

<content>

:::

[... more tab Container]

::::
```


### Plugins Install

只有 MarkDown 文件能应用插件。如果想应用插件，不应使用 `astro-remote` 的 `Markdown` 组件，而是用 [Astro 的 Markdown 导入特性](https://docs.astro.build/zh-cn/guides/markdown-content/#%E5%AF%BC%E5%85%A5-markdown)。

remark plugins:
- <https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins>
- <https://github.com/remarkjs/awesome-remark>

rehype plugins:
- <https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins>
- <https://github.com/rehypejs/awesome-rehype>

### Attention

#### Container

Container 的标题上**不能用 Markdown**，不然会有奇奇怪怪的 bug（但是可以有空格）。  
Container 标志 `:::` 和（任何）内容（无论是内部内容还是外部内容）之间最好空一行，不然也可能会有奇奇怪怪的 bug。空着总没坏处。

> There must be empty lines before and after the container in order to parse the markdown properly.

#### Aside

`aside` (`slot="site-sidebar"`) 里面最多只能放一个 `div.title`，再放一个任意 `div` 作为主要内容。  
`div.title` 最好不要超出宽度，因为只显示一行。  
当然，如果你能确保不溢出，放多少都行。

#### Dependencies

以下这两个依赖只在留言簿中使用。

- @shikijs/rehype
- rehype-parse

### License

代码使用 [GPL-3.0-or-later](LICENSE.txt)。  
文章使用 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans)。