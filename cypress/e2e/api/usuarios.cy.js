const { faker } = require('@faker-js/faker')

describe('/usuarios', () => {

  before(() => {
    cy.criarUsuarioTeste().then((user) => {
      Cypress.env('teste_usuario_api_usuarios', user)
    })

  })

  it('usuario listado com sucesso', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('api_url')}/usuarios/${Cypress.env('teste_usuario_api_usuarios')._id}`,
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('nome').and.to.eq(`${Cypress.env('teste_usuario_api_usuarios').nome}`)
      expect(response.body).to.have.property('email').and.to.eq(`${Cypress.env('teste_usuario_api_usuarios').email}`)
      expect(response.body).to.have.property('password').and.to.eq(`${Cypress.env('teste_usuario_api_usuarios').password}`)
      expect(response.body).to.have.property('administrador').and.to.eq(`${Cypress.env('teste_usuario_api_usuarios').administrador}`)
      expect(response.body).to.have.property('_id').and.to.eq(`${Cypress.env('teste_usuario_api_usuarios')._id}`)
    })
  })

  it('erro 400 para usuário não encontrado', () => {

    cy.request({
      method: 'GET',
      url: `${Cypress.env('api_url')}/usuarios/${faker.internet.password()}`,
      headers: {
        'accept': 'application/json',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message').and.to.eq('Usuário não encontrado')
    })
  })
})