import { useRef, useState, useContext } from "react";
import { Icon, AlertDialog, Button } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";

export default function Logout({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const { logout } = useContext(AuthContext);

  async function loggingOut() {
    try {
      await logout();
      onClose();
      navigation.navigate("Login");
    } catch (error) {
      console.log("Alguma coisa no logout deu ruim");
    }
  }

  return (
    <>
      <Icon
        as={MaterialCommunityIcons}
        name="logout"
        size={10}
        color={"blue.400"}
        onPress={() => setIsOpen(!isOpen)}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Logout</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure that you want to leave ?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant={"unstyled"} onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button bg="#1DB954" onPress={loggingOut}>
                Confirm
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}
