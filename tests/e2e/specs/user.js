const mockUserOne = {
    _id: "1",
    firstName: "Jay",
    lastName: "Khant",
    phoneNo: "7567676230"
}
const mockUserTwo = {
    _id: "2",
    firstName: "John",
    lastName: "Deo",
    phoneNo: "1234567890"
}

describe("User", () => {
    beforeEach(() => {
        cy.intercept("GET", "/users", [mockUserOne]).as("getAllUsers")
        cy.intercept("POST", "/users", mockUserOne).as("createUser")
        cy.intercept("PATCH", "/users/*", mockUserTwo).as("updateUser")
        cy.intercept("DELETE", "/users/*", mockUserOne).as("deleteUser")

        cy.visit("/")
    })

    it("Visits the user page", () => {
        cy.contains("h1", "User list")
    })

    it("should add user", () => {
        cy.get("button").click()
        cy.get("input[data-cy=inputFirstName]").type(mockUserOne.firstName)
        cy.get("input[data-cy=inputMiddleName]").type(mockUserOne.lastName)
        cy.get("input[data-cy=inputPhoneNo]").type(mockUserOne.phoneNo)
        cy.get("button[data-cy=btnSubmit]").click()

        cy.contains("td", mockUserOne.firstName)
        cy.contains("td", mockUserOne.lastName)
        cy.contains("td", mockUserOne.phoneNo)
    })

    it("should display user", () => {
        cy.contains("td", mockUserOne.firstName)
        cy.contains("td", mockUserOne.lastName)
        cy.contains("td", mockUserOne.phoneNo)
    })

    it("should edit user", () => {
        cy.get("button[data-cy=btnEdit0]").click()
        cy.get("input[data-cy=inputFirstName]").clear()
        cy.get("input[data-cy=inputFirstName]").type(mockUserTwo.firstName)
        cy.get("input[data-cy=inputMiddleName]").clear()
        cy.get("input[data-cy=inputMiddleName]").type(mockUserTwo.lastName)
        cy.get("input[data-cy=inputPhoneNo]").clear()
        cy.get("input[data-cy=inputPhoneNo]").type(mockUserTwo.phoneNo)
        cy.get("button[data-cy=btnSubmit]").click()

        cy.contains("td", mockUserTwo.firstName)
        cy.contains("td", mockUserTwo.lastName)
        cy.contains("td", mockUserTwo.phoneNo)
    })

    it("should delete user", () => {
        cy.get("button[data-cy=btnDelete0]").click()
        cy.get("button[data-cy=btnYes]").click()

        cy.contains("td", "No user found")
    })
})
