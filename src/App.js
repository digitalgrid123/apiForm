import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({});
  const [user, setUser] = useState([]);
  const handleform = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
  };

  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/api", {
      method: "GET",
    });
    const result = await response.json();
    setUser(result);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <form onSubmit={handleSumbit}>
        <label htmlFor="">username</label>
        <input type="text" name="username" onChange={handleform} />
        <label htmlFor="">Password</label>
        <input type="text" name="password" id="" onChange={handleform} />
        <input type="submit"></input>
      </form>
      <div>
        <ul>
          {user.map((user) => (
            <li>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
