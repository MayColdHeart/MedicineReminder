import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BotaoInterativo() {
  const [clicado, setClicado] = useState(false);

  const backgroundColor = clicado ? 'green' : 'red';
  const textoBotao = clicado ? 'Tomou o remedio' : 'Não tomou o remedio';

  const lidarComClique = () => {
    setClicado(!clicado);
  };

  return (
    <TouchableOpacity style={[styles.botao, { backgroundColor }]} onPress={lidarComClique}>
      <Text style={styles.textoBotao}>{textoBotao}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '10%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});