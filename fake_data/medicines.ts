import Medicine from "@/interfaces/Medicine";

const dateNow = new Date();
const dateAfter = new Date(dateNow);
dateAfter.setHours(dateNow.getHours() + 12);
const dateMoreAfter = new Date(dateNow);
dateMoreAfter.setHours(dateNow.getHours() + 8);

export const medicines: Medicine[] = [
    {
        id: 1,
        medicineName: "Dipirona",
        schedule: [new Date(), dateAfter],
        isTaken: true
    },
    {
        id: 2,
        medicineName: "Amoxicilina",
        schedule: [new Date(), dateMoreAfter],
        isTaken: false
    },
    {
        id: 3,
        medicineName: "Paracetamol",
        schedule: [new Date()],
        isTaken: false
    },
];
