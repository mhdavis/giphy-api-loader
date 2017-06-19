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

  $("#submit-button").on("click", function(event) {
    // prevents default form "submit" behavior
    event.preventDefault();
    let $input = $("#search-input").val();
    searchArray.push($input);
    generateButton($input);
    $input = "";
  });

  $(document).on("click", ".query-button"
    function(event) {
      event.preventDefault();
      let queryItem = $(this).val();
      let queryKey = "&api_key=dc6zaTOxFJmzC&limit=10";
      let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryItem + queryKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        $("#results").empty();

        let products = response.data;

        for (let i = 0; i < products.length; i++) {
          let gifDiv = $("<div>");
          gifDiv.addClass("gif-layout");

          let gifImg = $("<img>");
          gifImg.addClass("gif")
            .attr("src", products[i].images.fixed_height.url)
            .attr("data-state", "still")
            .attr("data-still", products[i].images.fixed_height_still.url)
            .attr("data-animate", products[i].images.fixed_height.url);

          gifDiv.append(gifImg);
          $("#results").append(gifDiv);
        }
      });
    });

  $(".gif").on("click", function() {
    let state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
