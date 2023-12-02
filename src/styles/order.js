import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  title: {
    color: 'lightblue',
    fontSize: 20,
    textAlign: 'center'
  },
  qrcode: {
    width: 250,
    height: 250,
    margin: 20
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  buttonBack: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 40,
  },
  buttonText: {
    color: 'white'
  }
});

export {style};