import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            ) 
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h1>Log in to application</h1>
            <form onSubmit={handleLogin}>
                <div>
                    Username:
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password:
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
export default LoginForm
