let userName;
let dbUserFavFruit;
let dbUserServing;
let userEmail;
let userPhotoURL;
let userID;
let userDisplayName;

function fb_authenticate() {
    let user;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            user = firebase.auth().currentUser;
            if (user !== null) {
                userDisplayName = user.displayName;
                userEmail = user.email;
                userPhotoURL = user.photoURL;
                userID = user.uid;
                statusMessage.innerHTML = userDisplayName + "<br>" + userEmail + "<br>";
            }
        } else {
            statusMessage.innerHTML = "Not Logged In";
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            });
        }
    });
}

function fb_write() {
    userName = document.getElementById('name').value
    let userFavFruit = document.getElementById('favoriteFruit').value
    let userServings = document.getElementById('fruitQuantity').value
    userServings = Number(userServings)
    firebase.database().ref('/salStrawberry/Foods/' + userName).set(userFavFruit)
    firebase.database().ref('/salStrawberry/Servings/' + userName).set(userServings)
    statusMessage.innerHTML += userName+ " " + userFavFruit+ " " + userServings + " ";

}

function generate_email() {
    console.log("Generate Email");
    firebase.database().ref('/salStrawberry/Foods/'+ userName).once('value', readFavFruit, fb_readError)
    firebase.database().ref('/salStrawberry/Servings/'+ userName).once('value', readUserServing, fb_readError)
}

function readFavFruit(snapshot){
    dbUserFavFruit = snapshot.val()
}

function readUserServing(snapshot){
    dbUserServing = snapshot.val()
    statusMessage.innerHTML = "From Sals Strawberry Saloon <br> To: "+ userEmail + "<br><br> Hello, "+ userName +"<br> This is Sal's Strawberry Saloon, reaching out to you about your recent addition to our mailing list. For new purchasers we are offring a deal on your favourite fruit: "+ dbUserFavFruit + ". <br> You can get " + dbUserServing + " servings per week for 100% more money! <br> Thanks for your time, Sals Strawberry Saloon"  ;
}

function view_fav_fruits() {
    firebase.database().ref('/salStrawberry/Foods').orderByValue().once('value', displayFavFruits, fb_readError)
}


function displayFavFruits(snapshot) {
    var highScores = snapshot.val();
    if (highScores == null) {
        console.log("There was no record when trying to read from the database!");
    } else {
        let target;
        var fruitFrequency = [];
        sortedArrayKey = [];
        sortedArrayVal = [];
        snapshot.forEach(addToArray);
        sortedArrayVal.reverse();
        sortedArrayKey.reverse();
        let obj = Object.fromEntries(sortedArrayKey.map((key, index) => [key, sortedArrayVal[index]]));
        let names = Object.keys(obj);

        for (i = 0; i < names.length; i++) {
            target = highScores[names[i]];
            const count = Object.values(highScores).filter(val => val === target).length;
            if (!fruitFrequency.includes(target + ": " + count)) {
                fruitFrequency.push(target + ": " + count);
            }
        }

        for (i = 0; i < fruitFrequency.length; i++) {
            statusMessage.innerHTML += fruitFrequency[i] + "<br>";
        }

    }
}

function addToArray(child) {
    sortedArrayVal.push(child.val())
    sortedArrayKey.push(child.key)
}

function fb_readError(error) {
    console.log("There was an error reading this message!")
    console.error(error);
}