import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { medicines } from '@/fake_data/medicines';
import { users } from '@/fake_data/users';
import { Link } from 'expo-router';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import User from '@/interfaces/User';
import UserMiniContainer from './UserMiniContainer';

const UserList = () => {
    return (
        <FlatList
            //ListHeaderComponent={  }
            data= {users}
            renderItem={({item: user}) => <UserMiniContainer user={user}/>}
            keyExtractor={(user) => user.id.toString()}
            contentContainerStyle={styles.routeList}
        />
    );
}

const styles = StyleSheet.create({
        routeList: {
        width: "100%",
        gap: 15,
        backgroundColor: colors.background,
    },
});

export default UserList;