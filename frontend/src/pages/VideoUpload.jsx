import React from "react";
import { useState } from "react";
const VideoUpload = () => {
  const [Inputs, setInputs] = useState({});

  // Input handling
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  // upload video link

  const sendVideo = async () => {
    if (localStorage.getItem("isAlumni") === "true") {
      console.log("sending video...");
      const option = {
        method: "POST",
        body: new URLSearchParams({
          isalumni: localStorage.getItem("isAlumni"),
          username: localStorage.getItem("registered_username"),
          videourl: Inputs.link,
          title: Inputs.title,
        }),
      };
      await fetch("http://localhost:5000/user-videos", option)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("✔ Video uploaded successfully.")
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
      <h1>Video Upload!</h1>
      <div>
        <label style={{color:"white"}}>Video Title</label>
        <input
          type="text"
          name="title"
          value={Inputs.title || ""}
          onChange={handleChange}
        />
        <br></br>
        <label style={{color:"white"}}>Video Link</label>
        <input
          type="text"
          name="link"
          value={Inputs.link || ""}
          onChange={handleChange}
        />
      </div>
      <button onClick={sendVideo}>SEND TEST VIDEO</button>
    </div>
  );
};

export default VideoUpload;
