import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>{localStorage.getItem("selectedLanguage") === "ODIA" ? "ଟୁଟେଲେଜ୍" : "Tutelage"}</h1>
            <span><i>{localStorage.getItem("selectedLanguage") === "ODIA" ? "ଏକ ୱେବସାଇଟ୍ ଯାହା ଆମକୁ ଏକାଠି କରେ..." : "A Website That Brings Us Together..."}</i></span>
          </div>

          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head