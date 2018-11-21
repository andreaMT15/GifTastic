var movies = [
  "The Devil Wears Prada",
  "The Hunger Games",
  "Wonder Woman",
  "Star Wars",
  "Mulan",
  "Harry Potter"
];

function createButtons() {
  $("#buttons").empty();
  for (var i = 0; i < movies.length; i++) {
    var movieBtn = $(`<button data-movie="${
      movies[i]
    }" type="button" class="movie-buttons" id="movie-${i}">${movies[i]} 
      </button>`);
    $("#buttons").append(movieBtn);
  }
  // var searchBtn = $(``);
  // $("#movie-search").append(searchBtn);
}
createButtons();
$(document).on("click", "button", function(event) {
  event.preventDefault();
  var movie = $(this).attr("data-movie") || $("#movie-input").val();
  console.log(movie);
  if (movies.indexOf(movie) === -1) {
    movies.push(movie);
  }
  createButtons();
  giphySearch(movie);
});

function giphySearch(movie) {
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    movie +
    "&api_key=dc6zaTOxFJmzC&limit=15&rating";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.data);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      var rating = $("<p>").text("Rating: " + results[i].rating);
      var movieImage = $("<img>");
      movieImage.attr({
        src: results[i].images.original_still.url,
        "data-still": results[i].images.original_still.url,
        "data-animate": results[i].images.looping.mp4,
        "data-state": "still",
        class: "gif"
      });

      gifDiv.prepend(movieImage);
      gifDiv.prepend(rating);
      $("#gifs").prepend(gifDiv);
    }
  });
  $("#gifs").empty();
}
$(document).on("click", function() {
  console.log("this is working");
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
