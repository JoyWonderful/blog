/* global hexo */
'use strict';

/**
 * @description 方便在博客中直接使用资源站下的图片
 * @description `_config.yml` 中有以下几点设置：
 * ```yaml
 * cdnimg: # 主根
 *   prefix: [...] # 一个列表，规定一组图片名字前缀，用 `:title` 来代替 slug(你的文章的文件名)
 *   prefix_char: '...' # 一个字符（串），加到名字前缀之间
 * ```
 * @description 使用方法：
 * {% cdnimg <alt>, <name(with extension)>, [other attributes(optional, sliced by `;`)] %}
 * 三个参数：第一个参数为图片 alt；第二个参数为图片名字（带扩展名）；第三个参数可选，为其他加到 <img> 里的属性（可选，形式为 attr="value"，用分号分隔）
 */

hexo.extend.tag.register("cdnimg", function(args) {
    const config = hexo.config.cdnimg;
    args = args.join("").split(",");
    var imgAlt = args[0];
    var imgName = args[1];
    var urlName = config.prefix.join(config.prefix_char).replace(":title", this.slug.replaceAll("-","")/* 这是文章文件名去掉扩展名的 */) + config.prefix_char + imgName;
    var wholeUrl = config.cdn + urlName;

    var imgAttr = [];
    if(args[2] != undefined) imgAttr = args[2].split(";");
    imgAttr = imgAttr.map((attr) => {
        attr.trim();
        attr = attr.replace("=", "=\"");
        attr += "\"";
        return attr;
    });
    imgAttr = imgAttr.join(" ");

    // console.log(JSON.stringify(Object.keys(this), null, 2));
    // console.log(typeof this);
    console.log(`<img src="${wholeUrl}" alt="${imgAlt}" ${imgAttr}>`);
    return `<img src="${wholeUrl}" alt="${imgAlt}" ${imgAttr}>`;
});