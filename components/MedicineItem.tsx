import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
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
}

const MedicineItem = ({ medicine, setUpdatingMedicine, setShowMedicineForm, setCurrentMedicineId }: MedicineItemProps) => {
    const [isDeleted, setIsDeleted] = useState(false);

    return !isDeleted && (
        <View style={styles.itemRemedio}>
            <TimeButton></TimeButton>
            <Text style={styles.textoRemedio}>{medicine.medicineName}</Text>
            <TouchableOpacity
                style={styles.botaoEdit}
                onPress={() => {
                    setShowMedicineForm(true);
                    setUpdatingMedicine(true);
                    setCurrentMedicineId(medicine.id)
                }}
            >
                <FontAwesome5 name="edit" size={24} color={colors.text} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botaoLixeira}
                onPress={() => {
                    const index = medicines.findIndex(searchMedicine => searchMedicine.id === medicine.id);
                    medicines.splice(index, 1);
                    setIsDeleted(true);
                }}
            >
                x
                <FontAwesome5 name="trash-alt" size={24} color={colors.text} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    itemRemedio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    textoRemedio: {
        fontSize: 16,
        flex: 1,
        flexBasis: 200,
    },
    botaoEdit: {
        flex: 1,
        padding: 8,
        left: 40,
    },
    icon: {
        fontSize: 18,
    },
    botaoLixeira: {
        flex: 1,
        padding: 8,
        left: 30,
    },
});

export default MedicineItem;