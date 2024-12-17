const { faker } = require('@faker-js/faker')

Cypress.Commands.add('criarUsuarioTeste', (admin='false') => {

  cy.fixture('users').then((user) => {
    user.nome = 'QA_' + Date.now()
    user.email = faker.internet.email().toLowerCase()
    user.password = faker.internet.password()
    user.administrador = admin

    cy.request({
      method: 'POST',
      url: `${Cypress.env('api_url')}/usuarios`,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: user,
      failOnStatusCode: true,
    }).then((response) => {
      user._id = response.body._id
      return cy.wrap(user)
    })
  })
})
