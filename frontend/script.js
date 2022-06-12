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

//get the exact time
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

//set the weather info
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

//Clear Morning
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
//Clear Day
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
//Clear Night
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
//Clouds Morning
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
//Clouds Day
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
//Clouds Night
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
//Rain Morning
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
//Rain Day
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
//Rain Night
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
//Thunder Morning
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
//Thunder Day
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
//Thunder Night
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
//Snow Morning
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
//Snow Day
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
//Snow Night
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

        
       
//close the search page to shows the weather page. 
function containerToBigBox(){
    let container2 = document.querySelector(".container2");
    let bigBox = document.querySelector(".bigBox");
    let container2Display = window.getComputedStyle(container2).display;
    
    if(container2Display == "flex"){
        bigBox.style.display = "block";
        container2.style.display = "none";
    }
};

 
morningClear.addEventListener("pointerdown", e => {
    e.stopPropagation()
    containerToBigBox();
    clearM();
})
dayClear.addEventListener("pointerdown", e => {
    e.stopPropagation()
    containerToBigBox();
    clearD();
})
nightClear.addEventListener("pointerdown", e => {
    e.stopPropagation()
    containerToBigBox();
    clearN();
})
morningCloudy.addEventListener("pointerdown", e => {
    e.stopPropagation()
    containerToBigBox();
    cloudM();
})
dayCloudy.addEventListener("pointerdown", e => {
    e.stopPropagation()
    containerToBigBox();
    cloudD();
})
nightCloudy.addEventListener("pointerdown", e => {
    e.stopPropagation()
    containerToBigBox();
    cloudN();
})
morningRain.addEventListener("pointerdown", e => {
    containerToBigBox();
    rainM();
})
dayRain.addEventListener("pointerdown", e => {
    containerToBigBox();
    rainD();
})
nightRain.addEventListener("pointerdown", e => {
    containerToBigBox();
    rainN();
})
morningThunder.addEventListener("pointerdown", e => {
    containerToBigBox();
    thunderM();
})
dayThunder.addEventListener("pointerdown", e => {
    containerToBigBox();
    thunderD();
})
nightThunder.addEventListener("pointerdown", e => {
    containerToBigBox();
    thunderN();
})
morningSnowy.addEventListener("pointerdown", e => {
    containerToBigBox();
    snowM();
})
daySnowy.addEventListener("pointerdown", e => {
    containerToBigBox();
    snowD();
})
nightSnowy.addEventListener("pointerdown", e => {
    containerToBigBox();
    snowN();
})

//DRAWER
let drawerbox = document.querySelector(".drawerbox")
let drawer = document.querySelector(".drawer");
let arrowDown = drawerbox.querySelector(".arrow--drawer");
let arrowDownHover = drawerbox.querySelector(".arrow--drawer:hover");
console.log(window.innerHeight)

//OPENING THE DRAWER AND CLOSING DRAWER WITH ARROWS
arrowDown.onpointerdown = function (event) {
    event.preventDefault();
    event.stopPropagation();
    let shiftY = event.clientY - arrowDown.getBoundingClientRect().top;
    let newTopWhenClicked = event.clientY - shiftY - drawerbox.getBoundingClientRect().top;
    console.log(newTopWhenClicked + " QUOI")
    let newTop;
  
  

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    function onPointerMove(event) {
        event.preventDefault();
        drawer.style.display = "flex";
        newTop = event.clientY - shiftY - drawerbox.getBoundingClientRect().top;
        
        if (newTop < 0) {
            newTop = 0;
        }
        if(newTop > 700){
            newTop = 700;
        }
       
        arrowDown.style.top = newTop + "px";
        drawer.style.height = newTop + "px"
      
    }

    function onPointerUp(event) {
        event.preventDefault();
        if(newTopWhenClicked < 50 && newTop > 100){
            animationDrawer(1,0)
        }else{
            animationDrawer(0,1)
        }
        // if (newTopWhenClicked > 100) {
        //     animationDrawer(newTop, 700)
        //     console.log(">100 is newTop " + newTop + " " + newTopWhenClicked)
        // }else {
        //     animationDrawer(newTop, 100)
        //     console.log("<100 is newTop " + newTop + " " + newTopWhenClicked)
        // }
        console.log("UP")
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointermove', onPointerMove);
    }
};

