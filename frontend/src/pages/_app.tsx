import Footer from "@/components/Footer";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Fragment, useState, useEffect, createContext } from "react"; // Import createContext
import { baseUrl } from "@/helper";
import { ITodo } from "@/interfaces/todo";

export const TodoContext = createContext<{
  todos: ITodo[];
  addTodo: (todo: ITodo) => void;
  deleteTodo: (id: number) => void;
}>({
  todos: [],
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
    // Add the new todo to the context state
    setTodos((prevTodos) => [...prevTodos, todo]);

    // Send a POST request to create a new todo
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
    // Delete the todo from the context state
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    // Send a DELETE request to delete the todo
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
