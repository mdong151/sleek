class AllServicePage {
    constructor() {
        this.url = "all-services/"
        this.title = "All Services - Sleek"
    }

    visit() {
        cy.visit(this.url)
    }

    getAllArrowbuttons() {
        return cy.get('.arrow-button-move')
    }

    getIframe(){
        let iframeSelector = 'iframe[data-hs-ignore="true"]'
        cy.frameLoaded(iframeSelector)
        return cy.iframe(iframeSelector)
    }

    getBookingDatePickers(){
        return this.getIframe().find('button.date-picker-btn')
    }

    getBookingTimeZoneDrowpDown(){
        return this.getIframe().find('.uiDropdown__buttonContents.private-dropdown__button__contents')
    }

    getBookingTimeZoneDrowpDownSearchInput(){
        return this.getIframe().find('[type="search"]')
    }

    getBookingTimeZoneDrowpDownOptions(){
        return this.getIframe().find('.private-typeahead-result--selectable')
        

    }

    getBookingTimeSlotButtons(){
        return this.getIframe().find('.time-picker-btn')
    }

    getBookingDateTimeInfo(){
        return this.getIframe().find('h5')
    }
}

export default AllServicePage