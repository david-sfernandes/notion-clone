"use server";
import { auth } from "@clerk/nextjs/server";
import { adminDB } from "../../firebase-admin";

export async function createFirebaseDocument() {
  auth.protect();

  const { sessionClaims } = await auth();
  console.log("sessionClaims", sessionClaims);
  const docCollection = adminDB.collection("documents");
  const docRef = await docCollection.add({
    title: "Novo Documento",
  });

  await adminDB
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });
  return { docId: docRef.id };
}
