import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/inputTodo";
import { IncompleteTodos } from "./components/incompleteTodo";
import { CompleteTodos } from "./components/completeTodo";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (!!!todoText) {
      return;
    }
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  const onClickRewind = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disable={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>5個以上登録出来ない、完了しよう！</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickRewind={onClickRewind} />
    </>
  );
};
