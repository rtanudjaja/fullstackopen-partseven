import './index.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { connect, useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from './reducers/notificationReducer'

const App = (props) => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const createFormRef = useRef()
  const notifications = props.notifications

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      blogService.setToken(user.token)
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (newTitle, newAuthor, newUrl) => {
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }

    return blogService.create(blogObject)
      .then(() => blogService.getAll().then(blogs =>
        setBlogs( blogs )
      ))
      .then(() => {
        dispatch(setNotificationWithTimeout(`a new blog ${newTitle} by ${newAuthor} added`, 'success', 5000))
        createFormRef.current.toggleVisibility()
      })
      .catch(() => {
        dispatch(setNotificationWithTimeout('fail to add blog', 'error', 5000))
      })
  }

  const addLike = async (blog) => {
    const blogObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
    }
    const returnedBlog = await blogService.like(blog.id, blogObject)
    setBlogs(blogs.filter(n => n.id !== blog.id).concat(returnedBlog))
  }

  const remove = async (blog) => {
    await blogService.remove(blog.id)
    setBlogs(blogs.filter(n => n.id !== blog.id))
  }

  if (user === null) {
    return (
      <>
        <Login setUser={setUser} setSuccessMessage={() => console.log('success')}/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification {...notifications} />
      <p>{user.name} logged in&nbsp;<button type="button" onClick={() => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
      }}>logout</button></p>
      <Togglable buttonLabel="new blog" ref={createFormRef}>
        <CreateForm addBlog={addBlog} />
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map((blog,i) =>
        <Blog className={`blog-${i}`} key={blog.id} blog={blog} addLike={addLike} remove={remove} user={user}/>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const ConnectedApp = connect(mapStateToProps)(App)
export default ConnectedApp
