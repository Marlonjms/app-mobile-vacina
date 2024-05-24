import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export default function FormPaginacadastro() {
  const navigation = useNavigation();
  const [Nome, setNome] = useState(null);
  const [Email, setEmail] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [Telefone, setTelefone] = useState(null);
  const [Data, setData] = useState(null);
  const [Cidade, setCidade] = useState(null);
  const [Sexo, setSexo] = useState(null);
  const [Senha, setSenha] = useState(null);
  const [Rsenha, setRSenha] = useState(null);
  const [textButton, setTextButton] = useState("cadastrar");

  const createAlert = () => Alert.alert(
    "Oops!",
    "Verifique se todos os campos estão preenchidos."
  );
  const cadastradoeAlert = () => Alert.alert(

    "Legal!",
    "cadastrado com sucesso."
  );

  function limpaCampos() {
    if (!Nome || !Email || !cpf || !Telefone || !Data || !Cidade || !Sexo || !Senha || !Rsenha) {
      createAlert();
    } else {
    
      cadastradoeAlert();
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          keyboardType="default"
          onChangeText={setNome}
          value={Nome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={Email}
        />
        <TextInput
          style={styles.input}
          placeholder="Cpf"
          keyboardType="numeric"
          onChangeText={setCpf}
          value={cpf}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          onChangeText={setTelefone}
          value={Telefone}
        />
        <TextInputMask
          type="datetime"
          options={{
            format: 'DD/MM/YYYY',
          }}
          style={styles.input}
          placeholderTextColor="#999"
          value={Data}
          placeholder="DD/MM/YYYY"
          onChangeText={text => setData(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          keyboardType="default"
          onChangeText={setCidade}
          value={Cidade}
        />
        <TextInput
          style={styles.input}
          placeholder="Sexo"
          keyboardType="default"
          onChangeText={setSexo}
          value={Sexo}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={setSenha}
          value={Senha}
        />
        <TextInput
          style={styles.input}
          placeholder="Repita a Senha"
          secureTextEntry={true}
          onChangeText={setRSenha}
          value={Rsenha}
        />
        <TouchableOpacity
          style={styles.botaoLogin}
          onPress={limpaCampos}
        >
          <Text style={styles.textBotaoLogin}>{textButton}</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.botaoVoltar}
         onPress={() => navigation.navigate("Login")}
>
        <Text style={styles.textBotaoLogin}>Voltar</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  input: {
    width: windowWidth * 0.8, // Ajusta a largura para 80% da largura da tela
    backgroundColor: "#FFFFFF",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 20, // Adiciona espaçamento horizontal
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 17,
  },
  botaoLogin: {
    width: windowWidth * 0.5, // Ajusta a largura para 50% da largura da tela
    alignItems: "center",
    backgroundColor: "#2E9371",
    height: 44,
    marginVertical: 20,
    justifyContent: "center",
    borderRadius: 17,
  },
  botaoVoltar: {
    width: windowWidth * 0.5, // Ajusta a largura para 50% da largura da tela
    alignItems: "center",
    backgroundColor: "blue",
    height: 44,
    marginVertical: 20,
    justifyContent: "center",
    borderRadius: 17,
  },
  textBotaoLogin: {
    color: "#FFFFFF",
  },
});
