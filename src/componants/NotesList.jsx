import React, { useContext, useEffect, useState } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import EditNote from "./EditNote";
import { useNavigate } from "react-router-dom";
import { profilefetchSuccess, profilefetchcclear } from "./redux/cardSlice";
import { context } from "../App";
import "../index.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logOut } from "./redux/userSlice";
import BasicSpeedDial from "./BasicSpeedDial";

const NotesList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentCard } = useSelector((state) => state.card);

  const { toggle, setToggle, card, setCard, notes, setNotes, color } =
    useContext(context);
  const [noteText, setNoteText] = useState("");
  const [search, setSearch] = useState([]);
  const [noteID, setNoteID] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var render = 0;

  useEffect(() => {
    const addNote = async () => {
      const note = await axios.get(`auth/getNotes/${currentUser._id}`);
      setNotes(note.data);
      dispatch(profilefetchSuccess(note.data));
    };
    addNote();
  }, []);

  //add note
  const handleSaveClick = () => {
    setNoteText("");
    setNoteID(noteID + 1);
    const newNote = {
      userId: currentUser._id,
      desc: noteText,
      color: color,
      NoteId: noteID,
    };
    if (notes.length > 0) {
      setNotes([...notes, newNote]);
    } else {
      setNotes([newNote]);
    }
    const addNote = async () => {
      try {
        const note = await axios.post("auth/addnote", {
          userId: currentUser._id,
          desc: noteText,
          color: color,
          NoteId: noteID,
        });
        dispatch(profilefetchSuccess([notes]));
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };
    addNote();
  };

  //deleteNote
  const handleDeleteNote = (id) => {
    const deleteNote = async () => {
      const arr = notes.filter((data) => {
        if (data._id != id) {
          return data;
        }
      });
      setNotes([...arr]);
      const note = await axios.get(`auth/deleteNote/${id}`);
      dispatch(profilefetchSuccess([notes]));
    };
    deleteNote();
  };

  //serach notes
  useEffect(() => {
    const content = currentCard;
    if (search != "" && content.length > 0) {
      const searchNotes = content.filter((data) => {
        if (data && data.desc.includes(search)) {
          return data;
        }
      });
      setNotes(searchNotes);
    } else {
      setNotes(content);
    }
  }, [search]);

  //Logout
  const Logout = () => {
    dispatch(profilefetchcclear());
    dispatch(logOut());
    navigate("/");
  };

  //screen resolution
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);
  // console.log(screenSize.dynamicWidth);

  return (
    <>
      {screenSize.dynamicWidth > 630 ? <BasicSpeedDial /> : null}
      <br />
      <div
        className="searchBar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "100px",
        }}
      >
        <div
          className="searchbar2"
          style={{ width: "40%", justifyContent: "center" }}
        >
          <input
            className="searchcontent"
            type="text"
            placeholder="Search..."
            style={{ border: "none" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon />
        </div>
        <div className="userdetails">
          <div className="username">{currentUser.name}</div>
          <AccountCircleIcon
            style={{ color: "white", cursor: "pointer" }}
            onClick={Logout}
          />
        </div>
      </div>
      <br />
      <div className="notes-list">
        <AddNote
          handleSaveClick={handleSaveClick}
          noteText={noteText}
          setNoteText={setNoteText}
        />
        {notes && notes.length > 0
          ? notes.map((note) => (
              <Note
                id={note.NoteId}
                text={note.desc}
                date={note.createdAt}
                color={note.color}
                handleDeleteNote={
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    color="error"
                    onClick={() => {
                      handleDeleteNote(note._id);
                    }}
                  >
                    delete
                  </DeleteIcon>
                }
                handleEditNote={
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setToggle(!toggle);
                      setCard(note);
                    }}
                  />
                }
              />
            ))
          : null}
        {toggle ? <EditNote /> : null}
      </div>
    </>
  );
};

export default NotesList;
