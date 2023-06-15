
const dataUser = {
  email: 'semajenya96@gmail.com',
  password: 'hardcarry'
}

const constructor = '[class^=style_constructor__inside__]';
const bunElement = 'Флюоресцентная булка R2-D3';
const sauceElement = 'Соус Spicy-X';
const counter = '[class^=counter__num]';
const modal = 'div [class^=style_modal__]';


describe('constructor test', function () {

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json'})
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.on("uncaught:exception", () => {
      return false;
    });

  });

  it('should open main page', () => {
    cy.contains('Соберите бургер');
    cy.contains('Выберете булку');
    cy.contains(sauceElement);
    cy.get(constructor).not('[class^=style_inside__item__]');
    cy.get('[class^=style_ingredient__conteiner__').should('have.not', 'div [class^=counter]');
  })


  it('should open and close modal window', () => {
    cy.contains(sauceElement).click();
    cy.contains('Детали ингредиента');
    cy.get(modal).contains(sauceElement);
    cy.location().should((loc) => {
      expect(loc.href).to.include('ingredients/643d69a5c3f7b9001cfa0942')
    })
    cy.get(modal).find('button').click();
    cy.url().should('eq', 'http://localhost:3000/');
  })




  it('should handle drag and drop ingredient', () => {
    cy.contains(sauceElement).trigger('dragstart');
    cy.get(constructor).trigger('drop');
    cy.get(constructor).contains(sauceElement);
    cy.get('div [class^=style_inside__item__]').should('have.length', 1);
    cy.contains(sauceElement).find(counter).contains('1');


    cy.contains('Соус с шипами Антарианского плоскоходца').trigger('dragstart');
    cy.get(constructor).trigger('drop');
    cy.get('div [class^=style_inside__item__]').should('have.length', 2)

    cy.contains(sauceElement).trigger('dragstart');
    cy.get(constructor).trigger('drop');
    cy.contains(sauceElement).find(counter).contains('2');
  })

  it('should handle drag and drop bun', () => {
    cy.get('[class^=constructor-element__text]').contains('Выберете булку');
    cy.contains(bunElement).trigger('dragstart');
    cy.get(constructor).trigger('drop');
    cy.get('[class^=constructor-element__text]').contains(bunElement);

    cy.contains(bunElement).find(counter).contains('2');
  })

  it('should open order modal window', () => {
    cy.contains(bunElement).trigger('dragstart');
    cy.get(constructor).trigger('drop');

    cy.contains(sauceElement).trigger('dragstart');
    cy.get(constructor).trigger('drop');

    cy.get('button').contains('Оформить заказ').click();

    cy.url().should('eq', 'http://localhost:3000/login');
    cy.contains('Вход');

    cy.get('input').first().click().type(dataUser.email);
    cy.get('input').last().click().type(dataUser.password);

    cy.get('button').contains('Войти').click();
    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('button').contains('Оформить заказ').click();
    cy.wait(15000);
    cy.get(modal).contains('идентификатор заказа');
    cy.contains('Ваш заказ начали готовить');

    cy.get(modal).find('button').click();

  })
});