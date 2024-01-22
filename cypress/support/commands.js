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
    "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..wlBYsU0Xpr-YanUG.NK4I3FDhLXC2Izo_zqyEnSsnzlacf0bX8sbX9Ggjk86Sr1SDH0YxM-f9vNRUS6bJP8cuBmg0eUP8tzz-JvhU0HnAkLwf9cu74fFLcCJ4HRhaQgWxQYAoVDWoWU0fUxCDq15K201DMeWKGWopfdnifbkAKaRSVUJ73ztZ0lsNnrWMIIzp2f_7ipXZwALbXJzL9baJC1EDk6cqouoBxW3-8cXx8BAzCIbC20794iokyjKnjVIaVnCiGAW45CWExHSqF9ggH14rGwb2vKhQUsHo9S245oqEd1eYDNIJ6dN-Kprdgs8C0ujSMpiVfV5Rrm2OlPFzoYukYjiIW_eGr7-0-9xrriyOUI5Izir-4oT8A1yTLogv6PgUD4umLalqL-vCcKMJnZZr8ZYMGcto6nOiast3xjXA7_RXUHkCtPHqu6F4G5RRMugnSP7ZXhj980CJwWRPaGAZulZFuOt_Kup1ldl2JqI0XbyGvt-wXGVMiW_t9k-yuy8dUosCCo4l7ThTLcoCrdXe0Os6jqLcHIbcXTEt_hIekl9zBqZbyAf_C6-ejrIzsY5wcce0x0p4ch3QKnp3tVsGbEkSqcEpWWOSqzvVxgzG1MOUhfQbkpvr3119jRRyOBfI9v8BSjgb6198y7eV1p9HcqiR5YSqELIYc5vV_R1DYK_FX687K7vGYvGnMfO_evGw7IUdWLHoeouY1bbDuEP6fsQtag-uHvAf9mkCI3hGefBQXpWXpp3cgfzoeBEacX3qol9N3q-UqKCPy_nNe-rwzKSugH5loLCTpwh8Euw0fgj_vNe3UDcHzBdpLGm3XKKqtvEsrrOT2r8HSXtDCQ8ykf6WAqfK6eTaY13gWk-afpAurObn5GLsBNCc-DdWrH0wVHCut9NAUkXZS5O8ZXePTwhGZ7312a5blZCAlck46r6Ha2nhe80UPFJXzmaZoZzqSq19OE0CBkEkVAu_Hk7nMel1oP3gCupm28fGt-dZpx-xNRdQ_g8drQ-WqwQCsC-YdnZD4Hk9xVCJr2QcP8KkcY5y86iB-CTmidrvvIfyd2YWkpBDdHPUXBQnTuxJapvyp7FpfhKwW1OVfDUTK-xmAmHIrlakaxOtBRt-D9v2fzEUW9kbYKPaKXq6C9n2WxED9YsfGWqkOPUq4OKZX4GTKSCa1syf7p9aNireKuaojJ41ECqI0kx3wJX_bqMb74eJS2xzVXI5Bu8DZLKlHmSIhmDPsYnAZQSui8Iyf0EJRWlv5cg5HYAQ9sEt5mieseVaknLPSRFEoQMxVF_q81i_OxKDc7TBihZeFKLyAq32FVqJwvN1WWJeb7YQafmP72Kwb6g8pZ0GontMuNV12iYyO6uI9immyVjrokBcl5vR3KxdwaJ2JWQCRfKwKdgRvKm750c9TkNI-wnjfZL-Pi43hiKr43HrEek4dvvxKN0csQpXLCCxwQKUyTfppIebIGavHRJdt9Zl4tyAGLPkDMx1u-mnjkyo2Z2Xqj2095L8tslsimTO9oskudOOaX8Q1trv-IM0tkX7SaHHAiavh0DG28kF7ivG8JxOTIH-Tu8591eVgow8tWSloU-ORqYRzBvtm8vRc40R8beAiwK5wO8z-RgHSx_P5LPnWYCeN7s4tW9HC2loYm4lP2JijJlmphcSPQxDmH9YntyHi1BncOlHPpXQWQIzZyUzF086iBn-wa3jy84GskC9nLQ5msswOsu3nLfstsPRXCq0h3xsKdbLRE94lbQZxSJBKVYC2RBaPBGyY5lnKeYSFsNUcUv6lTlaZv-SrC4YXTaF-5LTIiFsk4VeyLliRn-mTUKwwDfrFexg6iXb7SYKpj3fhsb2odBFVRn_P1JDvbS3RWCDzjwQGsi59JWgmfRTneW1DuEkHst0FTZpg9oPcIMlAIVIOHF_66214nNkMNs5YS8OjkDmvertJX_PAhTLCo8zSNNJdC8agHLW-8asqmt8-M8eIPMu2yC00zm5rg-0lPwnxARU_Aobn3CgV9QSykw9XqwKKGcskHV3SmDyOxzPblJ2i1hXAdazHrW54TfqpekVIcuQZD9cejLuuCuJhNHIMpLeHifijSu8ftiOIJSovc7-J6evn3wmOwev4fLrTyETNeZdpx4MEJL69raKptwnKECMEvx-fEwlQaCHWrcE4pa4PbCWo8bCCr6K98Oe8mHpPONxL0a3YJ4aKd9C4uAnySeH9rVoAbGAh_QyZqjXmrsdHevbNB9LWtR_fB-5a7PDVrnwbY-8JPJu_J3WMNnxsiGSnsQ4ZDb4IspHNVhfwfuJ1ul54YdKSvYXIT9P_ChwEG08OWvw76B46pmnL54lxBaq_4QQewCo-zoWKprL4dJhx-K3x6mKUsOHuTmXtpbyhGW9-a5yP7LiztoX00FJ0AYrK9RL1w3UBYt0w7yUSJBmzAlnLRRbM0GR63dDOTxhE80_rXLR6XsrZ_C1kANwD0OoRQgAKsq4qzNQe4sTE-eZ_nRwoGfgQ_DeSpZgSjbiroz7hee3.4tKshc56JL5gBD1Td1SCNQ"
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
