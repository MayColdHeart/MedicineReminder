import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { users } from '@/fake_data/users';
import { colors } from '@/constants/colors';
import UserMiniContainer from './UserMiniContainer';
import AdminSummaryBox from './AdminSummaryBox';

const UserList = () => {
    return (
        <FlatList
            ListHeaderComponent={<AdminSummaryBox />}
            data={users}
            renderItem={({ item: user }) => <UserMiniContainer user={user} />}
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
        paddingBottom: 15
    },
});

export default UserList;