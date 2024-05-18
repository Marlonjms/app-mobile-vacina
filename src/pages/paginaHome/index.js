import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageLogoPacienteHome, MargemSuperioHome, TitleHOme, MargeminferioroHome } from '../../componentes/Titulos_e_Logos/index';
import { SafeAreaView } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.co}>
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
  co:{
    backgroundColor:"red",
    flex:1,
  }
});

export default Home;
