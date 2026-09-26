
import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, googleProvider } from '../firebase';

const App = () => {

  const handleGoogleSignIn = async () => {
    console.log("Google button clicked");

    try {
      console.log("Opening Google popup...");

      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google popup completed");

      const user = result.user;

      console.log({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
    <h1 className="text-5xl font-bold text-white">
      Dcode
    </h1>
    <button onClick={handleGoogleSignIn} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Sign in with Google
    </button>
  </div>
  )
}

export default App
