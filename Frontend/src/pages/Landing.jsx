import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <img
        src="./landing.avif"
        alt=""
        srcset=""
        style={{
          width: "100%",
          height: "50%",
          objectFit: "fill",
          zIndex: "-10px",
        }}
      />
      <div style={{position:'absolute'}}>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
        <Button>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default Landing;
