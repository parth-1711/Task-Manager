import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import List from "../components/List";
import classes from "./TaskList.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const TaskList = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/newTask");
  };
  return (
    <>
      <Navbar />
      <div className={classes.newButton}>
      <h1>Add Tasks</h1>
        <Button variant="contained" size="large" onClick={onClickHandler}>
          + New
        </Button>
      </div>
      <div className={classes.list}>
        <div style={{ margin: "2rem" }}>
          <List />
        </div>
      </div>
    </>
  );
};

export default TaskList;
