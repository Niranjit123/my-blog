// app/page.tsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

export default async function Home() {
  const posts = getAllPosts();
  
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <section className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">My Next.js Blog</h1>
        <p className="text-xl text-gray-600">A simple blog built with Next.js, Tailwind CSS, and Markdown</p>
      </section>
      
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">Recent Posts</h2>
          <Link href="/blog" className="text-blue-600 hover:underline">
            View all posts →
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {posts.slice(0, 4).map((post) => (
            <article key={post.slug} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  <Link href={`/blog/${post.slug}`} className="text-blue-700 hover:text-blue-900">
                    {post.title}
                  </Link>
                </h3>
                {/* <p className="text-gray-500 text-sm mb-3">{post.date as string}</p> */}
                <p className="mb-4 text-gray-700">{post.excerpt}</p>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      <section className="mb-12 py-8 bg-gray rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">About This Blog</h2>
        <p className="mb-4">
          Welcome to my blog! This site is built using Next.js with the App Router, styled with Tailwind CSS, 
          and uses Markdown files for content management.
        </p>
        <p>
          Feel free to browse through the articles. New content is added regularly!
        </p>
      </section>
      
      <footer className="border-t pt-6 text-center text-gray-500">
        <p>© {new Date().getFullYear()} My Next.js Blog. Built with Next.js and Tailwind CSS.</p>
      </footer>
    </main>
  );
}