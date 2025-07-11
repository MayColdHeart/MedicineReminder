import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

const AdminSummaryBox = () => (
    <View style={styles.summaryContainer}>
        <View style={styles.card}>
            <FontAwesome5 name="users" size={24} color={colors.primary} />
            <Text style={styles.label}>Usuários</Text>
            <Text style={styles.value}>4</Text>
        </View>

        <View style={styles.card}>
            <MaterialIcons name="medical-services" size={24} color={colors.primary} />
            <Text style={styles.label}>Medicações</Text>
            <Text style={styles.value}>7</Text>
        </View>

        <View style={styles.card}>
            <Ionicons name="time-outline" size={24} color={colors.primary} />
            <Text style={styles.label}>Pendentes</Text>
            <Text style={styles.value}>13</Text>
        </View>

        <View style={styles.card}>
            <Ionicons name="checkmark-circle-outline" size={24} color={colors.primary} />
            <Text style={styles.label}>Ingeridas</Text>
            <Text style={styles.value}>11</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
   summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 10,
    marginBottom: 20
   },
   card:{
    width:'47%',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.text,
    shadowOpacity: 0.1,
    shadowRadius: 4
   },
   label: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '600'
   },
   value: {
    fontSize: 20,
    fontWeight: 'bold', 
    color: colors.primary
   }

});

export default AdminSummaryBox;
