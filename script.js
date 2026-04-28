
function fb_authenticate() {
    let user;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("Logged In")
            statusMessage.innerHTML = "Logged In";
            var uid = user.uid;
            user = firebase.auth().currentUser;
            if (user !== null) {
                const userDisplayName = user.displayName;
                const userEmail = user.email;
                const userPhotoURL = user.photoURL;
                const userID = user.uid;
                console.log(userDisplayName);
                statusMessage.innerHTML = userDisplayName + "<br>" + userEmail + "<br>";
            }
        } else {
            console.log("Not Logged In")
            statusmMessage.innerHTML = "Not Logged In";
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
            });
        }
    });
}

function fb_write(){
    console.log("Submit")
    let userName = document.getElementById('name').value
    console.log(userName);
    let userFavFruit = document.getElementById('favoriteFruit').value
    console.log(userFavFruit);
    let userServings = document.getElementById('fruitQuantity').value
    console.log(userServings);
    firebase.database().ref('/salStrawberry/Foods').set({ [userName]: userFavFruit})

}

function generate_email(){
    console.log("Generate Email");
}

function view_fav_fruits(){
    console.log("View fav fruits");
}