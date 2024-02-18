import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import useTodoList from "../hook/useTodoList";
import { useState } from "react";
import dayjs from "dayjs";

export default function TodoListScreen() {
  const {
    addTodoTasks,
    addSubTodoTasks,
    getTodoList,
    chooseTodoList,
    getChoose,
  } = useTodoList();

  const [data, setData] = useState(getChoose());
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <Text>Title: {data.title}</Text>
        <Text>Description: {data.description}</Text>
        <Text>Due Date: {dayjs(data.due_date).format("DD/MM/YYYY")}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
