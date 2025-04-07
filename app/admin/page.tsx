"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"




export default function AdminPage(){
  
     const [isLoggedIn, setIsLoggedIn] = useState(false)
     const [password, setPassword] = useState('')
     const [error, setError] = useState('')
     const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: ''
     })

     const [isSubmitting, setIsSubmitting] = useState(false)
     const [message, setMessage] = useState('')
     const router = useRouter()


  // Handle form input changes
  const handleChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async(e: React.FormEvent)=>{
              e.preventDefault()
             try {
              const response = await fetch('api/auth/', {
                method: 'POST',
                headers:{
                  'Content-type': 'application/json'

                }, 
                body: JSON.stringify({password})

              })

               if(response.ok){
                setIsLoggedIn(true)
                setError('')

               }else{
                setError('Invalid Password')
               }

             } catch (_error) {
              setError('Authentication Failed')
             }
  }


  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    const slug = formData.title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')


    try{
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          slug,
          date: new Date().toISOString().split('T')[0]
        })

      })
     
      if (response.ok){
        setMessage('Post created successfully')
        setFormData({title: '', excerpt: '', content:''})
        router.refresh()
      } else {
        const data = await response.json()
        setMessage(`Error:${data.message}`)
      }


    } catch(_error){
      setMessage('An error occurred while creating the post.')

    } finally{
      setIsSubmitting(false)
    }


  }


  if(!isLoggedIn){
   return(
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
   )
  }

     return(
      <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        
        {message && (
          <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="excerpt">
              Excerpt
            </label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="content">
              Content (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded h-64 font-mono"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
     )


}









