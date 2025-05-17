import global_style from "./scss/global.scss";
import style from "./scss/login.scss";

const $loginBtn = document.getElementById("login");
const $password = document.getElementById("password");
const $userName = document.getElementById("username");

if (localStorage.getItem("token")) {
  window.location.href = "mainscreen.html";
}

function handleEnter(e) {
  if (e.key === "Enter") {
    tryToLogin();
  }
}

function tryToLogin() {
  fetch("https://login-api-ussm.onrender.com/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: $userName.value,
      password: $password.value,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.isLogged && response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "mainscreen.html";
      } else {
        alert("Login failed: Wrong username or password");
      }
    })
    .catch((error) => {
      alert("Login failed: Unable to connect to the server.");
      console.error("Login error:", error);
    });
}

$userName.addEventListener("keydown", handleEnter);
$password.addEventListener("keydown", handleEnter);
$loginBtn.addEventListener("click", tryToLogin);
$password.addEventListener("mouseover", () => {
  $password.type = "text";
});
$password.addEventListener("mouseout", () => {
  $password.type = "password";
});
