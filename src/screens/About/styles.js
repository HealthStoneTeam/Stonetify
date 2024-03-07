import { StyleSheet } from 'react-native';
import * as NB from 'native-base';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  card: {
    backgroundColor: "#282828",
    borderRadius: 10,
    padding: 40,
    width: '80%',
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    marginBottom: 10,
    alignItems: "left",
  },
  text: {
    color: "#FFFFFF",
    marginBottom: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: "#1DB954",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#282828", 
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    color: "#FFFFFF",
  },
  closeButton: {
    backgroundColor: '#1DB954',
    borderRadius: 28,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});