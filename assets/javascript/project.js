$(document).ready(function(){
	// FIREBASE INITIALIZE
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
	var venueID;
	var hoods=["Deep Ellum","Downtown & Uptown","South Dallas","East Dallas"];
	var featVen;
	var showMaster=[];
	var featShowDiv;
	var headliner;
	var support = [];
	var t = 0;
	var venueName;
	var date;

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


	// CREATE NEW ACCOUNT 
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

	// SONG KICK API
	function showsAPI(){
		var queryURL = "https://api.songkick.com/api/3.0/metro_areas/35129/calendar.json?apikey=ENjLM092JqaXsW2i";
	
		$.ajax({
			url: queryURL,
			method: "GET"
		})
	.done(function(response){
		showMaster=response;
		console.log(showMaster);
	});
	};

	function venueAPI(){
		var queryURL = "http://api.songkick.com/api/3.0/venues/"+venueID+"/calendar.json?apikey=ENjLM092JqaXsW2i";
	
		$.ajax({
			url: queryURL,
			method: "GET"
		})
	.done(function(response){
		// console.log(response);
		if(response.resultsPage.totalEntries == 0){
			y = Math.floor(Math.random() * featVen.length);
			venueID = featVen[y].id;
			venueAPI();
		} else {
			var j = Math.floor(Math.random()*response.resultsPage.results.event.length);
			console.log(response.resultsPage.results.event[j]);
			var featShow = response.resultsPage.results.event[j];
			headliner = featShow.performance[0].displayName;
			console.log("headliner: "+headliner);
			featShowDiv = $("<div class='showDiv' id='hood"+t+"'>");
			featShowDiv.append("<h1 class='headliner'>"+headliner+"</h1>");
			if(featShow.performance.length > 1){
				for (var a = 1; a<featShow.performance.length; a++) {
					support.push(" "+featShow.performance[a].displayName);
				};
				console.log("support: "+support);
				featShowDiv.append("<h3 class='support'>with "+support+"</h3>");
			};
			venueName = featShow.venue.displayName;
			console.log("Venue: "+venueName);
			featShowDiv.append("<h3 class='ven'>"+venueName+"</h3>");
			date = moment(featShow.start.date).format("MMM D");
			featShowDiv.append("<h3 class='date'>"+date+"</h3>");
			t++;
			console.log("t: "+t);
			$("#featured-shows").append(featShowDiv);
		}
	});
	};

	// front page featured events
	function featureVenues(){
		for (i=0;i<hoods.length;i++){
			if (venues.neighborhood = hoods[i]){
				featVen = venues;
				var x = Math.floor(Math.random() * featVen.length);
				console.log("x: "+x);
				venueID = featVen[x].id;
				console.log("featured venue "+venueID);
				venueAPI();
			};
		};
	};

	featureVenues();
	

})