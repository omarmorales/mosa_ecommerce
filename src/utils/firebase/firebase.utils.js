import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBNj5X0NlGIZr93aZIK8FeeF6WbGx8Yq2k",
  authDomain: "ecommerce-project-15f69.firebaseapp.com",
  projectId: "ecommerce-project-15f69",
  storageBucket: "ecommerce-project-15f69.appspot.com",
  messagingSenderId: "458732451017",
  appId: "1:458732451017:web:00b0394c2a389594188918",
  measurementId: "G-R4T7N6ZCZ5"
};

const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error)
    }
  }

  return userDocRef
}