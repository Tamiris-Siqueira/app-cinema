import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { style } from '../../styles/order';

const Order = ({ navigation }) => {
  const backToHome = async () => {
    // Limpar o AsyncStorage
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar o async storage', error);
    }

    // Redirecionar para a tela Home
    navigation.navigate('Home');
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Pedido concluído com sucesso!</Text>
      <Image
        style={style.qrcode}
        source={{
          uri: 'https://chart.googleapis.com/chart?cht=qr&chl=O%20seu%20filme%20j%C3%A1%20vai%20come%C3%A7ar%2C%20corra!&chs=180x180&choe=UTF-8&chld=L|2',
        }}
      />
      <Text style={style.text}>
        Faça uma captura de tela do QR acima e apresente no horário da sua sessão.
      </Text>
      <View style={style.bottomContainer}>
        <TouchableOpacity style={style.buttonBack} onPress={backToHome}>
          <Text style={style.buttonText}>Voltar para o início</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Order;
