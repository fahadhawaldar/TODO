import { Alert, StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { TodosState, toggleCompleted, deleteTodos } from "../store/TodosSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { accentColor, darkColor, lightColor } from "../utils/color";
import { formatDate } from "../utils/helpers";

type Props = {
  todo: TodosState;
};

const Todo = ({ todo }: Props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const isDark = useColorScheme() === "dark";

  const handleDelete = () => {
    Alert.alert("Are you sure?", "Do you want to delete this todo?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        style: "destructive",
        text: "Yes",
        onPress: () => {
          dispatch(deleteTodos(todo.id));
        },
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate("AddTodo", { id: todo.id, title: todo.title });
  };

  const handleComplete = () => {
    dispatch(toggleCompleted(todo.id));
  };

  return (
    <View style={styles.todoContainer}>
      <View style={styles.checkBox}>
        <BouncyCheckbox
          size={25}
          fillColor="green"
          text={todo.title}
          iconStyle={{ borderColor: "green" }}
          textStyle={{
            textDecorationLine: todo.completed ? "line-through" : "none",
            color: isDark ? lightColor : darkColor,
          }}
          onPress={handleComplete}
          isChecked={todo.completed}
          style={{ flex: 1 }}
        />
        <View style={styles.icons}>
          <Ionicons
            onPress={handleEdit}
            name="create"
            size={24}
            color="#344CB7"
          />
          <Ionicons
            onPress={handleDelete}
            name="trash"
            size={24}
            color="#BF3131"
          />
        </View>
      </View>
      <View style={styles.timestampContainer}>
        <Text
          style={[
            styles.timestampText,
            { color: isDark ? lightColor : darkColor },
          ]}
        >
          Created: {formatDate(todo?.createdAt)}
        </Text>
        {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
          <Text
            style={[
              styles.timestampText,
              { color: isDark ? lightColor : darkColor },
            ]}
          >
            Updated: {formatDate(todo?.updatedAt)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: accentColor,
  },
  checkBox: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 60,
    alignItems: "center",
  },
  timestampContainer: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    flexDirection: "column",
  },
  timestampText: {
    fontSize: 10,
    opacity: 0.7,
  },
});
