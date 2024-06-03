import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Componente de Input para Formulário
 * @param {string} label - O rótulo do campo.
 * @param {string} value - O valor do campo.
 * @param {function} onChangeText - Função chamada quando o texto é alterado.
 * @param {boolean} [editable=true] - Define se o campo é editável.
 */
const FormInput = ({ label, value, onChangeText, editable = true }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  </View>
);

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
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.0.107:3000/api/usuario/${cpf}`);
      if (response.ok) {
        const data = await response.json();
        setUsuario(data);
      } else {
        Alert.alert("Erro", "Usuário não encontrado.");
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      Alert.alert("Erro", "Algo deu errado. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const salvarEdicao = () => {
    Alert.alert(
      "Confirmar",
      "Tem certeza que deseja salvar as alterações?",
      [
        { text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel" },
        { text: "Sim", onPress: confirmarSalvar }
      ]
    );
  };

  const confirmarSalvar = async () => {
    const { nome, email, data_nascimento, telefone, sexo, cidade } = usuario;
    if (!nome || !email || !data_nascimento || !telefone || !sexo || !cidade) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://192.168.0.107:3000/api/usuario/${cpf}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Usuário editado com sucesso.");
        setIsEditing(false);
        carregarUsuario();
      } else {
        Alert.alert("Erro", "Erro ao editar usuário.");
      }
    } catch (error) {
      console.error('Erro ao salvar informações editadas do usuário:', error);
      Alert.alert("Erro", "Algo deu errado. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setUsuario(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#2E9371" />
      </View>
    );
  }

  const { nome, email, data_nascimento, telefone, sexo, cidade } = usuario;

  return (
    <View style={styles.container}>
      <FormInput label="CPF" value={cpf} editable={false} />
      <FormInput label="Nome" value={nome} onChangeText={value => handleChange("nome", value)} editable={isEditing} />
      <FormInput label="Email" value={email} onChangeText={value => handleChange("email", value)} editable={isEditing} />
      <FormInput label="Data de Nascimento" value={data_nascimento} onChangeText={value => handleChange("data_nascimento", value)} editable={isEditing} />
      <FormInput label="Telefone" value={telefone} onChangeText={value => handleChange("telefone", value)} editable={isEditing} />
      <FormInput label="Sexo" value={sexo} onChangeText={value => handleChange("sexo", value)} editable={isEditing} />
      <FormInput label="Cidade" value={cidade} onChangeText={value => handleChange("cidade", value)} editable={isEditing} />

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={styles.botaoSalvar} onPress={confirmarSalvar}>
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCancelar} onPress={() => setIsEditing(false)}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.botaoEditar} onPress={() => setIsEditing(true)}>
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  botaoEditar: {
    backgroundColor: "#2E9371",
    padding: 10,
    borderRadius: 25,
    width: '45%'
  },
  botaoSalvar: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 25,
    width: '45%'
  },
  botaoCancelar: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 25,
    width: '45%'
  },
  textoBotao: {
    color: "#FFF",
    textAlign: 'center'
  }
});

export default PerfilUsuario;
