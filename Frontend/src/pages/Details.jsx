import React, { useEffect } from "react";
import Task from "../components/Task";
import classes from "./details.module.css";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";

const Details = () => {
  
  const navigate=useNavigate()
  
  let [taskID] = useSearchParams();
  let ID = taskID.get("taskID");
  const deleteAction = async () => {
    let response = await fetch("http://localhost:3000/tasks/" + ID, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    let data=await response.json();
    if(data.message=="Token not provided"||data.message=="Invalid token") navigate('/login')
    if(data.success){
      navigate('/list');
    }
    else navigate('/Error');
  };

  const completeAction=async()=>{
    let response = await fetch("http://localhost:3000/tasks/" + ID, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    let data=await response.json();
    if(data.message=="Token not provided"||data.message=="Invalid token") navigate('/login')
    if(data.success){
      navigate('/list');
    }
    
    else navigate('/Error');
  }

  const Edit=()=>{
    navigate('/newTask?id='+ID);
  }
  // console.log(ID);
  return (
    <>
      <Navbar />
      <div className={classes.wrapper}>
        <Task taskId={ID} />
      </div>
      <div className={classes.actions}>
        <Button onClick={deleteAction} variant="contained">
          Delete
        </Button>
        <Button onClick={completeAction} variant="contained">Mark as done</Button>
        <Button onClick={Edit} variant="contained">Edit</Button>
      </div>
    </>
  );
};

export default Details;
