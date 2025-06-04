import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { medicines } from '@/fake_data/medicines';
import { Link, useLocalSearchParams } from 'expo-router';
import MedicineList from '@/components/MedicineList';
import MedicineForm from '@/components/MedicineForm';
import AlarmEffect from '@/components/AlarmEffect';
import { SafeAreaView } from 'react-native-safe-area-context';



const App = () => {
    const { id } = useLocalSearchParams();
    const loggedUserId: number = Number(id);
    const [showMedicineForm, setShowMedicineForm] = useState(false);
    const [updatingMedicine, setUpdatingMedicine] = useState(false);
    const [currentMedicineId, setCurrentMedicineId] = useState<number>(0); // used to edit in medicine form
    const [showAlarm, setShowAlarm] = useState(false);

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

            <View style={styles.alarmButtons}>
                <TouchableOpacity onPress={() => setShowAlarm(true)} style={[styles.alarmButton, { backgroundColor: '#4CAF50' }]}>
                    <Text style={styles.alarmButtonText}>Alarm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowAlarm(false)} style={[styles.alarmButton, { backgroundColor: '#f44336' }]}>
                    <Text style={styles.alarmButtonText}>Stop Alarm</Text>
                </TouchableOpacity>
            </View>

            {showAlarm && <AlarmEffect />}

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
        height: 95,
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
    alarmButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        paddingHorizontal: 20,
    } as ViewStyle,
    alarmButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    } as ViewStyle,
    alarmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    } as TextStyle,
});

export default App;
