import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import $ from "jquery";

function Dashboard({ user_id }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(null);

  const refreshList = () => {
    $(".loader, .overlay").css("display", "block");
    axios.get("/api/users/" + user_id + "/").then((res) => {
      $(".loader, .overlay").css("display", "none");
      setTasks(res.data.tasks);
      setText("");
      setEditing(false);
    });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleDelete = (task) => {
    const config = {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    $(".loader, .overlay").css("display", "block");
    axios.delete("/api/delete-task/" + task.id + "/", config).then(() => {
      $(".loader, .overlay").css("display", "none");

      refreshList();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      task_name: text,
      user: user_id,
    };
    let url = "/api/create-task/";
    if (editing) {
      url = "/api/update-task/" + id + "/";
    }
    const config = {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    $(".loader, .overlay").css("display", "block");
    axios.post(url, data, config).then(() => {
      $(".loader, .overlay").css("display", "none");
      refreshList();
    });
  };

  const handleUpdate = (task) => {
    setText(task.task_name);
    setEditing(true);
    setId(task.id);
  };

  const handleStrike = (task) => {
    const data = {
      task_name: task.task_name,
      isCompleted: !task.isCompleted,
      user: user_id,
    };
    const config = {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    $(".loader, .overlay").css("display", "block");
    axios.post("/api/update-task/" + task.id + "/", data, config).then(() => {
      $(".loader, .overlay").css("display", "none");
      refreshList();
    });
  };

  return (
    <div className="container mt-5">
      <h1>TODO App</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="form-control"
            placeholder="New Task"
          />
        </div>
        <div className="form-group">
          <input value="Add" type="submit" className="btn btn-primary" />
        </div>
      </form>
      <ul className="list-group mt-5">
        {tasks.map((task) => (
          <li className="list-group-item">
            <span
              style={{
                cursor: "pointer",
                textDecoration: task.isCompleted && "line-through",
              }}
              onClick={() => handleStrike(task)}
            >
              {task.task_name}
            </span>
            <span className="float-right">
              <button
                onClick={() => handleUpdate(task)}
                className="fa fa-edit btn btn-info mr-2"
              />
              <button
                onClick={() => handleDelete(task)}
                className="fa fa-trash btn btn-danger"
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user_id: state.user_id,
});

export default connect(mapStateToProps, {})(Dashboard);
