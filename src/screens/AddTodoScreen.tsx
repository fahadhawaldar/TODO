import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { createTodo, editTodos } from "../store/TodosSlice";
import { useRoute, RouteProp } from "@react-navigation/native";
import StyledView from "../components/StyledView";
import StyledText from "../components/StyledText";
import { darkColor, lightColor } from "../utils/color";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const AddTodoScreen = ({ navigation }: Props) => {
  const isDark = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const route =
    useRoute<RouteProp<{ params: { id: string; title: string } }, "params">>();
  const id = route.params?.id;
  const isEditing = !!id;
  const [todo, setTodo] = React.useState(route.params?.title || "");

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: isDark ? lightColor : darkColor,
      headerStyle: { backgroundColor: isDark ? darkColor : lightColor },
    });
  }, [isDark]);

  useEffect(() => {
    if (isEditing) {
      navigation.setOptions({ title: "Edit Todo" });
    }
  }, [isEditing]);

  const handleAddTodo = () => {
    if (isEditing) {
      dispatch(
        editTodos({
          title: todo,
          userId: 0,
          id: Number(id),
          completed: false,
        })
      );
      navigation.goBack();
      setTodo("");
      return;
    }

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
    <StyledView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={styles.container}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
        <StyledText style={styles.heading}>
          {isEditing ? "Edit Todo" : "Create a New Todo"}
        </StyledText>
        <TextInput
          onChangeText={setTodo}
          value={todo}
          style={[styles.input, { color: isDark ? lightColor : darkColor }]}
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
          <Text style={styles.btnText}>
            {isEditing ? "Update Todo" : "Add Todo"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </StyledView>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
    // textAlign: "center",
    letterSpacing: -0.5,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 20,

    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
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
