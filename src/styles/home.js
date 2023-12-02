import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
  },
  head: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  subtitle: {
    color: 'white', 
    marginTop: 10
  },
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    color: 'white'
  },
});

export {style};