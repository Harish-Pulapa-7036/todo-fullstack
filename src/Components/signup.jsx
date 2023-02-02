import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './signin.css'
const Signup = () => {
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  const submitsignup = async () => {
    if (user.confirmpassword && user.password && user.username) {
      if (user.confirmpassword == user.password) {
        await axios
          .post("https://backend-service-todo.onrender.com/signup", user)
          .then((res) => {
            console.log(res.data.data);

            alert(res.data.message);
            navigate("/");
          })
          .catch((e) => console.log(e));
      } else {
        alert("password and confirmpassword are not same");
      }
    } else {
      alert("input fields should not be empty");
    }
  };
  return (
    <div id="container">
      <input
        className="sign-inp"
        placeholder="username"
        type="text"
        onChange={(e) => {
          setuser({ ...user, username: e.target.value });
        }}
      />
      <input
      className="sign-inp"
      placeholder="password"
        type="text"
        onChange={(e) => {
          setuser({ ...user, password: e.target.value });
        }}
      />
      <input
      className="sign-inp"
      placeholder="confirmpassword"
        type="text"
        onChange={(e) => {
          setuser({ ...user, confirmpassword: e.target.value });
        }}
      />
      <br />
      <button  className="sign-btn" onClick={submitsignup}>Signup</button>
    </div>
  );
};
export default Signup;
