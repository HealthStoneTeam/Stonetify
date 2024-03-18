import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 10,
  },
  card: {
    backgroundColor: "#282828",
    borderRadius: 10,
    padding: 20,
    width: '90%', 
    marginBottom: 10, 
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    marginBottom: 10,
    textAlign: "left", 
  },
  text: {
    color: "#FFFFFF",
    marginBottom: 30,
    fontSize: 20, 
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: "#1DB954",
    textAlign: "center",
    fontSize: 20, 
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    padding: 10, 
  },
  modalView: {
    margin: 20,
    backgroundColor: "#282828", 
    borderRadius: 20,
    padding: 20,
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
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#1DB954',
    borderRadius: 28,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    width: '80%', 
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18, 
  }
});