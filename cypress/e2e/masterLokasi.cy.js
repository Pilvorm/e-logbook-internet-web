describe("master lokasi", () => {
  it("positive test add new lokasi", () => {
    cy.storageSet();
    cy.login();

    cy.visit("http://localhost:8080/hsse/master/lokasi/add");

    // cy.wait("@session");
    cy.wait(2500);

    cy.get('#siteSearch').select('PT Global Onkolab Farma');

    cy.get("input#lokasi").type("Lokasi 1");

    cy.get('#statusInactive').check({ force: true });

    cy.get("button#saveBtn").click({ force: true });

    cy.contains("Data has been successfully created.");
  });
});

describe("master lokasi", () => {
  it("negative test add new lokasi", () => {
    cy.storageSet();
    cy.login();

    cy.visit("http://localhost:8080/hsse/master/lokasi/add");

    // cy.wait("@session");
    cy.wait(2500);

    cy.get('#siteSearch').select('PT Global Onkolab Farma');

    cy.get('#statusInactive').check({ force: true });

    cy.get("button#saveBtn").click({ force: true });

    cy.contains("Lokasi is required");
  });
});