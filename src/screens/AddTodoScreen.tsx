import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { createTodo } from "../store/TodosSlice";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const AddTodoScreen = ({ navigation }: Props) => {
  const [todo, setTodo] = React.useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todo.trim()) {
      dispatch(
        createTodo({
          title: todo,
          userId: 0,
          id: 0,
          completed: false,
        })
      );
      navigation.goBack();
      setTodo("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <Text style={styles.heading}>Create a New Todo</Text>
      <TextInput
        onChangeText={setTodo}
        value={todo}
        style={styles.input}
        ref={(node) => node && node.focus()}
        placeholder="What would you like to do?"
        placeholderTextColor="#888"
        clearButtonMode="while-editing"
        returnKeyType="done"
      />
      <TouchableOpacity
        onPress={handleAddTodo}
        style={[
          styles.btn,
          todo.trim() ? styles.btnActive : styles.btnInactive,
        ]}
        disabled={!todo.trim()}
      >
        <Text style={styles.btnText}>Add Todo</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 50, // Add some bottom padding
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "white",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  btn: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnActive: {
    backgroundColor: "#4CAF50",
  },
  btnInactive: {
    backgroundColor: "#A0A0A0",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
