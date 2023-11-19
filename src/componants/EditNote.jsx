import React, { useContext, useState } from "react";
import "./Editnote.css";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../assets/index";
import { profilefetchSuccess, profilefetchcclear } from "./redux/cardSlice";
import { context } from "../App";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const EditNote = () => {
  // const { currentCard } = useSelector((state) => state.card);
  const { toggle, setToggle, card, notes, setNotes } = useContext(context);
  const [editdesc, setEditdesc] = useState("");
  const cardClose = () => {
    setToggle(!toggle);
  };

  const updateNote = () => {
    const fetchData = async () => {
      const editNote = {
        id: card._id,
        desc: editdesc,
        NoteId: card.NoteId,
        color: card.color,
      };
      const arr = notes.filter((data) => {
        console.log(data, editNote);
        if (data._id != editNote.id) {
          return data;
        }
      });
      setNotes([...arr, editNote]);
      const note = await axios.post("auth/updateNote", {
        id: card._id,
        desc: editdesc,
        NoteId: card.NoteId,
      });
    };
    fetchData();
    setToggle(!toggle);
  };
  console.log(notes);
  return (
    <div>
      <div className="overlay">
        <div className="editnote" style={{ backgroundColor: card.color }}>
          <div style={{ marginLeft: "90%" }}>
            <CloseIcon
              src={close}
              onClick={cardClose}
              style={{ cursor: "pointer", padding: "10%" }}
            />
          </div>
          <div>
            <b>Note:</b> {card.desc}
          </div>
          <br />
          <textarea
            rows="7"
            cols="40"
            placeholder="Edit the note..."
            onChange={(e) => setEditdesc(e.target.value)}
            style={{ backgroundColor: "transparent" }}
          ></textarea>
          <button
            style={{
              height: "30px",
              width: "100px",
              border: "none",
              backgroundColor: "#4285F4",
              color: "white",
              borderRadius: "10px",
            }}
            onClick={updateNote}
          >
            Update
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default EditNote;
