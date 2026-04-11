/* global hexo */

'use strict';

hexo.extend.tag.register('litever', function() {
    const { dependencies } = require('./../../../../package.json');
    var allPkg = Object.keys(dependencies);
    var str = '';
    allPkg.forEach((depname) => {str += `<a href="https://www.npmjs.com/package/${depname}">${depname}</a>: ${dependencies[depname]}\n`});
    return `<pre class="language-none"><code class="language-none">${str}</code></pre>`;
});

hexo.extend.tag.register('note', function(args, content) {
    content = hexo.render.renderSync({text: content, engine: 'markdown'});
    return `<div class="note ${args[0]}">${content}</div>`
}, {ends: true});

// from theme next
/**
 * @description Usage:
 * ```jinja
 * {% tabs Unique name, [index] %}
 * <!-- tab [Tab caption] [@icon] -->
 * Any content (support inline tags too).
 * <!-- endtab -->
 * {% endtabs %}
 * ```
 * - `Unique name`   : Unique name of tabs block tag without comma.
 *   Will be used in #id's as prefix for each tab with their index numbers.
 *   If there are whitespaces in name, for generate #id all whitespaces will replaced by dashes.
 *   Only for current url of post/page must be unique!
 * - `[index]`       : Index number of active tab.
 *   If not specified, first tab (1) will be selected.
 *   If index is -1, no tab will be selected. It's will be something like spoiler.
 *   Optional parameter.
 * - `[Tab caption]` : Caption of current tab.
 *   If not caption specified, unique name with tab index suffix will be used as caption of tab.
 *   If not caption specified, but specified icon, caption will empty.
 *   Optional parameter.
 * - `[@icon]`       : Font Awesome icon name.
 *   Can be specified with or without space; e.g. 'Tab caption @icon' is the same as 'Tab caption@icon'.
 *   Optional parameter.
 */
hexo.extend.tag.register('tabs', function(args, content) {
    const tabBlock = /<!--\s*tab (.*?)\s*-->\n([\w\W\s\S]*?)<!--\s*endtab\s*-->/g;

    args = args.join(' ').split(',');
    const tabName = args[0];
    const tabActive = Number(args[1]) || 0;

    let tabId = 0;
    let tabNav = '';
    let tabContent = '';

    if (!tabName) hexo.log.warn('Tabs block must have unique name!');
    const matches = content.matchAll(tabBlock);

    for (const match of matches) {
        let [caption = '', icon = ''] = match[1].split('@');
        let postContent = match[2];

        postContent = hexo.render.renderSync({ text: postContent, engine: 'markdown' }).trim();

        const abbr = tabName + ' ' + ++tabId;
        const href = abbr.toLowerCase().split(' ').join('-');

        icon = icon.trim();
        if (icon.length > 0) {
            if (!icon.startsWith('fa')) icon = 'fa fa-' + icon;
            icon = `<i class="${icon}"></i>`;
        }

        caption = icon + caption.trim();

        const isActive = (tabActive > 0 && tabActive === tabId) || (tabActive === 0 && tabId === 1) ? ' active' : '';
        tabNav += `<li class="tab${isActive}"><a href="#${href}">${caption || abbr}</a></li>`;
        tabContent += `<div class="tab-pane${isActive}" id="${href}">${postContent}</div>`;
    }

    tabNav = `<ul class="nav-tabs">${tabNav}</ul>`;
    tabContent = `<div class="tab-content">${tabContent}</div>`;

    return `<div class="tabs" id="${tabName.toLowerCase().split(' ').join('-')}">${tabNav + tabContent}</div>`;
}, {ends: true});