const currentHTML = document.querySelector("#current")
const currenHourstHTML = document.querySelector("#current1")
const input = document.querySelector("#locality")
const btn = document.querySelector("#btn")
async function getMeteoData() {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=70d79bef89b2412db04175551232312&q=${input.value}&days=6&aqi=no&alerts=no`)
        const meteoData = await response.json()
        // console.log(meteoData)
        //primo step: nome della città data e ora attuale
        const location = meteoData.location
        const city = location.name //città
        const localTime = location.localtime //data e ora odierna
        const dataArray = localTime.split("-")
        const dataArray1 = dataArray[2].split(" ")
        // console.log(localTime);
        console.log(dataArray);
        //ricaviamo le informazioni meteo attuali
        // console.log(meteoData.current)
        //step due ricaviamo il primo layout contenente queste informazioni
        const current = meteoData.current
        const currentTemp = current.temp_c
        const currentFeelsTemp = current.feelslike_c
        const currentumidity = current.humidity
        const condition = current.condition
        const icon = condition.icon
        // console.log(icon);
        const previsioni = meteoData.forecast
        const previsioniGiornaliere = previsioni.forecastday
        i = 1
        console.log(dataArray1[0]);
        previsioniGiornaliere.forEach(giorni => {
            const giornate = giorni.day
            const condizioni = giornate.condition
            const iconaCondizioni = condizioni.icon
            console.log(giornate)
            //controllo e correzioni sulle date
            //TODO: ci sono i cazzo di metodi sulle date
            const giornoAggiornato = parseInt(dataArray1[0]) + i
            let meseAggiornato = dataArray[1]
            if (giornoAggiornato===31) {
                i=`${-parseInt(dataArray1)}`
            }
            
            if (giornoAggiornato == 1) {
                meseAggiornato = parseInt(dataArray[1]) + 1
            }
            if (meseAggiornato > 12) {
                meseAggiornato = `0${1}`
            }
            
            currenHourstHTML.innerHTML += `
            <div class="flex justify-center align-center text-sm bg-slate-700/40 m-4 ">
            <div class="p-6">${giornoAggiornato}-${meseAggiornato}</div>
                <div class="flex align-center justify-center"><img src=" ${iconaCondizioni}"/></div>
                <div class="p-2">temp max <br/>${giornate.maxtemp_c}</div>
                <div class="p-2">temp min <br>${giornate.mintemp_c}</div>
                <div class="p-2">umidità <br>${giornate.avghumidity}</div>
            </div>
    `
            i++
        });


        //stampiamo in pagina tali dati

        currentHTML.innerHTML = `
    <div
            class="flex flex-col justify-center items-center  w-3/5 h-screen  text-gray-400 text-center font-bold text-2xl"
            id="current">
            <div>
                <h2 class="p-2 text-3xl">${city}</h2>
                
                <h3 class="">${dataArray1[0]}-${dataArray[1]} -${dataArray[0]} ${dataArray1[1]}</h3>
            </div>
            <div class="p-2"><img src="${icon}"/></div>
            <div class="flex">
                <div class="p-2">temperatura <br/>${currentTemp}</div>
                <div class="p-2">percepita <br>${currentFeelsTemp}</div>
                <div class="p-2">umidità <br>${currentumidity}</div>
            </div>
        </div>
    `


    } catch (error) {
        console.error(error);
    }
}
btn.addEventListener("click", getMeteoData)
window.addEventListener("keypress", (e) => e.key === "Enter" ? getMeteoData() : console.log(e))

