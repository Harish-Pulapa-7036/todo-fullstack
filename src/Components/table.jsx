import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import './table.css'

const Table = () => {
  const [input, setinput] = useState({ Activity: "" });

  const token = localStorage.getItem("token");
  const [style, setstyle] = useState(false);
  const [activities, setactivities] = useState([]);
  const config = {
    headers: {
      token: token,
    },
  };
  useEffect(() => {
    axios
      .get("https://backend-service-todo.onrender.com/activities/all", config)
      .then((res) => {
        setactivities(res.data.data);
       
      })
      .catch((e) => console.log(e));
  }, []);
  const startsend = async (id) => {
    setstyle(true);
    await axios
      .get(`https://backend-service-todo.onrender.com/activities/start/${id}`, config)
      .then((res) => {
        setactivities(res.data.data);
      })
      .catch((e) => console.log(e));
  };
  const endsend = async (id) => {
    setstyle(true);
    await axios
      .get(`https://backend-service-todo.onrender.com/activities/end/${id}`, config)
      .then((res) => {
        setactivities(res.data.data);
      })
      .catch((e) => console.log(e));
  };
  const pausesend = async (id) => {
    setstyle(true);
    await axios
      .get(`https://backend-service-todo.onrender.com/activities/pause/${id}`, config)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }
        setactivities(res.data.data);
      })
      .catch((e) => console.log(e));
  };
  const sendinput = async (input) => {
    await axios
      .post("https://backend-service-todo.onrender.com/activities/all", input, config)
      .then((res) => {
        
        setactivities([...activities,res.data.data]);
        document.location.reload()
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <input id="todo-inp"
        type="text"
        placeholder="Enter Todo"
        onChange={(e) => {
          setinput({ ...input, Activity: e.target.value });
        }}
      />
      <button
        id="act-btn"
        onClick={() => {
          sendinput(input);
        }}
      >
        Add New Activity
      </button>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Status</th>
            <th>Time taken in hrs:min;sec</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activities?.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.Activity}</td>
                <td>{item.status}</td>
                <td>0.00</td>
                <td>
                  {!style && (
                    <button
                      onClick={() => {
                        startsend(item._id);
                      }}
                    >
                      Start
                    </button>
                  )}
                  {style && (
                    <>
                      {" "}
                      <button
                        onClick={() => {
                          endsend(item._id);
                        }}
                      >
                        end
                      </button>
                      <button
                        onClick={() => {
                          pausesend(item._id);
                        }}
                      >
                        pause
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
