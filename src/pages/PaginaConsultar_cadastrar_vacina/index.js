import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from "react-native-masked-text";

const App = () => {
  const [nomeVacina, setNomeVacina] = useState('');
  const [dataVacinacao, setDataVacinacao] = useState('');
  const [localVacina, setLocalVacina] = useState('');
  const [loteVacina, setLoteVacina] = useState('');
  const [vacinas, setVacinas] = useState([]);
  const [selectedVacinaId, setSelectedVacinaId] = useState(null);

  useEffect(() => {
    fetchVacinas();
  }, []);

  const fetchVacinas = async () => {
    try {
      const cpf = await AsyncStorage.getItem('cpf');
      const response = await axios.get(`http://192.168.0.110:3000/api/vacina/${cpf}`);
      setVacinas(response.data);
    } catch (error) {
      console.error('Erro ao buscar vacinas:', error);
    }
  };

  const handleAddOrUpdateVacina = async () => {
    try {
      const cpf = await AsyncStorage.getItem('cpf');
      const dataFormatada = dataVacinacao.split('/').reverse().join('-');
      const newVacina = {
        cpf,
        nome_vacina: nomeVacina,
        data_vacinacao: dataFormatada,
        local_vacina: localVacina,
        lote_vacina: loteVacina
      };

      if (selectedVacinaId) {
        // Atualizar vacina existente
        await axios.put(`http://192.168.0.110:3000/api/vacina/${selectedVacinaId}`, newVacina);
        Alert.alert('Sucesso!', 'Vacina atualizada com sucesso!');
      } else {
        // Adicionar nova vacina
        await axios.post('http://192.168.0.110:3000/api/vacina', newVacina);
        Alert.alert('Sucesso!', 'Vacina cadastrada com sucesso!');
      }

      fetchVacinas();
      setNomeVacina('');
      setDataVacinacao('');
      setLocalVacina('');
      setLoteVacina('');
      setSelectedVacinaId(null); // Limpar o ID da vacina selecionada
    } catch (error) {
      console.error('Erro ao adicionar/atualizar vacina:', error);
    }
  };

  const handleDeleteVacina = async (id) => {
    try {
      Alert.alert(
        'Confirmar Exclusão',
        'Tem certeza de que deseja excluir esta vacina?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            onPress: async () => {
              await axios.delete(`http://192.168.0.110:3000/api/vacina/${id}`);
              fetchVacinas();
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao deletar vacina:', error);
    }
  };

  const handleEditVacina = (id, nome, data, local, lote) => {
    setSelectedVacinaId(id);
    setNomeVacina(nome);
    setDataVacinacao(data);
    setLocalVacina(local);
    setLoteVacina(lote);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Vacina</Text>
      <TextInput
        placeholder="Nome da Vacina"
        value={nomeVacina}
        onChangeText={setNomeVacina}
        style={styles.input}
      />
      
      <TextInputMask
          type="datetime"
          options={{
            format: 'DD/MM/YYYY',
          }}
          style={styles.input}
          placeholderTextColor="#999"
          value={dataVacinacao}
          placeholder="Data da Vacinação (dd/mm/aaaa)"
          onChangeText={setDataVacinacao}
        />
      <TextInput
        placeholder="Local da Vacinação"
        value={localVacina}
        onChangeText={setLocalVacina}
        style={styles.input}
      />
      <TextInput
        placeholder="Lote da Vacina"
        value={loteVacina}
        onChangeText={setLoteVacina}
        style={styles.input}
      />
      <Button title="Adicionar/Atualizar Vacina" onPress={handleAddOrUpdateVacina} />
      <FlatList
        data={vacinas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.vacinaContainer}>
            <Text style={styles.label}>Nome da Vacina:</Text>
            <Text>{item.nome_vacina}</Text>
            <Text style={styles.label}>Data da Vacinação:</Text>
            <Text>{item.data_vacinacao}</Text>
            <Text style={styles.label}>Local da Vacinação:</Text>
            <Text>{item.local_vacina}</Text>
            <Text style={styles.label}>Lote da Vacina:</Text>
            <Text>{item.lote_vacina}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleEditVacina(item.id, item.nome_vacina, item.data_vacinacao, item.local_vacina, item.lote_vacina)}>
                <Icon name="edit" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteVacina(item.id)}>
                <Icon name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  vacinaContainer: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#555',
  },
  buttons: {
   
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default App;