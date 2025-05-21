import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { users } from '@/fake_data/users';
import { medicines } from '@/fake_data/medicines';
import { Ionicons } from '@expo/vector-icons';




const user = users[0];

const ProfileText = ({ children }: { children: React.ReactNode }) => {
    return <Text style={styles.profileText}>{children}</Text>;
};

const ProfileInfo = () => {
    return (
        <View style={styles.profileInfoContainer}>
            <View style={styles.profilePhoto} />
            <Text style={styles.userName}>
                {user.firstName} {user.lastName}
            </Text>
            <ProfileText><Ionicons name="mail-outline" size={18} />  {user.email}</ProfileText>
            <ProfileText><Ionicons name="call-outline" size={18} />  {user.phone}</ProfileText>
            <Text style={styles.myRoutesHeader}>Meus medicamentos</Text>
        </View>
    );
};

const MedicineCard = ({ name }: { name: string }) => (
    <View style={styles.medicineCard}>
        <Ionicons name="medkit-outline" size={24} color="#4CAF50" />
        <Text style={styles.medicineText}>{name}</Text>
    </View>
);

const Profile = () => {
    const userMedicines = medicines.filter(route => route.userId === user.id);

    return (
        <FlatList
            ListHeaderComponent={<ProfileInfo />}
            data={userMedicines}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MedicineCard name={item.medicineName} />}
            contentContainerStyle={styles.routeList}
        />
    );
};

const styles = StyleSheet.create({
    profileInfoContainer: {
        alignItems: "center",
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: "#f0fdf4",
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: "#c8e6c9"
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#2e7d32"
    },
    myRoutesHeader: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "flex-start",
        color: "#1b5e20"
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        backgroundColor: "#81c784"
    },
    profileText: {
        fontSize: 16,
        padding: 10,
        marginVertical: 5,
        borderColor: "#a5d6a7",
        borderWidth: 1,
        borderRadius: 8,
        width: "100%",
        backgroundColor: "#ffffff",
        color: "#333",
    },
    medicineCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e8f5e9",
        padding: 15,
        marginHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        gap: 10,
        borderWidth: 1,
        borderColor: "#c8e6c9",
    },
    medicineText: {
        fontSize: 18,
        color: "#2e7d32"
    },
    routeList: {
        paddingBottom: 40
    },
});

export default Profile;
