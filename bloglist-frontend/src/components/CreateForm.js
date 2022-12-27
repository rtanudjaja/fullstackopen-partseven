import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    await addBlog(newTitle, newAuthor, newUrl)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={handleAddBlog}>
      <h2>create new</h2>
      <label htmlFor="title">title</label>&nbsp;<input
        id="title"
        value={newTitle}
        onChange={handleTitleChange}
      /><br/>
      <label htmlFor="author">author</label>&nbsp;<input
        id="author"
        value={newAuthor}
        onChange={handleAuthorChange}
      /><br/>
      <label htmlFor="url">url</label>&nbsp;<input
        id="url"
        value={newUrl}
        onChange={handleUrlChange}
      /><br/>
      <button id="submit-button" type="submit">save</button>
    </form>
  )
}

CreateForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default CreateForm