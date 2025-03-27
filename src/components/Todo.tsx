import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TodosState, toggleCompleted } from "../store/TodosSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";

type Props = {
  todo: TodosState;
};

const Todo = ({ todo }: Props) => {
  const dispatch = useDispatch();
  return (
    <View>
      <BouncyCheckbox
        size={25}
        fillColor="green"
        text={todo.title}
        iconStyle={{ borderColor: "green" }}
        textStyle={{
          textDecorationLine: todo.completed ? "line-through" : "none",
        }}
        onPress={() => {
          dispatch(toggleCompleted(todo.id)); // Uncomment this line
        }}
        isChecked={todo.completed}
        style={styles.checkBox}
      />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  checkBox: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "green",
  },
});
