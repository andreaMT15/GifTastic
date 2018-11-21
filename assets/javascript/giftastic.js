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
}
createButtons();
$(document).on("click", "button", function(event) {
  event.preventDefault();
  var movie = $(this).attr("data-movie") || $("#movie-input").val();
  // console.log(movie);
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
    "&api_key=dc6zaTOxFJmzC&limit=10&rating";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.data);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      gifDiv.attr("id" + "gif-" + i);
      var rating = $("<p>").text("Rating: " + results[i].rating);
      var movieImage = $("<img>");
      movieImage.attr({
        src: results[i].images.fixed_height_still.url,
        "data-still": results[i].images.fixed_height_still.url,
        "data-animate": results[i].images.original.url,
        "data-state": "still",
        class: "gif"
      });
      $(gifDiv).append(movieImage);
      $(gifDiv).append(rating);

      $("#gifs").prepend(gifDiv);
    }
  });
  $("#gifs").empty();
  var instructions = $("<p>").text(
    "Click the individual GIF's below to animate them! "
  );
  $("#instructions").prepend(
    instructions,
    '<i class="fas fa-angle-double-down"></i>'
  );
}

$(document).on("click", ".gif", function() {
  console.log("this is working");
  var state = $(this).attr("data-state");

  console.log(state);

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
