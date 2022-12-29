const BlogView = ({ blog, addLike }) => {
  if(!blog) {
    return null
  }
  const author = blog.user.name
  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer" >{blog.url}</a>
      <div>
        <span>{blog.likes}&nbsp;likes&nbsp;</span>
        <button id="like-button" type="button" onClick={() => addLike(blog)}>
          like
        </button>
        <div>added by {author}</div>
      </div>
      <h3>comments</h3>
    </>
  )
}

export default BlogView