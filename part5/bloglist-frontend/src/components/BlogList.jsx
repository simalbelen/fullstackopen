import { useEffect, useState } from 'react'

import Blog from './Blog'
import BlogCreation from './BlogCreation'
import blogService from '../services/blogs'

const BlogList = ({ user, setUser }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchData()
    }, [])

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }
    return (
        <div>
            <h1>Blogs</h1>
            <span> {user.username} is logged in </span> <button onClick={handleLogout}>Logout</button>

            <BlogCreation setBlogs={setBlogs}/>
            <br/>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default BlogList
