import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editedVal, setEditedVal] = useState(null);
  const todoRef = useRef();

  const getTodos = () => {
    axios(`http://localhost:3000/api/v1/todos`)
      .then((res) => {
        console.log(res.data.todos);
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoRef.current.value) {
      return alert("Please add edited todo");
    }
    axios
      .post(`http://localhost:3000/api/v1/addTodo`, {
        todo: todoRef.current.value,
      })
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
    todoRef.current.value = "";
  };

  const editTodo = (id) => {
    if (!editedVal) {
      return alert("Please add edited todo");
    }
    axios
      .put(`http://localhost:3000/api/v1/updateTodo/${id}`, {
        todo: editedVal,
      })
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
    setEdit(false);
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/deleteTodo/${id}`)
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold mt-10 text-blue-600 tracking-wider">
        TODO APP
      </h1>
      <div className="flex flex-col items-center mt-8">
        <form
          className="flex justify-center gap-4 items-center bg-gray-100 shadow-lg p-5 rounded-lg w-full max-w-xl"
          onSubmit={addTodo}
        >
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
            type="text"
            name="todo"
            id="todo"
            placeholder="Enter your todo"
            ref={todoRef}
          />
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all">
            Add Todo
          </button>
        </form>

        <div className="mt-8 w-full max-w-xl">
          {todos.length > 0 ? (
            <div className="space-y-4">
              {todos.map((todo, index) => (
                <div
                  key={todo._id}
                  className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
                >
                  {edit !== index ? (
                    <>
                      <h3 className="text-lg font-medium">{todo.todo}</h3>
                      <div className="flex gap-5">
                        <button
                          onClick={() => {
                            setEdit(index), setEditedVal(todo.todo);
                          }}
                          className="text-green-500 font-semibold hover:text-green-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="text-red-500 font-semibold hover:text-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center gap-4 items-center rounded-lg ">
                      <input
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
                        type="text"
                        name="todo"
                        id="todo"
                        placeholder="Enter your todo"
                        value={editedVal}
                        onChange={(e) => setEditedVal(e.target.value)}
                      />
                      <button
                        onClick={() => editTodo(todo._id)}
                        className="bg-blue-500 text-white px-2 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all"
                      >
                        Update Todo
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-center text-gray-500 text-lg mt-5">
              No Todo Found!
            </h2>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
