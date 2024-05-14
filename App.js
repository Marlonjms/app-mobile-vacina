import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import LoginScreen from './src/pages/PaginaLogin/index';
import CadastroScreen from './src/pages/PaginaCadrastoUser';
import HomeScreen from './src/pages/paginaHome';

const Stack = createStackNavigator();
// para trocar as telas, basta vc colocar a nome da tela que vc deseja ver no initialRouteName="Login", até agora tem três telas (Login, Cadastro e Home)depois abre o terminal e aperta r, para dar um reload.
// obs: a de tela cadastro winicio ainda tá terminando, dai fiz apaneas a estrutura.
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



const styles = StyleSheet.create({
  containe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop:80,
    
  },
});
