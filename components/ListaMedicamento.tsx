import { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import Medicamento from "@/interfaces/Medicamento";
import { medicamentos } from "@/fake_data/medicamentos";

type MedicamentoItemProps = {
    medicamento: Medicamento
    editar: (index: number) => void,
    apagarRemedio: (index: number) => void
}

type ListaMedicamentoProps = {
    medicamentos: Medicamento[]
    editar: (index: number) => void,
    apagarRemedio: (index: number) => void
}

function MedicamentoItem({medicamento, editar, apagarRemedio} : MedicamentoItemProps){
    return (
        <View style={styles.itemRemedio}>
            <Text style={styles.textoRemedio}>{medicamento.nome}</Text>

            <TouchableOpacity
            style={styles.botaoEdit}
            onPress={() => editar(medicamento.id)}
            >
            <Text style={styles.icon}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.botaoLixeira}
            onPress={() => apagarRemedio(medicamento.id)}
            >
            <Text style={styles.icon}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );
}

export function ListaMedicamento({ medicamentos, editar, apagarRemedio }: ListaMedicamentoProps) {
    return (
        <FlatList style={styles.content}
            //ListHeaderComponent={<Header />}
            //ListHeaderComponentStyle={styles.header}
            data= {medicamentos}
            renderItem={({item}) => <MedicamentoItem medicamento={item} editar={editar} apagarRemedio={apagarRemedio}/>}
            keyExtractor={(item) => item.id.toString()}
            //contentContainerStyle={styles.routeList}
        />
    );
    
    // return (
    //   <ScrollView style={styles.content}>
    //     {medicamentos.map((remedio, index) => (
        //   <View key={index} style={styles.itemRemedio}>
        //     <Text style={styles.textoRemedio}>{remedio}</Text>


        //     <TouchableOpacity
        //       style={styles.botaoEdit}
        //       onPress={() => editar(index)}
        //     >
        //       <Text style={styles.icon}>✏️</Text>
        //     </TouchableOpacity>

        //     <TouchableOpacity
        //       style={styles.botaoLixeira}
        //       onPress={() => apagarRemedio(index)}
        //     >
        //       <Text style={styles.icon}>🗑️</Text>
        //     </TouchableOpacity>
        //   </View>
    //     ))}
    //   </ScrollView>
    // );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 20,
    },
    itemRemedio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    textoRemedio: {
        fontSize: 16,
        flex: 1,
        flexBasis: 200,
    },
    botaoEdit: {
        flex: 1,
        padding: 8,
        left: 40,
    },
    icon: {
        fontSize: 18,
    },
    botaoLixeira: {
        flex: 1,
        padding: 8,
        left: 30,
    },
});