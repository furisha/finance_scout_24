/// <reference types="cypress" />

import { usingCommonFunctions } from "../support/page_objects/common_functions";

describe('Fahrzeug Versichert Werden Page - Negative UI Test (FR)', () => {

	let testdata

	before('open application', () => {
		cy.open_finance_scout_24_inquiry();
		cy.fixture('test_data_fr').then((data) => {
			testdata = data
		})
	});

    it('Verify all elements visibility and feedback messages on (FR) language on "Fahrzeug Versichert Werden" page', () => {
        
        usingCommonFunctions.rejectOnetrustBanner()
        usingCommonFunctions.changeLanguageTo_Fr()
        usingCommonFunctions.clickOnButton_Weiter()

        cy.log('**VERIFY "MARKE"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(0).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#make-label').should('have.text', testdata.labels.marke)
            cy.wrap(form).find('input').should('have.attr', 'placeholder', testdata.input_values.dropdown_select_value)
            cy.wrap(form).find('#make-feedback').should('have.text', testdata.feedback.marke)
            cy.wrap(form).find('button').should('not.exist')
        })
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(0).then(form => {
            cy.wrap(form).find('input').should('have.attr', 'placeholder', testdata.input_values.dropdown_select_value).click()
            cy.wrap(form).find('[role="listbox"]').eq(0).find('ul').find('li').contains('AUDI').click()
            cy.wrap(form).find('.chakra-icon').should('be.visible')
            cy.wrap(form).find('#make-feedback').should('not.exist')
        })

        cy.log('**VERIFY "INVERKEHRSTEZUNG"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(1).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#yearMonthInput-label').should('have.text', testdata.labels.inverkehrsetzung)
            cy.wrap(form).find('button').should('be.visible')
            // Jahr
            cy.wrap(form).find('#firstRegistrationYear-label').should('have.text', testdata.labels.jahr)
            cy.wrap(form).find('#firstRegistrationYear-feedback').should('have.text', testdata.feedback.jahr)
            cy.wrap(form).find('.fs24-dropdown-select').eq(0).should('have.text', testdata.input_values.dropdown_select_value)
            // Monat
            cy.wrap(form).find('#firstRegistrationMonth-label').should('have.text', testdata.labels.monat)
            cy.wrap(form).find('#firstRegistrationMonth-feedback').should('have.text', testdata.feedback.monat)
            cy.wrap(form).find('.fs24-dropdown-select').eq(1).should('have.text', testdata.input_values.dropdown_select_value)
        })

        cy.log('**VERIFY "AKTUELLER KILOMETERSTAND"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(4).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#mileage-label').should('have.text', testdata.labels.aktueller_kilometerstand)
            cy.wrap(form).find('#mileage-feedback').should('have.text', testdata.feedback.aktueller_kilometerstand)
            cy.wrap(form).find('.chakra-input__right-element').should('have.text', 'Km')
        })

        cy.log('**VERIFY "WERT DES ZUBEHORS"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(5).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#priceOfAccessories-label').should('have.text', testdata.labels.wert_des_zubehors)
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('.chakra-input__left-element').should('have.text', testdata.input_values.wert_des_zubehors_wahrung)
            cy.wrap(form).find('input').invoke('val').then((val) =>{
                expect(val).to.be.eq(testdata.input_values.wert_des_zubehors_value)
            })
        })

        cy.log('**VERIFY "BESITZ DES FAHRZEUGS"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(6).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#expectedPurchaseYear-label').should('have.text', testdata.labels.besitz_des_fahrzeugs)
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(0).should('have.text', testdata.input_values.besitz_des_fahrzeugs_positive)
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(1).should('have.text', testdata.input_values.besitz_des_fahrzeugs_negative)
            cy.wrap(form).find('#expectedPurchaseYear-feedback').should('have.text', testdata.feedback.besitz_des_fahrzeugs)
        })

        // --> Kaufjahr

        cy.log('**VERIFY "GELEAST"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(7).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#leasing-label').should('have.text', testdata.labels.geleast)
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(0).should('have.text', testdata.input_values.geleast_positive)
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(1).should('have.text', testdata.input_values.geleast_negative)
            cy.wrap(form).find('#leasing-feedback').should('have.text', testdata.feedback.geleast)
        })

        cy.log('**VERIFY "PRO JAHR IN KILOMETERN"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(8).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#kilometerPerYear-label').should('have.text', testdata.labels.pro_jahr_in_kilometern)
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('#kilometerPerYear-feedback').should('have.text', testdata.feedback.pro_jahr_in_kilometern)
            cy.wrap(form).find('.chakra-input__right-element').should('have.text', 'Km')
        })
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(8).next().then(form => {
            // cy.wrap(form).find('p').should('have.text', 'Häufigste Antworten')
            cy.wrap(form).find('button').eq(0).should('have.text', `10'000 km`)
            cy.wrap(form).find('button').eq(1).should('have.text', `15'000 km`)
            cy.wrap(form).find('button').eq(2).should('have.text', `20'000 km`)
        })

        cy.log('**VERIFY "ARZ DER NUTZUNG"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(9).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#usage-label').should('have.text', testdata.labels.art_der_nutzung)
            cy.wrap(form).find('.chakra-stack').find('label').eq(0).find('.chakra-checkbox__label').should('have.text', testdata.input_values.art_der_nutzung_privat)
            cy.wrap(form).find('.chakra-stack').find('label').eq(1).find('.chakra-checkbox__label').should('have.text', testdata.input_values.art_der_nutzung_arbeitsweg)
            cy.wrap(form).find('.chakra-stack').find('label').eq(2).find('.chakra-checkbox__label').should('have.text', testdata.input_values.art_der_nutzung_beruflich)
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('.fs24-form-control__input').find('.chakra-form__error-message').should('have.text', testdata.feedback.art_der_nutzung)
        })

        cy.log('**VERIFY "KANTON"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(10).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#registrationCanton-label').should('have.text', testdata.labels.kanton_eingelost_einlosen)
            cy.wrap(form).find('#registrationCanton-feedback').should('have.text', testdata.feedback.kanton_eingelost_einlosen)
            cy.wrap(form).find('.fs24-dropdown-select').eq(0).should('have.text', testdata.input_values.dropdown_select_value)        
        })

        cy.log('**VERIFY "UNTERGEBRACT"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(11).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#garage-label').should('have.text', testdata.labels.untergebracht)
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(0).should('have.text', testdata.input_values.untergebracht_1)
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(1).should('have.text', testdata.input_values.untergebracht_2)
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(2).should('have.text', testdata.input_values.untergebracht_3)
            cy.wrap(form).find('.chakra-radio-group').find('label').eq(3).should('have.text', testdata.input_values.untergebracht_4)
            cy.wrap(form).find('#garage-feedback').should('have.text', testdata.feedback.untergebracht)
        })

        // Additional forms visibility
        // Modell und Typ oder Typengenehmigung
        // Kaufjahr
        
        cy.log('**VERIFY "MODELL"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(1).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')

            cy.wrap(form).find('.fs24-dropdown-select').eq(0).should('have.text', testdata.input_values.dropdown_select_value).click()
            cy.wrap(form).find('.fs24-dropdown-select').eq(0).find('ul').find('li').contains(testdata.input_values.inverkehrsetzung_jahr).click()
            cy.wrap(form).find('.fs24-dropdown-select').eq(1).should('have.text', testdata.input_values.dropdown_select_value).click()
            cy.wrap(form).find('.fs24-dropdown-select').eq(1).find('ul').find('li').contains(testdata.input_values.inverkehrsetzung_monat).click()

            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(4).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#vehicleSearchText-label').should('have.text', testdata.labels.modell)
            cy.wrap(form).find('button').should('be.visible')
            cy.wrap(form).find('.chakra-form__error-message').should('have.text', testdata.feedback.modell)
            
            cy.wrap(form).find('.chakra-icon').should('not.exist')
        })

        cy.log('**VERIFY "KAUFJAHR"**')
        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(7).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')

            cy.wrap(form).find('.chakra-radio-group').find('label').eq(0).should('have.text', testdata.input_values.besitz_des_fahrzeugs_positive).click()
            cy.wrap(form).find('.chakra-icon').should('be.visible')
        })

        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.chakra-form-control').eq(8).then(form => {
            cy.wrap(form).find('.chakra-icon').should('not.exist')
            cy.wrap(form).find('#expectedPurchaseYear-label').should('have.text', testdata.labels.kaufjahr)
            cy.wrap(form).find('.fs24-dropdown-select').should('have.text', testdata.input_values.dropdown_select_value)
            cy.wrap(form).find('#expectedPurchaseYear-feedback').should('have.text', testdata.feedback.kaufjahr)
        })


    });

})