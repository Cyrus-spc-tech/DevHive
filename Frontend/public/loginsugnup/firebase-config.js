// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    TwitterAuthProvider, 
    GithubAuthProvider,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSAdNAI17yjpmcymXJslT6wzrZN-S-Rls",
    authDomain: "vhive-eec3e.firebaseapp.com",
    projectId: "vhive-eec3e",
    storageBucket: "vhive-eec3e.firebasestorage.app",
    messagingSenderId: "795962423512",
    appId: "1:795962423512:web:904568fb92f6003165bfad",
    measurementId: "G-FZQKJ7N8NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

// Initialize reCAPTCHA verifier for phone auth
let appVerifier = null;

// Function to handle authentication errors
function handleAuthError(error) {
    let errorMessage = error.message;
    if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use by another account.';
    } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Please enter a valid phone number with country code (e.g., +1234567890)';
    } else if (error.code === 'auth/invalid-verification-code') {
        errorMessage = 'Invalid verification code. Please try again.';
    } else if (error.code === 'auth/code-expired') {
        errorMessage = 'The verification code has expired. Please request a new one.';
    } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
    } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
    } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
    } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with the same email but different sign-in credentials.';
    } else if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show an error
        return;
    }
    
    // Show error message to user
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
    
    console.error('Authentication error:', error);
}

// Function to initialize reCAPTCHA verifier
function initializeRecaptcha(containerId) {
    if (!appVerifier) {
        appVerifier = new RecaptchaVerifier(containerId, {
            'size': 'invisible',
            'callback': () => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // This will be handled in the phone auth flow
            }
        }, auth);
    }
    return appVerifier;
}

// Function to handle phone number sign in
async function signInWithPhone(phoneNumber, appVerifier) {
    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        return confirmationResult;
    } catch (error) {
        handleAuthError(error);
        throw error;
    }
}

// Export auth functions and providers
export {
    auth,
    googleProvider,
    twitterProvider,
    githubProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    initializeRecaptcha,
    signInWithPhone,
    handleAuthError
};
