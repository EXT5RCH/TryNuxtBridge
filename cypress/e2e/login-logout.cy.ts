describe('ログイン -> ログアウト', () => {
  it('ログインに成功する', () => {
    cy.visit('/login')
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('#btn-login').click()
  })

  it('ログアウトに成功する', () => {
    cy.get('#user-header-profile').trigger('mouseover')
    cy.get('#user-header-profile-logout').click()
  })
})
