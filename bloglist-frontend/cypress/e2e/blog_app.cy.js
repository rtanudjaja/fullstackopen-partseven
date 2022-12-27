describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset').then(() => {
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.wait(500)
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog Title')
      cy.get('#author').type('Author Test')
      cy.get('#url').type('http://www.url.org')
      cy.contains('save').click()
      cy.contains('a new blog Blog Title by Author Test added')
      cy.contains('Blog Title Author Test')
    })
  })

  describe('When there is a blog', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'Title1',
        author: 'Author1',
        url: 'Blog1',
        likes: 11
      })
    })

    it('users can like a blog', function() {
      cy.contains('Title1 Author1').as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.contains('likes 11').parent().as('theLike')
      cy.get('@theLike').find('button').click()
      cy.contains('likes 12')
    })

    it('user who created the blog can delete it', function() {
      cy.contains('Title1 Author1').as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'Title1 Author1')
    })
  })

  describe('When there are multiple blogs', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'Title3',
        author: 'Author3',
        url: 'Blog3',
        likes: 33
      })
      cy.createBlog({
        title: 'Title1',
        author: 'Author1',
        url: 'Blog1',
        likes: 11
      })
      cy.createBlog({
        title: 'Title2',
        author: 'Author2',
        url: 'Blog2',
        likes: 22
      })
    })

    it('blogs are ordered according to likes with the blog with the most likes being first', function() {
      //Since it is sorted with the most likes being first
      //We can select the blog with the fewest likes and trigger to
      //remove them via button:last which would click the 'remove'
      //in the last blog
      cy.contains('Title1 Author1').as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.get('button:last').click()
      cy.get('html').should('not.contain', 'Title1 Author1')

      cy.contains('Title2 Author2').as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.get('button:last').click()
      cy.get('html').should('not.contain', 'Title2 Author2')

      cy.contains('Title3 Author3').as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.get('button:last').click()
      cy.get('html').should('not.contain', 'Title3 Author3')
    })
  })
})