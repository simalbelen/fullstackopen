import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

const App = () => {
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorType, setErrorType] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user_info = JSON.parse(loggedUserJSON)
            setUser(user_info)
            blogService.setToken(user_info.token)
        }
    }, [])

    const handleNotification = (text, type) => {
        setErrorType(type)
        setErrorMessage(text)
        setTimeout(function () {
            setErrorMessage(null)
        }, 2000)
    }

    return (
        <div>
            {user === null ? (
                <LoginForm
                    setUser={setUser}
                    handleNotification={handleNotification}
                    errorMessage={errorMessage}
                    errorType={errorType}
                />
            ) : (
                <BlogList
                    user={user}
                    setUser={setUser}
                    handleNotification={handleNotification}
                    errorMessage={errorMessage}
                    errorType={errorType}
                />
            )}
        </div>
    )
}

export default App
