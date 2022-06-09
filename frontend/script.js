"use strict";



let morningCloudy = document.getElementById("cloudyMorning");
let dayCloudy = document.getElementById("cloudyDay");
let nightCloudy = document.getElementById("cloudyNight");
let morningSnowy = document.getElementById("snowyMorning");
let daySnowy = document.getElementById("snowyDay");
let nightSnowy = document.getElementById("snowyNight");
let morningThunder = document.getElementById("thunderyMorning");
let dayThunder = document.getElementById("thunderyDay");
let nightThunder = document.getElementById("thunderyNight");
let morningClear = document.getElementById("clearyMorning");
let dayClear = document.getElementById("clearyDay");
let nightClear = document.getElementById("clearyNight");
let morningRain = document.getElementById("rainyMorning");
let dayRain = document.getElementById("rainyDay");
let nightRain = document.getElementById("rainyNight");
let container = document.querySelector(".container");
let sun = document.querySelector(".sun");
let star = document.querySelectorAll(".star");
let starBottom = document.querySelectorAll(".starBottom");
let info = document.querySelector(".info");
let cloudy = document.querySelector(".cloudy")
let snowy = document.querySelector(".snow")
let rain = document.querySelector(".rain")
let thunder = document.querySelector(".thunder");
let cm = "sun--cloudyMorning";
let cd = "sun--cloudyNight";
let cn = "sun--cloudyDay";
let timezone;
let cityInput = document.querySelector(".container2 input");
let searchBtn = document.getElementById("search");
let getLocationBtn = document.getElementById("getLocation");
let mesure = document.querySelector(".mesure");
let btnBack = document.querySelector(".btn--back");

//Call OpenWeatherMap API by city
async function callWeatherApi(id) {
    let url = `/api?q=${id}`;
    let call = await fetch(url);
    let response = await call.json();
    let info;

    if (response.cod > 400) {
        info = {
            "message": "erreur",
            "err": response
        }
    } else {
        info = {
            "timezone": response.timezone,
            "sunrise": response.sys.sunrise,
            "sunset": response.sys.sunset,
            "dataTime": response.dt,
            "city": response.name,
            "weatherID": response.weather[0].id,
            "weatherDescription": response.weather.description,
            "temp": response.main.temp
        }
    }
    return info;

}



//Call OpenWeatherMap API by geolocalisation
async function callWeatherApiByGeo(lat, lon) {
    let call = await fetch(`/api?lat=${lat}&lon=${lon}`);
    let response = await call.json();
    let info;

    if (response.cod > 400) {
        info = {
            "message": "erreur",
            "err": response
        }
    } else {
        info = {
            "timezone": response.timezone,
            "sunrise": response.sys.sunrise,
            "sunset": response.sys.sunset,
            "dataTime": response.dt,
            "city": response.name,
            "weatherID": response.weather[0].id,
            "weatherDescription": response.weather.description,
            "temp": response.main.temp
        }
    }
    return info;

}
//return moment of the day at the locations weather.
function dayOrNight(information) {

    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let cityTime = utc + (1000 * information.timezone);
    let nd = new Date(cityTime);
    let ndToString = nd.toString();
    let split = ndToString.split(" ");
    let time = split[4];
    let timeSplit = time.split(":");
    let hour = timeSplit[0];
    let timeOfTheDay;

    if (information.dataTime > information.sunrise && information.dataTime < information.sunset) {
        if (hour > 12) {
            timeOfTheDay = "Day"
        } else {
            timeOfTheDay = "Morning"
        }
    } else {
        timeOfTheDay = "Night";
    }

    return timeOfTheDay;
}


function timer() {

    let d = new Date();
    let localTime = d.getTime()
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset
    let cityTime = utc + (1000 * timezone);
    let nd = new Date(cityTime);
    let ndString = nd.toString();
    let split = ndString.split(" ");
    let day = split[2]
    let month = split[1];
    let year = split[3]
    let yearTwoLastDigit = year.slice(-2);
    let time = split[4];
    let timeSplit = time.split(":")
    let hour = timeSplit[0];
    let minutes = timeSplit[1];
    let sec = timeSplit[2];
    document.querySelector(".time").innerText = `${hour}:${minutes}:${sec}`;
    document.querySelector(".date").innerHTML = `${day} <span><br /> ${month} <br />${yearTwoLastDigit}</div>`

    setTimeout(timer, 1000);

}
let celsiusDisplay;
let fahrenheitDisplay;

