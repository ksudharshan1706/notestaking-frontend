import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { search } from "../assets";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logOut } from "./redux/userSlice";
import BasicSpeedDial from "./BasicSpeedDial";
import BasicSpeedDial2 from "./BasicSpeedDial2";

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
    // console.log("useeffect", notes);
    const addNote = async () => {
      const note = await axios.get(`auth/getNotes/${currentUser._id}`);
      // console.log(note);
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
    // console.log(newNote);
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
    // console.log(id);
    const deleteNote = async () => {
      const arr = notes.filter((data) => {
        // console.log(id, data.NoteId, data._id);
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
    var content = [];
    if (currentCard.length > 0 && currentCard.length > notes.length) {
      content = currentCard;
    } else {
      content = notes;
    }

    console.log(content);
    if (search != "" && content.length > 0) {
      const searchNotes = content.filter((data) => {
        // console.log(data);
        if (data && data.desc.includes(search)) {
          return data;
        }
      });
      // console.log(searchNotes);
      setNotes(searchNotes);
    } else {
      setNotes(content);
    }
  }, [search]);

  // useEffect(() => {
  //   if (currentCard.length != notes.length) {
  //     console.log("current cards length != notes length", currentCard, notes);
  //     const addNote = async () => {
  //       const note = await axios.get(`auth/getNotes/${currentUser._id}`);
  //       setNotes(note.data);
  //       dispatch(profilefetchSuccess(note.data));
  //     };
  //     addNote();
  //     console.log(notes);
  //   }
  // }, [render]);

  //Logout
  const Logout = () => {
    dispatch(profilefetchcclear());
    dispatch(logOut());
    navigate("/");
  };
  // console.log(notes);

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
          {/* {screenSize.dynamicWidth < 630 ? <BasicSpeedDial2 /> : null} */}
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
                // id={note._id}
                text={note.desc}
                date={note.createdAt}
                color={note.color}
                handleDeleteNote={
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    color="error"
                    onClick={() => {
                      // handleDeleteNote(note.NoteId);
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
                      // console.log(card);
                    }}
                  />
                }
              />
            ))
          : null}
        {/* {screenSize.dynamicWidth < 630 ? <BasicSpeedDial2 /> : null} */}
        {toggle ? <EditNote /> : null}
      </div>
    </>
  );
};

export default NotesList;
