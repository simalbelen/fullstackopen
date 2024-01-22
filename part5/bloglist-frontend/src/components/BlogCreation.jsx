import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const BlogCreation = ({ setBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreation = async (event) => {
        event.preventDefault()
        try {
            const blog = await blogService.create({
                title,
                author,
                url
            })
            
            setTitle('')
            setAuthor('')
            setUrl('')
            // Updating the blogs with the new one
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        } catch (exception) {
            console.log(exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={handleCreation}>
                <div>
                    Title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    URL:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
export default BlogCreation
