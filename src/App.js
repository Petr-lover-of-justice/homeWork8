import React from "react";
import axios from "axios";


import "./style.css";






function App() {
  const [users, setUsers] = React.useState([]);
  const [inputDog, setInputDog] = React.useState("");
  const [state, setState] = React.useState({
    disabled: false,
    isUser: false,
    loidng: false,
    userNot: false
  })

  const getUser = async () => {
    try {
      setState({
        ...state,
        disabled: true,
        isUser: false,
        loidng: true,
        userNot: false
      })
      let res = await axios.get(`https://api.github.com/users/${inputDog}`)
      setUsers(res.data)
      setState({
        ...state,
        disabled: false,
        isUser: true,
        loidng: false,
        userNot: false
      })
    } catch (error) {
      setState({
        ...state,
        disabled: false,
        isUser: false,
        loidng: false,
        userNot: true
      })
      console.log(error + "Ошибка при отправки")
    }
  }



  React.useEffect(() => {
    let login = window.location.href.split('=');
    console.log(login)
    if (login[1]) {
      setInputDog(login[1]);
    }
  }, []);


  React.useEffect(() => {
    if (inputDog) {
      let pathName = `${window.location.pathname}?login=${inputDog}`;
      console.log(inputDog);
      window.history.pushState(null, document.title, pathName);
      getUser();
    }


  }, [inputDog]);


  return (
    <div id="app">

      <div className="app-container">
        <div className="app-form" >
          <input type="text"
            className="app-input"
            placeholder="Укажите GitHub-аккаунт"
            onChange={(e) => {
              setInputDog(e.target.value.trim())
            }}

            value={inputDog}
          />
          <button className=
            {`${!state.disabled ? "app-form_btn" : "app-form_btn_disable"}`}
            onClick={getUser}
            disabled={state.disabled}>
            Найти
          </button>
          {state.loidng && <div> Ишем вашего человека</div>}
          {state.userNot && <div> "юзер не найден" попробуйте снова  </div>}


        </div>
        {state.isUser && <div className="app-user">
          <div className="app-user_info">
            <div className="app-user_image">
              <img
                className="app-image_avatar"
                src={users.avatar_url}
                alt=""
              />
            </div>
            <div className="app-user_data">
              <h1 className="app-user_name">
                {users.name}
                <span>{users.login}</span>
              </h1>
              <p className="app-user_about">
                {users.bio}
              </p>
            </div>
          </div>
          <ul className="app-user_stats">
            <li className="app-user_stats-item">
              Репозитории
              <br />
              <span>{users.public_repos}</span>
            </li>
            <li className="app-user_stats-item">
              Подписчиков
              <br />
              <span>{users.followers}
              </span>
            </li>
            <li className="app-user_stats-item">
              Действий
              <br />
              <span>{users.following}</span>
            </li>
          </ul>
          <ul className="app-user_location">
            <li className="app-user_location-item">{users.location}</li>
            <li className="app-user_location-item">
              <a href={users.html_url}>{users.html_url}</a>
            </li>
          </ul>
        </div>
        }
      </div>

    </div >
  );
}


export default App;

