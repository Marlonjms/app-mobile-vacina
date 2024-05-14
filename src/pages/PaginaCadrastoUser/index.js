import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageLogo } from '../../componentes/Titulos_e_Logos/index';
import { Title } from '../../componentes/Titulos_e_Logos/index';
import { SafeAreaView } from 'react-native';

const CadastroScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title />
        <ImageLogo />
      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 80, // Ajuste o valor conforme necessário
  },
});

export default CadastroScreen;
