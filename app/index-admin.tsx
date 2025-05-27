import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { colors } from '@/constants/colors';
import UserList from '@/components/UserList';
import AdminSummaryBox from '@/components/AdminSummaryBox';
import { SafeAreaView } from 'react-native-safe-area-context';

const IndexAdmin = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.adminHeaderTitle}>Painel Administrador</Text>
            </View>
            <UserList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexBasis: "100%",
        backgroundColor: colors.background
    },
    adminHeaderTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        padding: 15
    }
    
});

export default IndexAdmin;