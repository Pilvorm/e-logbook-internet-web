describe("submit area master type", () => {
  it("get list master lokasi", () => {
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

    cy.visit("http://localhost:8080/hsse/master/lokasi");
  });
});

describe("master lokasi", () => {
  it("positive submit master lokasi", () => {
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

    cy.visit("http://localhost:8080/hsse/master/lokasi/add");

    cy.wait(3000);

    cy.get("select#site").select("PT Dankos Farma");

    cy.get("#lokasi").type("test 123 asd");

    cy.get("#statusActive").click({ force: true });

    cy.get("#saveBtn").click({ force: true });

    cy.contains("Data has been successfully created.");
  });
});

describe("master lokasi", () => {
  it("negative submit master lokasi", () => {
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
