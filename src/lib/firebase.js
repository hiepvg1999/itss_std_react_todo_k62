import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyBbSUt80EXS7YzrgVMYLIUuq6ic1ZviU24",
  authDomain: "fb-sample-d3ee5.firebaseapp.com",
  projectId: "fb-sample-d3ee5",
  storageBucket: "fb-sample-d3ee5.appspot.com",
  messagingSenderId: "209719356611",
  appId: "1:209719356611:web:e070492c24be94da5b0676"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
    try {
        const snapshot = await db
            .collection("todos")
            .get();
        const items = snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id })
        );
        return items;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const addFirebaseItem = async (item) => {
    try {
        const todoRef = db.collection("todos");
        await todoRef.add(item);
    } catch (err) {
        console.log(err);
    }
}

export const updateFirebaseItem = async (item, id) => {
    try {
        const todoRef = db.collection("todos").doc(id);
        await todoRef.update(item);
    } catch (err) {
        console.log(err);
    }
}

export const clearFirebaseItem = async (item) => {
    const todoRef = db.collection("todos").doc(item.id);
    await todoRef.delete().then(function () {
    }).catch(function (err) {
        console.log(err);
    });
};

export const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
}

export const storeUserInfo = async (user) => {
    const { uid } = user;
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      await db.collection("users").doc(uid).set({ name: user.displayName });
      return {
        name: user.displayName,
        id: uid,
      };
    } else {
      return {
        id: uid,
        ...userDoc.data(),
      };
    }
  } 
