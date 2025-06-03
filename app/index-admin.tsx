import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';
import UserList from '@/components/UserList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const IndexAdmin = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.adminHeaderTitle}>Painel Administrador</Text>
                
                <TouchableOpacity onPress={() => router.push('/notification')}>
                    <Ionicons name="notifications-outline" size={28} color="#333" />
                </TouchableOpacity>
            </View>

            <UserList />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexBasis: "100%",
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    adminHeaderTitle: {
        fontWeight: "bold",
        fontSize: 25,
    },
});

export default IndexAdmin;