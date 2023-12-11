describe("login type", () => {
    it("positive test login", () => {
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

        // Verify the redirection to the expected URL
        cy.url().should("include", "http://localhost:8080/home");

    });

});

describe('Login to App Failed', () => {
    it('Login Fail show error message', () => {
      cy.visit('http://localhost:8080/auth');
      cy.wait(2000);

      cy.get("input#username").type("wrong@kalbe.co.id");
      cy.wait(1000);
      cy.get("input#password").type("Kalbefarma");
      cy.wait(1000);

    //   cy.get('#Login').click();
      cy.get('button').contains("Login").click();
      cy.wait(7000)

    })
  })

describe("Login as Guest", () => {
  it("Validate not Email", () => {
    cy.viewport(1280, 800);

    const name = "adek ferdian";
    const email = "adads.com";

    cy.visit("http://localhost:8080/auth");
    cy.get("button").contains("Login as guest").click();
    cy.wait(1000);
    cy.get("input#name").type(name);
    cy.wait(1000);
    cy.get("input#email").type(email);
    cy.wait(1000);
    cy.get("button").contains("Login").click();
    cy.wait(5000);
  });
});

describe("Login as Guest", () => {
  it("Validate and error security code", () => {
    cy.viewport(1280, 800);

    const name = "adek ferdian";
    const email = "adads.@gmail.com";

    cy.visit("http://localhost:8080/auth");
    cy.get("button").contains("Login as guest").click();
    cy.wait(1000);
    cy.get("input#name").type(name);
    cy.wait(1000);
    cy.get("input#email").type(email);
    cy.wait(1000);
    cy.get("button").contains("Login").click();
    cy.wait(5000);
    cy.get("input#code").type("asda");
    cy.get("button").contains("Submit").click();
    cy.wait(5000);
  });
});
