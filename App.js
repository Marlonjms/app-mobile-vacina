import React from 'react';
import { StyleSheet, View} from 'react-native';
import  Title from './src/componentes/TituloPrincipal/index.js'
import Login from './src/componentes/logoVacina/index.js';
import Form from './src/componentes/FormLogin/index.js';


export default function App() {
  return (
    <View style={styles.containe}>
      
      <Title/>
      <Login/>
      <Form/>
    

   </View>
    
  );
}

const styles = StyleSheet.create({
  containe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop:80,
    
  },
});
