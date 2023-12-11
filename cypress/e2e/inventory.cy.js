describe("inventory", () => {
    it("get list inventory", () => {
      const username = "teguh.valencia@kalbe.co.id";
      const password = "Kalbefarm4";

      cy.visit("http://localhost:8080/auth");

      cy.get("input#username").type(username);
      cy.wait(1000);
      cy.get("input#password").type(password);
      cy.wait(1000);

      cy.get("button").contains("Login").click();
      cy.wait(5000);

      cy.visit("http://localhost:8080/hsse/inventory");
      cy.wait(3000);
    });
 });

describe("inventory", () => {
  it("negative test save as draft", () => {
    const username = "teguh.valencia@kalbe.co.id";
    const password = "Kalbefarm4";

    cy.visit("http://localhost:8080/auth");

    cy.get("input#username").clear().type(username);
    cy.wait(1000);
    cy.get("input#password").clear().type(password);
    cy.wait(1000);

    cy.get("button").contains("Login").click();
    cy.wait(10000);

    cy.visit("http://localhost:8080/hsse/inventory");

    cy.wait(3000);
    cy.get("button").contains("Add New Inventory").click();
    cy.wait(3000);

    //isi lokasi
    cy.get("#lokasi > .select__control") // find select component
      .click() // click to open dropdown
      .get(".select__menu") // find opened dropdown
      .find(".select__option") // find all options
      .first()
      .click({ force: true }); // click on first option

    //isi jenis peralatan
    // `.select__` is a class name of the react-select component
    cy.get("#jenisPeralatan > .select__control") // find select component
      .click() // click to open dropdown
      .get(".select__menu") // find opened dropdown
      .find(".select__option") // find all options
      .first()
      .click(); // click on first option

      //save
      cy.get("button").contains("Save").click({force:true});
      cy.get("#yesConfirm").click({ force: true });

     cy.wait(2000)
  });
});

describe("inventory", () => {
  it("positive test save as draft", () => {
    const username = "teguh.valencia@kalbe.co.id";
    const password = "Kalbefarm4";

    cy.visit("http://localhost:8080/auth");

    cy.get("input#username").clear().type(username);
    cy.wait(1000);
    cy.get("input#password").clear().type(password);
    cy.wait(1000);

    cy.get("button").contains("Login").click();
    cy.wait(10000);

    cy.visit("http://localhost:8080/hsse/inventory");

    cy.wait(3000);
    cy.get("button").contains("Add New Inventory").click({force:true});
    cy.wait(3000);

    //isi lokasi
    cy.get("#lokasi > .select__control") // find select component
      .click() // click to open dropdown
      .get(".select__menu") // find opened dropdown
      .find(".select__option") // find all options
      .first()
      .click({ force: true }); // click on first option

      cy.wait(3000);

    cy.get("#area > .select__control") // find select component
      .click() // click to open dropdown
      .get(".select__menu") // find opened dropdown
      .find(".select__option") // find all options
      .first()
      .click(); // click on first option

      cy.wait(3000);



    // jenis peralatan
    cy.get("#jenisPeralatan > .select__control") // find select component
      .click() // click to open dropdown
      .get(".select__menu") // find opened dropdown
      .find(".select__option") // find all options
      .first()
      .click(); // click on first option

      cy.wait(3000);

    //periode pengecekan
    cy.get('input[name="periodePengecekan"]').clear().type("1");  

    // TODO: get tanggal pengecekan
    cy.get(".flatpickr-input").eq(0).click({force:true});
    cy.get(".today").eq(0).click({force:true});


    cy.wait(3000);

    cy.get("#mediaApar > .select__control") // find select component
      .click() // click to open dropdown
      .get(".select__menu") // find opened dropdown
      .find(".select__option") // find all options
      .first()
      .click(); // click on first option

      cy.wait(2000);

    cy.get("input[name='inventoryDetailApar[0].berat']")
      .clear()
      .type("1000 gram");

      cy.wait(2000);

    cy.get("input[name='inventoryDetailApar[0].merk']").type("merk A");

      cy.wait(2000);

    cy.get("input[name='inventoryDetailApar[0].kapasitas']").type("100 ml");

      cy.wait(2000);


    //TODO get tanggal ed tabung
    cy.get(".flatpickr-input").eq(1).click({force: true});
    cy.get(".today").eq(1).click({force:true});

    

    //parameter data
    cy.get("button").contains("Tambah Parameter").click();

    cy.get("input[name='inventoryDetailParameter[0].nama']").type("Test nama");

    cy.wait(3000);

    cy.get("input[name='inventoryDetailParameter[0].keterangan']").type(
      "Test keterangan"
    );


    //attach gambar inventory
    cy.get("#plus").click({ force: true });
    cy.get("input#nama").type("file test gambar cypress");

    cy.wait(3000);

    cy.get("input[type=file]").attachFile("test.png");
    cy.get("#submitFile").click({ force: true });

    cy.wait(3000);

   //save
    cy.get("button").contains("Save").click({force:true});
    cy.get("#yesConfirm").click({ force: true });

     cy.wait(2000)

  });
});

