import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";
import useTodoList from "../hook/useTodoList";
import { useContext, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { TodoListContext } from "../context/TodoListContext";

export default function HomeScreen({ navigation }) {
  const {
    addTodoTasks,
    addSubTodoTasks,
    getTodoList,
    chooseTodoList,
    deleteItem,
  } = useTodoList();
  const [modalVisible, setModalVisible] = useState(false);
  const [titleTodo, onChangeTitleTodo] = useState("");
  const [descriptionTodo, onChangeDescriptionTodo] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("date");
  const { data, choose, setData, setChoose } = useContext(TodoListContext);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpen(false);
    setDate(currentDate);
  };

  const detailTodo = (item) => {
    chooseTodoList(item);
    navigation.navigate("TodoListScreen");
  };

  const deleteTodo = (index) => {
    deleteItem(index);
  };
  const addTodo = () => {
    addTodoTasks(titleTodo, descriptionTodo, date);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {open && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalText}>Add Item</Text>
            </View>
            <View style={styles.viewForm}>
              <Text style={styles.headerText}>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeTitleTodo}
                value={titleTodo}
              />
              <Text style={styles.headerText}>Description</Text>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={(text) => onChangeDescriptionTodo(text)}
                value={descriptionTodo}
                style={styles.input}
              />
              <Text style={styles.headerText}>DueDate</Text>
              <TouchableOpacity
                onPress={() => {
                  setOpen(!open);
                }}
              >
                <View style={styles.input}>
                  <Text>{dayjs(date).format("DD/MM/YYYY")}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => addTodo()}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FlatList
        data={data}
        key={"items" + data.lenght}
        renderItem={({ item, index }) => (
          <View style={styles.cardView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text> Title: {item.title}</Text>
                <Text>Description: {item.description}</Text>
                <Text>
                  Due Date: {dayjs(item.due_date).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginRight: 20 }}>
                    <TouchableOpacity
                      onPress={() => {
                        detailTodo(item);
                      }}
                    >
                      <Text>Detail</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      deleteTodo(index);
                    }}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.action_button}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    width: "100%",
    height: 100,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  viewForm: {
    flex: 1,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    marginBottom: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    display: "flex",
    width: "80%",
    height: 540,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  headerText: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  action_button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
});
