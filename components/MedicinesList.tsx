import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";

type MedicineListProps = {
    medicamentos: string[]
    editar: (index: number) => void,
    apagarRemedio: (index: number) => void
}

export function MedicinesList({medicamentos, editar, apagarRemedio} : MedicineListProps){
    return (
      <ScrollView style={styles.content}>
        {medicamentos.map((remedio, index) => (
          <View key={index} style={styles.itemRemedio}>
            <Text style={styles.textoRemedio}>{remedio}</Text>


            <TouchableOpacity
              style={styles.botaoEdit}
              onPress={() => editar(index)}
            >
              <Text style={styles.icon}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoLixeira}
              onPress={() => apagarRemedio(index)}
            >
              <Text style={styles.icon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
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
        left: 160,
    },
    icon: {
        fontSize: 18,
    },
    botaoLixeira: {
        flex: 1,
        padding: 8,
        left: 100,
    },
});