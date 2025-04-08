import { getPostContent, getAllPostSlugs } from '@/lib/markdown'

export async function generateStaticParams() {
    const posts = getAllPostSlugs()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

// Use the Next.js specific type definition
interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = params
  const post = await getPostContent(slug)
  
  return (
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