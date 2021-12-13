describe("About", () => {
    it("Visits the about page", () => {
        cy.visit("/about")
        cy.contains("h1", "This is an about page1")
    })
})
