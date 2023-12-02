import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
  snackName: {
    color: 'white',
    textAlign: 'left'
  },
  snackPrice: {
    fontSize: 13,
    color: 'white',
    textAlign: 'left'
  },
  snackQuantity: {
    color: 'white',
    fontSize: 18,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24,
    color: '#FFD700',
    marginHorizontal: 10,
  },
  selectedSnacksContainer: {
    marginBottom: 20,
  },
  snackContainer: {
    fontSize: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  cartButton: {
    backgroundColor: 'blue',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  nextButtons: {
    alignItems: 'flex-end',
  },
  icones: {
    width: 30,
    height: 30,
  }
});

export {style};