import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import { useNavigation } from "@react-navigation/native";

export default function FormPaginaLogin() {

  const navigation = useNavigation();
  const [cpf, setCpf] = useState(null);
  const [senha, setSenha] = useState(null);
  const [textButton, setTextButton] = useState("Login");

  const handleLogin = () => {
    if (!cpf || !senha) {
      Alert.alert(
        "Oops!",
        "Por favor, preencha o CPF e a senha."
      );
      return;
    }
  
    fetch('http://192.168.0.110:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cpf, senha }),
    })
    .then(response => {
      if (response.ok) {
        navigation.navigate("Home");
        Alert.alert(
          "logado com sucesso"
        );
      } else if (response.status === 401) {
        Alert.alert(
          "Oops!",
          "CPF ou senha incorretos. Por favor, tente novamente mais tarde."
        );
      } else {
        Alert.alert(
          "Oops!",
          "Algo deu errado. Por favor, tente novamente mais tarde."
        );
      }
    })
    .catch(error => {
      console.error('Erro ao fazer login:', error);
      Alert.alert(
        "Oops!",
        "Algo deu errado. Por favor, tente novamente mais tarde."
      );
    });
  }
  

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
        <Text style={styles.textBotaoLogin}>{textButton}</Text>
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









/*

import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import { useNavigation } from "@react-navigation/native";



export default function FormPaginaLogin() {

  const navigation = useNavigation();
  const [cpf, setCpf] = useState(null);
  const [senha, setSenha] = useState(null);
  const [textButton, setTextButton] = useState("Login");

  const createAlert = () => Alert.alert(
    "Oops!",
    "Verifique se o campo Cpf e senha estão preenchidos."
  );

  function limpaCampos() {
    if (!cpf || !senha) {
      createAlert();
    } else {
      navigation.navigate("Home");
    }
  }

  return (
    <View style={styles.forms}>
      <TextInput
        style={styles.input}
        placeholder="cpf"
        keyboardType={'numeric'}
        onChangeText={setCpf}
        value={cpf}
      />
      <TextInput
        style={styles.input}
        placeholder="senha"
        keyboardType={'default'}
        onChangeText={setSenha}
        value={senha}
      />
     
      <TouchableOpacity
        style={styles.botaoLogin} 
        onPress={() => limpaCampos()}>
        <Text style={styles.textBotaoLogin}>{textButton}</Text>
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





*/
































