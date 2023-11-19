import { format } from "timeago.js";

const Note = ({ id, text, date, handleDeleteNote, handleEditNote, color }) => {
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
