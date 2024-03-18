import { useRef, useState } from "react";
import { Text } from "react-native";
import { Icon, AlertDialog, Button } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";

export default function Logout() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

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
              <Button bg="#1DB954" onPress={onClose}>
                Confirm
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}
