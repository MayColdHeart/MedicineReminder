import { colors } from '@/constants/colors'
import { users } from '@/fake_data/users'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

export default function LoginScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    const loggedUser = users.find(user => user.username === username);

    if (username === "admin" && password === "admin") {
      router.push("/index-admin")
    }
    else if (loggedUser && password !== '') {
      // alert('Sucesso');
      router.navigate(`/${loggedUser.id}`);
    } else {
      alert('Erro');
    }
  }

  return (
      <View style={styles.tela}>
        <Text style={styles.titulo}>Bem-vindo!</Text>

        <TextInput style={styles.entrada} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize='none'/>

        <TextInput style={styles.entrada} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} autoCapitalize='none'/>

        <TouchableOpacity style={styles.botao} onPress={handleLogin} activeOpacity={0.5}>
          <Text style={styles.textobotao}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('Esqueceu a senha?')} activeOpacity={0.5}>
          <Text style={styles.textosenha}>Esqueceu a senha?</Text>
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
  textosenha: {
    marginTop: 20,
    color: '#05f',
    fontSize: 14,
  },
})