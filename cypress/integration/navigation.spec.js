// import cy from "cypress";

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/")
    cy.get(".sidebar")
    cy.get(".day-list__item").contains("Tuesday").click()
  });
});