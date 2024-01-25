/// <reference types="cypress" />

import { usingCommonFunctions } from "../support/page_objects/common_functions";

describe('Aautoversicherung Page - Navigation Functionality UI Test', () => {

    let testdata

    beforeEach('open application', () => {
        cy.open_finance_scout_24_homepage();
        cy.fixture('test_data').then((data) => {
            testdata = data
        })
    });

    it('Select marke by brand icon from "Autoversicherung" page, navigate to "Fahrzeug Versichert Werden" page and go back to "Autoversicherung" page', () => {

        cy.log('**NAVIGATE TO "AUTOVERSICHERUNG" PAGE**')
        usingCommonFunctions.rejectOnetrustBanner()
        usingCommonFunctions.openMainMenu_Versichern()
        usingCommonFunctions.clickOnMainMenuLink_Autoversicherung()

        cy.url().should('contain', testdata.urls.autoversicherung_page)

        cy.log('**SELECT "MARKE" FROM BRAND PICKER**')
        cy.get('#main').find('section').eq('0').find('.chakra-container').eq('1').should('be.visible').then(autoversicherung_container => {
            cy.wrap(autoversicherung_container).find('.chakra-stack').eq(0).find('[data-testid="top-brands-picker"]').find('button').eq(0).click()
            cy.wrap(autoversicherung_container).find('.chakra-stack').eq(0).find('.chakra-form-control').find('input').should('have.value', testdata.input_values.marke)
        })

        cy.log('**CLICK "VERGLEICH STARTEN" BUTTON**')
        usingCommonFunctions.clickOnButton_VergleichStarten()

        cy.log('**VERIFY SELECTED "MARKE"**')
        cy.url().should('contain', testdata.urls.fahrzeug_versichert_werden_page)

        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(0).then(form => {
            cy.wrap(form).find('.chakra-icon').should('be.visible')
            cy.wrap(form).find('input').should('have.value', testdata.input_values.marke)
        })
        cy.log('**CLICK "BACK" BUTTON**')
        usingCommonFunctions.clickOnZuruckButton()

        cy.log('**VERIFY "AUTOVERSICHERUNG" PAGE URL**')
        cy.url().should('contain', testdata.urls.autoversicherung_page)
        
    })

    it('Select marke by brand dropdown menu from "Autoversicherung" page and navigate to "Fahrzeug Versichert Werden" page', () => {

        cy.log('**NAVIGATE TO "AUTOVERSICHERUNG" PAGE**')
        usingCommonFunctions.rejectOnetrustBanner()
        usingCommonFunctions.openMainMenu_Versichern()
        usingCommonFunctions.clickOnMainMenuLink_Autoversicherung()

        cy.url().should('contain', testdata.urls.autoversicherung_page)

        cy.log('**SELECT "MARKE" FROM DROPDOWN MENU LIST**')
        cy.get('#main').find('section').eq('0').find('.chakra-container').eq('1').find('.chakra-stack').eq(0).find('.chakra-form-control').find('input').should('have.attr', 'placeholder', 'Andere Marken').type('{downArrow}{enter}')
        
        cy.log('**CLICK "VERGLEICH STARTEN" BUTTON**')
        usingCommonFunctions.clickOnButton_VergleichStarten()

        cy.log('**VERIFY SELECTED "MARKE"**')
        cy.url().should('contain', testdata.urls.fahrzeug_versichert_werden_page)

        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(0).then(form => {
            cy.wrap(form).find('.chakra-icon').should('be.visible')
            cy.wrap(form).find('input').should('have.value', testdata.input_values.marke)
        })
    })

    it('Select nothing from "Autoversicherung" page and navigate to "Fahrzeug Versichert Werden" page', () => {

        cy.log('**NAVIGATE TO "AUTOVERSICHERUNG" PAGE**')
        usingCommonFunctions.rejectOnetrustBanner()
        usingCommonFunctions.openMainMenu_Versichern()
        usingCommonFunctions.clickOnMainMenuLink_Autoversicherung()

        cy.url().should('contain', testdata.urls.autoversicherung_page)

        cy.log('**CLICK "VERGLEICH STARTEN" BUTTON**')
        usingCommonFunctions.clickOnButton_VergleichStarten()

        cy.log('**VERIFY NOTHING SELECTED IN "MARKE" FIELD**')
        cy.url().should('contain', testdata.urls.fahrzeug_versichert_werden_page)
        
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(0).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('input').should('have.attr', 'placeholder', testdata.input_values.dropdown_select_value)
        })

    })

})