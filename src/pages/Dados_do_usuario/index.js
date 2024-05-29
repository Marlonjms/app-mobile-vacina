import React from 'react';
import { View, StyleSheet, SafeAreaView,Text } from 'react-native';


const DadosUsuario = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        

        <Text>

            oi berg, tu pode construir tua tela aqui detro dessa View, ou fazer os
             componetes separados e juntalos aqui, igual na tela de login, ou de cadastro.

        </Text>

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

export default DadosUsuario;
