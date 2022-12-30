import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { setUser } from '../reducers/userReducer'

const Navigation = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <Navbar bg="light">
      <Nav.Link href="/">blogs</Nav.Link>
      <Nav.Link href="/users">users</Nav.Link>
      <span>&nbsp;{user.name}&nbsp;</span>
      <Button variant="danger"
        onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          dispatch(setUser(null))
        }}
      >
        logout
      </Button>
    </Navbar>
  )
}


export default Navigation