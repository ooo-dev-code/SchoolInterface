import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

function Homeworks() {
  const { user } = useAuthContext();
  const [homework, setHomework] = useState([]);
  const [description, setDescription] = useState("");
  const [classes, setClasses] = useState("");
  const [subject, setSubject] = useState(user.user.subjects);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [number, setNumber] = useState("");
  const [assignedBy, setAssignedBy] = useState(user.user._id);

  useEffect(() => {
    axios
      .get("http://localhost:5000/homework")
      .then((response) => {
        setHomework(response.data);
        console.log(response.data);
        console.log();
      })
      .catch((error) => {
        console.error("Error fetching homework:", error);
      });
  }, []);

  const del = (_id) => {
    axios
      .delete(`http://localhost:5000/homework/${_id}`)
      .then(() => {
        setHomework((prevHomework) =>
          prevHomework.filter((hw) => hw._id !== _id)
        );
        console.log(`User with ID ${_id} deleted successfully`);
      })
      .catch((error) => {
        console.error("Error deleting hw:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const homeworkData = {
      description,
      classes,
      subject,
      day,
      month,
      number,
      assignedBy,
    };

    await axios
      .post("http://localhost:5000/homework", homeworkData)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating homework:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add Homeworks</h1>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="classes">Classes:</label>
        <input
          type="text"
          id="classes"
          value={classes}
          onChange={(e) => setClasses(e.target.value)}
          required
        />

        <label htmlFor="day">Day:</label>
        <select
          id="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        >
          <option value="">Select a day</option>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <label htmlFor="month">Month:</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        >
          <option value="">Select a month</option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <label htmlFor="number">Number:</label>
        <input
          type="number"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          min="1"
          max={
            month === "February"
              ? 28
              : ["April", "June", "September", "November"].includes(month)
              ? 30
              : 31
          }
          required
        />

        <button type="submit">Submit</button>
      </form>

      <h1>Homeworks</h1>
      {homework.map((hw) => {
        return (
          <table
            key={hw._id}
            border="1"
            style={{ margin: "10px 0", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Description</th>
                <th>Classes</th>
                <th>Subject</th>
                <th>Day</th>
                <th>Month</th>
                <th>Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{hw.description}</td>
                <td>{hw.classes}</td>
                <td>{hw.subject}</td>
                <td>{hw.day}</td>
                <td>{hw.month}</td>
                <td>{hw.number}</td>
                <td>
                  <button onClick={() => del(hw._id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}

export default Homeworks;
