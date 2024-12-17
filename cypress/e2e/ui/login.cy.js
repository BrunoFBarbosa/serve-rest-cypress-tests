const { faker } = require('@faker-js/faker')
import Login from '../../pages/login'
import Home from '../../pages/home'
import AdminHome from '../../pages/admin_home'

const login = new Login()
const home = new Home()
const adminHome = new AdminHome()

describe('Login', () => {

  before(() => {
    cy.criarUsuarioTeste().then((user) => {
      Cypress.env('teste_usuario_login', user)
    })

    cy.criarUsuarioTeste('true').then((user) => {
      Cypress.env('teste_usuario_admin_login', user)
    })
  })

  beforeEach(() => {
    login.visit()
  })

  context('Positivos', () => {
    it('login com sucesso para usuários não admin', () => {

      login.inputEmail(Cypress.env('teste_usuario_login').email)
      login.inputPassword(Cypress.env('teste_usuario_login').password)

      cy.intercept('/usuarios').as('usuarios')
      login.clickEntrar()
      cy.wait('@usuarios')

      cy.url().should('contain', '/home')
      home.getStoreName().should('be.visible').and('have.text', 'Serverest Store')
      home.getLogoutButton().should('be.visible')

    })

    it('login com sucesso para usuários admin', () => {

      login.inputEmail(Cypress.env('teste_usuario_admin_login').email)
      login.inputPassword(Cypress.env('teste_usuario_admin_login').password)

      cy.intercept('/usuarios').as('usuarios')
      login.clickEntrar()
      cy.wait('@usuarios')

      cy.url().should('contain', 'admin/home')
      adminHome.getGreetingsMessage().should('be.visible').contains(`Bem Vindo ${Cypress.env('teste_usuario_admin_login').nome}`)
      adminHome.getInfoMessage().should('be.visible').and('have.text', 'Este é seu sistema para administrar seu ecommerce.')
      adminHome.getLogoutButton().should('be.visible')
    })
  })

  context('Negativos', () => {
    it('email e senha devem ser obrigatórios', () => {

      login.clickEntrar()
      cy.url().should('not.contain', '/home')

      login.getErrorBadge().contains('Email é obrigatório').and('be.visible')
      login.getErrorBadge().contains('Password é obrigatório').and('be.visible')

    })

    it('senha incorreta para email existente', () => {

      login.inputEmail(Cypress.env('teste_usuario_login').email)
      login.inputPassword(faker.internet.password())
      login.clickEntrar()
      cy.url().should('not.contain', '/home')

      login.getErrorBadge().contains('Email e/ou senha inválidos').and('be.visible')

    })
  })
})