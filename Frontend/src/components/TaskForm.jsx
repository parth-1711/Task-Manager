import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ flag }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date,setDate]=useState('');
  
  const [task, setTask] = useState("");
  // const [id,setId]=useState('')
  const titleChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.currentTarget.value);
  };

  const dateChangeHandler=(e)=>{
    setDate(e.currentTarget.value);
  }

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch("http://localhost:3000/tasks/" + flag.ID, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      let data = await response.json();
      // console.log(data);
      setTask(data.data);
      setTitle(data.data.taskTitle)
      setDescription(data.data.description)
      setDate(data.data.dueDate)
    };


    if (flag.isEditing) {
      fetchDetails();
      // setId(flag.ID)
    }
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formdata = {
      id: flag.id ?? data.get("title") + localStorage.getItem("username"),
      taskTitle: data.get("title"),
      description:data.get("desc"),
      dueDate:data.get("dueDate"),
      user: localStorage.getItem("username"),
      status: "Pending",
    };
    console.log(formdata);
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    let tokenData = await response.json();
    console.log(tokenData.success);
    if (tokenData.success) {
      navigate("/list");
    } else navigate("/Error");
  };
  return (
    <>
      <form style={{ textAlign: "center" }} onSubmit={onSubmitHandler}>
        {/* <label>Title</label><br />
            <input type="text"/><br /> */}

        <div style={{ margin: "1rem" }}>
          <TextField
            id="outlined-basic"
            name="title"
            label="Title"
            onChange={titleChangeHandler}
            // placeholder={task.taskTitle ?? ""}
            value={title}
            variant="outlined"
          />
        </div>

        <div style={{ margin: "1rem" }}>
          <TextField
            id="outlined-multiline-static"
            name="desc"
            label="Description"
            onChange={descriptionChangeHandler}
            // placeholder={task.description ?? ""}
            value={description}
            multiline
            rows={4}
          />
        </div>
        <div style={{ margin: "1rem" }}>
          <label htmlFor="dueDate"> Due Date :-</label>
          <input
            type="date"
            name="dueDate"
            value={date}
            onChange={dateChangeHandler}
            id=""
            style={{
              height: "1.5rem",
              borderRadius: "0.5rem",
              marginLeft: "1.2rem",
            }}
          />
        </div>
        <div style={{ marginLeft: "0.5rem" }}>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
