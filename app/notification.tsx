import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { users } from '@/fake_data/users';
import { colors } from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Notification = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Notificações de Medicação</Text>
            </View>
            

            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.alertCard}>
                        <Ionicons name="warning-outline" size={40} color={colors.warning} />
                        <Text style={styles.alertText}>
                            {item.firstName} {item.lastName} precisa administrar a medicação.
                        </Text>
                    </View>
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
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 30,
    },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffebee',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 12,
        marginRight: 12,
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