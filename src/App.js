import { useEffect, useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Enter your name: "));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };

  return (
    <div className="app">
      <div className="app__header">
        <img src="https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.2365-6/123906902_1244114632629848_167486095616891544_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=V-J7CGJGfH0AX96T5h5&_nc_ht=z-p3-scontent.fcmb7-1.fna&oh=00_AfBUih5CYJWPqWLKN4KBhyn7dPsOWdjqpfWMB0gd8-SqHQ&oe=64FC6D93" />
        <h1>Messenger Clone</h1>
        <h2>
          Welcome <span> {username}</span>
        </h2>
      </div>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Type a message..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
