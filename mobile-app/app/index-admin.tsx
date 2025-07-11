import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';
import UserList from '@/components/UserList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import * as signalR from '@microsoft/signalr';
import { API_URL, useAuth } from '@/context/AuthContext';

const IndexAdmin = () => {
    const router = useRouter();
    const { authState } = useAuth();
    const [notificationCount, setNotificationCount] = useState(6); // You can change this to use dynamic data later

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_URL}/notification-hub`, {
                accessTokenFactory: () => {
                    let localToken = authState?.token || null;
                    return localToken;
                }
            } as signalR.IHttpConnectionOptions)
            .configureLogging(signalR.LogLevel.Debug)
            .withAutomaticReconnect()
            .build();

        connection.on('AdminsReceiveNotification', (username, message, alarmTime) => {
            console.log('Admin received notification:', { username, message, alarmTime });
            setNotificationCount(count => count + 1);
        });

        connection
            .start()
            .then(() => console.log('SignalR connected'))
            .catch(err => console.error('SignalR connection error:', err));

        return () => {
            connection.stop();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Animatable.Text animation='flipInX' delay={500} style={styles.adminHeaderTitle}>
                    Painel Administrador
                </Animatable.Text>

                <TouchableOpacity onPress={() => router.push('/notification')} style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={24} color={colors.primary} />
                    {notificationCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{notificationCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <UserList />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexBasis: '100%',
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
        fontWeight: 'bold',
        fontSize: 25,
    },
    notificationButton: {
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 50,
        padding: 8,
        backgroundColor: '#f9f9f9',
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: 'red',
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default IndexAdmin;