function weatherInfo(information, e) {

    let tempToCelsius = (information.temp - 273.15).toString();
    let celsiusSplit = tempToCelsius.split(".");
    celsiusDisplay = celsiusSplit[0];
    let tempToFahrenheit = ((information.temp - 273.15) * 9 / 5 + 32.).toString();
    let fahrenheitSplit = tempToFahrenheit.split(".");
    fahrenheitDisplay = fahrenheitSplit[0];
    let cityInfo = information.city;
    let city = cityInfo.toUpperCase();
    let weatherID = information.weatherID;
    let weather; //wait to know what king of weather

    document.querySelector(".temperature").innerText = celsiusDisplay;
    document.querySelector(".mesure").innerText = "C°";
    document.querySelector(".town").innerText = city;

    if (weatherID > 199 && weatherID < 233) {
        weather = "thunder";
    }
    if (weatherID > 299 && weatherID < 533) {
        weather = "rain";
    }
    if (weatherID > 599 && weatherID < 633) {
        weather = "snow";
    }
    if (weatherID == 800) {
        weather = "clear";
    }
    if (weatherID > 800) {
        weather = "cloud"
    }
    //create keyword to get the right css class
    let cssClass = weather + e;

    if (cssClass === "clearMorning") {
        clearM();
    }
    if (cssClass === "clearDay") {
        clearD();
    }
    if (cssClass === "clearNight") {
        clearN();
    }
    if (cssClass === "cloudMorning") {
        cloudM();
    }
    if (cssClass === "cloudDay") {
        cloudD();
    }
    if (cssClass === "cloudNight") {
        cloudN();
    }
    if (cssClass === "rainMorning") {
        rainM();
    }
    if (cssClass === "rainDay") {
        rainD();
    }
    if (cssClass === "rainNight") {
        rainN();
    }
    if (cssClass === "thunderMorning") {
        thunderM();
    }
    if (cssClass === "thunderDay") {
        thunderD();
    }
    if (cssClass === "thunderNight") {
        thunderN();
    }
    if (cssClass === "snowMorning") {
        snowM();
    }
    if (cssClass === "snowDay") {
        snowD();
    }
    if (cssClass === "snowNight") {
        snowN();
    }

}

function clearM() {
    sun.classList.remove(...sun.classList);
    sun.classList.add("sun", "sun--clearMorning");

    container.classList.remove(...container.classList);
    container.classList.add("container", "container--clearMorning");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--clearMorning");
    star.forEach(e => {
        e.style.display = "none";
    })
    cloudy.style.display = "none";
    sun.style.display = "flex";
    snowy.style.display = "none";
    rain.style.display = "none";
    thunder.style.display = "none";
    mesure.style.opacity = 1;
}

function clearD() {
    sun.classList.remove(...sun.classList);
    sun.classList.add("sun", "sun--clearDay");

    container.classList.remove(...container.classList);
    container.classList.add("container", "container--clearDay");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--clearDay");
    star.forEach(e => {
        e.style.display = "none";
    })
    cloudy.style.display = "none";
    sun.style.display = "flex";
    snowy.style.display = "none";
    rain.style.display = "none";
    thunder.style.display = "none";
    mesure.style.opacity = 1;
}

function clearN() {
    sun.classList.remove(...sun.classList);
    sun.classList.add("sun", "sun--clearNight");

    container.classList.remove(...container.classList);
    container.classList.add("container", "container--clearNight");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--clearNight");

    star.forEach(e => {
        e.style.display = "block";
    })
    starBottom.forEach(e => {
        e.style.display = "block";
    })

    cloudy.style.display = "none";
    sun.style.display = "flex";
    snowy.style.display = "none";
    rain.style.display = "none";
    thunder.style.display = "none";
    mesure.style.opacity = 1;
}

function cloudM() {
    sun.classList.remove(...sun.classList);
    sun.classList.add("sun", "sun--cloudyMorning");

    container.classList.remove(...container.classList);
    container.classList.add("container", "container--cloudyMorning");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--cloudyMorning");
    star.forEach(e => {
        e.style.display = "none";
    })
    cloudy.style.display = "block";
    sun.style.display = "flex";
    snowy.style.display = "none";
    rain.style.display = "none";
    thunder.style.display = "none";
    mesure.style.opacity = 0.3;
}

function cloudD() {
    document.querySelector(".bigBox").display = "block";
    sun.classList.remove(...sun.classList);
    sun.classList.add("sun", "sun--cloudyDay");

    container.classList.remove(...container.classList);
    container.classList.add("container", "container--cloudyDay");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--cloudyDay");
    star.forEach(e => {
        e.style.display = "none";
    })
    cloudy.style.display = "block";
    sun.style.display = "flex";
    snowy.style.display = "none";
    rain.style.display = "none";
    thunder.style.display = "none";
    mesure.style.opacity = 0.3;
}

