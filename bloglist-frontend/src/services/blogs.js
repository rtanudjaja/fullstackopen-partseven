import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (blogId, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(baseUrl.concat('/',blogId), newObject, config)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl.concat('/',blogId), config)
  return response.data
}

const blogService = { getAll, setToken, create, like, remove }

export default blogService