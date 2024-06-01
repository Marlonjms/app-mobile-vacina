import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilUsuario = () => {
  const [cpf, setCpf] = useState("");
  const [usuario, setUsuario] = useState({
    cpf: "",
    nome: "",
    email: "",
    data_nascimento: "",
    telefone: "",
    sexo: "",
    cidade: ""
  });

  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async () => {
    try {
      const cpfArmazenado = await AsyncStorage.getItem('cpf');
      if (cpfArmazenado) {
        setCpf(cpfArmazenado);
        buscarUsuario(cpfArmazenado);
      } else {
        Alert.alert("Oops!", "CPF não encontrado. Por favor, faça o login primeiro.");
      }
    } catch (error) {
      console.error('Erro ao carregar CPF armazenado:', error);
    }
  };

  const buscarUsuario = async (cpf) => {
    try {
      const response = await fetch(`http://192.168.0.110:3000/api/usuario/${cpf}`);
      if (response.ok) {
        const data = await response.json();
        setUsuario(data);
      } else {
        Alert.alert("Erro", "Usuário não encontrado.");
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      Alert.alert("Erro", "Algo deu errado. Por favor, tente novamente mais tarde.");
    }
  };

  const salvarEdicao = async () => {
    Alert.alert(
      "Confirmar",
      "Tem certeza que deseja salvar as alterações?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => confirmarSalvar() }
      ]
    );
  };

  const confirmarSalvar = async () => {
    try {
      const response = await fetch(`http://192.168.0.110:3000/api/usuario/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Usuário editado com sucesso.");
        carregarUsuario();
      } else {
        Alert.alert("Erro", "Erro ao editar usuário.");
      }
    } catch (error) {
      console.error('Erro ao salvar informações editadas do usuário:', error);
      Alert.alert("Erro", "Algo deu errado. Por favor, tente novamente mais tarde.");
    }
  };

  const handleChange = (key, value) => {
    setUsuario(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        editable={false}
      />
      <Text style={styles.titulo}>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange("nome", value)}
        value={usuario.nome}
      />
      <Text style={styles.titulo}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange("email", value)}
        value={usuario.email}
      />
      <Text style={styles.titulo}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange("data_nascimento", value)}
        value={usuario.data_nascimento}
      />
      <Text style={styles.titulo}>Telefone</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange("telefone", value)}
        value={usuario.telefone}
      />
      <Text style={styles.titulo}>Sexo</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange("sexo", value)}
        value={usuario.sexo}
      />
      <Text style={styles.titulo}>Cidade</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => handleChange("cidade", value)}
        value={usuario.cidade}
      />
      
      <TouchableOpacity style={styles.botaoEditar} onPress={salvarEdicao}>
        <Text style={styles.textoBotaoEditar}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  botaoEditar: {
    backgroundColor: "#2E9371",
    padding: 10,
    borderRadius: 5,
    marginTop: 20
  },
  textoBotaoEditar: {
    color: "#FFF"
  }
});

export default PerfilUsuario;
