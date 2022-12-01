import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UploadedVideos = () => {
  const [Users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const options = { method: "GET" };

      fetch("http://localhost:5000/users", options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response[0].videos);
          setUsers(response);
        })
        .catch((err) => console.error(err));
    } catch (error) {}
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <center>
        {localStorage.getItem("isAlumni") === "true" ? (
          <Link to="/video-upload" className="video_upload_btn">
            Upload video
          </Link>
        ) : null}
      </center>
      <br></br>
      {Users.map((u, index) => {
        return u.videos.map((v, index) => {
          return (
            <>
              <div style={{ display: "inline-block" }}>
                {/* <video
                  className="alumni_videos"
                  key={index}
                  src={v.video_url}
                  controls
                ></video> */}
                <iframe className="alumni_videos" src={v.video_url} title="YouTube video player" frameborder="0" allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <h3
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {v.video_title}
                </h3>
              </div>
            </>
          );
        });
      })}
    </div>
  );
};

export default UploadedVideos;
