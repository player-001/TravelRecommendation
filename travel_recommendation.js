const searchBtn = document.getElementById("searchBtn")
const reset = document.getElementById("reset")
const submit = document.getElementById("submit")

function searchAndDisplay(){
    var container = document.getElementById("result")
    fetch("./travel_recommendation_api.json")
        .then((result) => {return result.json()})
        .then((data) => {
            var search = document.getElementById("search").value.toLowerCase()
            
            const country = data.countries.find((item) => {return item.name.toLowerCase() === search})
            if (country){
                for (city of country.cities){
                    console.log("here")
                    container.innerHTML += `<div class = "tile">
                                    <img src = ${city.imageUrl} alt = "image">
                                    <h2>${city.name}</h2>
                                    <p>${city.description}</p>
                                 </div>`
                }
            }
            else{
                if(search === "temples" || search === "temple"){
                    for (temple of data.temples){
                        container.innerHTML += `<div class = "tile">
                                            <img src = ${temple.imageUrl} alt = "temple">
                                            <h2>${temple.name}</h2>
                                            <p>${temple.description}</p>
                                      </div>`
                    }
                }
                else{
                    if (search === "beach" || search === "beaches"){
                        for (beach of data.beaches){
                            container.innerHTML += `<div class = "tile">
                                          <img src = ${beach.imageUrl}>
                                          <h2>${beach.name}</h2>
                                          <p>${beach.description}</p>`
                        }
                    }
                    else{
                        console.log("keyword not found")
                        container.innerHTML += `<h2 class = "text_fixed">keyword not found</h2>`
                    }
                }
            }
            
        })
        .catch((error) => {container.innerHTML += `<h2 class = "text_fixed">Error occured Please Retry<h2>`})
}
function resetSearch(){
    var result = document.getElementById("result")
    result.innerHTML = ""
    document.getElementById("search").value = ""
}
searchBtn.addEventListener("click", searchAndDisplay)
reset.addEventListener("click", resetSearch)