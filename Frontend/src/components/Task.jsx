import React, { useState, useEffect } from "react";
import classes from "./Task.module.css";

const Task = (props) => {
  // let task = {
  //   title: "Title 1",
  //   desc: "qwertyuujyfhdgfsdffbvc",
  //   date: "25-01-2024",
  // };
  const [task, setTask] = useState("");
  console.log(props.taskId);
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        "http://localhost:3000/tasks/" + props.taskId,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      let data = await response.json();
      // console.log(data);
      setTask(data.data);
    };
    fetchDetails();
  }, []);
  return (
    <>
      <div className={classes.task}>
        <h1>{task.taskTitle}</h1>
        <hr />
        <h3>Description:-</h3>
        <div className={classes.desc}>{task.description}</div>
        <hr />
        <div>Due Date:- {task.dueDate}</div>
      </div>
    </>
  );
};

export default Task;
