const UserBlogs = ({ userBlogs }) => {
  if(!userBlogs || userBlogs.length <= 0 ) {
    return null
  }
  const name = userBlogs[0].user.name
  return (
    <>
      <h2>{name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserBlogs