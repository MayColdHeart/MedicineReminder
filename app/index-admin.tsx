import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';
import UserList from '@/components/UserList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable'

const IndexAdmin = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Animatable.Text animation='flipInX' delay={500} style={styles.adminHeaderTitle}>Painel Administrador</Animatable.Text>

                <TouchableOpacity onPress={() => router.push('/notification')} style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={24} color={colors.primary} />
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
    notificationButton: {
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 50,
        padding: 8,
        backgroundColor: '#f9f9f9',
    },
});

export default IndexAdmin;