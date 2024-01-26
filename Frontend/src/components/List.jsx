import React, { useState, useEffect } from "react";
import classes from "./List.module.css";
import { Link } from "react-router-dom";

const List = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const fetchTasks = async () => {
      let response = await fetch(
        "http://localhost:3000/tasks?user=" + localStorage.getItem("username"),
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setTasks(data.result);
    };
    fetchTasks();
  }, []);
  return (
    <>
    
      {tasks.map((task) => {
        return (
          <Link to={'/task?taskID='+task.id} key={task.id}>
            <div className={classes.listEle}>
              <div style={{ fontSize: "1.5rem" }}>{task.taskTitle}</div>
              <div style={{ color: "#4a4a4a" }}>{task.description}</div>

              <div className={classes.arrow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="35"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  // class="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default List;
