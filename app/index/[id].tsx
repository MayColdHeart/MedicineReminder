import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { medicines } from '@/fake_data/medicines';
import { Link, useLocalSearchParams } from 'expo-router';
import MedicineList from '@/components/MedicineList';
import MedicineForm from '@/components/MedicineForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '@/context/AuthContext';
import axios from 'axios';
import { users } from '@/fake_data/users';
import AlarmEffect from '@/components/AlarmEffect';

const notifyAdmin = async (message: string, username: string, alarmTime: Date) => {
    const options = {
        method: 'POST',
        url: `${API_URL}/accounts/notify`,
        headers: {'Content-Type': 'application/json'},
        data: { message: message, alarmTime: alarmTime }
    };

    try {
        const { data } = await axios.request(options);
        console.log('Notification sent successfully:');
    } catch (error) {
        console.error(error);
    }
}

const App = () => {
    const { id } = useLocalSearchParams();
    const loggedUserId: number = Number(id);
    const [showMedicineForm, setShowMedicineForm] = useState(false);
    const [updatingMedicine, setUpdatingMedicine] = useState(false);
    const [currentMedicineId, setCurrentMedicineId] = useState<number>(0); // used to edit in medicine form
    const [showAlarm, setShowAlarm] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const inOneMinute = new Date(now.getTime() + 60 * 1000);

            medicines
                .filter(med => med.userId === loggedUserId)
                .forEach(med => {
                    med.schedule.forEach(scheduleItem => {
                        if (
                            !scheduleItem.isTaken &&
                            scheduleItem.hour >= now &&
                            scheduleItem.hour <= inOneMinute
                        ) {
                            // Alert.alert(
                            //     'Hora do remédio!',
                            //     `${med.medicineName} - ${med.dosage}${med.dosageUnit}`
                            // );


                            setShowAlarm(true);
                            notifyAdmin(
                                `${med.medicineName} - ${med.dosage}${med.dosageUnit}`,
                                users.find(user => user.id === loggedUserId)?.username || 'Unknown User',
                                scheduleItem.hour
                            );
                            scheduleItem.isTaken = true;
                        }
                    });
                });
        }, 30 * 1000); // check every 30 seconds

        return () => clearInterval(interval); // cleanup
    }, [loggedUserId]);

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