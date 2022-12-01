import React from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../../dummydata";
import Awrapper from "./Awrapper";

const AboutCard = () => {
  return (
    <>
      <section className="aboutHome">
        <div className="container flexSB">
          <div className="left row">
            <img
              src="/poster_img.png"
              alt=""
            />
          </div>
          <div className="right row">
            <Heading
              subtitle={localStorage.getItem("selectedLanguage") === "ODIA" ?"ଓଡ଼ିଶା ଶିକ୍ଷା ବ୍ୟବସ୍ଥା" : "Odisha Education System"}
              title={localStorage.getItem("selectedLanguage") === "ODIA" ?"ଓଡିଶାରେ ଶିକ୍ଷା ଗ୍ରହଣ କରିବାର ଲାଭ" : "Benefits About Learning in Odisha"}
            />
            <div className="items">
              {homeAbout.map((val, index) => {
                return (
                  <div style={{padding:"15px"}} key={index} className="item flexSB">
                    <div className="img">
                      <img src={val.cover} alt="" />
                    </div>
                    <div className="text">
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  );
};

export default AboutCard;
