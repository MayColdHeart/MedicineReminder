import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import User from '@/interfaces/User';
import { medicines } from '@/fake_data/medicines';
import Medicine from '@/interfaces/Medicine';
import Fontisto from '@expo/vector-icons/Fontisto';

type UserMiniContainerProps = {
    user: User
}

const UserTextInfo = ({children, style} : any) => {
    return (
        <Text style={[styles.textInfoDetails, style]}>{children}</Text>
    );
}

const UserMiniContainer = ({user}: UserMiniContainerProps) => {
    const userMedicines: Medicine[] = medicines.filter(medicine => medicine.userId === user.id);

    let medicinesTotal = 0;
    let takenMedicinesTotal = 0;
    let pendingMedicinesTotal = 0;
    
    let nextScheduledMedicine: Medicine|null = null;
    const now = new Date();
    let shortestTimeDifference: number|null = null;

    for(const medicine of userMedicines){
        for(const hour of medicine.schedule){
            medicinesTotal++;
            if(hour.isTaken) takenMedicinesTotal++;
            else pendingMedicinesTotal++;

            const TIME_PRECISION = 30 * 1000; // 30 seconds
            if(!hour.isTaken){
                let timeDiference = hour.hour.getTime() - now.getTime();
                if(shortestTimeDifference === null && timeDiference >= -TIME_PRECISION) {
                    shortestTimeDifference = timeDiference;
                    nextScheduledMedicine = medicine;
                }
                if(shortestTimeDifference !== null && shortestTimeDifference >= timeDiference) {
                    shortestTimeDifference = timeDiference;
                    nextScheduledMedicine = medicine;
                }
            }
        }
    }

    let hoursUntilNextMedicine : string | number | undefined;
    let minutesUntilNextMedicine: string | number | undefined;
    if(nextScheduledMedicine && shortestTimeDifference){
        hoursUntilNextMedicine = Math.floor(shortestTimeDifference / (1000 * 60 * 60));
        minutesUntilNextMedicine = Math.floor((shortestTimeDifference / (1000 * 60)) % 60);
        if(hoursUntilNextMedicine < 0) hoursUntilNextMedicine = 0;
        if(minutesUntilNextMedicine < 0) minutesUntilNextMedicine = 0;

        hoursUntilNextMedicine = hoursUntilNextMedicine.toString().padStart(2, "0");
        minutesUntilNextMedicine = minutesUntilNextMedicine.toString().padStart(2, "0");
    }

    return (
        <Link href={`/profile/${user.id}`} asChild>
        <TouchableOpacity style={styles.userBoxContainer}>
            
            <View style={styles.userImageContainer}>
                <Image source={ {uri: user.photo} } style={styles.userImage}/>                
            </View>

            <View style={styles.completeInfoContainer}>
                <View style={ styles.userRowInfoContainer }>
                    <Text style={styles.userTitle}>{user.firstName} {user.lastName}</Text>

                    <View style={styles.userColumnInfoContainer}>
                        <View style={styles.userColumnBoxInfoDetails}>
                            <UserTextInfo style={styles.textHighlight}>Medicações ingeridas:</UserTextInfo>
                            <UserTextInfo>{takenMedicinesTotal}</UserTextInfo>
                        </View>
                        <View style={styles.userColumnBoxInfoDetails}>
                            <UserTextInfo style={styles.textHighlight}>Medicações pendentes:</UserTextInfo>
                            <UserTextInfo >{pendingMedicinesTotal}</UserTextInfo>
                        </View>
                    </View>

                    {nextScheduledMedicine ?
                    <View>
                        <UserTextInfo style={{ paddingBottom: 5 }}>Próxima medicação:</UserTextInfo>                    
                        <View style={styles.userRowBoxInfoDetails}>
                            <View style={styles.userIconInfoContainer}>
                                <Fontisto name="drug-pack" size={20} color={colors.primary}/>
                                <UserTextInfo> {nextScheduledMedicine.medicineName}</UserTextInfo>
                            </View>
                            <View style={styles.userIconInfoContainer}>
                                <Fontisto name="clock" size={20} color={colors.primary}/>
                                <UserTextInfo> {hoursUntilNextMedicine}h {minutesUntilNextMedicine}m</UserTextInfo>
                            </View>
                        </View>
                    </View> : 
                    <></>
                    }
                </View>
            </View>
        </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    userBoxContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 25,
        backgroundColor: colors.white,
        elevation: 2,
        shadowColor: colors.text,
        boxShadow: "10"
    },
    textHighlight : {
        fontWeight: "bold",
    },
    userImageContainer: {
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        padding: 5
    },
    userImage: {
        width: "100%",
        height: 90,
        borderRadius: 50,
    },
    completeInfoContainer: {
        flexDirection: "row",
        width: "70%",
        alignItems: "center",
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        padding: 10,
        gap: 10,
    },
    userTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    userColumnInfoContainer: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        width: "100%"
    },
    userColumnBoxInfoDetails: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    textInfoDetails: {
        fontSize: 17,
    },
    userRowInfoContainer: {
        width: "100%",
        justifyContent: "space-around",
    },
    userRowBoxInfoDetails: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    userIconInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
    }
});

export default UserMiniContainer;