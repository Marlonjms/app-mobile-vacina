import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ImageLogo, Title2 } from '../../componentes/Titulos_e_Logos';
import FormPaginacadastro from '../../componentes/FormCadastro';

const Cadastro = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Title2 />
        <ImageLogo />
        <FormPaginacadastro />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80, // Ajuste o valor conforme necessário
  },
});

export default Cadastro;
