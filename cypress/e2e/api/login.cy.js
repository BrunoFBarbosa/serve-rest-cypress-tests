const { faker } = require('@faker-js/faker')

describe('/login', () => {

  before(() => {
    cy.criarUsuarioTeste().then((user) => {
      Cypress.env('teste_usuario_api_login', user)
    })

  })

  it('usuario logado com sucesso', () => {

    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}/login/`,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        'email': `${Cypress.env('teste_usuario_api_login').email}`,
        'password': `${Cypress.env('teste_usuario_api_login').password}`
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message').and.to.eq('Login realizado com sucesso')
      expect(response.body).to.have.property('authorization').and.to.not.be.empty
    })
  })

  it('erro 401 para credenciais incorretas', () => {

    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}/login/`,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        'email': `${Cypress.env('teste_usuario_api_login').email}`,
        'password': `${faker.internet.password()}`
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.have.property('message').and.to.eq('Email e/ou senha inválidos')
    })
  })
})