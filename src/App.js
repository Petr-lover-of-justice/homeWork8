import React from "react";


// import "./styles.css";

function App() {

  const [users, setUsers] = React.useState([])

  const getDataUsers = async () => {
    try {
      await fetch("https://618e3ea350e24d0017ce1178.mockapi.io/e").then((res) => {
        res.json().then((result) => {
          setUsers(result)
        });
      });
    } catch (error) {
      console.log(error + "Ошибка при отправки")
    }
  }
  return (
    <div className="App">
      <ul>
        {users.map((obj) => (
          <li key={obj.id}>{obj.name}</li>
        ))}
      </ul>
      <button onClick={getDataUsers}> Are you want to user?
      </button>
    </div>
  );
}

export default App;

