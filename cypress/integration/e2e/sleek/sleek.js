import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../pages/HomePage"
import BusinessAccountPage from "../pages/BusinessAccountPage";
import AllServicePage from "../pages/AllServicePage";

const homePage = new HomePage()
const businessAccountPage = new BusinessAccountPage()
const allServicePage = new AllServicePage()

let bookingDate
let bookingTimeslot

Given('I navigate to Sleek SG', () => {
  homePage.visit()
})

When('I click on {string} link', (label) => {
  cy.get('*').contains(label).click({ force: true })
})

Then('Verify Business Account deposit or monthly fees table values', (datatable) => {
  const label = []
  // create label arrar use for assert
  for (let i = 0; i < 8; i++) {
    datatable.raw().forEach(row => {
      label.push(row[i])
    })
  }
  // assert each Fee table cell text with each label array
  businessAccountPage.getMonthlyFeeTableCell().each((item, index) => {
    expect(Cypress.$(item).text()).to.contains(label[index]);
  })
})

And('I click on {string} button', (label) => {
  // This is flaky step - Somehow I need to click twice for booking pop-up to open
  cy.wait(600)
  allServicePage.getAllArrowbuttons().contains(label).click({ force: true })
  cy.wait(700)
  allServicePage.getAllArrowbuttons().contains(label).click({ force: true })
  // I am too lazy to enhance wait here
  cy.wait(7000)
})

And('select a date {string} days from now', (numberOfDays) => {

  function calculateBookingDate(startDate, days) {
    var date = new Date(startDate.valueOf())
    date.setDate(date.getDate() + days);
    if (date.getDay() == 6 || date.getDay() == 0) {
      date = calculateBookingDate(date, 1)
    }
    return date;
  }

  var today = new Date();
  bookingDate = calculateBookingDate(today, parseInt(numberOfDays))
  allServicePage.getBookingDatePickers().contains(bookingDate.getDate()).should('be.visible').click({ force: true })
})

And('select time zone as {string}', (timezone) => {
  allServicePage.getBookingTimeZoneDrowpDown().click({ force: true })
  allServicePage.getBookingTimeZoneDrowpDownSearchInput().type(timezone)
  allServicePage.getBookingTimeZoneDrowpDownOptions().contains(timezone).click({ force: true })
})

And('set time as {string}', (timeSlot) => {
  allServicePage.getBookingTimeSlotButtons().contains(timeSlot).click({ force: true })
  bookingTimeslot = timeSlot
})

Then('Verify date and time value is correct in Your information section', () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  allServicePage.getBookingDateTimeInfo().should('contain.text', bookingDate.toLocaleDateString("en-US", options))
  allServicePage.getBookingDateTimeInfo().should('contain.text', bookingTimeslot.toUpperCase())
})