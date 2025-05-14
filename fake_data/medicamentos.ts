import Medicamento from "@/interfaces/Medicamento";

const dataAgora = new Date();
const dataDepois = new Date(dataAgora);
dataDepois.setHours(dataAgora.getHours() + 12);
const dataMaisTarde = new Date(dataAgora);
dataMaisTarde.setHours(dataAgora.getHours() + 8);

export const medicamentos: Medicamento[] = [
    {
        id: 1,
        nome: "Dipirona",
        horarios: [new Date(), dataDepois],
        ingerido: true
    },
    {
        id: 2,
        nome: "Amoxicilina",
        horarios: [new Date(), dataMaisTarde],
        ingerido: false
    },
    {
        id: 3,
        nome: "Paracetamol",
        horarios: [new Date()],
        ingerido: false
    },
];
