import config from "~/config.source.json";

/**
 * @description 根据 config.source.json 获取需要载入的资源列表
 * @param {Array<string>} identifiers 需要获取的 identifiers（用于 `config[index.item]`）
 * @returns {Array<string>}
 */
export function getSourcePathList(identifiers:Array<string>) {
    var lst:Array<string> = [];
    for(const i of identifiers) {
        var reg = config[i];
        var base_url = (new URL(reg.base_url)).origin; // 确保没有 `/` 结尾
        reg.package_list.forEach((pkg:{package:string, version:string, file_path:Array<string>}) => {
            pkg.file_path.forEach((file) => {
                var path_res = reg.path_format.replace(":package", pkg.package)
                                              .replace(":version", pkg.version)
                                              .replace(":file_path", file);
                if(!path_res.startsWith("/")) { // 确保以 `/` 开头
                    console.warn("`path_res` doesn't starts with `/`.");
                    path_res = "/"+path_res;
                }
                lst.push(`${base_url}${path_res.replaceAll("//", "/")}`);
            });
        });
    }
    return lst;
}
