import logo from "./logo.svg";
import "./App.css";
import NotesList from "./componants/NotesList";
import AddNote from "./componants/AddNote";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./componants/login/Signin";
import { useSelector } from "react-redux";
import EditNote from "./componants/EditNote";
import { createContext, useState } from "react";

//create a context

export const context = createContext();

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const [notes, setNotes] = useState([]);
  const [card, setCard] = useState({});
  const [color, setColor] = useState("");
  return (
    <BrowserRouter>
      <context.Provider
        value={{
          toggle,
          setToggle,
          card,
          setCard,
          notes,
          setNotes,
          color,
          setColor,
        }}
      >
        <div className="App">
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  currentUser ? (
                    <div className="container">
                      <NotesList />
                    </div>
                  ) : (
                    <Signin />
                  )
                }
              />
            </Route>
            <Route path="/editNote/:id" element={<EditNote />} />
          </Routes>

          {/* <AddNote /> */}
        </div>
      </context.Provider>
    </BrowserRouter>
  );
}

export default App;
