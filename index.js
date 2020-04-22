const totalconfirm = document.querySelector("#totalActive")
const totalDeath = document.querySelector("#totalDeath")
const totalRecover = document.querySelector("#totalRecover")
const tbody = document.querySelector("#tbody")
const search = document.querySelector("#search")

function numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Total case

const totalApiUrl ="https://covid19.mathdro.id/api"
axios.get(totalApiUrl)
.then((res)=>{
   totalconfirm.innerHTML =numberWithCommas(res.data.confirmed.value)
   totalRecover.innerHTML=numberWithCommas(res.data.recovered.value)
   totalDeath.innerHTML= numberWithCommas(res.data.deaths.value)

})
.catch((e) =>{
    console.log(e.message)
})


//country wise case

const countryWiseUrl = "https://covid19.mathdro.id/api/confirmed";
axios.get(countryWiseUrl)
 .then((res) => {
     res.data.forEach((obj) =>{
         let tBody = tbody
         let tr = document.createElement('tr')

         let tdProvince = document.createElement('td')
         let tdCountry = document.createElement('td')
         let tdConfirmed =  document.createElement('td')
         let tdRecovered = document.createElement('td')
         let tdDeaths = document.createElement('td')
         let tdActive = document.createElement('td')

         tdProvince.innerHTML = obj.provinceState
         tdCountry.innerHTML = obj.countryRegion
         tdCountry.style.color ="ghostwhite"
         tdConfirmed.innerHTML = numberWithCommas(obj.confirmed)
         tdConfirmed.style.color = "yellow"
         tdRecovered.innerHTML = numberWithCommas(obj.recovered)
         tdRecovered.style.color = "DeepSkyBlue"
         tdDeaths.innerHTML = numberWithCommas(obj.deaths)
         tdDeaths.style.color = "OrangeRed"
         tdActive.innerHTML = numberWithCommas(obj.active)
         tdActive.style.color = "SpringGreen"

         tr.appendChild(tdCountry)
         tr.appendChild(tdConfirmed)
         tr.appendChild(tdActive)
         tr.appendChild(tdRecovered)
         tr.appendChild(tdDeaths)
         tr.appendChild(tdProvince)

         tBody.appendChild(tr)


     })


 }). catch((e) => {
     console.log(e.message)

 })



 //search country
 search.addEventListener('keyup',(e) =>{
       tbody.innerHTML = ''
       let value = e.target.value.toUpperCase();
       let arr = []

       axios.get(countryWiseUrl)
       .then( res =>{
           res.data.forEach((obj) => {
             let countryUpperCase = obj.countryRegion.toUpperCase();
             if(countryUpperCase.indexOf(value) > -1){
               arr.push(obj)

             }

           })

           arr.forEach((obj) => {
               let tr = document.createElement('tr')
             tr.innerHTML  = `
             <td style="color:ghostwhite;">${obj.countryRegion}</td>
             <td style="color:yellow;">${obj.confirmed}</td>
             <td style="color:SpringGreen;">${obj.active}</td>
             <td style="color:DeepSkyBlue;">${obj.recovered}</td>
             <td style="color:OrangeRed;">${obj.deaths}</td>
             <td >${obj.provinceState}</td>
 

             `
             tbody.appendChild(tr)
           })
       })

 })


 //Refresh button
 let refresh = document.querySelector('#refresh')
 refresh.addEventListener('click', ()=>{
     location.reload()
 })