function cloudN() {
    sun.classList.remove(...sun.classList);
    sun.classList.add("sun", "sun--cloudyNight");

    container.classList.remove(...container.classList);
    container.classList.add("container", "container--cloudyNight");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--cloudyNight");
    star.forEach(e => {
        e.style.display = "block";
    })
    starBottom.forEach(e => {
        e.style.display = "block";
    })
    cloudy.style.display = "block";
    sun.style.display = "flex";
    snowy.style.display = "none";
    rain.style.display = "none";
    thunder.style.display = "none";
    mesure.style.opacity = 0.3;
}

function rainM() {
    container.classList.remove(...container.classList);
    container.classList.add("container", "container--rainMorning");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--rainMorning");

    star.forEach(e => {
        e.style.display = "none";
    })

    cloudy.style.display = "block";
    sun.style.display = "none";
    snowy.style.display = "none";
    rain.style.display = "flex";
    thunder.style.display = "none";
    mesure.style.opacity = 0.3;
}

function rainD() {
    container.classList.remove(...container.classList);
    container.classList.add("container", "container--rainDay");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--rainDay");

    star.forEach(e => {
        e.style.display = "none";
    })

    cloudy.style.display = "block";
    sun.style.display = "none";
    snowy.style.display = "none";
    rain.style.display = "flex";
    thunder.style.display = "none";
    mesure.style.opacity = 0.3;
}

function rainN() {
    container.classList.remove(...container.classList);
    container.classList.add("container", "container--rainNight");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--rainNight");

    star.forEach(e => {
        e.style.display = "block";
    })
    starBottom.forEach(e => {
        e.style.display = "none";
    })

    cloudy.style.display = "block";
    sun.style.display = "none";
    snowy.style.display = "none";
    rain.style.display = "flex";
    thunder.style.display = "none";
    mesure.style.opacity = 0.3;
}

function thunderM() {
    container.classList.remove(...container.classList);
    container.classList.add("container", "container--thunderMorning");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--thunderMorning");

    star.forEach(e => {
        e.style.display = "none";
    })

    cloudy.style.display = "block";
    sun.style.display = "none";
    snowy.style.display = "none";
    rain.style.display = "flex";
    thunder.style.display = "block";
    mesure.style.opacity = 0.3;
}

function thunderD() {
    container.classList.remove(...container.classList);
    container.classList.add("container", "container--thunderDay");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--thunderDay");

    star.forEach(e => {
        e.style.display = "none";
    })

    cloudy.style.display = "block";
    sun.style.display = "none";
    snowy.style.display = "none";
    rain.style.display = "flex";
    thunder.style.display = "block";
    mesure.style.opacity = 0.3;
}

function thunderN() {
    container.classList.remove(...container.classList);
    container.classList.add("container", "container--thunderNight");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--thunderNight");

    star.forEach(e => {
        e.style.display = "block";
    })
    starBottom.forEach(e => {
        e.style.display = "none";
    })

    cloudy.style.display = "block";
    sun.style.display = "none";
    snowy.style.display = "none";
    rain.style.display = "flex";
    thunder.style.display = "block";
    mesure.style.opacity = 0.3;
}

function snowM() {
    container.classList.remove(...container.classList);
    container.classList.add("container", "container--snowMorning");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--snowMorning");

    star.forEach(e => {
        e.style.display = "none";
    })


    cloudy.style.display = "block";
    sun.style.display = "none";
    snowy.style.display = "block";
    rain.style.display = "none";
    thunder.style.display = "none";
    mesure.style.opacity = 0.3;
}

function snowD() {
    document.querySelector(".bigBox").display = "block";
    container.classList.remove(...container.classList);
    container.classList.add("container", "container--snowDay");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--snowDay");

    star.forEach(e => {
        e.style.display = "none";
    })


    cloudy.style.display = "block";
    sun.style.display = "none";
    snowy.style.display = "block";
    rain.style.display = "none";
    thunder.style.display = "none";
    mesure.style.opacity = 0.3;
}

function snowN() {
    document.querySelector(".bigBox").display = "block";
    container.classList.remove(...container.classList);
    container.classList.add("container", "container--snowNight");

    info.classList.remove(...info.classList);
    info.classList.add("info", "info--snowNight");

    star.forEach(e => {
        e.style.display = "block";
    })
    starBottom.forEach(e => {
        e.style.display = "none";
    })


    cloudy.style.display = "block";
    sun.style.display = "none";
    snowy.style.display = "block";
    rain.style.display = "none";
    thunder.style.display = "none";
    mesure.style.opacity = 0.3;
}

