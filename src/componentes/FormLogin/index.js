import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './style';

export default function FormPaginaLogin({ navigation }) {
  const [cpf, setCpf] = useState(null);
  const [senha, setSenha] = useState(null);
  const [textButton, setTextButton] = useState("Login");

  const createAlert = () => Alert.alert(
    "Oops!",
    "Verifique se o campo Cpf e senha estão preenchidos."
  );

  const homeImproviso = () => Alert.alert(
    "Deu certo"
  );

  function limpaCampos() {
    if (!cpf || !senha) {
      createAlert();
    } else {
      // aqui é para chamar a tela home...
      homeImproviso();
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
        onPress={() => navigation.navigate("Cadastro")} // Navegar para a tela de cadastro
      >
        <Text style={styles.textCadastro}>Não possui conta? <Text style={styles.textCadastroDestacado}>Registre-se</Text></Text>
      </TouchableOpacity>
    </View>
  );
}












































