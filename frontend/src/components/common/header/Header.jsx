import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const languageSelection = (e) => {
    console.log("SELECTED LANGUAGE: " + e.target.value);
    localStorage.setItem("selectedLanguage", e.target.value);
    window.location.reload();
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB "}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">{localStorage.getItem("selectedLanguage")==="ODIA" ? "ହୋମ" :"Home"} </Link>
            </li>
            <li>
            <Link to="/courses">{localStorage.getItem("selectedLanguage")==="ODIA" ? "ସମସ୍ତ ପାଠ୍ୟକ୍ରମ" :"All Courses"} </Link>
            </li>
            <li>
            <Link to="/alumni">{localStorage.getItem("selectedLanguage")==="ODIA" ? "ସମସ୍ତ ପୁରାତନ ଛାତ୍ର" :"All Alumni"} </Link>
            </li>
            <li>
              <Link to="/team">{localStorage.getItem("selectedLanguage")==="ODIA" ? "ଦଳ" :"Team"} </Link>
            </li>
            <li>
            <Link to="/chat-page">{localStorage.getItem("selectedLanguage")==="ODIA" ? "ଚାଟ୍ ପୃଷ୍ଠା" :"Chat Page"} </Link>
            </li>
            {localStorage.getItem("isAlumni") === "true" ? (
              <li>
                <Link to="/my-chat-page">Your Chat Page</Link>
              </li>
            ) : null}
            <li>
            <Link to="/login">{localStorage.getItem("selectedLanguage")==="ODIA" ? "ଲଗଇନ୍ କରନ୍ତୁ" :"Login"} </Link>
            </li>
            <li>
            <Link to="/register">{localStorage.getItem("selectedLanguage")==="ODIA" ? "ପଞ୍ଜିକରଣ କରନ୍ତୁ" :"Register"} </Link>
            </li>
           {
            localStorage.getItem("registered_username") !== null ? <li>
            <Link onClick={()=>{localStorage.clear(); window.location.reload()}}>Logout</Link>
          </li> : null
           }
          </ul>
          <div className="start">
            <div className="button">
              {localStorage.getItem("selectedLanguage") === "ODIA" ? "SELECT YOUR LANGUAGE" : "ଆପଣଙ୍କ ଭାଷା ଚୟନ କରନ୍ତୁ"}
              <select
                onChange={(e) => languageSelection(e)}
                className="language"
                placeholder="SELECT YOUR LANGUAGE"
              >
                <option value="DEFAULT">CHOOSE</option>
                <option value="ENGLISH">ENGLISH</option>
                <option value="ODIA">ODIA</option>
              </select>
            </div>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? (
              <i className="fa fa-times"> </i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
