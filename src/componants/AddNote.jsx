import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { context } from "../App";
import BasicSpeedDial from "./BasicSpeedDial";
const AddNote = ({ handleSaveClick, noteText, setNoteText }) => {
  const { currentUser } = useSelector((state) => state.user);
  const characterLimit = 200;
  const navigate = useNavigate();
  const { color, setColor } = useContext(context);
  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };
  // useEffect(() => {
  //   console.log(color);
  // }, [color]);
  return (
    <div className="note new" style={{ backgroundColor: color }}>
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
        style={{ backgroundColor: "transparent" }}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - noteText.length} Remaining</small>
        {/* <BasicSpeedDial /> */}
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
