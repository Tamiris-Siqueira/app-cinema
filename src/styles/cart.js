import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
    backgroundColor: 'black',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  name: {
    color: 'white',
    textAlign: 'center',
  },
  price: {
    color: 'white',
    textAlign: 'center',
  },
  quantity: {
    color: 'white',
    textAlign: 'center',
  },
  caption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartButtons:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  clearCartButton: {
    backgroundColor: 'red',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  }, 
  finishButton: {
    backgroundColor: 'green',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  }, 
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectedLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  emptyCartMessage: {
    fontSize: 16,
    color: 'gray',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    color: 'white',
    textAlign: 'right',
  },

});

export {style};