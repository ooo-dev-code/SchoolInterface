import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import "../style/Home.css"
import axios from "axios";

function Home() {
  const { user } = useAuthContext();
  const [homework, setHomework] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/homework")
      .then((response) => {
        setHomework(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching homework:", error);
      });
  }, []);

  return (
    <div>
      {user && <h1 className="welcome">Welcome {user.user.username}</h1>}

      {user && user.user.role === "student" && (
        <div>
          <div className="home">
            <h2>Student Home</h2>
            <p>Here you can view your homework and grades.</p>
          </div>

          <div className="homework-list">
            <h3>Your Homework</h3>
            <ul>
              {homework
                .filter((hw) => hw.classes === user.user.classes) // Filter by class
                .sort((a, b) => {
                  const monthOrder = [
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
                  ];
                  const monthDiff =
                    monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
                  if (monthDiff !== 0) return monthDiff;
                  if (a.day !== b.day) return a.day - b.day;
                  return a.number - b.number;
                })
                .map((hw) => (
                  <li key={hw._id}>
                    <h4>{hw.title}</h4>
                    <p>{hw.description}</p>
                    <p>{hw.classes}</p>
                    <p>
                      {hw.month} {hw.day}, {hw.number}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
