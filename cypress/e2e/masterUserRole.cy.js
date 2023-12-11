describe("master user role", () => {
  it("positive test add new user", () => {
    cy.storageSet();
    cy.login();

    cy.visit("http://localhost:8080/hsse/master/user/add");

    // cy.wait("@session");
    cy.wait(2500);

    cy.get("#nameSearch>.css-yk16xz-control")
      .click()
      .get(".css-26l3qy-menu")
      .type("Edwin Fitriadi")
      .wait(5000)
      .get(".css-26l3qy-menu")
      .should("be.visible")
      .find(".css-1n7v3ny-option")
      .first()
      .click();

    cy.get(".custom-checkbox").last().click();

    cy.get("button#saveBtn").click({ force: true });
    cy.contains("Yes").click();
    cy.contains("Data Created Successfully");
  });
});

describe("master user role", () => {
  it("negative test add new user", () => {
    cy.storageSet();
    cy.login();

    cy.visit("http://localhost:8080/hsse/master/user/add");

    // cy.wait("@session");
    cy.wait(2500);

    cy.get("#nameSearch>.css-yk16xz-control")
      .click()
      .get(".css-26l3qy-menu")
      .type("Edwin Fitriadi")
      .wait(5000)
      .get(".css-26l3qy-menu")
      .should("be.visible")
      .find(".css-1n7v3ny-option")
      .first()
      .click();

    cy.get(".custom-checkbox").last().click();

    cy.get("button#saveBtn").click({ force: true });
    cy.contains("Yes").click();
    cy.contains("User Data Already Exist For This Application");
    cy.contains("OK").click();

    cy.get("#nameSearch>.css-yk16xz-control")
      .click()
      .get(".css-26l3qy-menu")
      .type("Jorieta")
      .wait(5000)
      .get(".css-26l3qy-menu")
      .should("be.visible")
      .find(".css-1n7v3ny-option")
      .first()
      .click();

    cy.get("button#saveBtn").click({ force: true });
    cy.contains("Please select at least one role");
  });
});

describe("master user role", () => {
  it("positive test edit user role", () => {
    cy.storageSet();
    cy.login();

    cy.visit("http://localhost:8080/hsse/master/user/edit?UPN=edwin.fitriadi@kalbe.co.id&ApplicationCode=HSSEONLINE&CompanyCode=");

    // cy.wait("@session");
    cy.wait(2500);

    cy.get(".custom-checkbox").eq(4).click();

    cy.get("button#saveBtn").click({ force: true });
    cy.contains("Yes").click();
    cy.contains("Data Updated Successfully");
  });
});

describe("master user role", () => {
  it("negative test edit user role", () => {
    cy.storageSet();
    cy.login();

    cy.visit("http://localhost:8080/hsse/master/user/edit?UPN=edwin.fitriadi@kalbe.co.id&ApplicationCode=HSSEONLINE&CompanyCode=");

    // cy.wait("@session");
    cy.wait(2500);
    
    cy.get(".custom-checkbox").eq(4).click();
    cy.get(".custom-checkbox").last().click();

    cy.get("button#saveBtn").click({ force: true });
    cy.contains("Please select at least one role");
  });
});