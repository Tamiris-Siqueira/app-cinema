import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { style } from '../../styles/cart';

const STORAGE_KEY = '@cartData';

const Cart = ({ route, navigation }) => {
  const [cartData, setCartData] = useState({
    tickets: [],
    snacks: [],
    totalAmount: 0,
  });

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setCartData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Erro ao carregar o carrinho', error);
      }
    };

    loadCartData();
  }, [route.params]);

  const handleClearCart = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar o carrinho', error);
    } finally {
      setCartData({ tickets: [], snacks: [], totalAmount: 0 });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  const handleFinishPurchase = () => {
    navigation.navigate('Order');
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Seu pedido</Text>

      <View style={style.caption}>
        <Text style={style.selectedLabel}>Ingressos</Text>
        <Text style={style.selectedLabel}>Preços</Text>
        <Text style={style.selectedLabel}>Qntd</Text>
      </View>
      {/* Lista de Ingressos Selecionados */}
      <View style={style.selectedTicketsContainer}>
        {cartData?.tickets?.length > 0 ? (
          cartData.tickets
            .filter((ticket) => ticket.quantity > 0)
            .map((ticket, index) => (
              <View style={style.info} key={index}>
                <Text style={style.name}>{`${ticket.name}`}</Text>
                <Text style={style.price}>{`R$${ticket.price.toFixed(
                  2
                )}`}</Text>
                <Text style={style.quantity}>{`${ticket.quantity}`}</Text>
              </View>
            ))
        ) : (
          <Text style={style.emptyCartMessage}>
            Nenhum ingresso selecionado.
          </Text>
        )}
      </View>

      {/* Lista de Snacks Selecionados */}
      <View style={style.selectedSnacksContainer}>
        <View style={style.caption}>
          <Text style={style.selectedLabel}>Snacks</Text>
          <Text style={style.selectedLabel}>Preços</Text>
          <Text style={style.selectedLabel}>Qntd</Text>
        </View>
        {cartData?.snacks?.length > 0 ? (
          cartData.snacks
            .filter((snack) => snack.quantity > 0)
            .map((snack, index) => (
              <>
                <View style={style.info} key={index}>
                  <Text style={style.name}>{`${snack.name}`}</Text>
                  <Text style={style.price}>{`R$${snack.price.toFixed(
                    2
                  )}`}</Text>
                  <Text style={style.quantity}>{`${snack.quantity}`}</Text>
                </View>
              </>
            ))
        ) : (
          <Text style={style.emptyCartMessage}>Nenhum snack selecionado.</Text>
        )}
      </View>

      <View style={{ height: 1, backgroundColor: 'gray', margin: 10 }} />

      {(cartData?.tickets?.length > 0 || cartData?.snacks?.length > 0) && (
        <>
          <Text style={style.totalLabel}>
            Total: R${cartData.totalAmount.toFixed(2)}
          </Text>

          <View style={style.cartButtons}>
            <TouchableOpacity onPress={handleClearCart}>
              <Text style={style.clearCartButton}>Limpar Carrinho</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFinishPurchase}>
              <Text style={style.finishButton}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;
