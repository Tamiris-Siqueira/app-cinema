import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { style } from '../../styles/tickets';
import {
  BASE_URL,
  API_KEY,
  LANGUAGE,
  POSTER_BASE_URL,
} from '../../services/api';

const STORAGE_KEY_TICKETS = '@ticketsData';
const STORAGE_KEY_CART = '@cartData';

const Tickets = ({ navigation, route }) => {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);
  const [movieTitle, setMovieTitle] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [movieOverview, setMovieOverview] = useState('');

  const ticketOptions = [
    { name: 'Meia Entrada', price: 20 },
    { name: 'Entrada Inteira', price: 30 },
  ];

  const saveTicketsData = async (ticketsData) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_TICKETS,
        JSON.stringify(ticketsData)
      );
    } catch (error) {
      console.error('Error saving tickets data', error);
    }
  };

  const saveCartData = async (cartData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart data', error);
    }
  };

  const loadTicketsData = async () => {
    try {
      const ticketsData = await AsyncStorage.getItem(STORAGE_KEY_TICKETS);
      return ticketsData ? JSON.parse(ticketsData) : null;
    } catch (error) {
      console.error('Error loading tickets data', error);
      return null;
    }
  };

  const handleQuantityChange = async (name, amount) => {
    setSelectedTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.name === name
          ? { ...ticket, quantity: Math.max(0, ticket.quantity + amount) }
          : ticket
      )
    );
  };

  const handleAddTicket = async (ticket) => {
    const existingTicket = selectedTickets.find(
      (item) => item.name === ticket.name
    );
    if (existingTicket) {
      handleQuantityChange(ticket.name, 1);
    } else {
      const newSelectedTickets = [
        ...selectedTickets,
        { ...ticket, quantity: 1 },
      ];
      setSelectedTickets(newSelectedTickets);
    }
  };

  const calculateTotalTicketsAmount = () =>
    selectedTickets.reduce(
      (total, ticket) => total + ticket.price * ticket.quantity,
      0
    );

  const handleGoToSnacks = () => {
    navigation.navigate('Snacks', {
      tickets: selectedTickets,
      totalAmount: calculateTotalTicketsAmount(),
    });
  };

  const handleGoToCart = async () => {
    const updatedCartData = {
      tickets: selectedTickets,
      totalAmount: calculateTotalTicketsAmount(),
    };
    await saveCartData(updatedCartData);

    navigation.navigate('Cart', { ...updatedCartData });
  };

  useEffect(() => {
    // Verifica se a quantidade de ingressos é zero e desabilita os botões
    setIsButtonsDisabled(
      selectedTickets.every((ticket) => ticket.quantity === 0)
    );
  }, [selectedTickets]);

  useEffect(() => {
    const { movieId } = route.params;
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
        );
        const data = await response.json();

        setMovieTitle(data.title);
        setPosterUrl(`${POSTER_BASE_URL}${data.poster_path}`);
        setMovieOverview(data.overview);
      } catch (error) {
        console.error('Erro ao carregar os detalhes do filme', error);
      }
    };

    fetchMovieDetails();
  }, [route.params]);

  return (
    <ScrollView style={style.container}>
      {/* Adiciona o título, imagem e sinopse do filme */}
      <View style={style.imageContainer}>
        <Image style={style.poster} source={{ uri: posterUrl }} />
        <Text style={style.movieTitle}>{movieTitle}</Text>
      </View>
      <Text style={style.movieOverview}>{movieOverview}</Text>

      <Text style={style.title}>Escolha seus Ingressos</Text>
      <View style={style.quantity}>
        {ticketOptions.map((ticket) => (
          <View key={ticket.name}>
            <Text style={style.ticketName}>{`${ticket.name}`}</Text>
            <Text style={style.ticketPrice}>{`R$${ticket.price.toFixed(
              2
            )}`}</Text>
            <View style={style.quantityButtons}>
              <TouchableOpacity
                onPress={() => handleQuantityChange(ticket.name, -1)}
                disabled={isButtonsDisabled}>
                <Text style={style.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={style.ticketQuantity}>
                {selectedTickets.find((t) => t.name === ticket.name)
                  ?.quantity || 0}
              </Text>
              <TouchableOpacity onPress={() => handleAddTicket(ticket)}>
                <Text style={style.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Text style={style.totalLabel}>
        Total: R${calculateTotalTicketsAmount().toFixed(2)}
      </Text>

      <View style={style.nextButtons}>
        {/* Botão "Ir para Snacks" desabilitado se nenhum ingresso for selecionado */}
        <TouchableOpacity
          onPress={handleGoToSnacks}
          disabled={isButtonsDisabled}>
          <Text
            style={[
              style.snackButton,
              { opacity: isButtonsDisabled ? 0.5 : 1 },
            ]}>
            Ir para Snacks
          </Text>
        </TouchableOpacity>

        {/* Botão "Ir para o Carrinho" desabilitado se nenhum ingresso for selecionado */}
        <TouchableOpacity onPress={handleGoToCart} disabled={isButtonsDisabled}>
          <Text
            style={[
              style.cartButton,
              { opacity: isButtonsDisabled ? 0.5 : 1 },
            ]}>
            Ir para o Carrinho
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Tickets;
