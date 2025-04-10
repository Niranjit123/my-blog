import { getPostContent, getAllPostSlugs } from '@/lib/markdown'

export async function generateStaticParams() {
  const posts = getAllPostSlugs()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }) {
  const { slug } = params
  const post = await getPostContent(slug)
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <div 
        className="prose lg:prose-xl" 
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
      />
    </div>
  )
}