import Footer from "@/components/Footer";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Fragment, useState, useEffect, createContext } from "react";
import { baseUrl } from "@/helper";
import { ITodo } from "@/interfaces/todo";

export const TodoContext = createContext<{
  todos: ITodo[];
  fetchTodos: () => void;
  addTodo: (todo: ITodo) => void;
  deleteTodo: (id: number) => void;
}>({
  todos: [],
  fetchTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = () => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setTodos(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  const addTodo = (todo: ITodo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);

    fetch(baseUrl + "/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to create todo");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    fetch(`${baseUrl}/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to delete todo");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Fragment>
      <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
        <Component {...pageProps} />
      </TodoContext.Provider>
      <Footer />
    </Fragment>
  );
}
