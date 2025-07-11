import { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import Medicine from "@/interfaces/Medicine";
import { medicines } from "@/fake_data/medicines";
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from "@/constants/colors";
import TimeButton from "./TimeButton";

type MedicineItemProps = {
    medicine: Medicine,
    setUpdatingMedicine: (isUpdating: React.SetStateAction<boolean>) => void,
    setShowMedicineForm: (showState: React.SetStateAction<boolean>) => void,
    setCurrentMedicineId: (medicineId: React.SetStateAction<number>) => void
};

const MedicineItem = ({ medicine, setUpdatingMedicine, setShowMedicineForm, setCurrentMedicineId }: MedicineItemProps) => {
    const [isDeleted, setIsDeleted] = useState(false);

    return !isDeleted && (
        <View style={styles.itemRemedio}>
            <TimeButton />
            <View style={styles.textContainer}>
                <Text style={styles.textoRemedio}>{medicine.medicineName}</Text>
                <Text style={styles.time}>
                    {medicine.schedule
                        .slice(0, 2) 
                        .map(entry =>
                            new Date(entry.hour).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                        )
                        .join('  |  ')}
                </Text>
            </View>



            <TouchableOpacity
                style={styles.botaoEdit}
                onPress={() => {
                    setShowMedicineForm(true);
                    setUpdatingMedicine(true);
                    setCurrentMedicineId(medicine.id);
                }}
            >
                <FontAwesome5 name="edit" size={20} color="#4CAF50" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botaoLixeira}
                onPress={() => {
                    const index = medicines.findIndex(searchMedicine => searchMedicine.id === medicine.id);
                    medicines.splice(index, 1);
                    setIsDeleted(true);
                }}
            >
                <FontAwesome5 name="trash-alt" size={20} color="#f44336" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemRemedio: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
        marginVertical: 6,
        marginHorizontal: 1,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#60af6385',
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginLeft: 30,
        marginRight: 30,
    },
    textoRemedio: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    botaoEdit: {
        padding: 8,
        marginLeft: 4,
    },
    botaoLixeira: {
        padding: 8,
        marginLeft: 4,
    },
    icon: {
        fontSize: 18,
    },
    time: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
    },
});


export default MedicineItem;
