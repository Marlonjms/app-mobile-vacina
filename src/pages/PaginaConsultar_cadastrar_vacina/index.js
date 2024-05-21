
import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Keyboard, Alert, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Modal from "react-native-modal";

const CadastroConsulta = () => {
  // Estado inicial das tarefas, novas tarefas, novas datas, novos locais, novo lote, contador de ID, visibilidade do modal, tarefa atual, edições de tarefa
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [novaData, setNovaData] = useState("");
  const [novoLocal, setNovoLocal] = useState("");
  const [novoLote, setNovoLote] = useState(""); // Novo estado para o lote da vacina
  const [contadorID, setContadorID] = useState(1);
  const [isModalVisivel, setModalVisivel] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState(null);
  const [editarNomeTarefa, setEditarNomeTarefa] = useState("");
  const [editarDataTarefa, setEditarDataTarefa] = useState("");
  const [editarLocalTarefa, setEditarLocalTarefa] = useState("");
  const [editarLoteTarefa, setEditarLoteTarefa] = useState(""); // Novo estado para edição do lote

  // Função para adicionar uma nova tarefa
  async function adicionarTarefa() {
    if (novaTarefa === "" || novaData === "" || novoLocal === "" || novoLote === "") {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const busca = tarefas.filter(tarefa => tarefa.nome === novaTarefa);

    if (busca.length !== 0) {
      Alert.alert("Atenção", "Nome da vacina repetida!");
      return;
    }

    const tarefa = { id: contadorID.toString().padStart(3, '0'), nome: novaTarefa, data: novaData, local: novoLocal, lote: novoLote };
    setTarefas([...tarefas, tarefa]);
    setNovaTarefa("");
    setNovaData("");
    setNovoLocal("");
    setNovoLote(""); // Limpar o campo de lote após adicionar
    setContadorID(contadorID + 1);
    Keyboard.dismiss();
  }

  // Função para remover uma tarefa
  async function removerTarefa(item) {
    Alert.alert(
      "Deletar Tarefa",
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
          onPress: () => setTarefas(tarefas.filter(tarefa => tarefa.id !== item.id))
        }
      ],
      { cancelable: false }
    );
  }

  // Função para abrir o modal de edição
  function abrirModal(tarefa) {
    setTarefaAtual(tarefa);
    setEditarNomeTarefa(tarefa.nome);
    setEditarDataTarefa(tarefa.data);
    setEditarLocalTarefa(tarefa.local);
    setEditarLoteTarefa(tarefa.lote); // Adicionar lote ao modal de edição
    setModalVisivel(true);
  }

  // Função para fechar o modal de edição
  function fecharModal() {
    setModalVisivel(false);
    setTarefaAtual(null);
    setEditarNomeTarefa("");
    setEditarDataTarefa("");
    setEditarLocalTarefa("");
    setEditarLoteTarefa(""); // Limpar o campo de lote ao fechar o modal
  }

  // Função para salvar a tarefa editada
  function salvarEdicaoTarefa() {
    if (editarNomeTarefa === "" || editarDataTarefa === "" || editarLocalTarefa === "" || editarLoteTarefa === "") {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const tarefasAtualizadas = tarefas.map(tarefa => {
      if (tarefa.id === tarefaAtual.id) {
        return { ...tarefa, nome: editarNomeTarefa, data: editarDataTarefa, local: editarLocalTarefa, lote: editarLoteTarefa };
      }
      return tarefa;
    });

    setTarefas(tarefasAtualizadas);
    fecharModal();
  }

  // Efeito para carregar dados salvos
  useEffect(() => {
    async function carregarDados() {
      const tarefasSalvas = await AsyncStorage.getItem("tarefas");
      const contadorSalvo = await AsyncStorage.getItem("contadorID");

      if (tarefasSalvas) {
        setTarefas(JSON.parse(tarefasSalvas));
      }
      if (contadorSalvo) {
        setContadorID(JSON.parse(contadorSalvo));
      }
    }
    carregarDados();
  }, []);

  // Efeito para salvar dados no AsyncStorage
  useEffect(() => {
    async function salvarDados() {
      AsyncStorage.setItem("tarefas", JSON.stringify(tarefas));
      AsyncStorage.setItem("contadorID", JSON.stringify(contadorID));
    }
    salvarDados();
  }, [tarefas, contadorID]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior="padding"
      style={{ flex: 1 }}
      enabled={Platform.OS === "ios"}
    >

      <View style={styles.container}>
        <View style={styles.corpo}>

          <FlatList
            data={tarefas}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.lista}

            renderItem={({ item }) => (
              <View style={styles.containerTarefa}>
                
                <Text style={styles.texto}>{item.id} - {item.nome} - {item.data} - {item.local} - {item.lote}</Text>
                <TouchableOpacity onPress={() => removerTarefa(item)}> 
                  <MaterialIcons name="delete-forever" size={25} color="#f64c75" style={{ marginRight: 10 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => abrirModal(item)}>
                  <MaterialIcons name="edit" size={25} color="#1c6cce"/>
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
            value={novaTarefa}
            placeholder="Adicione nome da vacina"
            maxLength={25}
            onChangeText={text => setNovaTarefa(text)}
          />
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            style={styles.entrada}
            placeholderTextColor="#999"
            value={novaData}
            placeholder="DD/MM/YYYY"
            onChangeText={text => setNovaData(text)}
          />
          <TextInput
            style={styles.entrada}
            placeholderTextColor="#999"
            autoCorrect={true}
            value={novoLocal}
            placeholder="Adicione local da vacina"
            maxLength={50}
            onChangeText={text => setNovoLocal(text)}
          />
          <TextInput
            style={styles.entrada}
            placeholderTextColor="#999"
            autoCorrect={true}
            value={novoLote}
            placeholder="Adicione lote da vacina"
            maxLength={50}
            onChangeText={text => setNovoLote(text)}
          />
          
          <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Modal isVisible={isModalVisivel}>
          <View style={styles.conteudoModal}>
            <Text style={styles.tituloModal}>Editar Tarefa</Text>
            <TextInput
              style={styles.entrada}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={editarNomeTarefa}
              placeholder="Nome da vacina"
              maxLength={25}
              onChangeText={text => setEditarNomeTarefa(text)}
            />
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }}
              style={styles.entrada}
              placeholderTextColor="#999"
              value={editarDataTarefa}
              placeholder="DD/MM/YYYY"
              onChangeText={text => setEditarDataTarefa(text)}
            />
            <TextInput
              style={styles.entrada}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={editarLocalTarefa}
              placeholder="Local da vacina"
              maxLength={50}
              onChangeText={text => setEditarLocalTarefa(text)}
            />
            <TextInput
              style={styles.entrada}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={editarLoteTarefa}
              placeholder="Lote da vacina"
              maxLength={50}
              onChangeText={text => setEditarLoteTarefa(text)}
            />
            <View style={styles.botoesModal}>
              <TouchableOpacity style={styles.botaoModal} onPress={salvarEdicaoTarefa}>
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
  containerTarefa: {
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
