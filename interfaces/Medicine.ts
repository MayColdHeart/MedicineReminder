export default interface Medicine {
  id: number;
  medicineName: string;
  schedule: { hour: Date; isTaken: boolean }[];
  dosage: number;
  dosageUnit: string;
}
