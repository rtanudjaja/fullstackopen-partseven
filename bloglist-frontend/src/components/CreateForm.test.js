import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateForm from './CreateForm'
import userEvent from '@testing-library/user-event'

test('<CreateForm /> calls the event handler it received as props with the right details when a new blog is created', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateForm addBlog={addBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(inputs[0], 'test-title')
  await user.type(inputs[1], 'test-author')
  await user.type(inputs[2], 'test-url')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][1]).toBe('test-title')
  expect(addBlog.mock.calls[0][2]).toBe('test-author')
  expect(addBlog.mock.calls[0][3]).toBe('test-url')
})
