let searchInput = $("#search-input")
let searchForm = $("#search-form");

const APIKey = "f995323031dc376c84d37c298a6e7560";

let searchHistory = []
let searchHistoryContainer = $("#history")

function fetchCoord(search){
    let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`
    console.log(queryURL);
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    if(!response[0]){
        alert("Location does not exist")
    } else {
        if(searchHistory.indexOf(search) !== -1){
            return
        }
        searchHistory.push(search);

        localStorage.setItem("Location-search", JSON.stringify(searchHistory));

        searchHistoryContainer.html("")

        for(let i = 0; i < searchHistory.length; i++){
            let btn = $("<button>");
            btn.attr("type", "button");
            btn.addClass("history-btn btn-history")

            btn.attr("data-search", searchHistory[i])
            btn.text(searchHistory[i])
            searchHistoryContainer.append(btn)
    }
  }
})
}


function submitSearchForm(event){

    event.preventDefault();

    let search = searchInput.val().trim()

    fetchCoord(search);
}


searchForm.submit(submitSearchForm);
