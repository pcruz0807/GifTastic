$(document).ready(function() {

    var topics = ["Family Guy", "Bob's Burgers", "The Simpsons"];
    
    function displayGifs() {
    
        $("#tv-gifs").empty();	
    
        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=kya3mkv8JiwwnqBgBU50ea44J9spkILY&limit=10";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            
            var results = response.data;
    
            console.log(results);
    
            for (var i = 0 ; i < results.length ; i++) {
    
                var rating = results[i].rating;
    
                if (results[i].rating !== "r") {
    
                    var showSpan = $("<span>Rating: " + rating + "</br></br></span>");
    
                    var tvImg = $("<img>");
    
                    tvImg.attr("src", results[i].images.fixed_height_still.url);
                    tvImg.attr("data-state", "still");
                    
                    tvImg.attr("data-still", results[i].images.fixed_height_still.url);

                    tvImg.attr("data-animate", results[i].images.fixed_height.url);
                    
                    tvImg.attr("class", "show");
    
                    showSpan.append(tvImg);
                    $("#tv-gifs").append(showSpan);
                };
            }
        });
    
    };
    
    
    
    function renderButtons() {
    
        $("#tv-buttons").empty();
    
        for (var i = 0 ; i < topics.length ; i++) {
            var $b = $("<button>");
            $b.attr("data-name", topics[i]);
            $b.addClass("tvButton")
            $b.text(topics[i]);
            $("#tv-buttons").append($b);
        };
    };
    
    
    
    $("#addTvShow").on("click", function(event) {
    
        event.preventDefault();
    
        var tvShow = $("#tv-input").val().trim();
    
        topics.push(tvShow);
    
        renderButtons();
    
    });
    
    
    $(document).on("click", "img", animateGif);
    
    
    function animateGif() {
    
        var state = $(this).attr("data-state");
        
            if (state === "still") {
    
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                console.log(this);
            }
    
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
    
            }
    };
    
    
    
    $(document).on("click", ".tvButton", displayGifs);
    
    renderButtons();
    
    });
    
    
    
    