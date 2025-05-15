import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { medicines } from '@/fake_data/medicines';
import Medicine from '@/interfaces/Medicine';

type MedicineFormProps = {
    setShowMedicineForm: (showState: React.SetStateAction<boolean>) => void,
}

const MedicineForm = ({setShowMedicineForm} : MedicineFormProps) => {
    const [newMedicine, setNewMedicine] = useState<Medicine>();

    return (
        <View style={styles.popupFundo}>
            <View style={styles.popup}>
                <Text style={styles.popupTitulo}>
                    {null !== null ? "Editar Remédio" : "Adicionar Remédio"}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder={null !== null ? "Editar medicamento.." : "Digite o nome (Ex: Dipirona)"}
                    value={""}
                    onChangeText={() => {newMedicine?.medicineName}}
                />

                <View style={styles.botoesPopup}>
                    <TouchableOpacity
                        style={[styles.formButton, styles.cancelButton]}
                        onPress={() => setShowMedicineForm(false)}
                    >
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.formButton, styles.saveButton]}
                        onPress={() => { }}
                    >
                        <Text style={styles.textButton}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    popupFundo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        elevation: 10,
    },
    popupTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#3f51b5',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
    },
    formButton: {
        padding: 12,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#e0e0e0',
    },
    saveButton: {
        backgroundColor: '#4caf50',
    },

    botoesPopup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default MedicineForm;