//switch to fahrenheit or Celsius when clicked
let btnSwitchCtoF = document.querySelector(".mesure");
let temperatureSwitch = document.querySelector(".temperature");

btnSwitchCtoF.addEventListener("pointerdown", e => {
    e.preventDefault();

    if (btnSwitchCtoF.innerText === "C°") {
        btnSwitchCtoF.innerText = "F°";
        temperatureSwitch.innerText = fahrenheitDisplay;
    } else {
        btnSwitchCtoF.innerText = "C°";
        temperatureSwitch.innerText = celsiusDisplay;
    }
})

//call the API by city search
searchBtn.addEventListener("pointerdown", async e => {
    e.preventDefault();
    if (cityInput.value != "") {
        let info = await callWeatherApi(cityInput.value);
        timezone = info.timezone;
        timer();
        let timeOfTheDay = dayOrNight(info);
        weatherInfo(info, timeOfTheDay);
        cityInput.value = "";
        document.querySelector(".bigBox").style.display = "block";
        document.querySelector(".container2").style.display = "none";
    }else{
        console.log("please enter a city!")
    }
})

//call the API when pressing Enter
cityInput.addEventListener("keyup", async d => {
    if (d.key === "Enter" && cityInput.value != "") {
        let info = await callWeatherApi(cityInput.value);
        if (info.message === "erreur") {
            console.log("erreur");

        } else {
            timezone = info.timezone;
            timer();
            let timeOfTheDay = dayOrNight(info);
            weatherInfo(info, timeOfTheDay);
            cityInput.value = "";
            document.querySelector(".bigBox").style.display = "block";
            document.querySelector(".container2").style.display = "none";

        }
    }
})

let optionsLocalisation = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0

  };
