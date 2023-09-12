import React, { useContext } from "react";
import Todo from "./Todo";
import { ITodo } from "../interfaces/todo";
import { TodoContext } from "@/pages/_app";

const TodosList = () => {
  const { todos } = useContext(TodoContext) || { todos: [] };

  return (
    <section className="my-3">
      <div className="container">
        {todos.length === 0 ? (
          <p>No todos found</p>
        ) : (
          <div className="rounded-md text-white p-5 w-full flex flex-wrap justify-center">
            {todos.map((todo: ITodo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TodosList;
