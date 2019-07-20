const weather = document.querySelector(".js-weather");

const  COORDS = 'coords';
const API_KEY   = "9e75f4c46e2fb9b1e5dc771c27707cc7";

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function (response) {
        return response.json();
    }
    ).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C  @  ${place}`;
    }); //fetch에는가져올 데이터가 들어가면된다. , then은 fetch로 데이터를 다가져오고 그다음실행되는함수이다.

}

//위치정보 스토리지에저장
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//위치정보잘불러왔을때
function handleGeoSucces(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    }; //이렇게 객체 멤버값과 값을 같게할떄는 그냥 latitude, longitude 라고 써도 동작한다.
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
//위치정보 불러오기실패했을때
function handleGeoError(position) {
    console.log('Cant access geolocation');
}

//위치정보이용 허락맡기(사용자가수락해야함)
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError )
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}
function  init() {
    loadCoords();
}
init();