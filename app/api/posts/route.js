// app/api/posts/route.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { title, excerpt, content, slug, date } = await request.json();
    
    // Validate required fields
    if (!title || !content || !slug) {
      return NextResponse.json(
        { message: 'Title, content, and slug are required' },
        { status: 400 }
      );
    }
    
    // Create markdown content
    const markdown = `---
title: ${title}
date: ${date}
excerpt: ${excerpt}
---

${content}`;
    
    // Ensure posts directory exists
    const postsDirectory = path.join(process.cwd(), 'posts');
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }
    
    // Write file
    const filePath = path.join(postsDirectory, `${slug}.md`);
    fs.writeFileSync(filePath, markdown);
    
    return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { message: 'Failed to create post' },
      { status: 500 }
    );
  }
}