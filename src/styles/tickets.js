import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 10,
    backgroundColor: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'white',
  },
  movieOverview: {
    color: 'white',
  },
  poster: {
    width: 200,
    height: 300,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'white'
  },
  ticketName: {
    color: 'white',
  },
  ticketPrice: {
    fontSize: 13,
    textAlign: 'center',
    color: 'white'
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  quantityButtons: {
    fontSize: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  quantityButton: {
    fontSize: 20,
    color: '#FFD700',
    marginHorizontal: 10,
  },
  ticketQuantity: {
    fontSize: 20,
    color: 'white',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  nextButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  snackButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10
  },
  cartButton: {
    backgroundColor: 'blue',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10
  },
  selectedTicketsContainer: {
    marginBottom: 20,
  },
  selectedTicketsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

});

export {style};