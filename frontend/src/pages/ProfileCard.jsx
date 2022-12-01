import React from "react";

const ProfileCard = () => {
  const notify = () => {
    Notification.requestPermission().then(permission => {
        if (permission === "granted"){
            new Notification("You have a new message from Tutelage!", {
                body: "Hi..",
            })
        }
    });
}
  return <div>
    <button onClick={()=>notify()}>SEND TEST NOTIFICATION</button>
  </div>;
};

export default ProfileCard;
