class BusinessAccountPage {
    constructor() {
        this.url = "business-account/"
        this.title = "The all-in-one business account for Entrepreneurs and SMEs"
    }

    visit() {
        cy.visit(this.url)
    }

    getMonthlyFeeTableCell() {
        return cy.get('.elementor-inner-section.elementor-element.elementor-hidden-mobile.elementor-section-boxed.elementor-section-height-default .elementor-heading-title.elementor-size-default')
    }

}

export default BusinessAccountPage