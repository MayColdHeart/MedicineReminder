import { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import Medicine from "@/interfaces/Medicine";
import { medicines } from "@/fake_data/medicines";
import MedTimeManager from "@/components/MedTimeManager";

type MedicineItemProps = {
    medicine: Medicine
}

type MedicineListProps = {
    medicines: Medicine[]
}

const MedicineItem = ({medicine} : MedicineItemProps) => {
    return (
        <View style={styles.itemRemedio}>
                 <MedTimeManager medicines={[medicine]} />
 


            <TouchableOpacity
            style={styles.botaoEdit}
            onPress={() => {}}
            >
            <Text style={styles.icon}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.botaoLixeira}
            onPress={() => {}}
            >
            <Text style={styles.icon}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );
}

const MedicineList = ({ medicines }: MedicineListProps) => {
    return (
        <FlatList style={styles.content}
            //ListHeaderComponent={<Header />}
            //ListHeaderComponentStyle={styles.header}
            data= {medicines}
            renderItem={({item}) => <MedicineItem medicine={item} />}
            keyExtractor={(item) => item.id.toString()}
            //contentContainerStyle={styles.routeList}
        />
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

export default MedicineList;