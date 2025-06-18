import Medicine from "@/interfaces/Medicine";

const fixedDate = new Date(Date.now() + 60 * 60 * 1000); // Date one hour from now

const dateAlmostNow = new Date();
dateAlmostNow.setMinutes(dateAlmostNow.getMinutes() + 1);

const dateAfter = new Date(fixedDate);
dateAfter.setHours(dateAfter.getHours() + 8);

const dateMoreAfter = new Date(dateAfter);
dateMoreAfter.setHours(dateMoreAfter.getHours() + 8);

const dateMuchMoreAfter = new Date(dateMoreAfter);
dateMuchMoreAfter.setHours(dateMuchMoreAfter.getHours() + 24);

export const medicines: Medicine[] = [
    {
        id: 1,
        medicineName: "Dipirona",
        userId: 1,
        schedule: [
            { hour: dateAlmostNow, isTaken: false },
            { hour: dateAfter, isTaken: false },
        ],
        dosage: 7,
        dosageUnit: "ml"
    },
    {
        id: 2,
        medicineName: "Amoxicilina",
        userId: 2,
        schedule: [
            { hour: dateAfter, isTaken: false },
        ],
        dosage: 8,
        dosageUnit: "ml"
    },
    {
        id: 3,
        medicineName: "Paracetamol",
        userId: 3,
        schedule: [
            { hour: dateAfter, isTaken: true },
            { hour: dateMoreAfter, isTaken: false },
            { hour: dateMuchMoreAfter, isTaken: false },
        ],
        dosage: 30,
        dosageUnit: "ml"
    },
    {
        id: 4,
        medicineName: "Ibuprofeno",
        userId: 1,
        schedule: [
            { hour: fixedDate, isTaken: true },
            { hour: dateAfter, isTaken: false },
        ],
        dosage: 400,
        dosageUnit: "mg"
    },
    {
        id: 5,
        medicineName: "Loratadina",
        userId: 4,
        schedule: [
            { hour: fixedDate, isTaken: false },
        ],
        dosage: 10,
        dosageUnit: "mg"
    },
    {
        id: 6,
        medicineName: "Omeprazol",
        userId: 5,
        schedule: [
            { hour: dateMoreAfter, isTaken: false },
            { hour: dateMuchMoreAfter, isTaken: false },
        ],
        dosage: 20,
        dosageUnit: "mg"
    },
    {
        id: 7,
        medicineName: "Prednisona",
        userId: 1,
        schedule: [
            { hour: fixedDate, isTaken: true },
            { hour: dateAfter, isTaken: false },
        ],
        dosage: 5,
        dosageUnit: "mg"
    },
    {
        id: 8,
        medicineName: "Azitromicina",
        userId: 2,
        schedule: [
            { hour: dateAfter, isTaken: true },
        ],
        dosage: 500,
        dosageUnit: "mg"
    },
    {
        id: 9,
        medicineName: "Metformina",
        userId: 3,
        schedule: [
            { hour: fixedDate, isTaken: true },
            { hour: dateMuchMoreAfter, isTaken: false },
        ],
        dosage: 850,
        dosageUnit: "mg"
    },
    {
        id: 10,
        medicineName: "Losartana",
        userId: 3,
        schedule: [
            { hour: fixedDate, isTaken: true },
        ],
        dosage: 50,
        dosageUnit: "mg"
    },
    {
        id: 11,
        medicineName: "Cetirizina",
        userId: 6,
        schedule: [
            { hour: fixedDate, isTaken: false },
        ],
        dosage: 10,
        dosageUnit: "mg"
    },
    {
        id: 12,
        medicineName: "AAS",
        userId: 3,
        schedule: [
            { hour: dateAfter, isTaken: false },
        ],
        dosage: 100,
        dosageUnit: "mg"
    },
    {
        id: 13,
        medicineName: "Ranitidina",
        userId: 4,
        schedule: [
            { hour: fixedDate, isTaken: false },
            { hour: dateAfter, isTaken: true },
        ],
        dosage: 150,
        dosageUnit: "mg"
    },
    {
        id: 14,
        medicineName: "Clorfeniramina",
        userId: 2,
        schedule: [
            { hour: dateMoreAfter, isTaken: false },
        ],
        dosage: 4,
        dosageUnit: "mg"
    },
    {
        id: 15,
        medicineName: "Sinvastatina",
        userId: 6,
        schedule: [
            { hour: dateMuchMoreAfter, isTaken: false },
        ],
        dosage: 20,
        dosageUnit: "mg"
    },
    {
        id: 16,
        medicineName: "Captopril",
        userId: 1,
        schedule: [
            { hour: fixedDate, isTaken: true },
            { hour: dateAfter, isTaken: true },
        ],
        dosage: 25,
        dosageUnit: "mg"
    },
    {
        id: 17,
        medicineName: "Fluoxetina",
        userId: 3,
        schedule: [
            { hour: fixedDate, isTaken: true },
        ],
        dosage: 20,
        dosageUnit: "mg"
    },
    {
        id: 18,
        medicineName: "Sertralina",
        userId: 5,
        schedule: [
            { hour: dateAfter, isTaken: false },
        ],
        dosage: 50,
        dosageUnit: "mg"
    },
    {
        id: 19,
        medicineName: "Fenitoína",
        userId: 3,
        schedule: [
            { hour: dateMoreAfter, isTaken: false },
        ],
        dosage: 100,
        dosageUnit: "mg"
    },
    {
        id: 20,
        medicineName: "Carbamazepina",
        userId: 1,
        schedule: [
            { hour: dateMuchMoreAfter, isTaken: false },
        ],
        dosage: 200,
        dosageUnit: "mg"
    },
];