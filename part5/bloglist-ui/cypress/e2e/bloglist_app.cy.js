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
    cy.get('button').contains('Login').should('exist');
  });

  // describe("Logged in", function () {
  //   it.skip("5.18", function () {
  //     // TODO
  //   });
  // });

  // it.skip("5.19", function () {
  //   // TODO
  // });

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
