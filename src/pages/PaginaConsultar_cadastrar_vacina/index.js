import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Keyboard, Alert, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Modal from "react-native-modal";
import axios from 'axios';

const CadastroConsulta = () => {
  const [vacinas, setVacinas] = useState([]);
  const [novaVacina, setNovaVacina] = useState("");
  const [novaData, setNovaData] = useState("");
  const [novoLocal, setNovoLocal] = useState("");
  const [novoLote, setNovoLote] = useState("");
  const [contadorID, setContadorID] = useState(1);
  const [isModalVisivel, setModalVisivel] = useState(false);
  const [vacinaAtual, setVacinaAtual] = useState(null);
  const [editarNomeVacina, setEditarNomeVacina] = useState("");
  const [editarDataVacina, setEditarDataVacina] = useState("");
  const [editarLocalVacina, setEditarLocalVacina] = useState("");
  const [editarLoteVacina, setEditarLoteVacina] = useState("");

  async function adicionarVacina() {
    if (novaVacina === "" || novaData === "" || novoLocal === "" || novoLote === "") {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.110:3000/api/insert', {
        nome_vacina: novaVacina,
        data_vacinacao: novaData,
        local_vacina: novoLocal,
        lote_vacina: novoLote
      });
      const vacina = { id: contadorID.toString().padStart(3, '0'), nome: novaVacina, data: novaData, local: novoLocal, lote: novoLote };
      setVacinas([...vacinas, vacina]);
      setNovaVacina("");
      setNovaData("");
      setNovoLocal("");
      setNovoLote("");
      setContadorID(contadorID + 1);
      Keyboard.dismiss();
      Alert.alert("Sucesso", response.data);
    } catch (error) {
      Alert.alert("Erro", "Algo deu errado ao adicionar a vacina!");
      console.error(error);
    }
  }

  async function removerVacina(item) {
    Alert.alert(
      "Deletar Vacina",
      "Tem certeza que deseja remover esta anotação?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.0.110:3000/api/delete/${item.id}`);
              setVacinas(vacinas.filter(vacina => vacina.id !== item.id));
              Alert.alert("Sucesso", "Vacina removida com sucesso!");
            } catch (error) {
              Alert.alert("Erro", "Algo deu errado ao remover a vacina!");
              console.error(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  }

  function abrirModal(vacina) {
    setVacinaAtual(vacina);
    setEditarNomeVacina(vacina.nome);
    setEditarDataVacina(vacina.data);
    setEditarLocalVacina(vacina.local);
    setEditarLoteVacina(vacina.lote);
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
    setVacinaAtual(null);
    setEditarNomeVacina("");
    setEditarDataVacina("");
    setEditarLocalVacina("");
    setEditarLoteVacina("");
  }

  async function salvarEdicaoVacina() {
    if (editarNomeVacina === "" || editarDataVacina === "" || editarLocalVacina === "" || editarLoteVacina === "") {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.put(`http://192.168.0.110:3000/${vacinaAtual.id}`, {
        nome_vacina: editarNomeVacina,
        data_vacinacao: editarDataVacina,
        local_vacina: editarLocalVacina,
        lote_vacina: editarLoteVacina
      });
      const vacinasAtualizadas = vacinas.map(vacina => {
        if (vacina.id === vacinaAtual.id) {
          return { ...vacina, nome: editarNomeVacina, data: editarDataVacina, local: editarLocalVacina, lote: editarLoteVacina };
        }
        return vacina;
      });

      setVacinas(vacinasAtualizadas);
      fecharModal();
      Alert.alert("Sucesso", response.data);
    } catch (error) {
      Alert.alert("Erro", "Algo deu errado ao salvar a edição!");
      console.error(error);
    }
  }

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await axios.get('http://localhost:3000/api/consultas');
        setVacinas(response.data);
        setContadorID(response.data.length + 1);
      } catch (error) {
        Alert.alert("Erro", "Algo deu errado ao carregar os dados!");
        console.error(error);
      }
    }
    carregarDados();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.corpo}>
          <FlatList
            style={styles.lista}
            data={vacinas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.containerVacina}>
                <Text style={styles.texto}>{item.nome}</Text>
                <Text style={styles.texto}>{item.data}</Text>
                <Text style={styles.texto}>{item.local}</Text>
                <Text style={styles.texto}>{item.lote}</Text>
                <TouchableOpacity onPress={() => abrirModal(item)}>
                  <MaterialIcons name="edit" size={25} color="#1c6cce" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removerVacina(item)}>
                  <Ionicons name="trash" size={25} color="#ff0000" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={styles.formulario}>
          <TextInput
            style={styles.entrada}
            placeholderTextColor="#999"
            autoCorrect={true}
            value={novaVacina}
            placeholder="Nome da vacina"
            maxLength={50}
            onChangeText={(text) => setNovaVacina(text)}
          />
          <TextInputMask
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY"
            }}
            style={styles.entrada}
            placeholderTextColor="#999"
            value={novaData}
            placeholder="Data da vacina"
            onChangeText={(text) => setNovaData(text)}
          />
          <TextInput
            style={styles.entrada}
            placeholderTextColor="#999"
            autoCorrect={true}
            value={novoLocal}
            placeholder="Local da vacina"
            maxLength={50}
            onChangeText={(text) => setNovoLocal(text)}
          />
          <TextInput
            style={styles.entrada}
            placeholderTextColor="#999"
            autoCorrect={true}
            value={novoLote}
            placeholder="Lote da vacina"
            maxLength={50}
            onChangeText={(text) => setNovoLote(text)}
          />
          <TouchableOpacity style={styles.botao} onPress={adicionarVacina}>
            <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>
              Adicionar
            </Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={isModalVisivel}>
          <View style={styles.conteudoModal}>
            <Text style={styles.tituloModal}>Editar Vacina</Text>
            <TextInput
              style={styles.entrada}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={editarNomeVacina}
              placeholder="Nome da vacina"
              maxLength={50}
              onChangeText={text => setEditarNomeVacina(text)}
            />
            <TextInputMask
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY"
              }}
              style={styles.entrada}
              placeholderTextColor="#999"
              value={editarDataVacina}
              placeholder="DD/MM/YYYY"
              onChangeText={text => setEditarDataVacina(text)}
            />
            <TextInput
              style={styles.entrada}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={editarLocalVacina}
              placeholder="Local da vacina"
              maxLength={50}
              onChangeText={text => setEditarLocalVacina(text)}
            />
            <TextInput
              style={styles.entrada}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={editarLoteVacina}
              placeholder="Lote da vacina"
              maxLength={50}
              onChangeText={text => setEditarLoteVacina(text)}
            />
            <View style={styles.botoesModal}>
              <TouchableOpacity style={styles.botaoModal} onPress={salvarEdicaoVacina}>
                <Text style={styles.textoBotaoModal}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoModal} onPress={fecharModal}>
                <Text style={styles.textoBotaoModal}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: "#FFF"
  },
  corpo: {
    flex: 1
  },
  formulario: {
    padding: 0,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "column",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee"
  },
  entrada: {
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 5
  },
  botao: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 4,
    marginTop: 10
  },
  lista: {
    flex: 1,
    marginTop: 5
  },
  texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
    flex: 1
  },
  containerVacina: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee"
  },
  conteudoModal: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  botoesModal: {
    flexDirection: "row",
    marginTop: 20
  },
  botaoModal: {
    backgroundColor: "#1c6cce",
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 10
  },
  textoBotaoModal: {
    color: "white",
    fontSize: 16
  }
});

export default CadastroConsulta;
