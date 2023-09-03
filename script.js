const apiKey = "5681e50604ce5f0c2c6b30c73d703db4";
const fetchDataBtn = document.querySelector("#fetchBtn");

const map = document.querySelector(".map");
const data = document.querySelector(".data");
const lowerPart = document.querySelector(".lowerPart");


async function dataFetch(lat, long) {
    try{
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=current&appid=${apiKey}&units=metric`
  );
  return await promise.json();
}
catch(error){
    console.log("some error occured");
}
}

async function GetCoord(position) {
    try{
  const result = await dataFetch(
    position.coords.latitude,
    position.coords.longitude
  );
  console.log(result);
  getDetails(result);
}
catch(error){
    console.log("some error occured");
}
}

function locationErr() {
  console.log("There was Some issue");
}

fetchDataBtn.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(GetCoord, locationErr);
});

function pageLoad() {
  document.querySelector(".upperPart").remove();
}


function getDetails(result) {
  pageLoad();
  const url = `https://maps.google.com/maps/?q=${result.coord.lat},${result.coord.lon}&output=embed`;
  lowerPart.innerHTML = `
  <div class="top">
          <h2>Welcome To The Weather App</h2>
          <p>Here is your current location</p>
          <div class="latlong">
            <p>Lat:<span class="lat">${result.coord.lat}</span></p>
            <p>Long:<span class="long"> ${result.coord.lon}</span></p>
          </div>
          <div class="map" id="map">
          <iframe
          src=${url}
          width="360"
          height="270"
          frameborder="0"
          style="width: 90vw;
          height: 70vh;margin-top:3rem; margin-bottom:104px;margin-right:50px"></iframe>
          </div>
        </div>
  <div class="down">
          <div>
            <h2>Your Weather Data</h2>
          </div>
          <div class="data">
          <p>Location :<span>${result.name}</span></p>
            <p>Wind Speed :<span>${((result.wind.speed)*3.6)} kmph</span></p>
            <p>Humidity :<span>${((result.main.humidity)*30/100)}</span></p>
            <p>Time Zone : GMT +<span>${((result.timezone)/1/(60*60))} </span></p>
            <p>Pressure :<span>${((result.main.pressure)*0.00987)} atm</span></p>
            <p>Wind Direction :<span>${result.wind.deg}°</span></p>
            <p>UV Index :<span>${((result.wind.gust))}</span></p>
            <p>Feels like :<span>${result.main.feels_like}°</span></p>
          </div>
        </div>
    `;
}
