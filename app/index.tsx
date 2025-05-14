import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ViewStyle, TextStyle, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import { medicamentos } from '@/fake_data/medicamentos';
import { ListaMedicamento } from '@/components/ListaMedicamento';
import { Link } from 'expo-router';
import Medicamento from '@/interfaces/Medicamento';

const App: React.FC = () => {

  //const [medicamentos, setMedicamentos] = React.useState<string[]>([]);
  const [novoMedicamento, setNovoMedicamento] = React.useState<Medicamento | null>(null);
  const [mostrarPopup, setMostrarPopup] = React.useState(false);
  const [editaMedicamento, setEditaMedicamento] = React.useState<number | null>(null);

  // const adicionarMedicamento = () => {
  //   if (novoMedicamento.trim()) {
  //     if (editaMedicamento !== null) {
  //       const novaLista = [...medicamentos];
  //       novaLista[editaMedicamento] = novoMedicamento;
  //       setMedicamentos(novaLista);
  //       setEditaMedicamento(null);
  //     } else {
  //       setMedicamentos([...medicamentos, novoMedicamento]);
  //     }
  //     setNovoMedicamento("");
  //     setMostrarPopup(false);
  //   }
  //   const apagarRemedio = (index: number) => {
  //     const novaLista = [...medicamentos];
  //     novaLista.splice(index, 1);
  //     setMedicamentos(novaLista);
  //   }
  // };

  function adicionarMedicamento(): void {
    throw new Error('Function not implemented.');
  }

  function apagarRemedio(index: number): void {
    throw new Error('Function not implemented.');
  }

  const editar = (index: number) => {
    setNovoMedicamento(medicamentos[index]);
    setEditaMedicamento(index);
    setMostrarPopup(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Fixo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}><Link href={"/botao"}>Rascunho</Link></Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: 'white' }]}
          onPress={() => {
            setNovoMedicamento(null);
            setEditaMedicamento(null);
            setMostrarPopup(true);
          }}>

          <Ionicons
            name="add-circle-outline"
            size={32}
            color="#4CAF50"
          />
        </TouchableOpacity>
      </View>

      <ListaMedicamento 
        medicamentos={medicamentos}
        editar={editar} 
        apagarRemedio={apagarRemedio}
      />

      {mostrarPopup && (
        <View style={styles.popupFundo}>
          <View style={styles.popup}>
            <Text style={styles.popupTitulo}>
              {editaMedicamento !== null ? "Editar Remédio" : "Adicionar Remédio"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder={editaMedicamento !== null ? "Editar medicamento.." : "Digite o nome (Ex: Dipirona)"}
              value={novoMedicamento?.nome}
              onChangeText={texto => setNovoMedicamento(texto)}
            />

            <View style={styles.botoesPopup}>
              <TouchableOpacity
                style={[styles.botaoPopup, styles.botaoCancelar]}
                onPress={() => setMostrarPopup(false)}
              >
                <Text style={styles.botaoTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botaoPopup, styles.botaoConfirmar]}
                onPress={adicionarMedicamento}
              >
                <Text style={styles.botaoTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}


    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  } as ViewStyle,
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  } as TextStyle,
  addButton: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  addButtonText: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: 'bold',
  } as TextStyle,
  popupFundo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 10,
  },
  popupTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#3f51b5',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  botaoPopup: {
    padding: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#e0e0e0',
  },
  botaoConfirmar: {
    backgroundColor: '#4caf50',
  },

  botoesPopup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
