import { useEffect, useState } from 'react'

import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ user }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h2>Blogs</h2>
            <span> {user.username} is logged in</span>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default BlogList
