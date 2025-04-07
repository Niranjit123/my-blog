import {getPostContent, getAllPostSlugs } from '@/lib/markdown'

export async function generateStaticParams(){
    const posts = getAllPostSlugs()

    return posts.map((post)=>({
        slug: post.slug,

    }))
}


interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  contentHtml: string;
}

type BlogPostParams = {
  params: {
    slug: string;
  };
};

export default async function BlogPost({params}: BlogPostParams){
  const resolvedParams = await params  
  const {slug} = resolvedParams

    const post = await getPostContent(slug)
    return(
        <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        {/* <p className="text-gray-500 mb-8">{post?.date}</p> */}
        
        <div 
          className="prose lg:prose-xl" 
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
      </div>
    )
}