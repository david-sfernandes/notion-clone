interface RoomDocument extends DocumentData {
  userId: string;
  role: string;
  createdAt: Date;
  roomId: string;
}