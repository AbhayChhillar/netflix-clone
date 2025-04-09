import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

import { 
  getFirestore, 
  addDoc, 
  collection 
} from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDsDVIFX_Ou44e5k0NuL_pqKpFc_iV9O_U",
  authDomain: "netflix-clone-2bc20.firebaseapp.com",
  projectId: "netflix-clone-2bc20",
  storageBucket: "netflix-clone-2bc20.appspot.com",
  messagingSenderId: "226412198190",
  appId: "1:226412198190:web:3acade73a7c0de2b9fa2bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};


const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};


const logout = async () => {
  await signOut(auth);
};

export { auth, db, login, signUp, logout };
