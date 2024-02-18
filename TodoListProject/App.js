import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/HomeScreen";
import TodoListScreen from "./src/TodoListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodoListProvider } from "./context/TodoListContext";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <TodoListProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoListProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
