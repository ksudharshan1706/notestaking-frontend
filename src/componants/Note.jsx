import { MdDeleteForever } from "react-icons/md";
import { format } from "timeago.js";
import axios from "axios";

const Note = ({ id, text, date, handleDeleteNote, handleEditNote, color }) => {
  // console.log(color);
  return (
    <div className="note" style={{ backgroundColor: color }}>
      <span>{text}</span>
      <div className="note-footer">
        <small>{format(date)}</small>
        <div style={{ display: "flex", gap: 20 }}>
          {handleEditNote}
          {handleDeleteNote}
        </div>
      </div>
    </div>
  );
};

export default Note;
