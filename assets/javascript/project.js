$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyBDm5nT9v8GJXej3TZwLHfkgt55HGXwOYA",
    authDomain: "dfw-music.firebaseapp.com",
    databaseURL: "https://dfw-music.firebaseio.com",
    projectId: "dfw-music",
    storageBucket: "",
    messagingSenderId: "640782752126"
  };
  firebase.initializeApp(config);

function shows(){
	var id = "498771";
	var queryURL = "http://api.songkick.com/api/3.0/venues/"+id+".json?apikey=ENjLM092JqaXsW2i";
	
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