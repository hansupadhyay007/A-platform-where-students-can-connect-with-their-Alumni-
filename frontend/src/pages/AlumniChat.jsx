import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const AlumniChat = () => {
  const refresh_time = 5000;
  useEffect(() => {
    if (localStorage.getItem("registered_username") !== null) {
      setRegistered(true);
      getMessages();
    }
    const interval = setInterval(() => {
      getMessages();
    }, refresh_time);
    return () => clearInterval(interval);
  }, []);
  const [Inputs, setInputs] = useState({});
  const [Messages, setMessages] = useState([]);
  const [Alumni, setAlumni] = useState([]); // Data of selected alumni
  const [Registered, setRegistered] = useState(false);
  const [LoadingM, setLoadingM] = useState(true);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const sendMessage = async () => {
    console.log("Message sending...");

    const options = {
      method: "POST",
      body: new URLSearchParams({
        isalumni: localStorage.getItem("isAlumni"),
        message: Inputs.message,
        alumni_name: localStorage.getItem("registered_username"),
        sender: localStorage.getItem("registered_username"),
        timestamp:
          new Date().toLocaleTimeString() +
          "-" +
          new Date().toLocaleDateString(),
      }),
    };

    await fetch("http://localhost:5000/user-chat", options)
      .then((response) => response.json())
      .then((response) => {
        console.log("response");
        if (response.status === 200) {
          console.log("Message sent!");
          Inputs.message = ""; // clear the message from the input box after successfully send.
          getMessages();
        }
      })
      .catch((err) => {
        String(err).includes("Unauthorized")
          ? alert("Wrong Credentials!")
          : console.error(err);
      });
  };

  // GET messages from particular user

  const getMessages = async () => {
    const options = {
      method: "GET",
    };
    await fetch(
      `http://localhost:5000/users/${localStorage.getItem(
        "registered_username"
      )}`, // we already know the user is an alumni
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMessages(response.messages.reverse());
        setAlumni(response);
        setLoadingM(false);
      })
      .catch((err) => {
        String(err).includes("Unauthorized")
          ? alert("Wrong Credentials!")
          : console.error(err);
      });
  };

  return (
    <div className="main">
      <h1>Your Chats!</h1>

      {Registered ? (
        <div className="message_box">
          {LoadingM ? <div class="d-flex align-items-center">
  <strong>Loading...</strong>
  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
</div> : null}
          {Messages.map((m, index) => {
            return (
              <div
                key={index}
                className={
                  m.isAlumni
                    ? "alumni_message message_card"
                    : "user_message message_card"
                }
              >
                <p>
                  {m.sender +
                    (m.isAlumni ? "(Alumni)" : "(Student)") +
                    ": " +
                    m.message}
                </p>
                <p className="mTime">{m.timestamp.toUpperCase()}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="alert_card">
          <p>You are not authenticated!</p>
          <Link to="/register">Register</Link>
          <br></br>
          <Link to="/login">Login</Link>
        </div>
      )}

      <br />
      <div className="message_input_field">
        <input
          type="text"
          name="message"
          value={Inputs.message || ""}
          onChange={handleChange}
        />
        <button onClick={sendMessage}>SEND</button>
      </div>
    </div>
  );
};

export default AlumniChat;
