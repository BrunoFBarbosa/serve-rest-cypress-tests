const el = require('./elements').ELEMENTS

class AdminHome {
  visit() {
    cy.visit('admin/login')
  }

  getGreetingsMessage() {
    return cy.get(el.headerGreetings)
  }

  getInfoMessage() {
    return cy.get(el.infoMessage)
  }

  getLogoutButton() {
    return cy.get(el.buttonLogout)
  }

}

module.exports = AdminHome