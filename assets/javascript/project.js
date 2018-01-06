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
	var user = firebase.auth().currentUser;
	var userEmail;
	var userPswrd;

	// CHECKS TO SEE IF A USER is signed in
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			console.log(user);
			$("#userNav").css("display","inline-block");
			$("#outBtn").css("display","inline-block");
			$("#signBtn").css("display","none");
			console.log(userBase.currentUser.email);
			$("#userNav").text(userBase.currentUser.displayName);
			console.log("displayName: "+userBase.currentUser.displayName);
		}
	});

// SIGN IN FUNCTION
	function signIn(){
		firebase.auth().signInWithEmailAndPassword(userEmail, userPswrd).catch(function(error) {
		  // Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		  // ...
		});
	};

	$("#signInBtn").on("click", function(){
		userEmail = $("#userEmail").val().trim();
		userPswrd = $("#userPassword").val().trim();
		signIn();
	});

	// $("#googleAuth").on("click",function(){
	// 	// event.preventDefault();
	// 	var provider = new firebase.auth.GoogleAuthProvider();
	// 	firebase.auth().signInWithRedirect(provider).then(function(result) {
	// 		// This gives you a Google Access Token. You can use it to access the Google API.
	// 		var token = result.credential.accessToken;
	// 		// The signed-in user info.
	// 		var user = result.user;
	// 		// ...
	// 	}).catch(function(error) {
	// 		// Handle Errors here.
	// 		var errorCode = error.code;
	// 		var errorMessage = error.message;
	// 		// The email of the user's account used.
	// 		var email = error.email;
	// 		// The firebase.auth.AuthCredential type that was used.
	// 		var credential = error.credential;
	// 		// ...
	// 	});
	// });

	// SIGN OUT
	$("#outBtn").on("click",function(){
		$("#userNav").css("display","none");
		$("#outBtn").css("display","none");
		$("#signBtn").css("display","inline-block");
		firebase.auth().signOut().then(function() {
		  console.log('Signed Out');
		}, function(error) {
		  console.error('Sign Out Error', error);
		});
	});	


		
	$("#submitAcct").on("click",function(){
  		event.preventDefault();
  		var createEmail = $("#createEmail").val().trim();
  		console.log(createEmail);
  		var createPswrd = $("#createPassword").val().trim();
  		console.log(createPswrd);
  		userBase.createUserWithEmailAndPassword(createEmail,createPswrd).catch(function(error) {
		  // Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		});
		userEmail = createEmail;
		userPswrd = createEmail;
		signIn();
  		var createName = $("#createUsername").val().trim();
  		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				user.updateProfile({
					displayName: createName,
					}).then(function() {
					  // Update successful.
					  console.log("display name "+displayName);
					}).catch(function(error) {
					  // An error happened.
				});
			}
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