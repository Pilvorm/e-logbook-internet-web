describe("submit area master type", () => {
  it("get list master area", () => {
    const username = "teguh.valencia@kalbe.co.id";
    const password = "Kalbefarm4";

    cy.viewport(1280, 800);

    cy.visit("http://localhost:8080/auth");

    cy.get("input#username").type(username);
    cy.wait(1000);
    cy.get("input#password").type(password);
    cy.wait(1000);

    //   cy.get('#Login').click();
    cy.get("button").contains("Login").click();
    cy.wait(10000);

    cy.visit("http://localhost:8080/hsse/master/area");
  });
});

describe("master area", () => {
  it("positive submit master area", () => {
    const username = "teguh.valencia@kalbe.co.id";
    const password = "Kalbefarm4";

    cy.viewport(1280, 800);

    cy.visit("http://localhost:8080/auth");

    cy.get("input#username").type(username);
    cy.wait(1000);
    cy.get("input#password").type(password);
    cy.wait(1000);

    //   cy.get('#Login').click();
    cy.get("button").contains("Login").click();
    cy.wait(10000);

    cy.visit("http://localhost:8080/hsse/master/area/add");

    cy.wait(3000);

    cy.get("select#site").select("PT Dankos Farma");

    cy.get("#area").type("test 123 asd");

    cy.get("#statusActive").click({ force: true });

    cy.get("#saveBtn").click({ force: true });
  });
});

describe("master area", () => {
  it("negative submit master area", () => {
    const username = "teguh.valencia@kalbe.co.id";
    const password = "Kalbefarm4";

    cy.viewport(1280, 800);

    cy.visit("http://localhost:8080/auth");

    cy.get("input#username").type(username);
    cy.wait(1000);
    cy.get("input#password").type(password);
    cy.wait(1000);

    //   cy.get('#Login').click();
    cy.get("button").contains("Login").click();
    cy.wait(10000);

    cy.visit("http://localhost:8080/hsse/master/area/add");

    cy.wait(3000);

    cy.get("select#site").select("PT Dankos Farma");

    cy.get("#statusActive").click({ force: true });

    cy.get("#saveBtn").click({ force: true });
  });
});
