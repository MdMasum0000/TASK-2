import React, { useState } from "react";

function Hero() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);
  const [editTask, setEditTask] = useState("");

  const addBtn = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    } else alert("Please write down a task");
  };

  const deleteBtn = (index) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      const newTasks = tasks.filter((task, i) => i !== index);
      setTasks(newTasks);
      updateCompletedCount(newTasks);
    }
  };

  const checkBtn = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
    updateCompletedCount(newTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  };

  const handleSaveEdit = () => {
    const newTasks = tasks.map((task, i) => {
      if (i === editIndex) {
        return { ...task, text: editTask };
      }
      return task;
    });
    setTasks(newTasks);
    setEditIndex(-1);
    setEditTask("");
  };

  const updateCompletedCount = (tasks) => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    setCompletedCount(completedTasks);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addBtn();
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 lg:px-32">
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl py-8 lg:py-16 text-center">
          To Do List
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center mb-4">
          <input
            placeholder="Add Task"
            className="py-2 sm:py-3 px-4 sm:px-8 rounded-md text-lg sm:text-xl border-2 mb-2 sm:mb-0"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="sm:ml-3 py-2 sm:py-3 px-4 sm:px-6 text-lg sm:text-2xl rounded-md border-none bg-purple-600 text-white font-semibold"
            onClick={addBtn}
          >
            Add
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Task List</h2>
        </div>
      </div>
      <hr className="mt-10 border-t-2 border-sky-800" />
      <div className="container mx-auto px-4 sm:px-8 lg:px-32">
        <div className="py-4 text-center text-lg sm:text-xl">
          Completed: <span className="font-bold">{completedCount}</span> |
          Uncompleted:{" "}
          <span className="font-bold">{tasks.length - completedCount}</span>
        </div>
        <ul className="rounded p-4 bg-white shadow-md">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between mb-4 p-4 rounded-md border-2"
            >
              <div className="flex items-center text-lg sm:text-2xl mb-2 sm:mb-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => checkBtn(index)}
                  className="mr-2 w-5 h-5 sm:w-7 sm:h-7"
                />
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  <span
                    className={`${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-black"
                    }`}
                  >
                    {task.text}
                  </span>
                )}
              </div>
              <div>
                {editIndex === index ? (
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-500 text-lg sm:text-2xl mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(index)}
                    className="text-purple-900 text-lg sm:text-2xl mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteBtn(index)}
                  className="text-red-800 text-lg sm:text-2xl"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Hero;
