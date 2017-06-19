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

//---------------------------------------------------------
function renderButtons() {
  $("#buttons-list").empty();
  for (let i = 0; i < searchArray.length; i++) {
    generateButton(searchArray[i]);
  }
}
//---------------------------------------------------------

$(document).ready(function() {

  renderButtons();

  $("#submit-button").on("click", function(event) {
    // prevents default form "submit" behavior
    event.preventDefault();
    let $input = $("#search-input").val();
    searchArray.push($input);
    generateButton($input);
  });

  $(".query-button").on("click"),
    function(event) {
      let queryItem = $(this).val();
      let queryKey = "butts";
      let queryURL = "www" + queryItem + ".com/" + queryKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        let gifDiv = $("<div>");
        gifDiv.addClass("gif-layout");

        let gifImg = $("<img>");
        gifImg.addClass("gif")
          .att("src", response.url),
          .att("data-state", response.url),
          .att("data-still", response.url),
          .att("data-animate", response.url),
      });
    }

  $(".gif").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
