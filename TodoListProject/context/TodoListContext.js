import { createContext, useState } from "react";

export const TodoListContext = createContext();
export const TodoListProvider = ({ children }) => {
  const [data, setTodoList] = useState([]);
  const [choose, setChooseTask] = useState(null);
  const setData = (todoData) => {
    data.push(todoData);
  };

  const setChoose = (choose) => {
    setChooseTask(choose);
  };

  return (
    <TodoListContext.Provider value={{ data, choose, setData, setChoose }}>
      {children}
    </TodoListContext.Provider>
  );
};
