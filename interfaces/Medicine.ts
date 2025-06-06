export default interface Medicine {
  id: number;
  userId: number;
  medicineName: string;
  schedule: { hour: Date; isTaken: boolean }[];
  dosage: number | null;
  dosageUnit: string;
}
