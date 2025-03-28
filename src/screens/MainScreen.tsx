import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodos, selectTodos } from "../store/TodosSlice";
import Todo from "../components/Todo";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import StyledText from "../components/StyledText";
import StyledView from "../components/StyledView";
import { accentColor } from "../utils/color";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const MainScreen = ({ navigation }: Props) => {
  const isDark = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const completedTodosCount = todos.filter(
    (todo: any) => todo.completed
  ).length;
  const [isLoading, setIsLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("All");
  const filterList = ["All", "Active", "Done"];
  const [sortBy, setSortBy] = useState<"id" | "recent">("id");
  // const [limit, setLimit] = useState(10);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTodos = async (currentPage: number) => {
    if (!hasMore && currentPage > 1) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=10`
      );

      // Check if there are more items
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      const newTodos = data.map((todo: any) => ({
        ...todo,
        createdAt: new Date().toString(),
        updatedAt: "",
        completed: false,
      }));

      // Append new todos instead of replacing
      dispatch(addTodos(newTodos));
    } catch (error) {
      console.error(error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (filter === "All" && hasMore && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTodos(nextPage);
    }
  };

  useEffect(() => {
    fetchTodos(1);
  }, []);

  const handleAddTodo = () => {
    navigation.navigate("AddTodo");
  };

  const filteredTodos = todos.filter((todo: any) => {
    switch (filter) {
      case "Active":
        return !todo.completed;
      case "Done":
        return todo.completed;
      default:
        return true;
    }
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === "id") {
      return a.id - b.id;
    } else {
      // Sort by most recent (using createdAt)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleSortTodos = () => {
    setSortBy((prevSort) => (prevSort === "id" ? "recent" : "id"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StyledView style={styles.container}>
        <StatusBar
          barStyle={isDark ? "light-content" : "dark-content"}
          backgroundColor={isDark ? "#000" : "#f4f4f4"}
          translucent={false}
        />
        <StyledView style={styles.headerContainer}>
          <StyledText style={styles.headerTitle}>My Todos</StyledText>
          <StyledText style={styles.todoCount}>
            completed: {completedTodosCount} total:{todos.length}
          </StyledText>
        </StyledView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <FlatList
            horizontal
            data={filterList}
            style={styles.filterContainer}
            contentContainerStyle={styles.filterContentContainer}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setFilter(item)}
                style={styles.filterItem}
              >
                <Text
                  style={
                    item === filter
                      ? styles.activeFilterText
                      : styles.filterItemText
                  }
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
          <Pressable onPress={handleSortTodos} style={styles.sortButton}>
            <Ionicons
              name="filter"
              size={22}
              color={sortBy === "id" ? "#fff" : "green"}
              style={{ marginLeft: 5 }}
            />
          </Pressable>
        </View>

        <FlatList
          style={styles.listContainer}
          contentContainerStyle={styles.listContentContainer}
          data={sortedTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Todo todo={item} />}
          refreshing={isLoading}
          ListFooterComponent={() => (
            <View style={{ paddingVertical: 20 }}>
              {isLoading && <ActivityIndicator size="large" color="#4CAF50" />}
            </View>
          )}
          onRefresh={() => {
            setPage(1);
            setHasMore(true);
            fetchTodos(1);
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.6}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <StyledText style={styles.emptyListText}>
                {filter === "All" ? "No todos yet" : `No ${filter} todos`}
              </StyledText>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />

        <Pressable onPress={handleAddTodo} style={styles.floatingBtn}>
          <StyledText style={styles.floatingBtnText}>+ Add Todo</StyledText>
        </Pressable>
      </StyledView>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f4f4f4",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    // backgroundColor: "white",
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
    fontSize: 14,
    // color: "#888",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
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
    backgroundColor: accentColor,
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
  filterContainer: {},
  filterContentContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 15,
    paddingVertical: 10,
  },
  filterItem: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    // paddingHorizontal: 10,
    padding: 7,
    borderRadius: 15,
  },
  filterItemText: {
    fontSize: 16,
    color: "#fff",
  },
  activeFilterText: {
    color: "green",
  },
  sortButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: "flex-end",
    margin: 15,
  },
});
