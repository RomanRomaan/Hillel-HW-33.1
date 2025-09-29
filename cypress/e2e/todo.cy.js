describe('TODO app', () => {
    beforeEach(() => {
        cy.visit('/'); // baseUrl + '/'
    });

    it('1. Страница имеет заголовок TODO', () => {
        cy.get('[data-cy="title"]').should('have.text', 'TODO');
    });

    it('2. В поле можно вводить и буквы, и цифры', () => {
        cy.get('[data-cy="input"]').type('abc123');
        cy.get('[data-cy="input"]').should('have.value', 'abc123');
    });

    it('3. Клик "Добавить" с пустым полем показывает ошибку', () => {
        cy.get('[data-cy="add-btn"]').click();
        cy.get('[data-cy="error"]').should('be.visible').and('contain', 'Поле не может быть пустым');
        cy.get('[data-cy="list"]').find('[data-cy="item"]').should('have.length', 0);
    });

    it('4. После ввода текста и клика "Добавить" появляется новый элемент с этим текстом', () => {
        cy.get('[data-cy="input"]').type('Купить хлеб');
        cy.get('[data-cy="add-btn"]').click();
        cy.get('[data-cy="list"]').find('[data-cy="item"]').should('have.length', 1);
        cy.get('[data-cy="item-text"]').first().should('have.text', 'Купить хлеб');
    });

    it('5. Переключение чекбокса меняет оформление (line-through)', () => {
        cy.get('[data-cy="input"]').type('Задача для toggle');
        cy.get('[data-cy="add-btn"]').click();

        cy.get('[data-cy="item-text"]').last()
            .should('have.css', 'text-decoration-line')
            .and('not.include', 'line-through');

        cy.get('[data-cy="item-checkbox"]').last().check({ force: true });

        cy.get('[data-cy="item-text"]').last()
            .should('have.css', 'text-decoration-line')
            .and('include', 'line-through');
    });

    it('6. Удаление элемента убирает его из списка', () => {
        // добавим 2 пункта
        cy.get('[data-cy="input"]').type('Первый');
        cy.get('[data-cy="add-btn"]').click();
        cy.get('[data-cy="input"]').type('Второй');
        cy.get('[data-cy="add-btn"]').click();

        cy.get('[data-cy="list"]').find('[data-cy="item"]').should('have.length.at.least', 2);

        // удалим последний
        cy.get('[data-cy="item-del"]').last().click();

        // проверим, что "Второй" исчез
        cy.get('[data-cy="item-text"]').each($el => {
            expect($el.text()).to.not.equal('Второй');
        });
    });
});
