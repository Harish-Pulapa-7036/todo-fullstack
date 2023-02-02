import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './signin.css'

const Signin = () => {
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  const submitsignin = async () => {
    if (user.password && user.username) {
      await axios
        .post("https://backend-service-todo.onrender.com/signin", user)
        .then((res) => {
          
          if (res.data.message == "success") {
            localStorage.setItem("token", res.data.token);
            

            localStorage.setItem("username", res.data.username);
            alert("login Succesfull");
            navigate('/todopage')
            
          }
          if (res.data.message == "invalid password") {
            alert("invalid password");
          }
          if (res.data.message == "user is not existed") {
            alert("user is not existed");
          }
        })
        .catch((e) => console.log(e));
    } else {
      alert("input fields should not be empty");
    }
  };

  return (
    <div id="container">
      <h3>wait some time to getin</h3>
      <input
      className="sign-inp"
      placeholder="username"
        type="text"
        onChange={(e) => {
          setuser({ ...user, username: e.target.value });
        }}
      />
      <br />
      <input
      className="sign-inp"
      placeholder="password"
        type="text"
        onChange={(e) => {
          setuser({ ...user, password: e.target.value });
        }}
      />
      <br />
      <button className="sign-btn" onClick={submitsignin}>Signin</button>
      <button
      className="sign-btn"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup
      </button>
    </div>
  );
};
export default Signin;
