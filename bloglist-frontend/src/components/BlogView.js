const BlogView = ({ blog, addLike }) => {
  const author = blog.user.name
  return (
    <>
      <h2>{blog.title}</h2>
      <span>{blog.url}</span><br/>
      <div>
        <span>{blog.likes}&nbsp;likes&nbsp;</span>
        <button id="like-button" type="button" onClick={() => addLike(blog)}>
          like
        </button>
        <p>added by {author}</p>
      </div>
    </>
  )
}

export default BlogView