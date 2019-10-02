var animalARR = ["Dog","Cat","Monkey","Fox","Squirrel"];
var button;
var topic = ""; 

var buttons = function (){
	 $("#animalBTN").empty();
	// loops through the array and creates buttons
	for(i = 0; i < animalARR.length; i++) {
        button = $("<button type=" + "button" + ">" + animalARR[i] + "</button>").addClass("btn btn-warning").attr("data",animalARR[i]);
		$("#animalBTN").append(button);
	};
}


//click button to create gif
$("#animalBTN").on("click", ".btn", function(){
    $("#gifs").empty();
  		var animal = $(this).attr("data");
  		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=eRVE3gZLMtTt0KugWqyli9k90eN85zzO";



  	$.ajax({
  		url: queryURL,
  		method: "GET" 

  	}).done(function(response){
  		console.log(response);
  			
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          	// a div is created for gif
	        var gifDiv = $("<div>");
	 			
	        // rating 
	 		var a = $("<p>");
	 		a.text(results[i].rating);
	 		var a = $("<p>").text("Rating: " + results[i].rating);

	 		var gifImage = $("<img>")
            // add states of animate 
	 		gifImage.attr("src", results[i].images.fixed_height_still.url);
	 		gifImage.attr("data-still", results[i].images.fixed_height_still.url);
	 		gifImage.attr("data-animate", results[i].images.fixed_height.url)
	 		gifImage.attr("data-state", "still")
	 		gifImage.addClass("gif");
	 		
	 		gifDiv.append(gifImage);
	 		// rating is appended to the div 
	 		gifDiv.append(a); 			
	 		$("#gifs").prepend(gifDiv);
 			}
  		})
  })


//click to animate
$("#gifs").on("click", ".gif", function(event){
	event.preventDefault();
	
	// gets the current state of the clicked gif 
	var state = $(this).attr("data-state");
	
	//animate and still 
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})

$(".submit").on("click", function(event){
	event.preventDefault();
	console.log("submit");
	topic = $("#input").val();
	animalARR.push(topic);
	console.log(animalARR);
	buttons();
});

buttons();
