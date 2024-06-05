import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons, Octicons, Ionicons } from '@expo/vector-icons';
import CadastroConsulta from '../PaginaConsultar_cadastrar_vacina';
import { ImageLogoPacienteHome, TitleHOme} from '../../componentes/Titulos_e_Logos/index';
import DadosUsuario from '../Dados_do_usuario';
import MargemSuperioHome from '../../componentes/Img_perfil/index'
const Tab = createBottomTabNavigator();

function HomeContent() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.co}>
        <MargemSuperioHome/>
        <TitleHOme />
        <ImageLogoPacienteHome />
      </View>
    </SafeAreaView>
  );
}

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#2E9371' },
        tabBarActiveTintColor: 'white',  // Cor do ícone e texto ativo
        tabBarInactiveTintColor: 'black', // Cor do ícone e texto inativo
      }}
    >
      <Tab.Screen
        name="início"
        component={HomeContent}
        options={{
          tabBarIcon: ({ color }) => <SimpleLineIcons name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cadastrar/ consultar "
        component={CadastroConsulta}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={DadosUsuario}
        options={{
          tabBarIcon: ({ color }) => <Octicons name="person" size={24} color={color} />,
        }}
      /> 
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 80, 
  },
  co: {
    backgroundColor: "#66C7D0",
    flex: 1,
  }
});
