import React from "react"
import Heading from "../common/heading/Heading"
import PriceCard from "../pricing/PriceCard"

const Hprice = () => {
  return (
    <>
      <section className='hprice padding'>
        <Heading subtitle={localStorage.getItem("selectedLanguage") === "ODIA" ?"ନୂତନ ବୈଶିଷ୍ଟ୍ୟଗୁଡିକ" : "NEW FEATURES"}
              title={localStorage.getItem("selectedLanguage") === "ODIA" ?"ପଞ୍ଜିକୃତ ପୁରାତନ ଛାତ୍ରଙ୍କ ପାଇଁ" : "FOR REGISTERED ALUMNI"} />
        <div className='price container grid'>
          <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Hprice