import global_style from "./scss/global.scss";
import style from "./scss/mainScreen.scss";

if (localStorage.getItem("token") !== "123123") {
  window.location.href = "index.html";
}

const $logoutBtn = document.getElementById("logout");

$logoutBtn.addEventListener("click", () => {
  localStorage.setItem("token", "");
  window.location.href = "index.html";
});
