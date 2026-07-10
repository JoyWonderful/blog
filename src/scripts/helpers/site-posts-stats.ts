import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

const blogPosts:[CollectionEntry<"blogPosts">] = await getCollection("blogPosts");

/* Map 的形式是 ["<tag/category>", ["<post.id 1>", "<post.id 2>", ...]]
即 Map 的 key 是标签名或分类名，value 是该标签/分类下的所有文章。*/

export function getAllCategories():Map< string, Array<string> > {
    var all_categories:Map< string, Array<string> > = new Map();
    blogPosts.forEach((post:CollectionEntry<"blogPosts">) => {
        var categories:string = post.data.categories;
        var category_get = all_categories.get(categories); // 若没有，则会返回 undefined
        if(category_get) { // 已经有这个分类了
            category_get.push(post.id); // 文章加入分类列表
            all_categories.set(categories, category_get);
        }
        else {
            all_categories.set(categories, [post.id]);
        }
    });
    return all_categories;
}

export function getAllTags():Map< string, Array<string> > {
    var all_tags:Map< string, Array<string> > = new Map();
    blogPosts.forEach((post:CollectionEntry<"blogPosts">) => {
        var tags:Array<string>;
        if(typeof(post.data.tags) == "string") tags = [post.data.tags];
        else tags = post.data.tags;
        tags.forEach((tag) => {
            var tag_get = all_tags.get(tag);
            if(tag_get) {
                tag_get.push(post.id);
                all_tags.set(tag, tag_get);
            }
            else {
                all_tags.set(tag, [post.id]);
            }
        });
    });
    return all_tags;
}
