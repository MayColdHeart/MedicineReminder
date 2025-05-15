import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { medicines } from '@/fake_data/medicines';
import Medicine from '@/interfaces/Medicine';

type MedicineFormProps = {
    setShowMedicineForm: (showState: React.SetStateAction<boolean>) => void,
    currentMedicineId: number | null
    updatingMedicine: boolean,
    setUpdatingMedicine: (isUpdating: React.SetStateAction<boolean>) => void,
}

const MedicineForm = ({ setShowMedicineForm, currentMedicineId, updatingMedicine, setUpdatingMedicine }: MedicineFormProps) => {
    // To add new id, you need to take the greater id from a list, this assure that even when deleting values in the middle, you can use an AUTOINCREMENT id.
    let medicineLastId = 0;
    if (medicines.length !== 0) medicineLastId = medicines[medicines.length - 1].id;

    // TODO: optmize, if is updating, no need to create newMessage, if newMessage, no need to search updatedMessage
    const [newMedicine, setNewMedicine] = useState<Medicine>(
        {
            id: (medicineLastId + 1),
            medicineName: "",
            schedule: [],
            dosage: null,
            dosageUnit: "",
        }
    );

    const currentMedicineIndex = medicines.findIndex(m => m.id === currentMedicineId);
    const currentMedicine = medicines[currentMedicineIndex];
    const [updatedMedicine, setUpdatedMedicine] = useState({... currentMedicine});

    const handleNumericInputChange = (value: string | null, key: string) => {
        if (updatingMedicine) {
            if(!value) setUpdatedMedicine({ ...updatedMedicine, [key]: null});
            else setUpdatedMedicine({ ...updatedMedicine, [key]: parseInt(value, 10)});
        } else {
            if(!value) setNewMedicine({ ...updatedMedicine, dosage: null});
            else setNewMedicine({ ...newMedicine, [key]: parseInt(value, 10) });
        }
    }

    const handleTextInputChange = (value: string | null, key: string) => {
        if (updatingMedicine) {
            setUpdatedMedicine({ ...updatedMedicine, [key]: value});
        } else {
            setNewMedicine({ ...newMedicine, [key]: value })
        }
    }

    return (
        <View style={styles.popupFundo}>
            <View style={styles.popup}>
                <Text style={styles.popupTitulo}>
                    {updatingMedicine ? "Editar Remédio" : "Adicionar Remédio"}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder={updatingMedicine !== false ? "Editar medicamento.." : "Digite o nome (Ex: Dipirona)"}
                    value={updatingMedicine ? updatedMedicine.medicineName : newMedicine.medicineName}
                    onChangeText={(medicineName) => handleTextInputChange(medicineName, "medicineName")}
                />

                <TextInput
                    style={styles.input}
                    placeholder={updatingMedicine !== false ? "Editar dosagem..." : "Digite a dosagem (Ex: 15)"}
                    defaultValue=''
                    keyboardType='numeric'
                    value={
                        updatingMedicine ? updatedMedicine.dosage?.toString() : newMedicine.dosage?.toString()
                    }
                    onChangeText={(dosage) => handleNumericInputChange(dosage, "dosage")}
                />

                <View style={styles.botoesPopup}>
                    <TouchableOpacity
                        style={[styles.formButton, styles.cancelButton]}
                        onPress={() => {
                            setShowMedicineForm(false);
                            setUpdatingMedicine(false);
                        }}
                    >
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.formButton, styles.saveButton]}
                        onPress={() => {
                            setShowMedicineForm(false);
                            setUpdatingMedicine(false);

                            if(updatingMedicine) {
                                currentMedicine.medicineName = updatedMedicine.medicineName;
                                currentMedicine.dosage = updatedMedicine.dosage;
                                currentMedicine.dosageUnit = updatedMedicine.dosageUnit;
                                //currentMedicine.schedule
                            }
                            else {
                                medicines.push(newMedicine);
                            }
                        }}
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