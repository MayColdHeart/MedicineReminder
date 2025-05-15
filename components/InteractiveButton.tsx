import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const InteractiveButton = () => {
  const [clicked, setClicked] = useState(false);

  const backgroundColor = clicked ? 'green' : 'red';
  const textButton = clicked ? 'Tomou o remedio' : 'Não tomou o remedio';

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <TouchableOpacity style={[styles.botao, { backgroundColor }]} onPress={handleClick}>
      <Text style={styles.textButton}>{textButton}</Text>
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
  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default InteractiveButton;