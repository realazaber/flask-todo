import TodosList from "@/components/TodosList";
import React, { Fragment, useState, useContext } from "react";
import { baseUrl } from "@/helper";
import { TodoContext } from "@/pages/_app";
import { ITodo } from "@/interfaces/todo";

type Props = {};

const Home = (props: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { addTodo } = useContext(TodoContext);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: ITodo = {
      title: formData.title,
      description: formData.description,
      completed: false,
    };

    addTodo(newTodo);

    setFormData({ title: "", description: "" });
  };

  return (
    <Fragment>
      <section>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h2 className="text-4xl text-white font-bold">
              Super task tracker
            </h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              rows={5}
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
            <button className="btn btn-pri">Create todo</button>
          </form>
        </div>
      </section>
      <TodosList />
    </Fragment>
  );
};

export default Home;
