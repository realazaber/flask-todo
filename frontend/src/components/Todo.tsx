import React, { useContext, useState, useReducer } from "react";
import { ITodo } from "../interfaces/todo";
import { baseUrl } from "@/helper";
import { TodoContext } from "@/pages/_app";

const Todo = (props: any) => {
  const { deleteTodo } = useContext(TodoContext);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...props });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    fetch(`${baseUrl}/edit/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTodo),
    })
      .then((response) => {
        if (response.ok) {
          setIsEditing(false);
          forceUpdate();
          props.fetchTodos();
        } else {
          console.error("Failed to save changes");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancelClick = () => {
    setEditedTodo({ ...props });
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    fetch(`${baseUrl}/edit/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...editedTodo, completed: !editedTodo.completed }),
    })
      .then((response) => {
        if (response.ok) {
          props.fetchTodos();
        } else {
          console.error("Failed to update completion status");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-pri rounded-md m-3 flex flex-col sm:flex-row justify-between items-center sm:min-w-[30%] sm:max-w-[45%]">
      {isEditing ? (
        <>
          <div className="p-3">
            <input
              type="text"
              name="title"
              value={editedTodo.title}
              onChange={handleInputChange}
              className="bg-slate-900 text-white"
            />
            <input
              type="text"
              name="description"
              value={editedTodo.description}
              onChange={handleInputChange}
              className="bg-slate-900 text-white"
            />
          </div>
          <div className="p-3 flex flex-col gap-y-3">
            <button
              onClick={handleSaveClick}
              className="btn bg-sec border-none"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="btn bg-sec border-none"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="p-3">
            <h3 className="text-sec">{props.title}</h3>
            <p className="whitespace-normal">{props.description}</p>

            <button
              onClick={handleEditClick}
              className="btn bg-sec border-none mt-3"
            >
              Edit
            </button>
          </div>
          <div className="p-3">
            <input
              type="checkbox"
              checked={props.completed}
              onChange={handleCheckboxChange}
              className="p-5 mr-5 w-5 h-5 accent-sec rounded-md"
            />
          </div>

          <button
            onClick={() => deleteTodo(props.id)}
            className="bg-sec text-white h-full px-5"
          >
            X
          </button>
        </>
      )}
    </div>
  );
};

export default Todo;
