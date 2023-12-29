const currentHTML = document.querySelector("#current")
const currenHourstHTML = document.querySelector("#current1")
const input = document.querySelector("#locality")
const btn = document.querySelector("#btn")
const image = [
    "https://images.unsplash.com/photo-1514632595-4944383f2737?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482005253821-5d6a2c685879?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

]
async function getMeteoData() {
    try {

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=70d79bef89b2412db04175551232312&q=${input.value}&days=4&aqi=no&alerts=no`)
        const meteoData = await response.json()
        console.log(meteoData)
        //primo step: nome della città data e ora attuale
        const location = meteoData.location
        const city = location.name //città
        const current = meteoData.current
        const currentTemp = current.temp_c
        const currentFeelsTemp = current.feelslike_c
        const currentumidity = current.humidity
        const condition = current.condition
        const icon = condition.icon
        // console.log(icon);
        const previsioni = meteoData.forecast
        const previsioniGiornaliere = previsioni.forecastday
        const localTime = location.localtime //data e ora odierna
        console.log(localTime);
        const dataeOra = localTime.split(" ")
        const dataOdierna = dataeOra[0].split("-")
        const giorno = parseInt(dataOdierna[2])
        const mese = parseInt(dataOdierna[1] - 1)
        const anno = parseInt(dataOdierna[0])
        console.log(dataOdierna)
        const dataDiOggi = new Date(anno, mese, giorno)
        console.log(dataDiOggi)
        const oggi = dataDiOggi.getDay()
        let ogginumero = dataDiOggi.getDate()
        console.log(oggi);
        let meseOggi = dataDiOggi.getMonth() + 1
        // currenHourstHTML.innerHTML = "";
        i = 1
        // console.log(dataArray1[0]);
        previsioniGiornaliere.forEach(giorni => {
            const giornate = giorni.day
            //controllo sulle date
            if (ogginumero + i == 32) {
                ogginumero = 1
                i = 0
                meseOggi += 1

                if (meseOggi === 13) {
                    meseOggi = 1
                    if (meseOggi < 9 && meseOggi >= 1) {
                        meseOggi = `0${meseOggi}`
                    }
                }
            }

            const condizioni = giornate.condition
            const iconaCondizioni = condizioni.icon
            

            //TODO: ci sono i cazzo di metodi sulle date
            currenHourstHTML.innerHTML += `
            <div class="flex justify-center align-center text-sm bg-slate-700/40 m-4 ">
            <div class="p-6">${ogginumero + i}/${meseOggi}</div>
                <div class="flex align-center justify-center"><img src=" ${iconaCondizioni}"/></div>
                <div class="p-2">temp max <br/>${giornate.maxtemp_c}°</div>
                <div class="p-2">temp min <br>${giornate.mintemp_c}°</div>
                <div class="p-2">umidità <br>${giornate.avghumidity}%</div>
            </div>
    `
            i++
        });


        //stampiamo in pagina tali dati
        currentHTML.innerHTML = "";
        currentHTML.innerHTML = `
    <div
            class="flex flex-col justify-center items-center  w-3/5 h-screen  text-gray-400 text-center font-bold text-2xl"
            id="current">
            <div>
                <h2 class="p-2 text-3xl">${city}</h2>
                
                <h3 class="">${dataDiOggi}</h3>
            </div>
            <div class="p-2"><img src="${icon}"/></div>
            <div class="flex">
                <div class="p-2">temperatura <br/>${currentTemp}°</div>
                <div class="p-2">percepita <br>${currentFeelsTemp}°</div>
                <div class="p-2">umidità <br>${currentumidity}%</div>
            </div>
        </div>
    `




    } catch (error) {
        console.error(error);
    }
}
btn.addEventListener("click", getMeteoData)
window.addEventListener("keypress", (e) => e.key === "Enter" ? getMeteoData() : console.log(e))

