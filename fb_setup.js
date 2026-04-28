/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
/**************************************************************/
  const firebaseConfig = {
    apiKey: "AIzaSyDtbL7W-DLJjQ2b5JyaFpPCXkpg6yXqs80",
    authDomain: "alexis-hood-12comp.firebaseapp.com",
    databaseURL: "https://alexis-hood-12comp-default-rtdb.firebaseio.com",
    projectId: "alexis-hood-12comp",
    storageBucket: "alexis-hood-12comp.firebasestorage.app",
    messagingSenderId: "932740901287",
    appId: "1:932740901287:web:c24788ee74dffb43752e82"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);