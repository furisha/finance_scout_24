import { usingCommonFunctions } from "../support/page_objects/common_functions";

Cypress.Commands.add('open_finance_scout_24_homepage', () => {
    cy.visit('/')
    cy.title().should('contain', 'Plattform für Finanz- und Versicherungsprodukte | FinanceScout24')
    usingCommonFunctions.rejectOnetrustBanner()
})
Cypress.Commands.add('open_finance_scout_24_inquiry', () => {
    cy.visit('https://autoversicherung.financescout24.ch/de/inquiry')
    cy.title().should('contain', 'FinanceScout24')
    usingCommonFunctions.rejectOnetrustBanner()
})