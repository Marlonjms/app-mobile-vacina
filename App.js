import React from 'react';
import { StyleSheet, View} from 'react-native';
import Login from './src/pages/PaginaLogin/index,';





export default function App() {
  return (
    <View style={styles.containe}>
      
      {/* eu crie os componetes e importei para pasta  PaginaLogin, dai importei a Pasta PaginaLogin para exibir aqui no App.js.*/}
      <Login/>
     
      
    

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
