const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = request.user

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user.id
    })
    if(!blog.title && !blog.url) {
      return response.sendStatus(400)
    }
    if(!blog.likes) {
      blog.likes = 0
    }
    const result = await blog.save()
    user.blogs = user.blogs.concat(result.id)
    await user.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if(!blog) {
      return response.status(401).json({ error: 'blog id missing or invalid' })
    }
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({ error: 'a blog can be deleted only by the user who added the blog' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    const user = request.user
    user.blogs = user.blogs.filter((blog) => blog.id !== request.params.id)
    await user.save()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    user: body.user,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updateBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter