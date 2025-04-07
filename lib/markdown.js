import fs from "fs";
import path from "path";
import matter from 'gray-matter';

import { remark } from 'remark';

import html from 'remark-html';




const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostSlugs(){
    const filenames = fs.readdirSync(postsDirectory)

    return filenames.map(fileName=>{
        return {
            slug: fileName.replace(/\.md$/, '')
        }
    })

}


export function getPostBySlug(slug){
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const {data, content} = matter(fileContents)

    return {
        slug, 
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content: content
    }
}


export async function getPostContent(slug){
    const post = getPostBySlug(slug)

    const processedContent = await remark()
    .use(html)
    .process(post.content)

    const contentHtml = processedContent.toString()

    return {
        ...post,
        contentHtml
    }
}


export function getAllPosts(){
    const slugs = getAllPostSlugs()

    const posts = slugs.map(({slug})=>getPostBySlug(slug))
    .sort((a,b)=>(a.date > b.date ? -1: 1))


    return posts
}