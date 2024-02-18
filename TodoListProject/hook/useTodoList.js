import { useContext } from "react";
import { TodoListContext } from "../context/TodoListContext";

const useTodoList = () => {
  const { data, choose, setData, setChoose } = useContext(TodoListContext);

  const getTodoList = () => {
    return data;
  };

  const getChoose = () => {
    return choose;
  };
  const chooseTodoList = (data) => {
    setChoose(data);
  };

  const addTodoTasks = (title, description, due_date) => {
    const newData = {
      title: title,
      description: description,
      due_date: due_date,
      sub_task: [],
    };
    setData(newData); //
  };

  const deleteItem = (index) => {
    var newData = data.splice(index, 1);
    setData(...newData);
    console.log(newData);
  };

  const addSubTodoTasks = (nameTodoPrimaryTask, title, description) => {};

  return {
    addTodoTasks,
    addSubTodoTasks,
    getTodoList,
    chooseTodoList,
    getChoose,
    deleteItem,
    data,
  };
};

export default useTodoList;
