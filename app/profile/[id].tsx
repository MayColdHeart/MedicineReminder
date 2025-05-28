import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { users } from '@/fake_data/users';
import { medicines } from '@/fake_data/medicines';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import User from '@/interfaces/User';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Alert} from 'react-native';

const ProfileText = ({ children }: { children: React.ReactNode }) => {
    return <Text style={styles.profileText}>{children}</Text>;
};

const ProfileInfo = ({user}: {user: User}) => {
    return (
        <View style={styles.profileInfoContainer}>
            <Image source={ {uri: user.photo} } style={styles.profilePhoto}/>     
            <Text style={styles.userName}>
                {user.firstName} {user.lastName}
            </Text>
            <ProfileText><Ionicons name="mail-outline" size={18} />  {user.email}</ProfileText>
            <ProfileText><Ionicons name="call-outline" size={18} />  {user.phone}</ProfileText>

            <View style={styles.BottominfCont} >
            <Text style={styles.myRoutesHeader}>Medicamentos</Text>
            <TouchableOpacity style={styles.historyButton} onPress={() => Alert.alert('23:52 amoxicilina - Pendente.')}>
            <Ionicons name="time-outline" size={18} color="#2e7d32" />
            <Text style={styles.historyButtonText}>Histórico</Text>
            </TouchableOpacity>
            </View>

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
    const { id } = useLocalSearchParams();
    const loggedUserId = Number(id);
    const user = users.filter(user => user.id === loggedUserId)[0];
    const userMedicines = medicines.filter(route => route.userId === user.id);

    return (
        <SafeAreaView>
            
        <FlatList
            ListHeaderComponent={<ProfileInfo user={user}/>}
            data={userMedicines}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MedicineCard name={item.medicineName} />}
            contentContainerStyle={styles.routeList}
            
            
        />
        
        </SafeAreaView>
    
    
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
        marginTop: 6,
        marginRight: 30,
        fontSize: 24,
        fontWeight: "bold",
        color: "#1b5e20"
    },

        BottominfCont: {
            flexDirection: 'row',
            padding: 10,
        },

        historyButton: {
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dcedc8',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderColor: '#c5e1a5',
        borderWidth: 1,
        alignSelf: "flex-end",
    },
        historyButtonText: {
        marginLeft: 4,
        fontSize: 18,
        color: '#33691e',
        fontWeight: '500',
        alignSelf: 'flex-end',
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
