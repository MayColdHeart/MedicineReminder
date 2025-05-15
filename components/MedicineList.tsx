import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import Medicine from "@/interfaces/Medicine";
import MedicineItem from "./MedicineItem";
import { medicines } from "@/fake_data/medicines";
import MedTimeManager from "@/components/MedTimeManager";

type MedicineItemProps = {
    medicine: Medicine
}


type MedicineListProps = {
    medicines: Medicine[]
    setUpdatingMedicine: (isUpdating: React.SetStateAction<boolean>) => void,
    setShowMedicineForm: (showState: React.SetStateAction<boolean>) => void,
    setCurrentMedicineId: (medicineId: React.SetStateAction<number>) => void
}


const MedicineList = ({ medicines, setUpdatingMedicine, setShowMedicineForm, setCurrentMedicineId}: MedicineListProps) => {

const MedicineItem = ({medicine} : MedicineItemProps) => {
    return (
        <View style={styles.itemRemedio}>
                 <MedTimeManager medicines={[medicine]} />
 


            <TouchableOpacity
            style={styles.botaoEdit}
            onPress={() => {}}
            >
            <Text style={styles.icon}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.botaoLixeira}
            onPress={() => {}}
            >
            <Text style={styles.icon}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );
}

const MedicineList = ({ medicines }: MedicineListProps) => {

    return (
        <FlatList style={styles.content}
            data= {medicines}
            renderItem={({item}) => <MedicineItem 
                                        medicine={item}
                                        setUpdatingMedicine={setUpdatingMedicine}
                                        setShowMedicineForm={setShowMedicineForm}
                                        setCurrentMedicineId={setCurrentMedicineId}
                                    />}
            keyExtractor={(item) => item.id.toString()}
        />
    );

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 20,
    },
});

export default MedicineList;