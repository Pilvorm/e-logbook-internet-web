// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-file-upload";
import "cypress-localstorage-commands";

Cypress.Commands.add("login", () => {
  cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session");

  // Set the cookie for cypress.
  // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
  // This step can probably/hopefully be improved.
  // We are currently unsure about this part.
  // We need to refresh this cookie once in a while.
  // We are unsure if this is true and if true, when it needs to be refreshed.

  cy.setCookie(
    "next-auth.session-token",
    "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..nzom3AijxpSAxAWv.ZGnPUiobXbWMKTtLJBO0ptp74xk_5uSwnQ72mGosBl9NLRLrzhA1igPQmIM8JhEyaegEJM9dN-6SU7Me6B-ozbYE4q3szbVgLvjIIJX1nEX4Tsqk5eTmNvvH2pC9BipmYeW6hzdH_ecXJG6rv9oVkQTJ7POVy8Joc5de4CMFCjgVFeSbbIopFM6FrIQ3rq5femMjviTvKmtsQXpw-X2uDX7CwfnYGiFHPyM9R8qVvfTqbMtQH02t3zcRXWdjNTlzhSyu9bhaQF_AoYGBkB3BSf1vLCuAxezrEhlItXrugdg4e0C-_QbSap3181hQwN8N4w6g_YvJTJhe2URuNBrGb1kwRlFS7Pk1FNlh3q0p7I8-emQupoje5R-1AdoHglrRxmjfOTQGbs4lO_m0ncVYidkvW59CrSJUfozR6-d2Ks7uDoS1Ad0ypwfbbYbIbFi4gEYxOrTrjz28b8MLYaeKpALvVZEfKTt1_8ZM48B3rOaPAXxBcf8e3md05_263YrqIWM6kc67Boo4lDR2p1haaBWDb-sib-5N8mYCdk7NZAUnXc54oyhf0CoKoGGKM9J3y2Tx6R1McnQux70-JS9dMO-_7IIV6B60U8r_FVrfU3i22ezFEzqb0jbiS6GqlhHrC67c7HeLgH2geQt8v65sKT6htkXJ85uxNGJCNuSrg6TzOIezCoPHa2GooIu2SLnkHqEWOSgS9JU1TB-HjJpmQOUfTKg3bR8x8JjknqkTuLJlExa3mU4DRlyEZUUHxbM2MwmPdFW12twPiKneHRS-oOzS8Q2fqpdJIQnUaaKu8TFtB5s18fa9uNsbSdIJdZFMWmDiFhzeIdlEqhSR9O4VJXkbh0ze66pBq5Ks7jLbEQP44oTpbQncuwi4_Mw0W0fbmqVP3SHDRoXoT0sx76RlFYHCy_k0inoxHUCOwIqsbhyoJH7yzCMfs9bPRpAp-jfvZwIRrofWfIQ3NT6RExNLIEfCvmRc-f_KpwF9VQe1eq2TmO_7zs8NlU23Nl7ZuUV3f91V09jh-B0IZ3glXx4BYOY8guDlPA3YXUKMBAohnQBwspb6fYZjhmBpEb12Ick6d4WPjlA3_5_hbL0bQW-ff4tZEpzWWWl64JIV_zg8D6dE07QTHOSAJtlPFMB0HGAZz8QHIcLDBd4i-9WZBsZ7o1Nn8X2fVXwnN1n3xWI4iZ1Q-Jz_f_Sg6AAkkYI0cuKyPZ71qUf7t9maNCqQNLcLRStlcfy1FDBssxL9gztSuDNW7vZzAbeaqnAjomvY4HSrh7iJm24-xuZnxlPGLgA776_WxEFua0FFKWYngkiZQGW1hBV5jevb9ZrWWotU7yyyqkX0jY5r0EMl5ajphD399byjWH2sfKpySjZj0K4R5DNsFjT9hqX9U-W2TpuV1__vG5LhncYZkfuSlNvwqIIlxu70NlYaqd7BWE4m5KPStgv0g8yPLxzsQkLj-WiPoiec4RI-HfnFB4vsfJKMhXJVsrtuzDb1feuhe5s5adJ3HZHTC1YbbVIilowmjQCVUEBmrZXfbFa_qRi6AuKoMod-DcwzZJHABYqs3feQ3vGRHxoSv_mh24n6snquMPyaTNUw3R5o8TpzsHCuu1p0u2lKsF1g-i8p.sIu5LJJvzL4DUpTn1dPT0g"
  );

  Cypress.Cookies.preserveOnce("next-auth.session-token");
});

Cypress.Commands.add("storageSet", () => {
  cy.setLocalStorage("flagRole", "true");
  cy.setLocalStorage(
    "userRoles",
    JSON.stringify([
      {
        nik: "user.one",
        userPrincipalName: "user.one@kalbe.co.id",
        email: "user.one@kalbe.co.id",
        roleCodeOld: "ESELECTION-ADMIN",
        roleCode: "ESELECTION-ADMIN",
        roleName: "HRD-Admin",
        applicationCode: "E-SELECTION",
        companyCode: "1",
        jabatan: "-",
        notes: "Role CRUD module masterasdzz",
        isActive: true,
        createdDate: "2023-03-23T00:00:00",
        createdBy: "hanif.mahadika@kalbe.co.id",
        updatedDate: "2023-03-31T14:22:47.567",
        updatedBy: "User One",
        orgType: null,
        clusterCode: null,
        companyName: null,
        name: "User One",
      },
    ])
  );
  cy.setLocalStorage(
    "currentUserSite",
    JSON.stringify({
      Id: "18dc8e9c-9e49-4c61-abd1-2bc2ba631bd1",
      Nik: "0001",
      UserPrincipalName: "user.one@kalbe.co.id",
      ApplicationCode: "E-SELECTION",
      CompanyCode: "01",
      ClusterCode: "KF",
      CompanyName: "PT. Kalbe Farma Tbk.",
      IsDeleted: false,
      CreatedDate: "2023-05-09T00:00:00",
      CreatedBy: "hanif.mahadika@kalbe.co.id",
      UpdatedDate: "2023-05-09T00:00:00",
      UpdatedBy: "hanif.mahadika@kalbe.co.id",
      IsDefault: true,
    })
  );
  cy.setLocalStorage("currentUserRole", "HRD-Admin");
});
