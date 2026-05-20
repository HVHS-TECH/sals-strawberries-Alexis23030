let userName;
let dbUserFavFruit;
let dbUserServing;
let userEmail;
let userPhotoURL;
let uid;
let userDisplayName;
document.getElementById("emailButton").hidden = true;
document.getElementById("viewFavFruitsButton").hidden = true;
document.getElementById("writeButton").hidden = true;


async function fb_authenticate() {
    let user;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            user = firebase.auth().currentUser;
            if (user !== null) {
                userDisplayName = user.displayName;
                userEmail = user.email;
                userPhotoURL = user.photoURL;
                uid = user.uid;
                profileinfo.innerHTML = userDisplayName + "<br>" + userEmail + "<br>" 
                profile.innerHTML = "<img src=" + userPhotoURL + " alt='Photo' width='100' height='100' style ='border-radius:60px'>";
                document.getElementById("viewFavFruitsButton").hidden = false;
                document.getElementById("writeButton").hidden = false;
                document.getElementById("loginButton").hidden = true;
                firebase.database().ref('/reviews').once('value', displayReviews)

            }
        } else {
            statusMessage.innerHTML = "Not Logged In";
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                let token = result.credential.accessToken;
            });
        }
    });
}

function displayReviews(snapshot) {
    let reviews = snapshot.val();
    statusMessage.innerHTML += "<br> <h2>Reviews:</h2>";
    if (reviews == null) {
        console.log("There was no record when trying to read from the database!");
    } else {
        let reviewsValues = Object.values(reviews);
        for (i = 0; i < reviewsValues.length; i++) {
            statusMessage.innerHTML += "<br>" + reviewsValues[i] ;
            console.log(reviewsValues[i])
        }
    }

}
async function fb_write() {
    userName = document.getElementById('name').value
    let userFavFruit = document.getElementById('favoriteFruit').value
    let user2Fruit = document.getElementById('2favoriteFruit').value
    let user3Fruit = document.getElementById('3favoriteFruit').value
    let userServings = document.getElementById('fruitQuantity').value
    let userReview = document.getElementById('review').value
    userServings = Number(userServings)
    if (userFavFruit == "" || user2Fruit == "" || user3Fruit == "" || userServings == "" || userReview == ""){
        statusMessage.innerHTML = "YOU NEED TO INPUT VALUES IN ALL FIELDS"
        
    } else {
    firebase.database().ref('/salStrawberry/' + uid + "/Fruit").set(userFavFruit)
    firebase.database().ref('/salStrawberry/' + uid + "/2Fruit").set(user2Fruit)
    firebase.database().ref('/salStrawberry/' + uid + "/3Fruit").set(user3Fruit)
    firebase.database().ref('/reviews/' + uid).set(userReview)
    firebase.database().ref('/salStrawberry/' + uid + "/Servings").set(userServings)
    firebase.database().ref('/salStrawberry/' + uid + "/Name").set(userName)
    firebase.database().ref('/salStrawberry/' + uid + "/Photo").set(userPhotoURL)
    document.getElementById("emailButton").hidden = false;
    }
}

async function generate_email() {
    console.log("Generate Email");
    dbUserFavFruit = await firebase.database().ref('/salStrawberry/' + uid + "/Fruit").once('value')
    dbUser2Fruit = await firebase.database().ref('/salStrawberry/' + uid + "/2Fruit").once('value')
    dbUser3Fruit = await firebase.database().ref('/salStrawberry/' + uid + "/3Fruit").once('value')
    dbUserServing = await firebase.database().ref('/salStrawberry/' + uid + "/Servings").once('value')

    statusMessage.innerHTML =
        `From Sals Strawberry Saloon <br> To: ${userEmail}<br><br> Hello, ${userName} 
    <br> This is Sal's Strawberry Saloon, reaching out to you about your recent addition to our mailing list. 
    For new purchasers we are offring a deal on your favourite fruit: ${dbUserFavFruit.val()}, or 
    ${dbUser2Fruit.val()}, or ${dbUser3Fruit.val()}. You can get ${dbUserServing.val()} servings 
    per week for 100% more money! <br> Thanks for your time, Sals Strawberry Saloon`;
}

async function viewFavFruits() {
    snapshot = await firebase.database().ref('/salStrawberry').once('value')
    let fruitFrequency = [];
    let message = [];
    let favFruits = snapshot.val();
    if (favFruits == null) {
        console.log("There was no record when trying to read from the database!");
    } else {
        let favFruitInfo = Object.values(favFruits);
        for (i = 0; i < favFruitInfo.length; i++) {
            let currentFruit = favFruitInfo[i].Fruit;
            fruitFrequency.push(currentFruit);
        }

        for (i = 0; i < fruitFrequency.length; i++) {
            const count = fruitFrequency.filter(item => item === fruitFrequency[i]).length;
            console.log(fruitFrequency[i] + " : " + count);
            if (!message.includes(fruitFrequency[i] + ": "+ count +" <br> " )) {
                message.push(fruitFrequency[i] + ": "+ count +" <br> " ) + "<br>";
                console.log(message)
            }
            statusMessage.innerHTML = message;
        }
    }
}
