import React from "react"
import { team } from "../../dummydata"


const TeamCard = () => {
  return (
    <>
      {team.map((val) => (
        <center>
        <div className='items shadow'>
          <div className='img'>
            <img src={val.cover} alt='' />
          </div>
          <div className='details'>
            <h2>{val.name}</h2>
            <p>{val.work}</p>
          </div>
        </div>
        </center>
      ))}
    </>
  )
}

export default TeamCard