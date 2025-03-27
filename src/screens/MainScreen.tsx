import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodos, selectTodos } from "../store/TodosSlice";
import Todo from "../components/Todo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const MainScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const completedTodosCount = todos.filter(
    (todo: any) => todo.completed
  ).length;
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchTodos = async (page: number, limit: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
      );
      const data = await response.json();
      const todos = data.map((todo: any) => ({
        ...todo,
        createdAt: new Date().toString(),
        updatedAt: "",
        completed: false,
      }));

      dispatch(addTodos(todos));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(1, 10);
  }, []);

  const handleAddTodo = () => {
    navigation.navigate("AddTodo");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f4f4f4"
        translucent={false}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Todos</Text>
        <Text style={styles.todoCount}>
          {completedTodosCount} /{todos.length}
        </Text>
      </View>

      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Todo todo={item} />}
        refreshing={isLoading}
        onRefresh={() => fetchTodos(1, 10)}
        // onEndReached={() => fetchTodos(1, 10)}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No todos yet</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <Pressable
        onPress={handleAddTodo}
        style={styles.floatingBtn}
        android_ripple={{ color: "rgba(255,255,255,0.3)" }}
      >
        <Text style={styles.floatingBtnText}>+ Add Todo</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  todoCount: {
    fontSize: 16,
    color: "#888",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 80, // Extra padding for floating button
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 18,
    color: "#888",
  },
  floatingBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
