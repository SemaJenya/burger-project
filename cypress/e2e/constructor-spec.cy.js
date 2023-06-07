
const dataUser = {
  email: 'semajenya96@gmail.com',
  password: 'hardcarry'
}

describe('constructor test', function () {

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.on("uncaught:exception", () => {
      return false;
    });

  });

  it('should open main page', () => {
    cy.contains('Соберите бургер');
    cy.contains('Выберете булку');
    cy.contains('Соус Spicy-X');
    cy.get('[class^=style_constructor__inside__]').not('[class^=style_inside__item__]');
    cy.get('[class^=style_ingredient__conteiner__').should('have.not', 'div [class^=counter]');
  })


  it('should open and close modal window', () => {
    cy.contains('Соус Spicy-X').click();
    cy.contains('Детали ингредиента');
    cy.get('div [class^=style_modal__]').contains('Соус Spicy-X');
    cy.location().should((loc) => {
      expect(loc.href).to.include('ingredients/643d69a5c3f7b9001cfa0942')
    })
    cy.get('[class=style_close__Krfgk]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  })




  it('should handle drag and drop ingredient', () => {
    cy.contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[class^=style_constructor__inside__]').trigger('drop');
    cy.get('[class^=style_constructor__inside__]').contains('Соус Spicy-X');
    cy.get('div [class^=style_inside__item__]').should('have.length', 1);
    cy.contains('Соус Spicy-X').find('[class^=counter__num]').contains('1');


    cy.contains('Соус с шипами Антарианского плоскоходца').trigger('dragstart');
    cy.get('[class^=style_constructor__inside__]').trigger('drop');
    cy.get('div [class^=style_inside__item__]').should('have.length', 2)

    cy.contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[class^=style_constructor__inside__]').trigger('drop');
    cy.contains('Соус Spicy-X').find('[class^=counter__num]').contains('2');
  })

  it('should handle drag and drop bun', () => {
    cy.get('[class^=constructor-element__text]').contains('Выберете булку');
    cy.contains('Флюоресцентная булка R2-D3').trigger('dragstart');
    cy.get('[class^=style_constructor__inside__]').trigger('drop');
    cy.get('[class^=constructor-element__text]').contains('Флюоресцентная булка R2-D3');

    cy.contains('Флюоресцентная булка R2-D3').find('[class^=counter__num]').contains('2');
  })

  it('should open order modal window', () => {
    cy.contains('Флюоресцентная булка R2-D3').trigger('dragstart');
    cy.get('[class^=style_constructor__inside__]').trigger('drop');

    cy.contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[class^=style_constructor__inside__]').trigger('drop');

    cy.get('button').contains('Оформить заказ').click();

    cy.url().should('eq', 'http://localhost:3000/login');
    cy.contains('Вход');

    cy.get('input').first().click().type(dataUser.email);
    cy.get('input').last().click().type(dataUser.password);

    cy.get('button').contains('Войти').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('button').contains('Оформить заказ').click();
    cy.wait(15000);
    cy.get('div [class^=style_modal__]').contains('идентификатор заказа');
    cy.contains('Ваш заказ начали готовить');

    cy.get('div [class^=style_modal__]').find('button').click();

  })
});