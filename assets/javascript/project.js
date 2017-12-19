$(document).ready(function(){

	var venues = []

function shows(){
	var queryURL = "http://api.songkick.com/api/3.0/metro_areas/35129-us-dallas-fort-worth/calendar.json?apikey=ENjLM092JqaXsW2i";
	
	$.ajax({
			url: queryURL,
			method: "GET"
		})
	.done(function(response){
		console.log(response);
	})
};

shows();

})