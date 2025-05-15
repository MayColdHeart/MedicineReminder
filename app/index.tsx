import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ViewStyle, TextStyle, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import {medicines } from '@/fake_data/medicines';
import { Link } from 'expo-router';
import MedicineList from '@/components/MedicineList';
import Time from '@/components/Time';
import MedTimeManager from '@/components/MedTimeManager';

const App = () => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Fixo */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}><Link href={"/botao"}>Rascunho</Link> <Time/> </Text>
                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: 'white' }]}
                    onPress={() => { }}>

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
                <MedTimeManager medicines={medicines} />

            {showPopup && (
                <View style={styles.popupFundo}>
                    <View style={styles.popup}>
                        <Text style={styles.popupTitulo}>
                            {null !== null ? "Editar Remédio" : "Adicionar Remédio"}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder={null !== null ? "Editar medicamento.." : "Digite o nome (Ex: Dipirona)"}
                            value={""}
                            onChangeText={() => { }}
                        />

                        <View style={styles.botoesPopup}>
                            <TouchableOpacity
                                style={[styles.botaoPopup, styles.botaoCancelar]}
                                onPress={() => { }}
                            >
                                <Text style={styles.botaoTexto}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.botaoPopup, styles.botaoConfirmar]}
                                onPress={() => { }}
                            >
                                <Text style={styles.botaoTexto}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}


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
    botaoTexto: {
        color: 'white',
        fontWeight: 'bold',
    },
    botaoPopup: {
        padding: 12,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    botaoCancelar: {
        backgroundColor: '#e0e0e0',
    },
    botaoConfirmar: {
        backgroundColor: '#4caf50',
    },

    botoesPopup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default App;
