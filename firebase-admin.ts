import { App, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { cert } from "firebase-admin/app";
import serviceKey from "./service_key.json";
import { ServiceAccount } from "firebase-admin";

let adminApp: App;
  getApps().length === 0 ? initializeApp({ credential: cert(serviceKey as ServiceAccount) }) : getApp();
  // getApps().length === 0 ? initializeApp({ credential: cert(serviceKey) }) : getApp();
  // getApps().length === 0 ? initializeApp({ credential: serviceKey }) : getApp();

const adminDB = getFirestore(adminApp);
export { adminApp, adminDB };

