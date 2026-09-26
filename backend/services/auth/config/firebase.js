import { initializeApp, cert } from "firebase-admin/app";

import serviceAccount from "./firebase-service-account.json" with {
  type: "json",
};

const firebaseAdmin = initializeApp({
  credential: cert(serviceAccount),
});

export default firebaseAdmin;