describe("inventory", () => {
  it("positive submit inventory", () => {
    const username = "teguh.valencia@kalbe.co.id";
    const password = "Kalbefarm4";

    cy.visit("http://localhost:8080/auth");

    cy.get("input#username").type(username);
    cy.wait(1000);
    cy.get("input#password").type(password);
    cy.wait(1000);

    cy.get("button").contains("Login").click();
    cy.wait(5000);

    cy.visit("http://localhost:8080/hsse/inventory");
    cy.wait(3000);

    //masuk ke invent paling atas
    cy.get(".cursor-pointer > p")
    .first().click({force:true});

    cy.wait(2000)

    //teken tombol submit

    cy.get("#confirmSubmit").click();
    cy.get("#yesConfirm").click({force:true});

    cy.wait(2000)

  });
});

describe("inventory", () => {
  it("revise inventory", () => {
    const username = "teguh.valencia@kalbe.co.id";
    const password = "Kalbefarm4";

    cy.visit("http://localhost:8080/auth");

    cy.get("input#username").type(username);
    cy.wait(1000);
    cy.get("input#password").type(password);
    cy.wait(1000);

    cy.get("button").contains("Login").click();
    cy.wait(5000);

    cy.visit("http://localhost:8080/hsse/inventory");
    cy.wait(3000);

    //masuk ke invent paling atas
    cy.get(".cursor-pointer > p")
    .first().click({force:true});

    //teken tombol revise
    cy.get("button").contains("Revise").click({force:true});

    cy.get("#yesConfirm").click({force:true});

    //type alasan
    cy.get("textarea[name='notes']").type("alasan revise(testing)")

    cy.get("button").contains("OK").click({force:true});
    cy.get("#okConfirm").click({force:true});

     cy.wait(2000);

  });
});

//TODO: abis revise, submit ulang-reject

describe("inventory", () => {
  it("reject inventory", () => {
    const username = "teguh.valencia@kalbe.co.id";
    const password = "Kalbefarm4";

    cy.visit("http://localhost:8080/auth");

    cy.get("input#username").type(username);
    cy.wait(1000);
    cy.get("input#password").type(password);
    cy.wait(1000);

    cy.get("button").contains("Login").click();
    cy.wait(5000);

    cy.visit("http://localhost:8080/hsse/inventory");
    cy.wait(3000);

    //masuk ke invent paling atas
    cy.get(".cursor-pointer > p")
    .first().click({force:true});

//ganti berat
    // cy.get("input[name='inventoryDetailApar[0].berat']")
    //   .clear()
    //   .type("1500 kg");

//teken submit

    cy.get("#confirmSubmit").click();

    cy.get("#yesConfirm").click({force:true});

 //visit list   
 cy.visit("http://localhost:8080/hsse/inventory");
 cy.wait(4000);

// masuk invent atas
    cy.get(".cursor-pointer > p")
    .first().click({force:true});

    //teken tombol reject
    cy.get("button").contains("Reject").click({force:true});

    cy.get("#yesConfirm").click({force:true});

    //type alasan
    cy.get("textarea[name='notes']").type("alasan reject(testing)")

    cy.get("button").contains("OK").click({force:true});
    cy.get("#okConfirm").click({force:true});
  });
});

