const currentHTML = document.querySelector("#current")
const currenHourstHTML = document.querySelector("#current1")
const input = document.querySelector("#locality")
const btn = document.querySelector("#btn")
async function getMeteoData() {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=70d79bef89b2412db04175551232312&q=${input.value}&days=4&aqi=no&alerts=no`)
        const meteoData = await response.json()
        const previsioni = meteoData.forecast;
        const previsioniGiornaliere = previsioni.forecastday;
        const localTime = location.localtime;
        console.log(localTime);
        const dataeOra = localTime.split(" ");
        const dataOdierna = dataeOra[0].split("-");
        const giorno = parseInt(dataOdierna[2]);
        const mese = parseInt(dataOdierna[1]) - 1;
        const anno = parseInt(dataOdierna[0]);
        console.log(dataOdierna);
        const dataDiOggi = new Date(anno, mese, giorno);
        console.log(dataDiOggi);
        const oggi = dataDiOggi.getDay();
        const ogginumero = dataDiOggi.getDate();
        console.log(oggi);
        const meseOggi = dataDiOggi.getMonth() + 1;
        currenHourstHTML.innerHTML=""
        let i = 1;
        // console.log(dataArray1[0]);
        previsioniGiornaliere.forEach(giorni => {
            const giornate = giorni.day;
            const condizioni = giornate.condition;
            const iconaCondizioni = condizioni.icon;

            // TODO: ci sono i cazzo di metodi sulle date
            currenHourstHTML.innerHTML += `
        <div class="flex justify-center align-center text-sm bg-slate-700/40 m-4 ">
            <div class="p-6">${ogginumero + i}/${meseOggi}</div>
            <div class="flex align-center justify-center"><img src="${iconaCondizioni}" /></div>
            <div class="p-2">temp max <br/>${giornate.maxtemp_c}</div>
            <div class="p-2">temp min <br>${giornate.mintemp_c}</div>
            <div class="p-2">umidità <br>${giornate.avghumidity}</div>
        </div>
    `;
            i++;
        });



        //stampiamo in pagina tali dati

        


    } catch (error) {
        console.error(error);
    }
}
btn.addEventListener("click", getMeteoData)
window.addEventListener("keypress", (e) => e.key === "Enter" ? getMeteoData() : console.log(e))

