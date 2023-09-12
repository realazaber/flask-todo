import React, { useContext } from "react"; 
import { ITodo } from "@/interfaces/todo";
import { baseUrl } from "@/helper";
import { useRouter } from "next/router";
import { TodoContext } from "@/pages/_app";

const Todo = (props: ITodo) => {
  const router = useRouter();
  const { deleteTodo } = useContext(TodoContext); 

  const handleDeleteClick = () => {
    fetch(`${baseUrl}/delete/${props.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          deleteTodo(props.id); 
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
    <div className="bg-pri rounded-md m-3 flex flex-col sm:flex-row justify-between items-center sm:min-w-[30%] sm:max-w-[45%]">
      <div className="p-3">
        <h3 className="text-sec">{props.title}</h3>
        <p className="whitespace-normal">{props.description}</p>
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
        className="bg-sec text-white w-full sm:w-auto flex justify-center items-center h-full py-3 px-5 rounded-b-md sm:rounded-b-none sm:rounded-br-md sm:rounded-r-md text-2xl font-bold"
      >
        X
      </button>
    </div>
  );
};

export default Todo;
