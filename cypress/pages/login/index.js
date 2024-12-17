const el = require('./elements').ELEMENTS

class Login {
  visit() {
    cy.visit('/login')
  }

  inputEmail(text) {
    return cy.get(el.inputEmail).type(text)
  }

  inputPassword(text) {
    return cy.get(el.inputPassword).type(text)
  }

  clickEntrar() {
    cy.get(el.buttonEntrar).click()
  }

  clickCadastrar() {
    cy.get(el.buttonCadastrar).click()
  }

  getErrorBadge() {
    return cy.get(el.alertBadge)
  }

}

module.exports = Login