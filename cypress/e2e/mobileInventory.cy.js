describe("list inventory", () => {
    it("get list inventory", () => {
      const username = "teguh.valencia@kalbe.co.id";
      const password = "Kalbefarm4";
  
      cy.viewport(500, 800);
  
      cy.visit("http://localhost:8080/auth");
  
      cy.get("input#username").type(username);
      cy.wait(1000);
      cy.get("input#password").type(password);
      cy.wait(1000);
  
      //   cy.get('#Login').click();
      cy.get("button").contains("Login").click();
      cy.wait(10000);
  
      cy.visit("http://localhost:8080/hsse/mobile/inventory");
      cy.wait(3000);
    });
});