//CLOSING THE DRAWER BY SWIPING
drawer.addEventListener("pointerdown", e => {
    let clientY = e.clientY;
    let newClientY;
 
    drawer.addEventListener("pointermove", onPointerMove);
    drawer.addEventListener("pointerup", onPointerUp);

    function onPointerMove(e) {
        
        newClientY = e.clientY;


        if ((clientY - newClientY) > 300) {
          onPointerUp;
          animationDrawer(0,1);
        }
    }
    function onPointerUp() {
        console.log("up")
        drawer.removeEventListener('pointerup', onPointerUp);
        drawer.removeEventListener('pointermove', onPointerMove);
    }

})

function animationDrawer(newTop, top) {
    console.log("animation " + newTop + " " + top)
    if (newTop < top) {
        console.log("animUP")
        arrowDown.style.animation = "arrowUp 500ms both ease-out"
        drawer.style.animation = "drawerUp 500ms both  ease-out"
        setTimeout(() => {
            arrowDown.style.animation ="";
            drawer.style.animation ="";
            arrowDown.style.top = "0px";
            drawer.style.height = "0px";
            console.log(window.getComputedStyle(drawer).height)
           
        }, 500)
    }
    if (newTop > top) {
       console.log("animDOWN")
        arrowDown.style.animation = "arrowDown 500ms ease-in-out"
        drawer.style.animation = "drawerDown 500ms ease-in-out"
        setTimeout(() => {
            arrowDown.style.animation ="";
            drawer.style.animation ="";
            arrowDown.style.top = "600px";
            drawer.style.height = "600px";
            console.log(window.getComputedStyle(drawer).height)
        }, 500)
     }
}


//ON TOUCH DEVICE DRAWER ARROW DOWN AND UP
arrowDown.addEventListener("touchstart", (event)=> {
    event.preventDefault();

    console.log("touchArrow")
    let shiftY = event.changedTouches[0].clientY - arrowDown.getBoundingClientRect().top;
    let newTopWhenClicked = event.changedTouches[0].clientY - shiftY - drawerbox.getBoundingClientRect().top;
    let topEdge = drawerbox.offsetHeight - arrowDown.offsetHeight;
    console.log(topEdge);
    let newTop;

    arrowDown.addEventListener("touchmove", onTouchMove);
    arrowDown.addEventListener("touchend", onTouchEnd);

    function onTouchMove(event) {
        event.preventDefault()
        drawer.style.display = "flex";
        newTop = event.changedTouches[0].clientY - shiftY - drawerbox.getBoundingClientRect().top;

        if (newTop < 0) {
            newTop = 0;
        }
        if(newTop > 700){
            newTop = 700;
        }
       
        arrowDown.style.top = newTop + "px";
        drawer.style.height = newTop + "px"
      
    }
        
    function onTouchEnd(event) {
           event.preventDefault()
           console.log("new top " + newTop + " new top when cliked " + newTopWhenClicked)

        if(newTopWhenClicked < 50 && newTop > 100){
            console.log("DOWN")
            animationDrawer(1,0)
        }else{
            animationDrawer(0,1)
            console.log("DOWN")
        }
        arrowDown.removeEventListener('touchmove', onTouchMove);
        arrowDown.removeEventListener('touchend', onTouchEnd);
    }
   
});

//ON TOUCH DEVICE CLOSE DRAWER BY SWIPING UP
drawer.addEventListener("touchstart", e => {
    e.preventDefault();
    e.stopPropagation();
  
    let clientY = e.changedTouches[0].clientY;
    let newClientY;
    let drawerHeightWhenTouched = window.getComputedStyle(drawer).height;
    console.log("drawerHeight : " + drawerHeightWhenTouched + " , clientY : " + clientY);
    
    drawer.addEventListener("touchmove", onPointerMove);
    drawer.addEventListener("touchend", onPointerUp);

    function onPointerMove(e) {
        newClientY = e.changedTouches[0].clientY;
        e.preventDefault()
        console.log(clientY - newClientY);
        if ((clientY - newClientY) > 250) {
            onPointerUp;
            animationDrawer(0,1);
          }
    }
    function onPointerUp(e) {
        e.preventDefault()
        drawer.removeEventListener('touchmove', onPointerUp);
        drawer.removeEventListener('touchend', onPointerMove);
    }
});


// document.querySelectorAll(".btn--drawer").forEach(button =>{
  
//     button.addEventListener("touchstart", (e)=>{
//       e.preventDefault()
//       e.stopPropagation()
      
//         console.log("btn")
//     }, /*{passive: true}*/)
// })
    























































let newBox = document.querySelector(".newBox");
let y = 1;
var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
let other;
let mouseMvt;

