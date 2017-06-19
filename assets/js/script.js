let searchArray = [
  "batman",
  "superman",
  "terminator",
  "naruto",
  "street fighter",
  "tekken",
  "league of legends",
  "one piece"
];

function generateButton(str) {
  let $button = $('<button>');
  $button.addClass("query-button custom-button btn btn-lg btn-default")
    .text(str);
  $("#buttons-list").append($button);
}

function renderButtons() {
  $("#buttons-list").empty();
  for (let i = 0; i < searchArray.length; i++) {
    generateButton(searchArray[i]);
  }
}

//---------------------------------------------------------
// EVENT HANDLERS
//---------------------------------------------------------
$(document).ready(function() {

  renderButtons();

  $(document).on("click", "#submit-button", function(event) {
    // prevents default form "submit" behavior
    event.preventDefault();
    let $input = $("#search-input").val();
    searchArray.push($input);
    generateButton($input);
    $input = "";
  });

  $(document).on("click", ".query-button",
    function(event) {
      event.preventDefault();
      let queryItem = $(this).text();
      let queryKey = "&api_key=dc6zaTOxFJmzC&limit=10";
      let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryItem + queryKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        $("#results").empty();

        let products = response.data;

        for (let i = 0; i < products.length; i++) {

          let gifImg = $("<img>");
          gifImg.addClass("gif")
            .attr("src", products[i].images.fixed_height.url)
            .attr("data-state", "still")
            .attr("data-still", products[i].images.fixed_height_still.url)
            .attr("data-animate", products[i].images.fixed_height.url);

          $("#results").append(gifImg);
        }
      });
    });

  $(document).on("click", ".gif", function() {
    let state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      $(this).css("border-color", "white");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      $(this).css("border-color", "yellow");
    }
  });
});
