import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

const App = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user_info = JSON.parse(loggedUserJSON)
            setUser(user_info)
            blogService.setToken(user_info.token)
        }   
    }, [])

    return (
        <div>
            {user === null ? (
                <LoginForm setUser={setUser} />
            ) : (
                <BlogList user={user}
                setUser={setUser} />
            )}
        </div>
    )
}

export default App
