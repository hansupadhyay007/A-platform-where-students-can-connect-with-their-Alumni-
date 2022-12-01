import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../common/heading/Heading";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <Heading
              subtitle={
                localStorage.getItem("selectedLanguage") === "ODIA"
                  ? "Tutelage କୁ ସ୍ୱାଗତ!"
                  : "Welcome to Tutelage !"
              }
              title={localStorage.getItem("selectedLanguage") === "ODIA"
              ?  "ସର୍ବୋତ୍ତମ ଅନଲାଇନ୍ ଆଲୁମିନି କନେକ୍ସନ୍ ପ୍ଲାଟଫର୍ମ।" : "Best Online Alumni Connection Platform."}
            />
            <p className="sub_text">{
              localStorage.getItem("selectedLanguage") === "ODIA" ? "ଏହା ଏକ ପ୍ଲାଟଫର୍ମ ଯେଉଁଠାରେ ଜଣେ ଛାତ୍ର ସେମାନଙ୍କର ଶିକ୍ଷାଗତ ପାଠ୍ୟକ୍ରମ ବିଷୟରେ ଶିଖିପାରିବେ, ସଂଯୋଗ କରିପାରିବେ ଏବଂ ଜ୍ଞାନ ପାଇପାରିବେ |" : "It is a platform where a student can learn, connect and get knowledge about Odisha."
            }
              
            </p>

            {localStorage.getItem("registered_username") === null ? (
              <div>
                <Link to="/login" className="btn btn-primary button-main">
                  {localStorage.getItem("selectedLanguage") === "ODIA" ? "ଲଗଇନ୍ କରନ୍ତୁ!" : "Login"}
                </Link>
                <Link
                  to="/register"
                  className="btn btn-success button-main"
                >
                  {localStorage.getItem("selectedLanguage") === "ODIA" ? "ପଞ୍ଜିକରଣ କରନ୍ତୁ!" : "Register"}
                </Link>
              </div>
            ) : (
              <p style={{fontWeight:"bolder",fontSize:"30px"}} className="sub_text">
                Welcome Again{" "}
                {localStorage.getItem("registered_username").toUpperCase().replace("@GMAIL.COM","") +
                  " !😇"}
              </p>
            )}
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Hero;
