import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import Medicine from "@/interfaces/Medicine";

type Props = {
  medicines: Medicine[];
};

const MedTimeManager = ({ medicines }: Props) => {
  const now = new Date();


  //Found the nextDose (.map, .filter and .sort)
  const sortedMedicines = medicines
    .map((medicine) => {
      const nextDose = medicine.schedule
        .filter((scheduleItem) => !scheduleItem.isTaken && scheduleItem.hour > now)
        .sort((firstScheduleItem, SecScheduleItem) => firstScheduleItem.hour.getTime() - SecScheduleItem.hour.getTime())[0] || null;

        //medicine -> complete
        //nextDose -> next dose or null
      return {
        medicine,
        nextDose,
      };
    })
    //no have future dose?, clr
    //.filter((medicineEntry) => medicineEntry.nextDose !== null)
  
   
    // ordn by prox dose 
    .sort((firstScheduleItem, SecScheduleItem) => {
      if (!firstScheduleItem.nextDose || !SecScheduleItem.nextDose) return 0;
      return firstScheduleItem.nextDose.hour.getTime() - SecScheduleItem.nextDose.hour.getTime();
    });


  const showMedManager = ({ item }: { item: typeof sortedMedicines[0] }) => (
    <View style={styles.medicineItem}>
      <Text style={styles.medicineName}>{item.medicine.medicineName}</Text>
      <Text style={styles.medicineTime}>
        Próximo horário da dose: {item.nextDose?.hour.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );



  

  return (
    <FlatList
      style={styles.list}
      data={sortedMedicines}
      keyExtractor={(item) => item.medicine.id.toString()}
      renderItem={showMedManager}
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
    fontWeight: "bold",
    fontSize: 16,
  },

  medicineTime: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

export default MedTimeManager;
