const el = require('./elements').ELEMENTS

class Home {
  visit() {
    cy.visit('/login')
  }

  getStoreName() {
    return cy.get(el.headerStoreName)
  }

  getLogoutButton() {
    return cy.get(el.buttonLogout)
  }

}

module.exports = Home