
class LoginPage {

    efetuarLogin(login, senha){
        cy.get('#username').type(login)
        cy.get('#password').type(senha)
        cy.get('.woocommerce-button').click()
    }

}

export default new LoginPage()