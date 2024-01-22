// describe("logbook", () => {
//   it("negative & positive entry logbook", () => {
//     cy.storageSet();
//     cy.login();

//     cy.visit("http://localhost:8081/internship/logbook?month=January+2024");

//     // cy.wait("@session");
//     cy.wait(2500);

//     cy.get("button#entryBtn").eq(4).click();

//     cy.get("button#submitBtn").click({ force: true });

//     cy.contains('Activity is required');
//     cy.contains('Work Type is required');

//     cy.get('input[type=radio]').first().click({ force: true });
//     cy.get('textarea[name=activity]').type('Cypress Entry');

//     cy.get("button#submitBtn").click({ force: true });
//     cy.wait(3500);

//     cy.contains("Data saved successfully");
//   });
// });

describe("logbook", () => {
  it("negative & positive entry logbook", () => {
    cy.storageSet();
    cy.login();

    cy.visit("http://localhost:8081/internship/logbook?month=January+2024");

    // cy.wait("@session");
    cy.wait(2500);

    cy.get("button#submitLogBtn").click({ force: true });
    cy.contains("Yes").click();
    cy.wait(10500);

    cy.contains("Logbook submitted succesfully");
  });
});
