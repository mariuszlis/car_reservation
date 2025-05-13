import global_style from "./scss/global.scss";
import style from "./scss/mainScreen.scss";

if (localStorage.getItem("token") !== "123123") {
  window.location.href = "index.html";
}

const $logoutBtn = document.getElementById("logout");
const $dataContainer = document.querySelector(".dataContainer");
const $dropdown = document.getElementById("carTypeDropdown");

function fetchAndDisplayCars(type) {
  fetch(`https://db-api-0s2o.onrender.com/cars?type=${type}`, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API Response:", data);
      $dataContainer.innerHTML = "";
      displayCars(data);
    })
    .catch((error) => {
      console.error("Error connecting to the API:", error);
    });
}

$dropdown.addEventListener("change", (event) => {
  const selectedType = event.target.value;

  if (selectedType === "X") {
    $dataContainer.innerHTML = "";
    return;
  }

  fetchAndDisplayCars(selectedType);
});

$logoutBtn.addEventListener("click", () => {
  localStorage.setItem("token", "");
  window.location.href = "index.html";
});

function displayCars(cars) {
  cars.forEach((car) => {
    const carContainer = document.createElement("div");
    carContainer.classList.add("carContainer");

    carContainer.innerHTML = `
          <div class="carDetails">
            <h3>${car.Brand || "Unknown"} ${car.Model || "Car"}</h3>
            <p>Year: ${car.Year || "N/A"}</p>
            <p>Power: ${car.Power || "N/A"}</p>
            <p>Mileage: ${car.Mileage || "N/A"} km</p>
            <button class="selectCarBtn">Select</button>
          </div>
          <img src="${
            car.Picture
              ? `data:image/jpeg;base64,${car.Picture}`
              : "https://via.placeholder.com/100x100?text=No+Image"
          }" alt="${car.Brand || "Unknown"} ${
      car.Model || "Car"
    }" class="carImage" />
        `;

    const selectButton = carContainer.querySelector(".selectCarBtn");
    selectButton.addEventListener("click", () => {
      selectCar(car);
    });
    $dataContainer.appendChild(carContainer);
  });
}

function selectCar(car) {
  const isConfirmed = confirm(
    `Please approve Your choice: ${car.Brand} ${car.Model}?`
  );
  if (isConfirmed) {
    console.log("Car selected:", car);
  } else {
    console.log("Car selection canceled.");
  }
}
