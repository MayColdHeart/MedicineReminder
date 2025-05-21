import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { medicines } from '@/fake_data/medicines';
import { Link, useLocalSearchParams } from 'expo-router';
import MedicineList from '@/components/MedicineList';
import MedicineForm from '@/components/MedicineForm';
import Time from '@/components/Time';
import MedTimeManager from "@/components/MedTimeManager";
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeButton from "@/components/TimeButton";


const App = () => {
    const { id } = useLocalSearchParams();
    const loggedUserId: number = Number(id);
    const [showMedicineForm, setShowMedicineForm] = useState(false);
    const [updatingMedicine, setUpdatingMedicine] = useState(false);
    const [currentMedicineId, setCurrentMedicineId] = useState<number>(0); // used to edit in medicine form

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                
    <Link href={`/profile/${loggedUserId}`} asChild>
        <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={32} color="#4CAF50" />

        </TouchableOpacity>
    </Link>

    <Text style={styles.headerTitle}>MedicineReminder</Text>
                <TouchableOpacity
                
                    style={[styles.addButton, { backgroundColor: 'white' }]}
                    onPress={() => setShowMedicineForm(true)}>

                    <Ionicons
                        name="add-circle-outline"
                        size={32}
                        color="#4CAF50"
                    />
                   
                </TouchableOpacity>
                
            </View>


            <MedicineList
                medicines={medicines.filter(medicine => medicine.userId === loggedUserId)}
                setUpdatingMedicine={setUpdatingMedicine}
                setShowMedicineForm={setShowMedicineForm}
                setCurrentMedicineId={setCurrentMedicineId}
            />



            {showMedicineForm && (<MedicineForm
                                    loggedUserId={loggedUserId} 
                                    setShowMedicineForm={setShowMedicineForm}
                                    setUpdatingMedicine={setUpdatingMedicine}
                                    updatingMedicine={updatingMedicine}
                                    currentMedicineId={currentMedicineId}
                                />)}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 80,
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    } as ViewStyle,
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    } as TextStyle,
    addButton: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    addButtonText: {
        color: '#4CAF50',
        fontSize: 24,
        fontWeight: 'bold',
    } as TextStyle,
    iconButton: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
} as ViewStyle,
});

export default App;
