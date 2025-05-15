import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ViewStyle, TextStyle, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { medicines } from '@/fake_data/medicines';
import { Link } from 'expo-router';
import MedicineList from '@/components/MedicineList';
import MedicineForm from '@/components/MedicineForm';

const addNewMedicine = () => {
    
}

const App = () => {
    const [showMedicineForm, setShowMedicineForm] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}><Link href={"/test"}>Rascunho</Link></Text>
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
                medicines={medicines}
            />

            {showMedicineForm && (<MedicineForm setShowMedicineForm={setShowMedicineForm}/>)}
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
});

export default App;
