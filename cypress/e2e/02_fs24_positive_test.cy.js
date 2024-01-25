/// <reference types="cypress" />

import { usingCommonFunctions } from "../support/page_objects/common_functions";

describe('Fahrzeug Versichert Werden Page - Positive UI Test', () => {

    let testdata

    before('Open Fahrzeug Versichert Werden Page', () => {
        cy.open_finance_scout_24_inquiry();
        cy.fixture('test_data').then((data) => {
            testdata = data
        })
    });

    it('Fill all forms with valid values and successfully proceed to "Lenker" page', () => {

        cy.log('**SELECT BRAND FROM INPUT LIST**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(0).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('input').click()
            cy.wrap(form).find('[role="listbox"]').eq(0).find('ul').find('li').contains('AUDI').click()
            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.log('**SELECT "JAHR" AND "MONAT" FROM INPUT LIST**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(1).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('.fs24-dropdown-select').eq(0).should('have.text', testdata.input_values.dropdown_select_value).click()
            cy.wrap(form).find('.fs24-dropdown-select').eq(0).find('ul').find('li').contains(testdata.input_values.inverkehrsetzung_jahr).click()

            cy.wrap(form).find('.fs24-dropdown-select').eq(1).should('have.text', 'Bitte auswählen').click()
            cy.wrap(form).find('.fs24-dropdown-select').eq(1).find('ul').find('li').contains(testdata.input_values.inverkehrsetzung_monat).click()

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.log('**SELECT "MODEL" FROM INPUT LIST**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(4).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#vehicleSearchText').click().type('A').wait(1000).type('{downArrow}{enter}')

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(5).then(form => {
            cy.wrap(form).find('.chakra-radio__label').should('contain.text', testdata.input_values.modell)
        })

        cy.log('**INSERT "KM" IN INPUT FIELD**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(6).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#mileage').click().clear().type(testdata.input_values.aktueller_kilometerstand)

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.log('**INSERT "CHF" IN INPUT FIELD**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(7).then(form => {
            // cy.wrap(form).find('.chakra-icon').should('not.exist') - Potential BUG
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('#priceOfAccessories').click().clear().type(testdata.input_values.wert_des_zubehors)

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.log('**SELECT "JA" CHECKBOX**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(8).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(0).should('have.text', testdata.input_values.besitz_des_fahrzeugs_positive).click()

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.log('**SELECT "KAUFTJAHR" FROM INPUT LIST**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(9).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('.fs24-dropdown-select').eq(0).click()
            cy.wrap(form).find('.fs24-dropdown-select').eq(0).find('ul').find('li').contains(testdata.input_values.kaufjahr).click()

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.log('**SELECT "JA" CHECKBOX**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(10).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(0).should('have.text', testdata.input_values.besitz_des_fahrzeugs_positive).click()

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.log('**INSERT "KM" IN INPUT FIELD**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(11).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('#kilometerPerYear').click().clear().type(testdata.input_values.pro_jahr_in_kilometern)

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(11).next().then(form => {
            cy.wrap(form).find('button').eq(2).should('have.text', `20'000 km`).click()
        })
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(11).then(form => {
            cy.wrap(form).find('input').invoke('val').then((val) => {
                expect(val).to.be.eq(`20'000`)
            })
        })

        cy.log('**SELECT "PRIVATE" CHECKBOX**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(12).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('.chakra-stack').find('label').eq(0).find('.chakra-checkbox__label').should('have.text', testdata.input_values.art_der_nutzung_privat).click()

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.log('**SELECT "KANTON" FROM INPUT LIST**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(13).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('.fs24-dropdown-select').eq(0).click()
            cy.wrap(form).find('ul').find('li').contains(testdata.input_values.kanton_eingelost_einlosen).click()

            cy.wrap(form).find('.chakra-icon').should('be.visible')

        })

        cy.log('**SELECT "4TH" RADIO BUTTON**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(14).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(3).should('have.text', testdata.input_values.untergebracht_4).click()

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.log('**CLICK "WEITER" BUTTON**')
        cy.intercept('GET', '**/vehicle-selections/AUTO/makes').as('makes')
        cy.intercept('GET', '**/lookups').as('lookups')
        usingCommonFunctions.clickOnButton_Weiter()
        cy.wait('@makes').its('response.statusCode')
            .should('be.oneOf', [200])
        cy.wait('@lookups').its('response.statusCode')
            .should('be.oneOf', [200])
        cy.wait(1000)

        cy.url().should('include', testdata.urls.lenker_page);

        
    });

})
