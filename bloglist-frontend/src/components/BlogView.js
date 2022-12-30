import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import blogService from '../services/blogs'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const BlogView = ({ blog, addLike }) => {
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')

  if(!blog) {
    return null
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const handleAddComment = async () => {
    try {
      await blogService.addComment(blog.id, newComment)
      dispatch(
        setNotificationWithTimeout(
          'a new comment added',
          'success',
          5000
        )
      )
      setNewComment('')
      window.location.reload()
    }
    catch (e) {
      dispatch(setNotificationWithTimeout('fail to add comment', 'error', 5000))
    }
  }
  const author = blog.user.name
  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer" >{blog.url}</a>
      <div>
        <span>{blog.likes}&nbsp;likes&nbsp;</span>
        <Button variant="success" onClick={() => addLike(blog)}>
          like
        </Button>
        <div>added by {author}</div>
      </div>
      <h3>comments</h3>
      <input
        id="title"
        value={newComment}
        onChange={handleCommentChange}
      />&nbsp;
      <Button variant="primary" onClick={handleAddComment}>add comment</Button>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogView