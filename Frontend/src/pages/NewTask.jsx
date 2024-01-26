import React, { useEffect } from "react";
import TaskForm from "../components/TaskForm";
import classes from "./NewTask.module.css";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const NewTask = () => {
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });
  let [params] = useSearchParams();
  let ID = params.get("id");
  let flag = {
    ID: null,
    isEditing: false,
  };
  if (ID) {
    flag.isEditing = true;
    flag.ID = ID;
  }
  return (
    <>
      <Navbar />
      <div className={classes.wrapper}>
        <div className={classes.formBox}>
          <TaskForm flag={flag} />
        </div>
      </div>
    </>
  );
};

export default NewTask;
