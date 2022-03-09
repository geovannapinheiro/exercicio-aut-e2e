import LoginPage from '../support/page_objects/realizarLogin.page'
import FaturamentoPage from '../support/page_objects/detalheFaturamento.page'
const perfil = require('../fixtures/perfil.json')
const dadosEndereco = require('../fixtures/endereco.json')
context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 4;
        //Selecionar um produto na página de procutos
        cy.get('[class="product-block grid"]').contains('Apollo Running Short').click()
        
        //Selecionando preferências
        cy.get('.button-variable-item-34').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(quantidade)

        //Adicionando ao carrinho e validando preferências
        cy.get('.single_add_to_cart_button').click()
        

        //Verificando carrinho
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Apollo Running Short” foram adicionados no seu carrinho.')

        //Abrindo o carrinho
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click()

        //Confirmando compra
        cy.get('.checkout-button').click()

        //Realizar login para confirmar o pagamento e entrega 
        cy.get('.showlogin').click()
        LoginPage.efetuarLogin(
            perfil.usuario,
            perfil.senha
        )
        
        //Preencher o endereço
        FaturamentoPage.inserirEnderecoFaturamento(
            dadosEndereco[1].nome, 
            dadosEndereco[1].sobrenome,
            dadosEndereco[1].empresa, 
            dadosEndereco[1].pais,
            dadosEndereco[1].endereco, 
            dadosEndereco[1].numero,
            dadosEndereco[1].cidade, 
            dadosEndereco[1].estado,
            dadosEndereco[1].cep, 
            dadosEndereco[1].telefone,
            dadosEndereco[1].email
        )

        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.' )
 
    });


})
