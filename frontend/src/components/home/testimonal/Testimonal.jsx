import React from "react"
import { testimonal } from "../../../dummydata"
import Heading from "../../common/heading/Heading"
import "./style.css"

const Testimonal = () => {
  return (
    <>
      <section className='testimonal padding'>
        <div className='container'>
          <Heading subtitle={localStorage.getItem("selectedLanguage") === "ODIA" ? "ନାମଲେଖା ବ୍ୟବସ୍ଥା" : 'ADMISSION SYSTEM'} title={localStorage.getItem("selectedLanguage") === "ODIA" ? "ଓଡ଼ିଶାରେ ନାମଲେଖା ବ୍ୟବସ୍ଥା" : "Admission System in Odisha"} />

          <div className='content grid2'>
            {testimonal.map((val) => (
              <div className='items shadow'>
                <div className='box flex'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{val.name}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonal