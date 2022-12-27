import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const addLike = jest.fn()
  const remove = jest.fn()
  const blog = {
    _id: '5a422aa71b54a676234d17fA',
    title: 'Wings of Fire',
    author: 'Tui T. Sutherland',
    url: 'https://www.amazon.com/Wings-Fire-Graphix-Box-Books/dp/1338796879/',
    likes: 7,
    user: {
      username: 'rtan',
    },
    __v: 0
  }

  beforeEach(() => {
    component = render(<Blog blog={blog} addLike={addLike} remove={remove} />)
  })

  test('renders blog\'s title and author but not url and number of likes', () => {
    const title = component.getByText(blog.title, { exact: false })
    const author = component.getByText(blog.author, { exact: false })
    const url = component.queryByText(blog.url, { exact: false })
    const likes = component.queryByText(blog.likes, { exact: false })
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders blog\'s url and number of likes when the button controlling the shown details has been clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const title = component.getByText(blog.title, { exact: false })
    const authors = component.queryAllByText(blog.author, { exact: false })
    const url = component.getByText(blog.url, { exact: false })
    const likes = component.getByText(`likes ${blog.likes}`, { exact: false })
    expect(title).toBeDefined()
    expect(authors).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    expect(addLike.mock.calls).toHaveLength(1)
    fireEvent.click(likeButton)
    expect(addLike.mock.calls).toHaveLength(2)
  })
})


