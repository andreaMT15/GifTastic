var movies = [
  "The Devil Wears Prada",
  "The Hunger Games",
  "Wonder Woman",
  "Star Wars",
  "Mulan",
  "Harry Potter"
];

function createButtons() {
  for (var i = 0; i < movies.length; i++) {
    var buttonDiv = $("<div>");
    var movieBtn = $(
      '<button type="button" id="movie-" + "i" >' + movies[i] + "</button>"
    );
    buttonDiv.append(movieBtn);
    $("#gifs").append(buttonDiv);
  }
}
createButtons();

$("button").on("click", function() {
  var movie = $(this).attr("data-person");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    movie +
    "&api_key=dc6zaTOxFJmzC&limit=15&rating=pg";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // var results = response.data;
  });

  for (var i = 0; i < results.length; i++) {
    var gifDiv = $("<div>");

    var movieImage = $("<img>");
    movieImage.attr("src", results[i].images.fixed_height.url);

    gifDiv.prepend(p);
    gifDiv.prepend(movieImage);

    $("#gifs").prepend(gifDiv);
  }
});
