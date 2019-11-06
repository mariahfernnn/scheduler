// import cy from "cypress";

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/")
    //   .get(".sidebar")
    //   .get(".day-list__item")
    //   .contains("Tuesday")
    //   .click()
    // cy.contains("li", "Tuesday")
    //   .should("have.css", "background-color", "rgb(242, 242, 242)")
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
    cy.contains("[data-testid=day]", "Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)");
  });
});