//Call the API with geolocalisation
  async function successLocalisation(pos) {
    let crd = pos.coords;
    let lat = crd.latitude
    let lon = crd.longitude
   
    let info = await callWeatherApiByGeo(lat, lon);
    
    timezone = info.timezone;
    timer();
    let timeOfTheDay = dayOrNight(info);
    weatherInfo(info, timeOfTheDay);
    document.querySelector(".bigBox").style.display = "block";
    document.querySelector(".container2").style.display = "none";

  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

getLocationBtn.addEventListener("pointerdown", async d=>{
    
    navigator.geolocation.getCurrentPosition(successLocalisation, error, optionsLocalisation);
    
})

btnBack.addEventListener("pointerdown", e => {
    document.querySelector(".bigBox").style.display = "none";
    document.querySelector(".container2").style.display = "flex";
})



// function initMap() {
//     let inputAutocomplete = new google.maps.places.Autocomplete(document.getElementById("input", {
//         types: [('cities')]
//     }));
// }

// initMap();

//DRAWER BUTTONS
morningClear.addEventListener("pointerdown", e => {
    clearM();
})
dayClear.addEventListener("pointerdown", e => {
    clearD();
})
nightClear.addEventListener("pointerdown", e => {
    clearN();
})
morningCloudy.addEventListener("pointerdown", e => {
    cloudM();
})
dayCloudy.addEventListener("pointerdown", e => {
    cloudD();
})
nightCloudy.addEventListener("pointerdown", e => {
    cloudN();
})
morningRain.addEventListener("pointerdown", e => {
    rainM();
})
dayRain.addEventListener("pointerdown", e => {

    rainD();
})
nightRain.addEventListener("pointerdown", e => {
    rainN();
})
morningThunder.addEventListener("pointerdown", e => {
    thunderM();
})
dayThunder.addEventListener("pointerdown", e => {
    thunderD();
})
nightThunder.addEventListener("pointerdown", e => {
    thunderN();
})
morningSnowy.addEventListener("pointerdown", e => {
    snowM();
})
daySnowy.addEventListener("pointerdown", e => {
    snowD();
})

nightSnowy.addEventListener("pointerdown", e => {
    snowN();
})





//DRAWER
let drawerbox = document.querySelector(".drawerbox")
let drawer = document.querySelector(".drawer");
let arrowDown = drawerbox.querySelector(".arrow--drawer");
let arrowDownHover = drawerbox.querySelector(".arrow--drawer:hover");

//OPENING THE DRAWER AND CLOSING DRAWER WITH ARROWS
arrowDown.onpointerdown = function (event) {
    arrowDown.addEventListener("touchstart", e => {
        e.preventDefault();
    })
    arrowDown.addEventListener("touchmove", e => {
        e.preventDefault();
    })

    event.preventDefault();
    let shiftY = event.clientY - arrowDown.getBoundingClientRect().top;
    let newTopWhenClicked = event.clientY - shiftY - drawerbox.getBoundingClientRect().top;
    let topEdge = drawerbox.offsetHeight - arrowDown.offsetHeight;
    let newTop;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    function onPointerMove(event) {
        drawer.style.display = "flex";
        event.preventDefault();
        arrowDown.style.opacity = "0";
        newTop = event.clientY - shiftY - drawerbox.getBoundingClientRect().top;

        if (newTop < 0) {
            newTop = 0;
        }
        if (newTop > topEdge) {
            newTop = topEdge;
        }
        arrowDown.style.top = newTop + "px";
        drawer.style.height = newTop + "px"
    }

    function onPointerUp(event) {
        event.preventDefault();
        if (newTop === newTopWhenClicked) {
            arrowDown.style.opacity = "1";
        }

        if (newTopWhenClicked > 100) {
            animationDrawer(newTop, 700)
        } else {
            animationDrawer(newTop, 100)
        }
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointermove', onPointerMove);
    }
};

//CLOSING THE DRAWER BY SWIPING
drawer.addEventListener("pointerdown", e => {
    let clientY = e.clientY;
    let newClientY;
    arrowDown.addEventListener("touchstart", e => {
        e.preventDefault();
    })
    arrowDown.addEventListener("touchmove", e => {
        e.preventDefault();
    })
    e.preventDefault();
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    function onPointerMove(e) {
        newClientY = e.clientY;

        if ((clientY - newClientY) > 200) {
            animationDrawer(0, 1)
        }

    }
    function onPointerUp() {

        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointermove', onPointerMove);
    }

})


function animationDrawer(newTop, top) {

    if (newTop < top) {
        arrowDown.addEventListener("pointerover", (e) => {

            arrowDown.style.transform = "rotate(0deg)";
            arrowDown.style.cursor = "pointer";
            arrowDown.style.animation = "bouncesDown 500ms alternate infinite ease-in-out";
            arrowDown.addEventListener("pointerout", e => {
                arrowDown.style.animation = "";
            })


        })
        arrowDown.style.animation = "arrowUnder60 500ms forwards ease-out"
        drawer.style.animation = "drawerUnder60 500ms forwards ease-out"
        setTimeout(() => {
            arrowDown.style.animation = "";
            arrowDown.style.top = "0";
            arrowDown.style.transform = "rotate(0deg)";
            arrowDown.style.opacity = "1";
            drawer.style.animation = "";
            drawer.style.height = "0px";
            drawer.style.display = "none";
        }, 500)
    }
    if (newTop > top) {

        arrowDown.style.animation = "arrowOver300 500ms forwards ease-out"
        drawer.style.animation = "drawerOver300 500ms forwards ease-out"
        setTimeout(() => {
            arrowDown.style.animation = "";
            arrowDown.style.top = "600px";
            arrowDown.style.transform = "rotate(180deg)";
            arrowDown.addEventListener("pointerover", (e) => {
                arrowDown.style.transform = "rotate(180deg)";
                arrowDown.style.animation = "bouncesUp 500ms alternate infinite ease-in-out";
                arrowDown.addEventListener("pointerout", e => {
                    arrowDown.style.animation = "";
                })
            })
            drawer.style.animation = "";
            drawer.style.height = "600px";
            arrowDown.style.opacity = "1";
        }, 500)
    }
}


let rainChild = 0;
let rainWidth = innerWidth;

function rainWidthIsNotEmpty() {
    if (rainWidth == 0 || rainWidth == undefined) {
        rainWidth = window.innerWidth
        if (rainWidth == 0 || rainWidth == undefined) {
            rainWidth = 375;
        }
    }

}

function rainFall() {
    rainWidthIsNotEmpty();
    rain.innerHTML = "";
    for (let i = 0; i < rainWidth; i = i + 20) {
        rainChild++;
        addRainDrop(getRandomInt(3000), rainChild);
    }
}

rainFall();

function addRainDrop(margin, child) {
    const newDiv = document.createElement("div");
    rain.appendChild(newDiv);
    let childStyle = document.querySelector(`.rain div:nth-child(${child})`);
    childStyle.style.animation = `rainFall 2s ${margin}ms infinite ease`;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

window.addEventListener("resize", e => {
    rainWidth = innerWidth;
    rainChild = 0;
    rainWidthIsNotEmpty();
    rainFall();
})


