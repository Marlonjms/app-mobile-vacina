import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function MargemSuperioHome() {
  const [image, setImage] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getCpf = async () => {
      const storedCpf = await AsyncStorage.getItem('cpf');
      setCpf(storedCpf);
      fetchImage(storedCpf);
    };
    getCpf();
  }, []);

  const fetchImage = async (cpf) => {
    try {
      const response = await fetch(`http://192.168.0.109:3000/api/imagemPerfil?cpf=${cpf}`);
      if (response.ok) {
        const data = await response.json();
        setImage(`data:image/jpeg;base64,${data.imagem}`);
      } else {
        console.log('Falha ao buscar imagem');
      }
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de permissão para acessar a galeria!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        uploadImage(result.assets[0].base64);
      }
    } catch (error) {
      console.error('Erro ao selecionar a imagem:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao selecionar a imagem');
    }
  };

  const uploadImage = async (base64Image) => {
    try {
      const response = await fetch('http://192.168.0.109:3000/api/uploadImagemPerfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, imagem: base64Image }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Imagem de perfil atualizada com sucesso');
      } else {
        Alert.alert('Erro', 'Falha ao atualizar a imagem de perfil');
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer upload da imagem');
    }
  };

  const deleteImage = async () => {
    try {
      const response = await fetch(`http://192.168.0.109:3000/api/deleteImagemPerfil?cpf=${cpf}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setImage(null);
        Alert.alert('Sucesso', 'Imagem de perfil removida com sucesso');
      } else {
        Alert.alert('Erro', 'Falha ao remover a imagem de perfil');
      }
    } catch (error) {
      console.error('Erro ao deletar a imagem:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao deletar a imagem');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="person-circle-outline" size={45} color="#d3d3d3" />
          </View>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          {image ? (
            <Image source={{ uri: image }} style={styles.modalImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="person-circle-outline" size={100} color="#d3d3d3" />
            </View>
          )}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
              <Ionicons name="pencil-outline" size={30} color="#000" />
              <Text style={styles.iconText}>Adicionar/Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteImage} style={styles.iconButton}>
              <Ionicons name="trash-outline" size={30} color="#000" />
              <Text style={styles.iconText}>Deletar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  
    container: {
      backgroundColor: "#2E9371",
      marginTop: -35,
      marginBottom: 4,
      height: 49,
      justifyContent: 'center', // Centraliza verticalmente o conteúdo do container
    
      paddingHorizontal: 20, // Adiciona um espaçamento horizontal interno
      shadowColor: "#000", // Cor da sombra
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 100, // Opacidade da sombra
      shadowRadius: 10, // Raio da sombra
      elevation: 89, // Elevação (para dispositivos Android)
    },
  profileImage: {
    width: 45, // Largura da imagem de perfil
    height: 45, // Altura da imagem de perfil
    borderRadius: 22.5, // Deixa a imagem circular
    marginLeft: 'auto', // Margem automática à esquerda
    marginRight: 'auto', // Margem automática à direita
  },
  placeholderContainer: {
    width: 45, // Largura do container do placeholder
    height: 45, // Altura do container do placeholder
    borderRadius: 22.5, // Deixa o placeholder circular
    justifyContent: 'center', // Centraliza verticalmente o conteúdo do placeholder
    alignItems: 'center', // Centraliza horizontalmente o conteúdo do placeholder
    backgroundColor: 'white', // Cor de fundo do placeholder
    marginLeft: 'auto', // Margem automática à esquerda
    marginRight: 'auto', // Margem automática à direita
  },
  modalView: {
    flex: 1, // O modal ocupa todo o espaço disponível
    justifyContent: 'center', // Centraliza verticalmente o conteúdo do modal
    alignItems: 'center', // Centraliza horizontalmente o conteúdo do modal
    marginTop: 22, // Margem superior
    backgroundColor: '#ffffff', // Cor de fundo do modal
  },
  modalImage: {
    width: 200, // Largura da imagem do modal
    height: 200, // Altura da imagem do modal
    borderRadius: 100, // Deixa a imagem do modal circular
    marginBottom: 20, // Margem inferior
  },
  iconContainer: {
    flexDirection: 'row', // Alinha os ícones em uma linha
    justifyContent: 'space-between', // Distribui os ícones uniformemente
    width: '60%', // Largura do container de ícones
  },
  iconButton: {
    alignItems: 'center', // Centraliza horizontalmente o conteúdo do botão de ícone
    marginHorizontal: 20, // Margem horizontal
  },
  iconText: {
    marginTop: 5, // Margem superior
    fontSize: 12, // Tamanho da fonte
    color: '#000', // Cor do texto
  },
  closeButton: {
    marginTop: 20, // Margem superior
    backgroundColor: '#2E9371', // Cor de fundo do botão de fechar
    padding: 10, // Padding do botão
    borderRadius: 5, // Borda arredondada
  },
  closeButtonText: {
    color: 'white', // Cor do texto
    fontSize: 16, // Tamanho da fonte
  },
});
