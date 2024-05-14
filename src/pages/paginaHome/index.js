import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageLogoPacienteHome, MargemSuperioHome, TitleHOme, MargeminferioroHome } from '../../componentes/Titulos_e_Logos/index';
import { SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MargemSuperioHome/>
        <TitleHOme />
        <ImageLogoPacienteHome />
        < MargeminferioroHome/>
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

export default HomeScreen;
