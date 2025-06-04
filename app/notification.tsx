import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { users } from '@/fake_data/users';
import { colors } from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Animatable from "react-native-animatable"

const Notification = () => {
     const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Animatable.Text animation='flipInX' delay={500} style={styles.title}>Notificações</Animatable.Text>
            </View>
            

            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Animatable.View animation='fadeInDown' delay={750} style={styles.alertCard}>
                        <Ionicons name="warning-outline" size={40} color={colors.warning} />
                        <Text style={styles.alertText}>
                            {item.firstName} {item.lastName} precisa administrar a medicação.
                        </Text>
                    </Animatable.View>
                )}
            />
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
        marginBottom: 20,
    },
    backButton: {
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 50,
        padding: 8,
        backgroundColor: '#f9f9f9',
    },
    title: {

        textAlign: "center",
        fontWeight: "bold",
        marginRight: 90,
        fontSize: 25,
    },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        padding: 25,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ffcdd2',
    },
    alertText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#c62828',
    },
});

export default Notification;