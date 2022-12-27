const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/Alkymisten-Alchemist-Paulo-Coelho/dp/8776040011',
      likes: 88,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fA',
      title: 'Wings of Fire',
      author: 'Tui T. Sutherland',
      url: 'https://www.amazon.com/Wings-Fire-Graphix-Box-Books/dp/1338796879/',
      likes: 7,
      __v: 0
    }
  ]

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(100)
  })
})

describe('favourite blog', () => {
  test('from an empty list return empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f6',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
  ]

  test('from a list that has only one blog, return that particular blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/Alkymisten-Alchemist-Paulo-Coelho/dp/8776040011',
      likes: 88,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fA',
      title: 'Wings of Fire',
      author: 'Tui T. Sutherland',
      url: 'https://www.amazon.com/Wings-Fire-Graphix-Box-Books/dp/1338796879/',
      likes: 7,
      __v: 0
    }
  ]

  test('from a list of blogs, return the blog which has the most likes', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(result).toEqual({
      title: "The Alchemist",
      author: "Paulo Coelho",
      likes: 88
    })
  })

  const listWithThreeSameLikesBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/Alkymisten-Alchemist-Paulo-Coelho/dp/8776040011',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fA',
      title: 'Wings of Fire',
      author: 'Tui T. Sutherland',
      url: 'https://www.amazon.com/Wings-Fire-Graphix-Box-Books/dp/1338796879/',
      likes: 7,
      __v: 0
    }
  ]

  test('from a list with many top favorites, return one of the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithThreeSameLikesBlogs)
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 7
    })
  })
})

describe('most blogs', () => {
  test('from an empty list return empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f6',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
  ]

  test('from a list that has only one blog, return that particular blog author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17a8',
      title: 'Warrior of the Light',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/gp/product/B000JMKNZQ/ref=dbs_a_def_rwt_bibl_vppi_i4',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/Alkymisten-Alchemist-Paulo-Coelho/dp/8776040011',
      likes: 88,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fA',
      title: 'Wings of Fire',
      author: 'Tui T. Sutherland',
      url: 'https://www.amazon.com/Wings-Fire-Graphix-Box-Books/dp/1338796879/',
      likes: 7,
      __v: 0
    }
  ]

  test('from a list of blogs, return the author which has the most blogs', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs)
    expect(result).toEqual({
      author: "Paulo Coelho",
      blogs: 2
    })
  })

  const listWithTwoAuthorWithEqualBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17a8',
      title: 'Warrior of the Light',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/gp/product/B000JMKNZQ/ref=dbs_a_def_rwt_bibl_vppi_i4',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f6',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/Alkymisten-Alchemist-Paulo-Coelho/dp/8776040011',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fA',
      title: 'Wings of Fire',
      author: 'Tui T. Sutherland',
      url: 'https://www.amazon.com/Wings-Fire-Graphix-Box-Books/dp/1338796879/',
      likes: 7,
      __v: 0
    }
  ]

  test('from a list with two authors that have the most blogs (same amount of blogs), return one of the authors', () => {
    const result = listHelper.mostBlogs(listWithTwoAuthorWithEqualBlogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 2
    })
  })
})

describe('most likes', () => {
  test('from an empty list return empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f6',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
  ]

  test('from a list that has only one blog, return that particular blog author and its likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17a8',
      title: 'Warrior of the Light',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/gp/product/B000JMKNZQ/ref=dbs_a_def_rwt_bibl_vppi_i4',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/Alkymisten-Alchemist-Paulo-Coelho/dp/8776040011',
      likes: 88,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fA',
      title: 'Wings of Fire',
      author: 'Tui T. Sutherland',
      url: 'https://www.amazon.com/Wings-Fire-Graphix-Box-Books/dp/1338796879/',
      likes: 7,
      __v: 0
    }
  ]

  test('from a list of blogs, return the author, whose blog posts have the largest amount of likes', () => {
    const result = listHelper.mostLikes(listWithThreeBlogs)
    expect(result).toEqual({
      author: "Paulo Coelho",
      likes: 93,
    })
  })

  const listWithTwoAuthorWithEqualBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17a8',
      title: 'Warrior of the Light',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/gp/product/B000JMKNZQ/ref=dbs_a_def_rwt_bibl_vppi_i4',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f6',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url: 'https://www.amazon.com/Alkymisten-Alchemist-Paulo-Coelho/dp/8776040011',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fA',
      title: 'Wings of Fire',
      author: 'Tui T. Sutherland',
      url: 'https://www.amazon.com/Wings-Fire-Graphix-Box-Books/dp/1338796879/',
      likes: 7,
      __v: 0
    }
  ]

  test('from a list with two authors that have the largest amount of likes (same amount of likes), return one of the authors', () => {
    const result = listHelper.mostLikes(listWithTwoAuthorWithEqualBlogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 20
    })
  })
})