import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { medicines } from '@/fake_data/medicines';
import Medicine from '@/interfaces/Medicine';
import ColonIcon from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/build/Ionicons';

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
    const [updatedMedicine, setUpdatedMedicine] = useState<Medicine>({ ...currentMedicine });
    const [newHours, setNewHours] = useState(0);
    const [newMinutes, setNewMinutes] = useState(0);

    const handleNumericInputChange = (value: string | null, key: string) => {
        if (updatingMedicine) {
            if (!value) setUpdatedMedicine({ ...updatedMedicine, [key]: null });
            else setUpdatedMedicine({ ...updatedMedicine, [key]: parseInt(value, 10) });
        } else {
            if (!value) setNewMedicine({ ...updatedMedicine, dosage: null });
            else setNewMedicine({ ...newMedicine, [key]: parseInt(value, 10) });
        }
    }

    const handleTextInputChange = (value: string | null, key: string) => {
        if (updatingMedicine) {
            setUpdatedMedicine({ ...updatedMedicine, [key]: value });
        } else {
            setNewMedicine({ ...newMedicine, [key]: value })
        }
    }

    return (
        <View style={styles.popupFundo}>
            <ScrollView style={styles.popup}>
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

                <View style={styles.timeWithAddContainer}>
                    <View style={styles.timeContainer}>
                        <TextInput
                            style={styles.inputTime}
                            placeholder='00'
                            keyboardType='numeric'
                            maxLength={2}
                            onChangeText={(hour) => setNewHours(parseInt(hour, 10))}
                        />
                        <Text style={styles.twoDots}>:</Text>
                        <TextInput
                            style={styles.inputTime}
                            placeholder='00'
                            keyboardType='numeric'
                            maxLength={2}
                            onChangeText={(minute) => setNewMinutes(parseInt(minute, 10))}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            const newDate = new Date(
                                new Date().getFullYear(),
                                new Date().getMonth(),
                                new Date().getDate(),
                                newHours,
                                newMinutes,
                            );

                            if (updatingMedicine) {
                                updatedMedicine.schedule.push({
                                    hour: newDate,
                                    isTaken: false
                                });
                                setUpdatedMedicine({ ...updatedMedicine });
                            } else {
                                newMedicine.schedule.push({
                                    hour: newDate,
                                    isTaken: false
                                });
                                setNewMedicine({ ...newMedicine, });
                            }
                        }}
                    >
                        <Ionicons
                            name="add-circle-outline"
                            size={80}
                            color="#4CAF50"
                        />
                    </TouchableOpacity>
                </View>

                {/* Show edited medicine: list of hours */}
                {
                    (updatedMedicine.schedule !== undefined && updatingMedicine === true) ? updatedMedicine.schedule.map(((item, index) =>
                        <Text key={index} style={styles.savedTime}>
                            {item.hour.getHours().toString().padStart(2, "0")}
                            :
                            {item.hour.getMinutes().toString().padStart(2, "0")}
                            {" hrs"}
                        </Text>
                    )) : <></>
                }

                {/* Show new medicine: list of hours */}
                {
                    (newMedicine.schedule !== undefined && updatingMedicine === false) ? newMedicine.schedule.map(((item, index) =>
                        <Text key={index} style={styles.savedTime}>
                            {item.hour.getHours().toString().padStart(2, "0")}
                            :
                            {item.hour.getMinutes().toString().padStart(2, "0")}
                            {" hrs"}
                        </Text>
                    )) : <></>
                }

                <View style={styles.botoesPopup}>
                    <TouchableOpacity
                        style={[styles.formButton, styles.cancelButton]}
                        onPress={() => {
                            setShowMedicineForm(false);
                            setUpdatingMedicine(false);
                            setNewHours(0);
                            setNewMinutes(0);
                        }}
                    >
                        <Text style={styles.textButton}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.formButton, styles.saveButton]}
                        onPress={() => {
                            setShowMedicineForm(false);
                            setUpdatingMedicine(false);

                            if (updatingMedicine) {
                                currentMedicine.medicineName = updatedMedicine.medicineName;
                                currentMedicine.dosage = updatedMedicine.dosage;
                                currentMedicine.dosageUnit = updatedMedicine.dosageUnit;

                                if(newHours !== 0 && newMinutes !== 0){
                                    const newDate = new Date(
                                        new Date().getFullYear(),
                                        new Date().getMonth(),
                                        new Date().getDate(),
                                        newHours,
                                        newMinutes,
                                    );

                                    currentMedicine.schedule.push({
                                        hour: newDate,
                                        isTaken: false
                                    });
                                }
                            }
                            else {
                                medicines.push(newMedicine);
                            }
                        }}
                    >
                        <Text style={styles.textButton}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        marginTop: 50,
        marginBottom: 50
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
    timeWithAddContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    timeContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        flexDirection: "row",
        gap: 15,
        width: "75%",
        height: 100,
        alignSelf: "center"
    },
    inputTime: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 8,
        fontSize: 40,
        flex: 1,
    },
    twoDots: {
        fontSize: 50,
        fontWeight: "bold",
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
    },
    savedTime: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    formButton: {
        padding: 12,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
        marginBottom: 50
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