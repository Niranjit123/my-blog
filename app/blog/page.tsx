import Link from "next/link"
import { getAllPosts } from "@/lib/markdown"




export default function BlogPage(){

    const posts = getAllPosts()

    return(

        <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-4">
            <h2 className="text-xl font-medium">
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            {/* <p className="text-gray-500 text-sm">{post.date}</p> */}
            <p className="mt-2">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
       
    )
}