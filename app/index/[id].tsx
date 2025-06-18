import React, { useState, useEffect } from 'react';
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

    const loggedUser = users.find((user) => user.id === loggedUserId);
    if (loggedUser) {
        console.log('Logged User:', loggedUser.username);
        notifyAdmin(`Notification from ${loggedUser.username}. User is logged.`, loggedUser.username, new Date());
    }

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
                            Alert.alert(
                                'Hora do remédio!',
                                `${med.medicineName} - ${med.dosage}${med.dosageUnit}`
                            );

                            // Optionally: mark it as shown/taken or avoid repeated alerts
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
        backgroundColor: '#F0F4F8', // cor de fundo suave
    },
    header: {
        height: 95,
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    } as ViewStyle,
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    } as TextStyle,
    addButton: {
        backgroundColor: 'white',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    } as ViewStyle,
    addButtonText: {
        color: '#4CAF50',
        fontSize: 24,
        fontWeight: 'bold',
    } as TextStyle,
    iconButton: {
        backgroundColor: 'white',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    } as ViewStyle,
});


export default App;
