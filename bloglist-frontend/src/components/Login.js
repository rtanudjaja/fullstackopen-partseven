import { useState } from 'react'
import Notification from '../components/Notification'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { setUser } from '../reducers/userReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotificationWithTimeout('login is successful', 'success', 5000))
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification message={errorMessage} msgStyle={'error'} />
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button variant="light" id="login-button" type="submit">login</Button>
    </form>
  )
}

export default Login