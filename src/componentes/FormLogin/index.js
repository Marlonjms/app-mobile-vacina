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












































