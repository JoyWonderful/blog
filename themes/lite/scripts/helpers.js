/* global hexo */

'use strict';

const moment = require("moment");
hexo.extend.helper.register('post_time', function(momObject, formatStr) {
    return moment(momObject).format(formatStr);
});
hexo.extend.helper.register('src', function(file) {
    if(file[0] == "/" && hexo.config.src_site.endsWith("/")) {
        file = file.replace("/", "");
    }
    return hexo.config.src_site + file;
});