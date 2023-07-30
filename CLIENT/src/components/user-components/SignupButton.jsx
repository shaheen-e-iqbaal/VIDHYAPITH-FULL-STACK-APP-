import React from "react";
import "./PopupStyles.css";
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import Signup from "./Signup";

const AdminSigninButton = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);

  const openSignIn = () => {
    setSignInOpen(true);
  };

  const closeSignIn = () => {
    setSignInOpen(false);
  };

  return (
    <div>
      <Button
        onClick={openSignIn}
        variant="contained"
        style={{
          marginRight: "10px",
          marginTop: "5px",
        }}
      >
        Sign Up
      </Button>

      <SignInModal isOpen={isSignInOpen} onClose={closeSignIn} />
    </div>
  );
};

const SignInModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    // Render the modal only when 'isOpen' is true
    isOpen && (
      <div className="modal-overlay" onClick={handleOutsideClick}>
        <div ref={modalRef}>
          {/* Your sign-in component */}
          <Signup />
          {/* <button onClick={onClose}>Close</button> */}
        </div>
      </div>
    )
  );
};

export default AdminSigninButton;
