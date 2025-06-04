import { colors } from '@/constants/colors'
import { users } from '@/fake_data/users'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

export default function RegistreScreen() {
  return (
      <View style={styles.tela}>

        <View>
          <Text style={styles.titulo}>Registro de Usuario</Text>
        </View>
        
        <TextInput style={styles.entrada} placeholder="Firstname"/>
        <TextInput style={styles.entrada} placeholder="Lastname"/>
        <TextInput style={styles.entrada} placeholder="Username"/>
        <TextInput style={styles.entrada} placeholder="email"/>
        <TextInput style={styles.entrada} placeholder="phone"/>

        <TouchableOpacity style={styles.botao} activeOpacity={0.5}>
          <Text style={styles.textobotao}>Confirmar</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  entrada: {
    width: '100%',
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#777',
  },
  botao: {
    width: '100%',
    height: 45,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  textobotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})