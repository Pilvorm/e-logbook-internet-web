// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res
    .status(200)
    .json({
      participantId: "001/KF/02/002",
      batch: "001/KF/02",
      userPrincipalName: "emir.haikal",
      name: "Emir Chandra Haikal",
      status: "Fdd",
      participantPersonalData: {
        fullName: "Emir Chandra Haikal",
        ktpNumber: "327111112412412",
        gender: "Laki-laki",
        maritalStatus: "Belum Menikah",
        maritalStatusKtp: "Belum Menikah",
        address: "Jalan Raya Jakarta",
        rt: 6,
        rw: 2,
        postalCode: 17117,
        provinceName: "Jawa Barat",
        provinceId: 1,
        cityName: "Jakarta",
        cityId: 2,
        kecamatan: "Rawa Basah",
        kecamatanId: 1,
        kelurahanName: "Bojong Belut",
        kelurahanId: 1,
        participantHeaderId: 1,
        id: 6,
        createdBy: "hanif.mahadika",
        createdByName: "Hanif Wira Mahadika",
        createdDate: "2023-05-30T11:27:39.644785",
        updatedBy: null,
        updatedByName: null,
        updatedDate: null,
        isDeleted: false,
      },
      participantPersonalDataOther: {
        placeOfBirthName: "Jakarta",
        placeOfBirthId: 1,
        dateOfBirth: "2023-05-22T04:35:56.275",
        bodyWeight: 60,
        bodyHeight: 300,
        npwp: 123,
        isSim: true,
        simNumber: 1312421215,
        facebook: "Emir Chandra",
        instagram: "Emir Chandra",
        twitter: "Emir Chandra",
        emailAddress: "emir.chandra@kalbe.co.id",
        handPhone: 123,
        homePhone: 123,
        participantHeaderId: 1,
        id: 1,
        createdBy: "hanif.mahadika",
        createdByName: "Hanif Wira Mahadika",
        createdDate: "2023-05-30T11:27:39.644795",
        updatedBy: null,
        updatedByName: null,
        updatedDate: null,
        isDeleted: false,
      },
      educationHeader: {
        lastEducation: "SD",
        participantHeaderId: 1,
        educationLists: [
          {
            educationLevel: "SD",
            educationName: "SD Al-Azhar",
            major: "",
            city: "Jakarta",
            yearStart: 2000,
            yearEnd: 2006,
            educationHeaderId: 1,
            id: 1,
            createdBy: "hanif.mahadika",
            createdByName: "Hanif Wira Mahadika",
            createdDate: "2023-05-30T11:27:39.644797",
            updatedBy: null,
            updatedByName: null,
            updatedDate: null,
            isDeleted: false,
          },
        ],
        id: 1,
        createdBy: "hanif.mahadika",
        createdByName: "Hanif Wira Mahadika",
        createdDate: "2023-05-30T11:27:39.644796",
        updatedBy: null,
        updatedByName: null,
        updatedDate: null,
        isDeleted: false,
      },
      employmentHistoryHeader: {
        isEmployment: true,
        participantHeaderId: 1,
        employmentHistoryDetails: [
          {
            companyName: "PT. Xsis Mitra Utama",
            posisition: ".Net Fullstack Developer",
            status: "Kontrak",
            yearStart: 2020,
            yearEnd: 2023,
            employmentHistoryHeaderId: 1,
            id: 1,
            createdBy: "hanif.mahadika",
            createdByName: "Hanif Wira Mahadika",
            createdDate: "2023-05-30T11:27:39.644799",
            updatedBy: null,
            updatedByName: null,
            updatedDate: null,
            isDeleted: false,
          },
        ],
        id: 1,
        createdBy: "hanif.mahadika",
        createdByName: "Hanif Wira Mahadika",
        createdDate: "2023-05-30T11:27:39.644798",
        updatedBy: null,
        updatedByName: null,
        updatedDate: null,
        isDeleted: false,
      },
      participantOrganization: {
        name: "Futsal",
        cityName: "Jakarta",
        cityId: 1,
        jabatan: "Anggota",
        yearStart: 2006,
        yearEnd: 2010,
        activity: "Bermain sepak bola",
        newsPaperName: "Majalah Bobo",
        topicRead: "Cerita Bobo",
        skill: "Sepak Bola",
        participantHeaderId: 1,
        id: 1,
        createdBy: "hanif.mahadika",
        createdByName: "Hanif Wira Mahadika",
        createdDate: "2023-05-30T11:27:39.6448",
        updatedBy: null,
        updatedByName: null,
        updatedDate: null,
        isDeleted: false,
      },
      participantFamilyTree: {
        fatherName: "Chandra",
        fatherBirth: "2023-05-23T02:27:27.959",
        fatherEducation: "S3",
        fatherJob: "Manager",
        motherName: "Putri",
        motherBirth: "2023-05-23T02:27:27.959",
        motherEducation: "S3",
        motherJob: "Dosen",
        participantHeaderId: 1,
        id: 1,
        createdBy: "hanif.mahadika",
        createdByName: "Hanif Wira Mahadika",
        createdDate: "2023-05-30T11:27:39.644801",
        updatedBy: null,
        updatedByName: null,
        updatedDate: null,
        isDeleted: false,
      },
      familyTreeOther: {
        brotherNumber: 1,
        brotherCount: 1,
        participantHeaderId: 1,
        brotherDatas: [
          {
            relationship: "Anak ke-1",
            name: "Emir Chandra Haikal",
            birthDate: "1998-05-25T02:03:28.396",
            company: "Pt. Kalbe Farma",
            familyTreeOtherId: 1,
            id: 1,
            createdBy: "hanif.mahadika",
            createdByName: "Hanif Wira Mahadika",
            createdDate: "2023-05-30T11:27:39.644802",
            updatedBy: null,
            updatedByName: null,
            updatedDate: null,
            isDeleted: false,
          },
        ],
        id: 1,
        createdBy: "hanif.mahadika",
        createdByName: "Hanif Wira Mahadika",
        createdDate: "2023-05-30T11:27:39.644802",
        updatedBy: null,
        updatedByName: null,
        updatedDate: null,
        isDeleted: false,
      },
      familyTreeMarried: {
        name: "Siti",
        company: "Pt. Kalbe Farma",
        isHaveChildren: true,
        participantHeaderId: 1,
        familyTreeMarriedDetails: [
          {
            relationship: "Anak ke-1",
            name: "Haikal",
            birthDate: "2023-05-23T02:27:27.959",
            company: "SD Al-Azhar",
            familyTreeMarriedId: 1,
            id: 1,
            createdBy: "hanif.mahadika",
            createdByName: "Hanif Wira Mahadika",
            createdDate: "2023-05-30T11:27:39.644805",
            updatedBy: null,
            updatedByName: null,
            updatedDate: null,
            isDeleted: false,
          },
        ],
        id: 1,
        createdBy: "hanif.mahadika",
        createdByName: "Hanif Wira Mahadika",
        createdDate: "2023-05-30T11:27:39.644803",
        updatedBy: null,
        updatedByName: null,
        updatedDate: null,
        isDeleted: false,
      },
      participantOthers: {
        isSick: true,
        isEmployeeThisCompany: true,
        isFamilyThisCompany: true,
        participantRelationship: "Teman Kerja",
        participantHeaderId: 1,
        id: 1,
        createdBy: "hanif.mahadika",
        createdByName: "Hanif Wira Mahadika",
        createdDate: "2023-05-30T11:27:39.644806",
        updatedBy: null,
        updatedByName: null,
        updatedDate: null,
        isDeleted: false,
      },
      participantContacts: [
        {
          name: "Hanif",
          handPhone: 2142112,
          relationship: "Teman Kerja",
          participantHeaderId: 1,
          id: 1,
          createdBy: "hanif.mahadika",
          createdByName: "Hanif Wira Mahadika",
          createdDate: "2023-05-30T11:27:39.644807",
          updatedBy: null,
          updatedByName: null,
          updatedDate: null,
          isDeleted: false,
        },
      ],
      id: 1,
      createdBy: "user.one@kalbe.co.id",
      createdByName: "User One",
      createdDate: "2023-05-25T19:32:16.69277",
      updatedBy: null,
      updatedByName: null,
      updatedDate: null,
      isDeleted: false,
    });
}
