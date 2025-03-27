import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./src/store/store";
import { Provider } from "react-redux";
import MainScreen from "./src/screens/MainScreen";
import AddTodoScreen from "./src/screens/AddTodoScreen";
type Props = {};

const Stack = createNativeStackNavigator();
const App = (props: Props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={MainScreen}
          />
          <Stack.Screen name="AddTodo" component={AddTodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
