import { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import Medicine from "@/interfaces/Medicine";
import { medicines } from "@/fake_data/medicines";
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from "@/constants/colors";

type MedicineItemProps = {
    medicine: Medicine,
    setUpdatingMedicine: (isUpdating: React.SetStateAction<boolean>) => void,
    setShowMedicineForm: (showState: React.SetStateAction<boolean>) => void,
    setCurrentMedicineId: (medicineId: React.SetStateAction<number>) => void
}

const MedicineItem = ({medicine, setUpdatingMedicine, setShowMedicineForm, setCurrentMedicineId} : MedicineItemProps) => {
    const [isDeleted, setIsDeleted] = useState(false);

    const pendingHours = medicine.schedule?.filter(h => !h.isTaken) || [];

    return !isDeleted && (
        <View style={styles.itemContainer}>
            <View style={styles.topRow}>
                <Text style={styles.medicineText}>{medicine.medicineName}</Text>

                <TouchableOpacity
                    style={styles.buttonEdit}
                    onPress={() => {
                        setShowMedicineForm(true); 
                        setUpdatingMedicine(true);
                        setCurrentMedicineId(medicine.id)
                    }}>

                    <FontAwesome5 name="edit" size={20} color={colors.text} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.trashButton}
                    onPress={() => {
                        const index = medicines.findIndex(searchMedicine => searchMedicine.id === medicine.id);
                        medicines.splice(index, 1);
                        setIsDeleted(true);
                    }}>

                    <FontAwesome5 name="trash-alt" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>

            
            {pendingHours.length > 0 ? (
                <View style={styles.timeContainer}>
                    <Text style={styles.horarioTitulo}>Horários Pendentes:</Text>
                    {pendingHours.map((h, index) => (
                        <Text key={index} style={styles.timeText}>
                            {new Date(h.hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    ))}
                </View>
            ) : (
                <Text style={styles.timeText}>Todos os horários cumpridos.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    medicineText: {
        fontSize: 16,
        flex: 1,
    },
    buttonEdit: {
        padding: 8,
        marginLeft: 10,
    },
    trashButton: {
        padding: 8,
        marginLeft: 5,
    },
    timeContainer: {
        marginTop: 10,
        paddingLeft: 5,
    },
    horarioTitulo: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
    },
    timeText: {
        fontSize: 14,
        color: '#333',
    },
});

export default MedicineItem;
