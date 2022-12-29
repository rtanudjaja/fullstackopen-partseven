import './index.css'
import { useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import {
  Routes, Route,
  // Routes, Route, Link,
  useMatch,
  // useNavigate,
} from 'react-router-dom'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import BlogView from './components/BlogView'
import blogService from './services/blogs'
import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogReducer'
import { setNotificationWithTimeout } from './reducers/notificationReducer'

const App = (props) => {
  const dispatch = useDispatch()
  const createFormRef = useRef()
  const { notifications = null, blogs = [], user = null } = props

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then((blogs) => {
        dispatch(setBlogs(blogs))
      })
      blogService.setToken(user.token)
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
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

    return blogService
      .create(blogObject)
      .then(() =>
        blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
      )
      .then(() => {
        dispatch(
          setNotificationWithTimeout(
            `a new blog ${newTitle} by ${newAuthor} added`,
            'success',
            5000
          )
        )
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
      likes: blog.likes + 1,
    }
    let returnedBlog = await blogService.like(blog.id, blogObject)
    if (blog.user.username === user.username) {
      returnedBlog = {
        ...returnedBlog,
        user: {
          id: returnedBlog.user,
          name: user.name,
          username: user.username,
        },
      }
    }
    dispatch(
      setBlogs(blogs.filter((n) => n.id !== blog.id).concat(returnedBlog))
    )
  }

  const remove = async (blog) => {
    await blogService.remove(blog.id)
    dispatch(setBlogs(blogs.filter((n) => n.id !== blog.id)))
  }

  const usersMatch = useMatch('/users/:id')
  const userBlogs = usersMatch ? blogs.filter(blog => blog.user.id === usersMatch.params.id) : []
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : []

  if (user === null) {
    return (
      <>
        <Login />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification {...notifications} />
      <p>
        {user.name} logged in&nbsp;
        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser')
            dispatch(setUser(null))
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={createFormRef}>
        <CreateForm addBlog={addBlog} />
      </Togglable>
      {blogs.slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog, i) => (
          <Blog
            className={`blog-${i}`}
            key={blog.id}
            blog={blog}
            addLike={addLike}
            remove={remove}
            user={user}
          />
        ))}
      <Routes>
        <Route path="/users" element={<Users blogs={blogs} />} />
        <Route path="/users/:id" element={<UserBlogs userBlogs={userBlogs} />} />
        <Route path="/blogs/:id" element={<BlogView blog={blog} addLike={addLike} />} />
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs,
    notifications: state.notifications,
  }
}

const ConnectedApp = connect(mapStateToProps)(App)
export default ConnectedApp
