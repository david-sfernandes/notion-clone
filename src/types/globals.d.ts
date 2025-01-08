import { User } from "./user";

declare global {
  interface CustomJwtSessionClaims extends User {}
}