//SWIPING BUTTON LEFT AND RIGHTS
document.querySelectorAll(".btn--container").forEach(element =>{
    
    element.addEventListener("pointerdown", e=>{
      
        e.preventDefault();
        isDown = true;
        offset = [
            element.offsetLeft - e.clientX,
            element.offsetTop - e.clientY
        ];
        other = offset[0] + e.clientX;
        
        document.addEventListener("pointermove", move);
        document.addEventListener("pointerup", up);
    
        function up(){
            isDown = false;
            if(!(mouseMvt < -100) && !(mouseMvt > 100)){
                element.style.animation = "slideBack 700ms"
                console.log("pouch")
                setTimeout(()=>{
                    element.style.animation = "";
                    element.style.left = "0";

                },700)
            }
            document.removeEventListener("pointermove", move);
            document.removeEventListener("pointerup", up);
        };
    
        function move(e){
        

            e.preventDefault();
            if (isDown) {
                mousePosition = {
                    x : e.clientX,
                    y : e.clientY
            
                };
                mouseMvt = parseInt(other) - (parseInt(mousePosition.x) + parseInt(offset[0]));
                element.style.left = (mousePosition.x + offset[0]) + 'px';
                
            
                if(mouseMvt > 100){
                console.log("left")
                element.style.animation = "slideLeft 700ms forwards"
            
                    up()
                    setTimeout(()=>{
                        element.style.animation = ""
                        element.style.left ="0px";
                        newDiv(-1);
                    
                    },1000)
                }

                if(mouseMvt < -100){
                    console.log("right")
                    element.style.animation = "slideRight 700ms forwards"
                    up()
                    setTimeout(()=>{
                        element.style.animation = ""
                        element.style.left ="0px";
                        newDiv(1);

                    },1000)
                }
        };
    }
 
    function newDiv(e){
        console.log(`${y} before something happens`)
        document.querySelector(`.btn--container:nth-child(${y})`).style.display = "none";
       
        y = y + e;
        if(y < 1){
            y = 5;
        }
        if(y > 5){
            y = 1;
        }
        console.log(`${y} after change`)
        document.querySelector(`.btn--container:nth-child(${y})`).style.display = "flex";

    }

    });

    //ON TOUCH START
    element.addEventListener("touchstart", e=>{
        console.log(element.dataset.id)
        e.preventDefault();
        
        isDown = true;
        offset = [
            element.offsetLeft - e.changedTouches[0].clientX,
            element.offsetTop - e.changedTouches[0].clientY
        ];
        other = offset[0] + e.changedTouches[0].clientX;
        console.log(other)
        
        document.addEventListener("touchmove", move);
        document.addEventListener("touchend", up);
    
        function up(){
            isDown = false;
            console.log(mouseMvt);
            if(!(mouseMvt <= -100) && !(mouseMvt >= 100)){
                element.style.animation = "slideBack 700ms"
                console.log("pouch")
                setTimeout(()=>{
                    element.style.animation = "";
                    element.style.left = "0";

                },700)
            }
           
            document.removeEventListener("touchmove", move);
            document.removeEventListener("touchend", up);
        };
    
        function move(e){
           
            if (isDown) {
                mousePosition = {
                    x : e.changedTouches[0].clientX,
                    y : e.changedTouches[0].clientY
            
                };
                mouseMvt = parseInt(other) - (parseInt(mousePosition.x) + parseInt(offset[0]));
                element.style.left = (mousePosition.x + offset[0]) + 'px';
                console.log(mouseMvt);
            
                if( mouseMvt > 100){
                    element.style.animation = "slideLeft 700ms forwards"
            
                    up()
                    setTimeout(()=>{
                        element.style.animation = ""
                        element.style.left = "0px";
                        newDiv(-1);
                    
                    },1000)
                }

                if( mouseMvt< -100){
                    console.log("right")
                    element.style.animation = "slideRight 700ms forwards"
                    up()
                    setTimeout(()=>{
                        element.style.animation = ""
                        element.style.left ="0px";
                        newDiv(1);

                    },1000)
                }
        };
    }
    //If right, +1 either -1 to get the new set of buttons
    function newDiv(e){
     
        document.querySelector(`.btn--container:nth-child(${y})`).style.display = "none";
       
        y = y + e;
        if(y < 1){
            y = 5;
        }
        if(y > 5){
            y = 1;
        }
      
        document.querySelector(`.btn--container:nth-child(${y})`).style.display = "flex";

    }
    });
}); 




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
});



