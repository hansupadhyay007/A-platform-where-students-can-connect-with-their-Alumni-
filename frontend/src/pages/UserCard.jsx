import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";

function UserCard() {
  // fetch the user
  const [Users, setUsers] = useState([]);
  const [copyUsers, setCopyUsers] = useState([]);
  const [SearchValue, setSearchValue] = useState("");
  const fetchUsers = async () => {
    try {
      const options = { method: "GET" };

      fetch("http://localhost:5000/users", options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setUsers(response.filter((u)=>{
            return u.isAlumni === true
          }));
          setCopyUsers(response.filter((u)=>{
            return u.isAlumni === true
          }));
        })
        .catch((err) => console.error(err));
    } catch (error) {}
  };

  const selectUser = (username) => {
    console.log("SELECTED ALUMNI: " + username);
    localStorage.setItem("selected_alumni", username);
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      const filteredItems = copyUsers.filter((user) => {
        return (user.name + user.collegeName)
          .toUpperCase()
          .includes(SearchValue.toUpperCase());
      });
      setCopyUsers(filteredItems);
    } else {
      setCopyUsers(Users);
    }
  };

  const selectCollege = (e) => {
    const valueToSearch = e.target.value;
    if (e.target.value !== "") {
      const filteredItems = Users.filter((user) => {
        return user.collegeName.toUpperCase() === valueToSearch;
      });
      setCopyUsers(filteredItems);
    } else {
      setCopyUsers(Users);
    }
    console.log(copyUsers);
  };

  const selectDegree = (e) => {
    const valueToSearch = e.target.value;
    if (e.target.value !== "") {
      const filteredItems = Users.filter((user) => {
        return user.branch.toUpperCase() === valueToSearch;
      });
      setCopyUsers(filteredItems);
    } else {
      setCopyUsers(Users);
    }
    console.log(copyUsers);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="main">
      {/* users card */}
      <h1>All Alumni</h1>

      <div className="searchBox">
        <input onChange={handleSearchChange} type="text" />
        <select
          onChange={(e) => selectCollege(e)}
          className="language"
          placeholder="SELECT YOUR COLLEGE"
        >
          <option value="">Select College</option>
          <option value="SOA">SOA</option>
          <option value="OUTR">OUTR</option>
          <option value="TRIDENT">TRIDENT</option>
        </select>

        <select
          onChange={(e) => selectDegree(e)}
          className="language"
          placeholder="SELECT YOUR COLLEGE"
        >
          <option value="">Select Degree</option>
          <option value="CSE">CSE</option>
          <option value="EEE">EEE</option>
          <option value="CSIT">CSIT</option>
          <option value="CIVIL">CIVIL</option>
          <option value="+3">+3</option>
        </select>
      </div>

      <br></br>
      <br></br>

      <center>

      {copyUsers.map((user, index) => {
        return (
          <div key={index} className="userCard">
            <div className="profile_image">
              <img src="/sample_profile.jpg" alt="profile_image" />
            </div>
            <div className="reward_points">Points: {user.messages.length}</div>
            <div className="name">{user.name}</div>
            <div className="college_details">
              {user.collegeName} | {user.branch}
            </div>
            <div className="year">
              {user.joiningYear} - {user.passingYear}
            </div>
            <div className="button_container">
              <Link
                className="connect_button"
                to="/chat-page"
                onClick={() => selectUser(user.username)}
              >
                CONNECT
              </Link>
            </div>
          </div>
        );
      })}
        </center>

    </div>
  );
}

export default UserCard;
