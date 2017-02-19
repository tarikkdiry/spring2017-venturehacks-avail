var loginButton;
var userIconImg;

function login() {
  // If you enable it, you can sign in with many different social providers
  var provider = new firebase.auth.GoogleAuthProvider();

  // Options
  // See @ https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider#setCustomParameters
  provider.setCustomParameters({
    'login_hint': 'username@stevens.edu';
  });

  // Signin with popup will give you the familiar
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token.
    // You can use it to access the Google API if you are adventurous.
    var token = result.credential.accessToken;

    // The signed-in user info.
    var user = result.user;
    var email = user.email;
    var domain = email.replace(/.*@/, "");

    if(domain != "stevens.edu"){
      token = null;
    }

    // Here is where you would change what is showing on the screen (views)
    // and other actions that go along with being 'logged in'
    // With the 'user' object, we can get things like name, email, photoURL ...
    // For our example, we will just change the user image in the nav bar
    // Do this by changing the 'src' attribute to point to the user's Google photo
    userIconImg.src = user.photoURL;

  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
}

function signout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.

  }, function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
}

function setup() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      signoutButton = document.getElementById("signout-button");
      // Attach an event listener to the login button to trigger the firebase login
      signoutButton.addEventListener('click', function (event) {
        // Makes sure we only do our code
        event.preventDefault();
        signout();
      })

    } else {
      // No user is signed in.
      loginButton = document.getElementById("login-button");
      userIconImg = document.getElementById("user-icon");
      // Attach an event listener to the login button to trigger the firebase login
      loginButton.addEventListener('click', function (event) {
        // Makes sure we only do our code
        event.preventDefault();
        login();
      })

    }
  });
}

// Will make sure our function is only run after the page loads
(function ($) {
  $('.button-collapse').sideNav();
  $('.parallax').parallax();
  setup();
})(jQuery);
