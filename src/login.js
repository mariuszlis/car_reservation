import global_style from "./scss/global.scss";
import style from "./scss/login.scss";

const $loginBtn = document.getElementById("login");
const $password = document.getElementById("password");
const $userName = document.getElementById("username");

if (localStorage.getItem("token") === "123123") {
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
    mode: "cors", // CORS set on API side
    headers: {
      "Content-Type": "application/json", // Required with CORS mode to POST
    },
    body: JSON.stringify({
      name: $userName.value,
      password: $password.value,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.message);
      if (response.isLogged) {
        localStorage.setItem("token", "123123");
        window.location.href = "mainscreen.html";
      } else {
        alert("Login failed: Wrong username or password");
      }
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
