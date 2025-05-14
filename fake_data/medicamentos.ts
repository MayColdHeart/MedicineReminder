import Medicamento from "@/interfaces/Medicamento";

const dataAgora = new Date();
const dataDepois = new Date(dataAgora);
dataDepois.setHours(dataAgora.getHours() + 12);

export const medicamentos : Medicamento[] = [
    {
        id: 1,
        nome: "Dipiridona",
        horarios: [new Date(), dataDepois],
        ingerido: true
    },

]