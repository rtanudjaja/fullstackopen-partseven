import './index.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const createFormRef = useRef()

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
        setSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        createFormRef.current.toggleVisibility()
      })
      .catch(() => {
        setErrorMessage('fail to add blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
        <Login setUser={setUser} setSuccessMessage={setSuccessMessage}/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} msgStyle={'success'} />
      <Notification message={errorMessage} msgStyle={'error'} />
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

export default App
