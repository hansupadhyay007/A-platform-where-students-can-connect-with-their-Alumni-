import { useState } from "react";
// import "./App.css";
const Login = () => {
  // register a user
  const [inputs, setInputs] = useState({});
  const [IsRegistered, setIsRegistered] = useState(false);
  const [Loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handlePOST = async () => {
    console.log("Register submit...");

    const options = {
      method: "POST",
      body: new URLSearchParams({
        username: inputs.username,
        password: inputs.password,
      }),
    };

    const option2 = {
      method: "GET",
    };

    setLoading(true);

    await fetch("http://localhost:5000/login-user", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          setIsRegistered(true);
          setLoading(false);
          localStorage.setItem("registered_username", inputs.username); // save the username in our local storage.
          // window.location.reload();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        String(err).includes("Unauthorized")
          ? alert("Wrong Credentials!")
          : console.error(err);
      });

    await fetch(
      `http://localhost:5000/users/${localStorage.getItem(
        "registered_username"
      )}`,
      option2
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        localStorage.setItem("isAlumni",response.isAlumni);
        console.log("Alumni Privilege Updated...");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  return (
    <div className="main">
      <h1 className="main_heading">Login!</h1>
      {Loading ? <div class="d-flex align-items-center">
  <strong>Loading...</strong>
  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
</div> : null}
      {IsRegistered ? (
        <p>logged-in successful.</p>
      ) : (
        <div className="formParent">
        <div className="myform">
        <div className="formImage">
            <h4>Welcome!</h4>
          </div>
          <div className="formComponent">
          <h2 className="formHeading">Login</h2>
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
          <center>
          <button className="button-82-pushable" onClick={handlePOST}> <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">Login</span></button>
          </center>
          
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
        </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Login;
