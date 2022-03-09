class FaturamentoPage {
    inserirEnderecoFaturamento(nome, sobrenome, empresa, pais, endereco, numero, cidade, estado, cep, celular, email){
        //elementos + ações

        cy.get('#billing_first_name').clear().type(nome)
        cy.get('#billing_last_name').clear().type(sobrenome)
        cy.get('#billing_company').clear().type(empresa)
        cy.get('#select2-billing_country-container').click().type(pais).get('[aria-selected="true"]').click()
        cy.get('#billing_address_1').clear().type(endereco)
        cy.get('#billing_address_2').clear().type(numero)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('#select2-billing_state-container').click().type(estado + '{enter}')
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#billing_phone').clear().type(celular)
        cy.get('#billing_email').clear().type(email)


    }

}
//Para deixar a classe visível para os demais arquivos do proj.
export default new FaturamentoPage()