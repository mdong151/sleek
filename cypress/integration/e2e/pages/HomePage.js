import businessAccountPage from "../pages/BusinessAccountPage"
class HomePage {
    constructor() {
        this.url = "/"
        this.title = "The all-in-one business account for Entrepreneurs and SMEs"
    }

    visit() {
        cy.visit("/")
    }

    getIncorporationTopMenuItem() {
        return cy.get(".ekit-menu-nav-link").contains("Incorporation")
    }

    getOpenBusinessAccountSubMenuItem() {
        return cy.get(".elementor-item.elementor-item-active").contains("Open a business account")
    }

}

export default HomePage