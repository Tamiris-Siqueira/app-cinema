import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { style } from '../../styles/snacks';
import { BASE_URL } from '../../services/api';

const STORAGE_KEY = '@cartData';

const Snacks = ({ route, navigation }) => {
  const { params: snackParams = {} } = route || {};
  const { tickets = [], totalAmount: totalTicketsAmount } = snackParams;

  const saveCartData = async (cartData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
    } catch (error) {
      console.error('Erro ao salvar o carrinho', error);
    }
  };

  const loadCartData = async () => {
    try {
      const cartData = await AsyncStorage.getItem(STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : null;
    } catch (error) {
      console.error('Erro ao carregar o carrinho', error);
      return null;
    }
  };

  const handleQuantityChange = async (snack, amount) => {
    const newSnacks = [...snacks];
    const snackIndex = newSnacks.findIndex((item) => item.name === snack.name);

    if (snackIndex !== -1) {
      newSnacks[snackIndex].quantity = Math.max(
        0,
        newSnacks[snackIndex].quantity + amount
      );
      setSnacks(newSnacks);
      await saveCartData({ snacks: newSnacks, tickets });
    }
  };

  const handleRemoveSnack = async (index) => {
    const newSnacks = [...snacks];
    newSnacks.splice(index, 1);
    setSnacks(newSnacks);
    await saveCartData({ snacks: newSnacks, tickets });
  };

  const handleAddSnack = async (snack) => {
    const existingSnack = snacks.find((item) => item.name === snack.name);
    if (existingSnack) {
      handleQuantityChange(existingSnack, 1);
    } else {
      const newSnacks = [...snacks, { ...snack, quantity: 1 }];
      setSnacks(newSnacks);
      await saveCartData({ snacks: newSnacks, tickets });
    }
  };

  const handleGoToCart = async () => {
    const totalSnacksAmount = calculateTotalSnacksAmount();
    const totalAmount = totalTicketsAmount + totalSnacksAmount;

    const updatedCartData = { snacks, tickets, totalAmount };

    // Atualizar e salvar os dados do carrinho
    await saveCartData(updatedCartData);

    navigation.navigate('Cart', updatedCartData);
  };

  const [snacks, setSnacks] = useState([]);
  const snackOptions = [
    {
      uri: 'https://cdn-icons-png.flaticon.com/128/5675/5675503.png',
      name: 'Pipoca Pequena',
      price: 7,
    },
    {
      uri: 'https://cdn-icons-png.flaticon.com/128/5675/5675503.png',
      name: 'Pipoca Média',
      price: 10,
    },
    {
      uri: 'https://cdn-icons-png.flaticon.com/128/5675/5675503.png',
      name: 'Pipoca Grande',
      price: 15,
    },
    {
      uri: 'https://cdn-icons-png.flaticon.com/128/5643/5643871.png',
      name: 'Refrigerante',
      price: 4,
    },
    {
      uri: 'https://cdn-icons-png.flaticon.com/128/3132/3132705.png',
      name: 'Fini',
      price: 3,
    },
    {
      uri: 'https://cdn-icons-png.flaticon.com/128/7178/7178255.png',
      name: 'Bombom',
      price: 5,
    },
  ];

  useEffect(() => {
    const selectedSnacks = route.params?.snacks;
    if (selectedSnacks) {
      setSnacks(selectedSnacks);
    }
  }, [route.params?.snacks]);

  const calculateTotalSnacksAmount = () => {
    return snacks.reduce(
      (total, snack) => total + snack.price * snack.quantity,
      0
    );
  };

  return (
    <ScrollView style={style.container}>
      <Text style={style.title}>Escolha seus Snacks</Text>

      {/* Lista de seleção de snacks */}
      <View style={style.selectedSnacksContainer}>
        {snackOptions.map((snack, index) => (
          <View key={index} style={style.snackContainer}>
            <Image style={style.icones} source={{ uri: `${snack.uri}` }} />
            <View>
              <Text style={style.snackName}>{`${snack.name}`}</Text>
              <Text style={style.snackPrice}>{`R$${snack.price.toFixed(
                2
              )}`}</Text>
            </View>
            <View style={style.quantityButtons}>
              <TouchableOpacity onPress={() => handleQuantityChange(snack, -1)}>
                <Text style={style.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={style.snackQuantity}>
                {snacks.find((s) => s.name === snack.name)?.quantity || 0}
              </Text>
              <TouchableOpacity onPress={() => handleAddSnack(snack)}>
                <Text style={style.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Text style={style.totalLabel}>
        Total da Compra: R$
        {(totalTicketsAmount + calculateTotalSnacksAmount()).toFixed(2)}
      </Text>

      <View style={style.nextButtons}>
        <TouchableOpacity onPress={handleGoToCart}>
          <Text style={style.cartButton}>Ir para o Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Snacks;