//TODO: abis reject, submit baru -> approve

describe("inventory", () => {
    it("approve inventory", () => {
      const username = "emir.chandra@kalbe.co.id";
      const password = "Kalbefarm4";

      cy.visit("http://localhost:8080/auth");

      cy.get("input#username").type(username);
      cy.wait(1000);
      cy.get("input#password").type(password);
      cy.wait(1000);

      cy.get("button").contains("Login").click();
      cy.wait(5000);

      cy.visit("http://localhost:8080/hsse/inventory");
      cy.wait(3000);

//submit baru

//     cy.get("button").contains("Add New Inventory").click({force:true});
//     cy.wait(3000);

//     //isi lokasi
//     cy.get("#lokasi > .select__control") // find select component
//       .click() // click to open dropdown
//       .get(".select__menu") // find opened dropdown
//       .find(".select__option") // find all options
//       .first()
//       .click({ force: true }); // click on first option

//       cy.wait(3000);

//     cy.get("#area > .select__control") // find select component
//       .click() // click to open dropdown
//       .get(".select__menu") // find opened dropdown
//       .find(".select__option") // find all options
//       .first()
//       .click(); // click on first option

//       cy.wait(3000);



//     // jenis peralatan
//     cy.get("#jenisPeralatan > .select__control") // find select component
//       .click() // click to open dropdown
//       .get(".select__menu") // find opened dropdown
//       .find(".select__option") // find all options
//       .first()
//       .click(); // click on first option

//       cy.wait(3000);

//     //periode pengecekan
//     cy.get('input[name="periodePengecekan"]').clear().type("1");  

//     // TODO: get tanggal pengecekan
//     cy.get(".flatpickr-input").eq(0).click({force:true});
//     cy.get(".today").eq(0).click({force:true});


//     cy.wait(3000);

//     cy.get("#mediaApar > .select__control") // find select component
//       .click() // click to open dropdown
//       .get(".select__menu") // find opened dropdown
//       .find(".select__option") // find all options
//       .first()
//       .click(); // click on first option

//       cy.wait(2000);

//     cy.get("input[name='inventoryDetailApar[0].berat']")
//       .clear()
//       .type("1000 gram");

//       cy.wait(2000);

//     cy.get("input[name='inventoryDetailApar[0].merk']").type("merk A");

//       cy.wait(2000);

//     //TODO get tanggal ed tabung
//     cy.get(".flatpickr-input").eq(1).click({force: true});
//     cy.get(".today").eq(1).click({force:true});

//     cy.get("input[name='inventoryDetailApar[0].kapasitas']").type("100 ml");

//       cy.wait(2000);
    

//     //parameter data
//     cy.get("button").contains("Tambah Parameter").click();

//     cy.get("input[name='inventoryDetailParameter[0].nama']").type("Test nama");

//     cy.wait(3000);

//     cy.get("input[name='inventoryDetailParameter[0].keterangan']").type(
//       "Test keterangan"
//     );




//     //attach gambar inventory
//     cy.get("#plus").click({ force: true });
//     cy.get("input#nama").type("file test gambar cypress");

//     cy.wait(3000);

//     cy.get("input[type=file]").attachFile("test.png");
//     cy.get("#submitFile").click({ force: true });

//     cy.wait(3000);

// //resubmit
//     cy.get("#confirmSubmit").click();
//     cy.get("#yesConfirm").click({force:true});
   
    //visit list

    cy.get("input[name=search]").type("waiting").type('{enter}')


      //masuk ke invent paling atas
      cy.get(".cursor-pointer > p")
      .eq(1).click({force:true});

      cy.wait(5000);

      //teken tombol approve
      cy.get("button").contains("Approve").click({force:true});
      cy.get("#yesConfirm").click({force:true});
    });
});
