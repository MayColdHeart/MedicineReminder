import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ViewStyle, TextStyle, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { medicines } from '@/fake_data/medicines';
import { Link } from 'expo-router';
import MedicineList from '@/components/MedicineList';
import MedicineForm from '@/components/MedicineForm';
import { AddButton } from '@/components/AddButton';
import { CheckButton } from '@/components/CheckButton';
import InteractiveButton from '@/components/InteractiveButton';

const Test = () => {
    return (
    <>
        <InteractiveButton ></InteractiveButton>
    </>
    );
}

const styles = StyleSheet.create({

});

export default Test;