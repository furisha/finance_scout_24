export class CommonFunctions {

    openMainMenu_Versichern() {
        cy.get('header').find('nav').find('#main-navigation').find('details').find('summary').contains('Versichern').click()
        cy.get('header').find('nav').find('#main-navigation').find('details').find('ul').eq(0).should('be.visible') // ul open
    }

    changeLanguageTo_It() {
        cy.get('header').find('nav').find('#main-navigation').find('.fs24-header__language-menu').find('span').click()
        cy.get('.fs24-menu-toggle').find('button').contains('Italiano').click().wait(2000)
    }

    changeLanguageTo_Fr() {
        cy.get('header').find('nav').find('#main-navigation').find('.fs24-header__language-menu').find('span').click()
        cy.get('.fs24-menu-toggle').find('button').contains('Français').click().wait(2000)
    }

    clickOnMainMenuLink_Autoversicherung() {

        cy.intercept('GET', '**/api/vehicle-service/api/v1/vehicle-selections/auto/makes').as('makes')
        cy.get('header').find('nav').find('#main-navigation').find('details').find('a').contains('Autoversicherung').click()
        cy.wait('@makes').its('response.statusCode')
            .should('be.oneOf', [200])

        cy.get('#main').find('section').eq('0').find('.chakra-container').eq('1').find('h1').contains('Autoversicherungen berechnen und vergleichen')
    }

    clickOnBrandPicker_Audi() {

        cy.get('#main').find('section').eq('0').find('.chakra-container').eq('1').should('be.visible').then(autoversicherung_container => {
            cy.wrap(autoversicherung_container).find('.chakra-stack').eq(0).find('[data-testid="top-brands-picker"]').find('button').eq(0).click().wait(1500)
            cy.wrap(autoversicherung_container).find('.chakra-stack').eq(0).find('.chakra-form-control').find('input').should('have.value', 'AUDI')
        })
    }
    
    clickOnButton_VergleichStarten() {
        cy.get('#main').find('section').eq('0').find('.chakra-container').eq('1').should('be.visible').then(autoversicherung_container => {
            cy.wrap(autoversicherung_container).find('.chakra-stack').eq(0).find('.chakra-stack').find('button').contains('Vergleich starten').click()
            cy.wait(1500)
        })
    }

    clickOnButton_Weiter() {

        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.fs24-button__group').eq(0).find('button').eq(0).then(button => {
            cy.wrap(button).as('WeiterButton').invoke('text').then((text) => {
                expect(text.trim()).to.be.oneOf([
                    `Weiter`,
                    `Avanti`,
                    `Continuer`
                ])
                cy.get('@WeiterButton').click()
                cy.log('**CLICKED ON WeiterButton BUTTON**')
            })
        })
    }

    clickOnZuruckButton() {

        cy.get('.chakra-container').eq('0').find('.chakra-stack').eq(0).find('.fs24-button__group').eq(0).find('button').eq(1).then(button => {
            cy.wrap(button).as('WeiterButton').invoke('text').then((text) => {
                expect(text.trim()).to.be.oneOf([
                    `Zurück`,
                    `Indietro`,
                    `Retour`
                ])
                cy.get('@WeiterButton').click()
                cy.log('**CLICKED ON ZuruckButton BUTTON**')
            })
        })
    }

    rejectOnetrustBanner() {
        cy.wait(1000)
        cy.get('body').then($body => {
            if ($body.find('#onetrust-banner-sdk').length > 0) {
                cy.get('#onetrust-reject-all-handler').click({ force: true });
                cy.log(`I just closed Banner`)
            } else {
                cy.log(`There is no Banner`)
            }
        })
    }

    acceptOnetrustBanner() {

        cy.get('body').then($body => {
            if ($body.find('#onetrust-banner-sdk').length > 0) {
                cy.get('#onetrust-accept-btn-handler').click({ force: true });
                cy.log(`I just closed Banner`)
            } else {
                cy.log(`There is no Banner`)
            }
        })
    }

}

export const usingCommonFunctions = new CommonFunctions()