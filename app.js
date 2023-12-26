// const input = document.querySelector("#locality")
// const button = document.querySelector("#btn")
// const container = document.querySelector(".container")


// async function getMeteoData() {
//     // try {
//         const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=70d79bef89b2412db04175551232312&q=${input.value}&days=5&aqi=no&alerts=no`)
//         // const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=70d79bef89b2412db04175551232312&q=${input.value}&aqi=no`)
//         const data = await response.json()
//         console.log(data)
//         // const dataForecast = await responseForecast.json()
//         const dataLocation = data.location
//         const dataLocationName = dataLocation.name
//         const dataCurrent = data.current
//         const dataCondition = dataCurrent.condition
//         const currentHour = dataCurrent.last_updated
//         const hoursArray = []
//         hoursArray.push(currentHour)
//         currentHour.split("")
//         console.log(hoursArray);
//         container.innerHTML=`SUCA`
//         const btnReverse = document.querySelector("#btn-reverse")
//         btnReverse.addEventListener("click", () => {
//             location.reload()
//         })
//         console.log(dataCondition);
//         // console.log(data);
//         console.log(input.value);
//     // } catch (error) {
//     //     console.error(error);
//     // }
// }
// button.addEventListener("click", getMeteoData)
