import React, { useContext } from "react"; // Import useContext
import { ITodo } from "@/interfaces/todo";
import { baseUrl } from "@/helper";
import { useRouter } from "next/router";
import { TodoContext } from "@/pages/_app";

const Todo = (props: ITodo) => {
  const router = useRouter();
  const { deleteTodo } = useContext(TodoContext); // Use useContext to access the deleteTodo function

  const handleDeleteClick = () => {
    fetch(`${baseUrl}/delete/${props.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          deleteTodo(props.id); // Delete the todo from the context state
          console.log("Todo deleted successfully");
        } else {
          console.error("Failed to delete todo");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-pri rounded-md m-3 flex flex-row justify-between items-center min-w-[30%] max-w-[100%]">
      <div className="p-3">
        <h3 className="text-sec">{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="p-3">
        <input
          type="checkbox"
          checked={props.completed}
          onChange={() => {}}
          className="p-5 mr-5 w-5 h-5 accent-sec rounded-md"
        />
      </div>
      <button
        onClick={handleDeleteClick}
        className="bg-sec text-white flex justify-center items-center h-full py-3 px-5 rounded-r-md text-2xl font-bold"
      >
        X
      </button>
    </div>
  );
};

export default Todo;
