const jwt = require("jsonwebtoken");
const _ = require("lodash");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("../utils/list_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogs");
const User = require("../models/user");

//initialize the database before every test
beforeEach(async () => {
  await Blog.deleteMany({});
  const user = await User.findOne({});
  await Blog.insertMany(
    await Promise.all(
      helper.initialBlogs.map(async (blog) => {
        return {
          ...blog,
          user,
        };
      })
    )
  );
});

test("blogs are returned as json", async () => {
  const user = await User.findOne({});
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  await api
    .get("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test(`all ${helper.initialBlogs.length} blogs are returned`, async () => {
  const user = await User.findOne({});
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  const response = await api
    .get("/api/blogs")
    .set("Authorization", `bearer ${token}`);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const user = await User.findOne({});
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  const response = await api
    .get("/api/blogs")
    .set("Authorization", `bearer ${token}`);
  expect(response.body[0].id).toBeDefined();
});

test("making an HTTP POST request to the /api/blogs url successfully creates a new blog post", async () => {
  const user = await User.findOne({});
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `bearer ${token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api
    .get("/api/blogs")
    .set("Authorization", `bearer ${token}`);
  const blogsArr = response.body.map((blog) => {
    delete blog.id;
    return blog;
  });
  expect(blogsArr).toHaveLength(helper.initialBlogs.length + 1);
  blogsArr.forEach((blog) => delete blog.user);
  expect(blogsArr).toContainEqual(newBlog);
});

test("if the likes property is missing from the request, it will default to the value 0", async () => {
  const user = await User.findOne({});
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD808.html",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api
    .get("/api/blogs")
    .set("Authorization", `bearer ${token}`);
  const likes = _.find(response.body, { ...newBlog })?.likes;
  expect(likes).toBe(0);
});

test("if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request", async () => {
  const user = await User.findOne({});
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  const newBlog = {
    author: "Edsger W. Dijkstra",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test("adding a blog fails with the proper status code 401 Unauthorized if a token is not provided", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD808.html",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401);
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const user = await User.findOne({});
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    const blogAtStart = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`);
    const blogToDelete = blogAtStart.body[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`);
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length - 1);

    const ids = blogsAtEnd.body.map((r) => r.id);

    expect(ids).not.toContain(blogToDelete.id);
  });
});

describe("updating the information of a blog", () => {
  test("succeeds with correct amount of likes", async () => {
    const user = await User.findOne({});
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    const blogAtStart = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`);
    const blogToUpdate = blogAtStart.body[0];
    const updatedLikes = 99;
    blogToUpdate.likes = updatedLikes;

    const blogResponse = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(blogToUpdate)
      .expect(200);

    expect(blogResponse.body.likes).toBe(updatedLikes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
