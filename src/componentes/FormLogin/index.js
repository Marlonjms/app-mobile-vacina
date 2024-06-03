import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { useNavigation } from "@react-navigation/native";

export default function FormPaginaLogin() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState(null);
  const [senha, setSenha] = useState(null);

  const handleLogin = async () => {
    if (!cpf || !senha) {
      Alert.alert("Oops!", "Por favor, preencha o CPF e a senha.");
      return;
    }
  
    try {
      const response = await fetch('http://192.168.0.107:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha }),
      });
      if (response.ok) {
        await AsyncStorage.setItem('cpf', cpf);
        navigation.navigate("Home");
        Alert.alert("Logado com sucesso");
      } else if (response.status === 401) {
        Alert.alert("Oops!", "CPF ou senha incorretos. Por favor, tente novamente mais tarde.");
      } else {
        Alert.alert("Oops!", "Algo deu errado. Por favor, tente novamente mais tarde.");
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert("Oops!", "Algo deu errado. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.forms}>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType={'numeric'}
        onChangeText={setCpf}
        value={cpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        keyboardType={'default'}
        secureTextEntry={true}
        onChangeText={setSenha}
        value={senha}
      />
     
      <TouchableOpacity
        style={styles.botaoLogin} 
        onPress={handleLogin}>
        <Text style={styles.textBotaoLogin}>Login</Text>
      </TouchableOpacity >

      <TouchableOpacity
        style={styles.buttonCadastro}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.textCadastro}>Não possui conta? <Text style={styles.textCadastroDestacado}>Registre-se</Text></Text>
      </TouchableOpacity>
    </View>
  );
}


