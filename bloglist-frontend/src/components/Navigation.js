import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Navigation = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <>
      <Link to="/">blogs</Link>&nbsp;
      <Link to="/users">users</Link>&nbsp;
      <span>{user.name}</span>&nbsp;
      <button
        type="button"
        onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          dispatch(setUser(null))
        }}
      >
        logout
      </button>
    </>
  )
}


export default Navigation