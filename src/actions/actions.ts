"use server";
import liveblocks from "@/lib/liveblocks";
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

export async function deleteDocument(roomId: string) {
  auth.protect();

  try {
    const { sessionClaims } = await auth();
    await adminDB.collection("documents").doc(roomId).delete();
    await adminDB
      .collection("users")
      .doc(sessionClaims?.email!)
      .collection("rooms")
      .doc(roomId)
      .delete();
    await liveblocks.deleteRoom(roomId);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId: string, email: string) {
  auth.protect();
  console.log("Sending invite to", email);

  try {
    await adminDB
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId: roomId,
      });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, userId: string) {
  auth.protect();

  try {
    await adminDB
      .collection("users")
      .doc(userId)
      .collection("rooms")
      .doc(roomId)
      .delete();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
