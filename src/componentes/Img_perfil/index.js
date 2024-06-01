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
      const response = await fetch(`http://192.168.0.110:3000/api/imagemPerfil?cpf=${cpf}`);
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
      const response = await fetch('http://192.168.0.110:3000/api/uploadImagemPerfil', {
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
      const response = await fetch(`http://192.168.0.110:3000/api/deleteImagemPerfil?cpf=${cpf}`, {
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
    marginTop:-35,
    marginBottom:4,
    height:49,
    justifyContent: 'center',
    
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft:12,
  },
  placeholderContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#ffffff',
    
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,

  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    
  },
  iconButton: {
    alignItems: 'center',
    marginHorizontal: 20,
    
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2E9371',
    padding: 10,
    borderRadius: 5,
    
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
