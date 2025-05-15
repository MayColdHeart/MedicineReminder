import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import Medicine from "@/interfaces/Medicine";

type Props = {
  medicines: Medicine[];
};

const MedTimeManager = ({ medicines }: Props) => {
  const now = new Date();

  const sortedMedicines = medicines
    .map((medicine) => {
      const nextDose = medicine.schedule
        .filter((scheduleItem) => !scheduleItem.isTaken && scheduleItem.hour > now)
        .sort((firstItem, secondItem) => firstItem.hour.getTime() - secondItem.hour.getTime())[0] || null;

      return {
        medicine,
        nextDose,
      };
    })
    .filter((entry) => entry.nextDose !== null)
    .sort((a, b) => {
      if (!a.nextDose || !b.nextDose) return 0;
      return a.nextDose.hour.getTime() - b.nextDose.hour.getTime();
    });

  const renderMedicine = ({ item }: { item: typeof sortedMedicines[0] }) => (
    <View style={styles.medicineItem}>
      <Text style={styles.medicineName}>{item.medicine.medicineName}</Text>
      <Text style={styles.medicineTime}>
        Próximo horário: {item.nextDose?.hour.toLocaleString("pt-BR")}
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      data={sortedMedicines}
      keyExtractor={(item) => item.medicine.id.toString()}
      renderItem={renderMedicine}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 20,
  },
  medicineItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  medicineTime: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

export default MedTimeManager;
