import React from "react";
import "./courses.css";
import { online } from "../../dummydata";
import Heading from "../common/heading/Heading";

const OnlineCourses = () => {
  return (
    <>
      <section className="online">
        <div className="container">
          <Heading
           subtitle={localStorage.getItem("selectedLanguage") === "ODIA" ?"ଓଡ଼ିଶା ଶିକ୍ଷାର ବିଶେଷତା" : "Speciality of Odisha Education"}
           title={localStorage.getItem("selectedLanguage") === "ODIA" ?"ଓଡ଼ିଶାରେ ଶିକ୍ଷାର ପ୍ରଗତି" : "Progress of Education in Odisha"}
          />
          <div className="content grid3">
            {online.map((val, index) => (
              <div key={index} className="box">
                <div className="img">
                  <img src={val.cover} alt="" />
                  <img src={val.hoverCover} alt="" className="show" />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineCourses;
