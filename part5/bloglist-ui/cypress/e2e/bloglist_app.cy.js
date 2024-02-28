describe("BlogPost app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "Olen Aaa",
      username: "aaaa",
      password: "aaaa",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("5.17 Login form is is shown by defaul", function () {
    cy.contains("blogs");
    cy.get("button").contains("Login").should("exist");
  });

  describe("5.18 Loggin in", function () {
    it("Login is successful, incorrect credentials", function () {
      // TODO
      cy.contains("Login").click();
      cy.get("#username").type("aaaa");
      cy.get("#password").type("aaaa");
      cy.get("#login-button").click();
      cy.contains("Olen Aaa logged in");
    });

    it("Login is not succesful, correct credenials", function () {
      // TODO
      cy.contains("Login").click();
      cy.get("#username").type("eitoimi");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("Olen Aaa logged in").should("not.exist");
      cy.contains("invalid username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("5.19 When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "aaaa", password: "aaaa" });
    });

    it.only("Logged in user can creare a new blog", function () {
      cy.contains("add new blog")
      cy.get('#add-blog').should('exist');
      cy.get('#add-blog').click();

      //
    });
  });

  // it.skip("5.20", function () {
  //   // TODO
  // });
  // it.skip("5.21", function () {
  //   // TODO
  // });
  // it.skip("5.22", function () {
  //   // TODO
  // });
  // it.skip("5.23", function () {
  //   // TODO
  // });
});
