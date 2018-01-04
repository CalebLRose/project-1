$(document).ready(function(){

	var config = {
	    apiKey: "AIzaSyBDm5nT9v8GJXej3TZwLHfkgt55HGXwOYA",
	    authDomain: "dfw-music.firebaseapp.com",
	    databaseURL: "https://dfw-music.firebaseio.com",
	    projectId: "dfw-music",
	    storageBucket: "dfw-music.appspot.com",
	    messagingSenderId: "640782752126"
	  };
	firebase.initializeApp(config);

	var userBase = firebase.auth();
	var userName;
	var userPassWrd;
	var userEmail;

	$("#googleAuth").on("click",function(){
		// event.preventDefault();
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
	});
		

	$("#submitAcct").on("click",function(){
  		event.preventDefault();
  		userEmail = $("#userEmail").val().trim();
  		console.log(userEmail);
  		userPassWrd = $("#userPassword").val().trim();
  		console.log(userPassWrd);
  		userBase.createUserWithEmailAndPassword(userEmail,userPassWrd).catch(function(error) {
		  // Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		});
  });

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