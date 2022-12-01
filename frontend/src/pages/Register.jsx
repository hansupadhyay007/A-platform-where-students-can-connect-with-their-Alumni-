import { useState } from "react";
// import "../../src/";
function Register() {
  // register a user
  const [inputs, setInputs] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [IsAlumni, setIsAlumni] = useState(null);
  const [isSOAverified, setisSOAverified] = useState(false);
  const [Registered, setRegistered] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleDetailsChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails((values) => ({ ...values, [name]: value }));
  };

  const handlePOST = async () => {
    console.log("Register submit...");

    if (IsAlumni === null) {
      alert("Choose one of the following Student / Alumni!");
      return;
    }

    const options = {
      method: "POST",
      body: new URLSearchParams({
        username: inputs.username,
        password: inputs.password,
      }),
    };

    await fetch("http://localhost:5000/register-user", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("registered_username", inputs.username); // save the username in our local storage.
          localStorage.setItem("isAlumni", IsAlumni);
          setRegistered(true);
          alert("✅ User created successfully.");
        } else if (response.status === 404) {
          alert("❌ Username (" + inputs.username + ") already exist!");
          return;
        }
      })
      .catch((err) => console.error(err));
  };

  const handleVerify = async () => {
    console.log("Verifying user...");

    const options = {
      method: "POST",
      body: new URLSearchParams({
        name: userDetails.name,
        year: userDetails.joiningyear,
        rollno: userDetails.rollno,
      }),
    };

    await fetch("http://localhost:5000/verify-student", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.isVerified === true) {
          alert("✅ User Verified!");
          setisSOAverified(true);
        } else {
          alert("❌ User not verified!");
          setisSOAverified(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDetailsPOST = async () => {
    console.log("Details submit...");

    const options = {
      method: "POST",
      body: new URLSearchParams({
        name: userDetails.name,
        username: localStorage.getItem("registered_username"),
        collegename: userDetails.collegename,
        phone: userDetails.phone,
        branch: userDetails.branch,
        joiningyear: userDetails.joiningyear,
        passingyear: userDetails.passingyear,
        rollno: userDetails.rollno,
        isalumni: localStorage.getItem("isAlumni"),
      }),
    };

    await fetch("http://localhost:5000/register-user-details", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("isAlumni", IsAlumni);
          localStorage.setItem("username", inputs.username);
          alert("✅ User Details Updated!");
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };

  const userSelection = (events) => {
    events.target.value === "Alumni" ? setIsAlumni(true) : setIsAlumni(false);
  };

  return (
    <div className="main">
      <h1 className="main_heading">
        REGISTER{" "}
        {IsAlumni === null
          ? "!"
          : IsAlumni
          ? "AS AN ALUMNI!"
          : "AS  A STUDENT!"}
      </h1>
      <div className="radio_choice radio_button">
        <input 
          type="radio"
          name="user_type"
          value="Alumni"
          onChange={userSelection}
        />
        Alumni
        <input
          type="radio"
          name="user_type"
          value="Student"
          onChange={userSelection}
        />
        Student
      </div>
      <div className="formParent">
      <div className="myform">
      <div className="formImage">
            <h4>Welcome!</h4>
          </div>
          <div className="formComponent">
          <h2 className="formHeading">Registration</h2>
        <label className="formLabel">
          Enter your name:
          <input className="formInput"
            type="text"
            name="name"
            value={userDetails.name || ""}
            onChange={handleDetailsChange}
          />
        </label>
        <br />
        <label className="formLabel">
          Enter your rollNo:
          <input className="formInput"
            type="number"
            name="rollno"
            value={userDetails.rollno || ""}
            onChange={handleDetailsChange}
          />
        </label>
        <br></br>
        <label className="formLabel">
          Enter your joining year:
          <input className="formInput"
            type="number"
            name="joiningyear"
            value={userDetails.joiningyear || ""}
            onChange={handleDetailsChange}
          />
        </label>
        <div className="formButton">
        <button className="button-82-pushable" onClick={handleVerify}> <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">Verify</span></button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
      </div>

      {/* After verify form soa website and our server. */}

      {isSOAverified ? (
        Registered || localStorage.getItem("registered_username") !== null ? (
          "You already registered as, " +
          localStorage.getItem("registered_username") +
          "."
        ) : (
          <div className="myform">
            <label className="formLabel">
              Enter your email:
              <input className="formInput"
                type="text"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="formLabel">
              Enter your password:
              <input className="formInput"
                type="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
              />
            </label>
            <button className="button-82-pushable" onClick={handlePOST}> <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">Submit</span></button>
                
          </div>
        )
      ) : null}
      {Registered || localStorage.getItem("registered_username") !== null ? (
        <div className="userform">
          <h1>USER DETAILS FORM</h1>
          <label className="formLabel">
            Enter your name:
            <input className="formInput"
              type="text"
              name="name"
              value={userDetails.name || ""}
              onChange={handleDetailsChange}
            />
          </label>
          <br />
          <label className="formLabel">
            Enter your college name:
            <input className="formInput"
              type="text"
              name="collegename"
              value={userDetails.collegename || ""}
              onChange={handleDetailsChange}
            />
          </label>
          <br />
          <label className="formLabel">
            Enter your joining year:
            <input className="formInput"
              type="text"
              name="joiningyear"
              value={userDetails.joiningyear || ""}
              onChange={handleDetailsChange}
            />
          </label>
          <br />
          <label className="formLabel">
            Enter your passing year:
            <input className="formInput"
              type="text"
              name="passingyear"
              value={userDetails.passingyear || ""}
              onChange={handleDetailsChange}
            />
          </label>
          <br />
          <label className="formLabel">
            Enter your phone:
            <input className="formInput"
              type="text"
              name="phone"
              value={userDetails.phone || ""}
              onChange={handleDetailsChange}
            />
          </label>
          <br />
          <label className="formLabel">
            Enter your branch:
            <input className="formInput"
              type="text"
              name="branch"
              value={userDetails.branch || ""}
              onChange={handleDetailsChange}
            />
          </label>
          <br />
          <label className="formLabel">
            Enter your rollNo:
            <input className="formInput"
              type="text"
              name="rollno"
              value={userDetails.rollno || ""}
              onChange={handleDetailsChange}
            />
          </label>
          <button className="button-82-pushable" onClick={handleDetailsPOST}> <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">Submit</span></button>
        </div>
      ) : null}
      
    </div>
    </div>
    
    </div>
  );
}

export default Register;
