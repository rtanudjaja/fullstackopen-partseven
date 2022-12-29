import { Link } from 'react-router-dom'

const Users = ({ blogs }) => {
  if(!blogs) {
    return null
  }
  const usersBlogs = blogs.reduce((acc, blog) => {
    const index = acc.findIndex((n) => n.user.id === blog.user.id)
    if (index !== -1) {
      acc[index] = {
        ...acc[index],
        total: acc[index].total + 1,
      }
      return acc
    }
    return [...acc, {
      user: blog.user,
      total: 1
    }]
  }, [])
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr><th></th><th><b>blogs created</b></th></tr>
        </thead>
        <tbody>
          {usersBlogs.map((userBlog) => (
            <tr key={userBlog.user.id}>
              <td><Link to={`${userBlog.user.id}`}>{userBlog.user.name}</Link></td>
              <td>{userBlog.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users