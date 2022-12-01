import React from "react";
import { useState } from "react";
const MeetVideo = () => {
  const [Inputs, setInputs] = useState({});
  const customStyle = {
    "color":"white",
    "margin":"10px"
  }
  // Input handling
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  // upload video link

  const sendVideo = async () => {
    if (true) {
      console.log("sending Meet...");
      const option = {
        method: "POST",
        body: new URLSearchParams({
          receiver: localStorage.getItem("isAlumni") === 'true' ? Inputs.receiver_mail : localStorage.getItem("selected_alumni"),
          sender: Inputs.sender,
          meeturl: Inputs.meet_url,
          schedule: Inputs.schedule,
          sender_mail: localStorage.getItem("registered_username"),
          sender_phone: Inputs.sender_phone,
          subject: Inputs.sender,
        }),
      };
      await fetch("http://localhost:5000/video-chat", option)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("✔ MEET Details sent!");
          }
        })
        .catch((err) => {
          String(err).includes("Unauthorized")
            ? alert("Wrong Credentials!")
            : console.error(err);
        });
    } else {
      alert("❌ You are not an alumni.");
    }
  };
  return (
    <div>
      <h1>Schedule a Meet !</h1>
      <div>
        <label style={customStyle} className="formLabel">Sender name</label>
        <input
          type="text"
          name="sender"
          value={Inputs.sender || ""}
          onChange={handleChange}
        />
        <br></br>
        <label style={customStyle} className="formLabel">MEET Link</label>
        <input
          type="text"
          name="meet_url"
          value={Inputs.meet_url || ""}
          onChange={handleChange}
        />
        <br></br>
        <label style={customStyle} className="formLabel">Schedule</label>
        <input
          type="text"
          name="schedule"
          value={Inputs.schedule || ""}
          onChange={handleChange}
        />
        <br></br>
        {
          localStorage.getItem("isAlumni") === 'true' ? <><label style={customStyle} className="formLabel">RECEIVER MAIL</label>
          <input
            type="text"
            name="receiver_mail"
            value={Inputs.receiver_mail || ""}
            onChange={handleChange}
          /></> : null
          
        }
        
        <br></br>
        <label style={customStyle} className="formLabel">SENDER PHONE</label>
        <input
          type="text"
          name="sender_phone"
          value={Inputs.sender_phone || ""}
          onChange={handleChange}
        />
        <br></br>
        <label style={customStyle} className="formLabel">SUBJECT </label>
        <input
          type="text"
          name="subject"
          value={Inputs.subject || ""}
          onChange={handleChange}
        />
      </div>
      <center>
      <button onClick={sendVideo}>Send Details</button>
      </center>
      
    </div>
  );
};

export default MeetVideo;
