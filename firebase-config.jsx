import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfCIngHCdsvFjy9RiA9oYdvSATPzFLlSM",
  authDomain: "phone-auth-ffeed.firebaseapp.com",
  projectId: "phone-auth-ffeed",
  storageBucket: "phone-auth-ffeed.appspot.com",
  messagingSenderId: "491480168815",
  appId: "1:491480168815:web:2b9845d62f78191504d09a",
};

const app = initializeApp(firebaseConfig);
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcgujspAAAAAMFAuGW3Y7tJZ5v-PVhZwl7-t4jY"),

  isTokenAutoRefreshEnabled: true,
});
export const authentication = getAuth(app);
