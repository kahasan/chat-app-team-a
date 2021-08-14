import {useEffect} from 'react';
import firebase from '../firebase/firebase';

export const UsePresence = () => {
  useEffect(() => {
    // Fetch the current user's ID from Firebase Authentication.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // Create a reference to this user's specific status node.
        // This is where we will store data about being online/offline.
        var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

        // We'll create two constants which we will write to
        // the Realtime database when this device is offline
        // or online.
        var isOfflineForDatabase = {
          state: 'offline',
          room: '',
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        };

        var isOnlineForDatabase = {
          state: 'online',
          room: '',
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        };

        // var userStatusFirestoreRef = firestore.doc("/status/" + uid);

        // // Firestore uses a different server timestamp value, so we'll
        // // create two more constants for Firestore state.
        // var isOfflineForFirestore = {
        //   state: "offline",
        //   last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        // };

        // var isOnlineForFirestore = {
        //   state: "online",
        //   last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        // };

        firebase
          .database()
          .ref('.info/connected')
          .on('value', function (snapshot) {
            if (snapshot.val() === false) {
              // Instead of simply returning, we'll also set Firestore's state
              // to 'offline'. This ensures that our Firestore cache is aware
              // of the switch to 'offline.'
              // userStatusFirestoreRef.set(isOfflineForFirestore);
              return;
            }

            userStatusDatabaseRef
              .onDisconnect()
              .set(isOfflineForDatabase)
              .then(function () {
                userStatusDatabaseRef.set(isOnlineForDatabase);

                // We'll also add Firestore set here for when we come online.
                // userStatusFirestoreRef.set(isOnlineForFirestore);
              });
          });

        // userStatusFirestoreRef.onSnapshot(function (doc) {
        //   var isOnline = doc.data().state === "online";
        // });
        // ...
      } else {
        return;
        // User is signed out
        // ...
      }
    });
  }, []);
};
