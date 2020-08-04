const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "f32f5fc18d0a6077735f05541ac6434b";

function getWeather(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //   console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerHTML = `${temperature} @ ${place}`;
    }); // get data from weather api By geographic coordinates
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치 권한 허용 시 발생
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

// 위치 권한 차단 시 발생
function handleGeoError() {
  console.log("handleGeoError");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); // get 위치정보
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    // 위치 좌표가 localStorage에 없을 때 발생
    askForCoords();
  } else {
    // 위치 좌표가 localStorage에 존재할 때 발생
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
