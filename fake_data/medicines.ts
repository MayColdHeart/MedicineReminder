import Medicine from "@/interfaces/Medicine";

const dateNow = new Date();

const dateAfter = new Date(dateNow);
dateAfter.setHours(dateAfter.getHours() + 8);
dateAfter.setMinutes(dateAfter.getMinutes() + 1);

const dateMoreAfter = new Date(dateAfter);
dateMoreAfter.setHours(dateMoreAfter.getHours() + 12);

const dateMuchMoreAfter = new Date(dateMoreAfter);
dateMuchMoreAfter.setHours(dateMuchMoreAfter.getHours() + 24);

export const medicines: Medicine[] = [
    {
        id: 1,
        medicineName: "Dipirona",
        schedule: [
            { hour: dateNow, isTaken: true },
            { hour: dateAfter, isTaken: false },
        ],
        dosage: 7,
        dosageUnit: "ml"
    },
    {
        id: 2,
        medicineName: "Amoxicilina",
        schedule: [
            { hour: dateAfter, isTaken: false },
        ],
        dosage: 8,
        dosageUnit: "ml"
    },
    {
        id: 3,
        medicineName: "Paracetamol",
        schedule: [
            { hour: dateAfter, isTaken: true },
            { hour: dateMoreAfter, isTaken: false },
            { hour: dateMuchMoreAfter, isTaken: false },
        ],
        dosage: 30,
        dosageUnit: "ml"
    },
];
