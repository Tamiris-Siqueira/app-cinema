import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { style } from '../../styles/home';

import {
  API_KEY,
  BASE_URL,
  LANGUAGE,
  POSTER_BASE_URL,
} from '../../services/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&page=1`
        );
        const data = await response.json();
        setMovies(data.results.slice(0, 6));
      } catch (error) {
        console.error('Erro ao carregar os filmes', error);
      }
    };

    fetchMovies();
  }, []);

  const navigateToTickets = (movieId) => {
    navigation.navigate('Tickets', { movieId }); // Passa o movieId como parâmetro
  };

  return (
    <ScrollView style={style.container}>
      <Text style={style.head}>Filmes em cartaz</Text>
      <Text style={style.subtitle}>Selecione um filme: </Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToTickets(item.id)}>
            <View style={style.movieContainer}>
              <Image
                style={style.poster}
                source={{ uri: `${POSTER_BASE_URL}${item.poster_path}` }}
              />
              <View style={style.movieInfo}>
                <Text style={style.title}>{item.title}</Text>
                <View style={style.ratingContainer}>
                  <Ionicons name="star" color="gold" size={20} />
                  <Text style={style.rating}>
                    {item.vote_average.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

export default Home;
